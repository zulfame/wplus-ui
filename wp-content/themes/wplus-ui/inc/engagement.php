<?php
/**
 * Engagement features, all off by default: floating WhatsApp button and a
 * call-to-action popup. The Coming Soon / Maintenance page is in coming-soon.php.
 *
 * @package wplus-ui
 */

/**
 * Customizer controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_engagement_customize( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_engagement',
		array(
			'title'    => __( 'WPlus UI: Engagement', 'wplus-ui' ),
			'priority' => 70,
		)
	);

	$fields = array(
		'wplusui_wa_enabled'  => array( __( 'Show floating WhatsApp button', 'wplus-ui' ), 'checkbox', false ),
		'wplusui_wa_number'   => array( __( 'WhatsApp number (digits with country code)', 'wplus-ui' ), 'text', '' ),
		'wplusui_wa_message'  => array( __( 'WhatsApp opening message', 'wplus-ui' ), 'text', '' ),
		'wplusui_wa_side'     => array( __( 'WhatsApp button side', 'wplus-ui' ), 'select', 'right' ),
		'wplusui_cta_enabled' => array( __( 'Show call-to-action popup', 'wplus-ui' ), 'checkbox', false ),
		'wplusui_cta_title'   => array( __( 'Popup title', 'wplus-ui' ), 'text', '' ),
		'wplusui_cta_text'    => array( __( 'Popup text', 'wplus-ui' ), 'textarea', '' ),
		'wplusui_cta_button'  => array( __( 'Popup button text', 'wplus-ui' ), 'text', '' ),
		'wplusui_cta_url'     => array( __( 'Popup button link', 'wplus-ui' ), 'url', '' ),
		'wplusui_cta_delay'   => array( __( 'Popup delay (seconds)', 'wplus-ui' ), 'number', 5 ),
	);

	foreach ( $fields as $id => $field ) {
		$sanitize = 'sanitize_text_field';
		if ( 'checkbox' === $field[1] ) {
			$sanitize = 'rest_sanitize_boolean';
		} elseif ( 'url' === $field[1] ) {
			$sanitize = 'esc_url_raw';
		} elseif ( 'number' === $field[1] ) {
			$sanitize = 'absint';
		} elseif ( 'textarea' === $field[1] ) {
			$sanitize = 'sanitize_textarea_field';
		} elseif ( 'wplusui_wa_number' === $id ) {
			$sanitize = function ( $value ) {
				return preg_replace( '/\D+/', '', (string) $value );
			};
		} elseif ( 'select' === $field[1] ) {
			$sanitize = function ( $value ) {
				return 'left' === $value ? 'left' : 'right';
			};
		}
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $field[2],
				'sanitize_callback' => $sanitize,
			)
		);
		$control = array(
			'label'   => $field[0],
			'section' => 'wplusui_engagement',
			'type'    => $field[1],
		);
		if ( 'select' === $field[1] ) {
			$control['choices'] = array(
				'right' => __( 'Right', 'wplus-ui' ),
				'left'  => __( 'Left', 'wplus-ui' ),
			);
		}
		$wp_customize->add_control( $id, $control );
	}

	$wp_customize->add_setting(
		'wplusui_cta_image',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'wplusui_cta_image',
			array(
				'label'       => __( 'Popup picture (optional)', 'wplus-ui' ),
				'description' => __( 'A wide picture works best. Leave empty for a text-only popup.', 'wplus-ui' ),
				'section'     => 'wplusui_engagement',
			)
		)
	);

	$wp_customize->add_setting(
		'wplusui_cta_image_pos',
		array(
			'default'           => 'top',
			'sanitize_callback' => function ( $value ) {
				return 'side' === $value ? 'side' : 'top';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_cta_image_pos',
		array(
			'label'   => __( 'Picture position', 'wplus-ui' ),
			'section' => 'wplusui_engagement',
			'type'    => 'radio',
			'choices' => array(
				'top'  => __( 'Above the text', 'wplus-ui' ),
				'side' => __( 'Beside the text (on wide screens)', 'wplus-ui' ),
			),
		)
	);
}

add_action( 'customize_register', 'wplusui_engagement_customize' );

/**
 * Whether the WhatsApp button should render.
 *
 * @return bool
 */
function wplusui_wa_active() {
	return (bool) get_theme_mod( 'wplusui_wa_enabled', false ) && '' !== (string) get_theme_mod( 'wplusui_wa_number', '' );
}

/**
 * Whether the CTA popup should render.
 *
 * @return bool
 */
function wplusui_cta_active() {
	return (bool) get_theme_mod( 'wplusui_cta_enabled', false ) && '' !== trim( (string) get_theme_mod( 'wplusui_cta_title', '' ) );
}

/**
 * Stylesheet, only when a feature is on.
 */
function wplusui_engagement_assets() {
	if ( wplusui_wa_active() || wplusui_cta_active() ) {
		wp_enqueue_style( 'wplusui-engagement', WPLUSUI_URI . '/assets/css/engagement.css', array( 'wplusui-style' ), wplusui_asset_version( 'assets/css/engagement.css' ) );
	}
}
add_action( 'wp_enqueue_scripts', 'wplusui_engagement_assets', 20 );

/**
 * Floating button and popup markup.
 */
function wplusui_engagement_markup() {
	if ( wplusui_wa_active() ) {
		$url = 'https://wa.me/' . preg_replace( '/\D+/', '', (string) get_theme_mod( 'wplusui_wa_number', '' ) );
		$msg = trim( (string) get_theme_mod( 'wplusui_wa_message', '' ) );
		if ( '' !== $msg ) {
			$url = add_query_arg( 'text', rawurlencode( $msg ), $url );
		}
		$side = 'left' === get_theme_mod( 'wplusui_wa_side', 'right' ) ? 'left' : 'right';
		printf(
			'<a class="puWa puWa-%1$s" href="%2$s" rel="noopener noreferrer" target="_blank" aria-label="%3$s"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 4C9.4 4 4 9.1 4 15.4c0 2.2.7 4.2 1.9 5.9L4.5 27l5.9-1.5c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.1 12-11.5S22.6 4 16 4zm-4 7h2l1.2 3-1.4 1.1c.8 1.6 2 2.8 3.6 3.6l1.1-1.4 3 1.2v2c0 .6-.5 1-1.2 1-4.800-.3-8.700-4.200-9-9 0-.6.4-1 .7-.9z"/></svg></a>',
			esc_attr( $side ),
			esc_url( $url ),
			esc_attr__( 'Chat on WhatsApp', 'wplus-ui' )
		);
	}

	if ( wplusui_cta_active() ) {
		$delay     = max( 0, (int) get_theme_mod( 'wplusui_cta_delay', 5 ) );
		$url       = (string) get_theme_mod( 'wplusui_cta_url', '' );
		$btn       = trim( (string) get_theme_mod( 'wplusui_cta_button', '' ) );
		$image     = trim( (string) get_theme_mod( 'wplusui_cta_image', '' ) );
		$image_pos = 'side' === get_theme_mod( 'wplusui_cta_image_pos', 'top' ) ? 'side' : 'top';
		?>
<div class="puCta" hidden data-delay="<?php echo esc_attr( $delay ); ?>" role="dialog" aria-modal="true" aria-labelledby="puCtaT">
	<div class="puCtaBox<?php echo $image ? ' has-img img-' . esc_attr( $image_pos ) : ''; ?>">
		<button class="puCtaX" type="button" aria-label="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>">&times;</button>
		<?php if ( $image ) : ?>
		<div class="puCtaImg">
			<?php
			$image_id = attachment_url_to_postid( $image );
			if ( $image_id ) {
				echo wp_get_attachment_image( $image_id, 'large', false, array( 'alt' => '' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- core-escaped markup.
			} else {
				echo '<img src="' . esc_url( $image ) . '" alt="" loading="lazy">';
			}
			?>
		</div>
		<?php endif; ?>
		<div class="puCtaBody">
			<b id="puCtaT"><?php echo esc_html( get_theme_mod( 'wplusui_cta_title', '' ) ); ?></b>
			<?php if ( '' !== trim( (string) get_theme_mod( 'wplusui_cta_text', '' ) ) ) : ?>
			<p><?php echo esc_html( get_theme_mod( 'wplusui_cta_text', '' ) ); ?></p>
			<?php endif; ?>
			<?php if ( '' !== $btn && '' !== $url ) : ?>
			<a class="button" href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $btn ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</div>
<script>
(function(){var p=document.querySelector('.puCta');if(!p)return;try{if(localStorage.getItem('puCtaSeen'))return}catch(e){}
function c(){p.hidden=true;try{localStorage.setItem('puCtaSeen','1')}catch(e){}}
p.addEventListener('click',function(e){if(e.target===p||e.target.closest('.puCtaX'))c()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')c()});
setTimeout(function(){p.hidden=false},(+p.dataset.delay||0)*1000)})();
</script>
		<?php
	}
}
add_action( 'wp_footer', 'wplusui_engagement_markup', 5 );
