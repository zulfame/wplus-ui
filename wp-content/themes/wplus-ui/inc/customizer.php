<?php
/**
 * Customizer settings: default appearance, notification bar, homepage category
 * sections, carousel slides, social links and the footer text, plus a few settings for the bits of the header/footer chrome that are now
 * editable content instead of hardcoded demo copy.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Hex colors of the 16 color schemes.
 *
 * @return string[]
 */
function wplusui_get_color_scheme_swatches() {
	$default = array(
		'#482dff',
		'#f44336',
		'#45a557',
		'#0062d1',
		'#ff990a',
		'#e91e63',
		'#ff5722',
		'#607d8b',
		'#5d4037',
		'#0c9784',
		'#3949ab',
		'#5c3083',
		'#2c5d3f',
		'#3d6fa9',
		'#882c70',
		'#bf5154',
	);
	return $default;
}

/**
 * Social networks that have a URL setting.
 *
 * @return array<string,string>
 */
function wplusui_social_networks() {
	return array(
		'facebook'  => __( 'Facebook', 'wplus-ui' ),
		'instagram' => __( 'Instagram', 'wplus-ui' ),
		'twitter'   => __( 'X / Twitter', 'wplus-ui' ),
		'threads'   => __( 'Threads', 'wplus-ui' ),
		'bluesky'   => __( 'Bluesky', 'wplus-ui' ),
		'whatsapp'  => __( 'WhatsApp', 'wplus-ui' ),
		'pinterest' => __( 'Pinterest', 'wplus-ui' ),
		'snapchat'  => __( 'Snapchat', 'wplus-ui' ),
		'discord'   => __( 'Discord', 'wplus-ui' ),
		'youtube'   => __( 'YouTube', 'wplus-ui' ),
		'tiktok'    => __( 'TikTok', 'wplus-ui' ),
		'telegram'  => __( 'Telegram', 'wplus-ui' ),
		'linkedin'  => __( 'LinkedIn', 'wplus-ui' ),
	);
}

/**
 * Social networks that have a URL set in the Customizer.
 *
 * @return array<string,string> Network key => URL.
 */
function wplusui_social_links() {
	$links = array();
	foreach ( array_keys( wplusui_social_networks() ) as $key ) {
		$url = trim( (string) get_theme_mod( 'wplusui_social_' . $key, '' ) );
		if ( '' !== $url ) {
			$links[ $key ] = $url;
		}
	}
	return $links;
}

/**
 * Social icon SVGs for the footer (.fotS) and the mobile drawer (.mSoc), keyed like wplusui_social_networks().
 * The first six (Facebook, Instagram, X, Threads, Bluesky, WhatsApp) are the original theme's icons; the rest
 * were added for the other networks. header.php and footer.php print only the networks that have a URL.
 */
function wplusui_social_icon_svgs() {
	return array(
		'facebook'  => '<svg viewBox="0 0 32 32"><path d="M24,3H8A5,5,0,0,0,3,8V24a5,5,0,0,0,5,5H24a5,5,0,0,0,5-5V8A5,5,0,0,0,24,3Zm3,21a3,3,0,0,1-3,3H17V18h4a1,1,0,0,0,0-2H17V14a2,2,0,0,1,2-2h2a1,1,0,0,0,0-2H19a4,4,0,0,0-4,4v2H12a1,1,0,0,0,0,2h3v9H8a3,3,0,0,1-3-3V8A3,3,0,0,1,8,5H24a3,3,0,0,1,3,3Z"></path></svg>',
		'instagram' => '<svg viewBox="0 0 32 32"><path d="M22,3H10a7,7,0,0,0-7,7V22a7,7,0,0,0,7,7H22a7,7,0,0,0,7-7V10A7,7,0,0,0,22,3Zm5,19a5,5,0,0,1-5,5H10a5,5,0,0,1-5-5V10a5,5,0,0,1,5-5H22a5,5,0,0,1,5,5Z"></path><path class="c" d="M16,9.5A6.5,6.5,0,1,0,22.5,16,6.51,6.51,0,0,0,16,9.5Zm0,11A4.5,4.5,0,1,1,20.5,16,4.51,4.51,0,0,1,16,20.5Z"></path><circle class="c" cx="23" cy="9" r="1"></circle></svg>',
		'twitter'   => '<svg viewBox="0 0 24 24"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" style="stroke: currentColor; stroke-width: 0.4; transform: scale(0.8); transform-origin: center;"></path></svg>',
		'threads'   => '<svg viewBox="0 0 24 24"><path d="M5.25 12c0-3.247.861-5.272 2.12-6.493c1.265-1.225 3.052-1.757 5.15-1.757c2.856 0 5.345 1.467 6.265 4.356a.75.75 0 0 0 1.43-.455c-1.152-3.615-4.301-5.401-7.696-5.401c-2.332 0-4.554.593-6.192 2.18C4.684 6.022 3.75 8.497 3.75 12s.934 5.978 2.577 7.57c1.638 1.587 3.86 2.18 6.192 2.18c2.932 0 5.429-1.577 6.514-3.68c.547-1.06.74-2.269.411-3.459c-.33-1.192-1.16-2.284-2.51-3.152l-.067-.038a7 7 0 0 0-.463-.212q-.025-.326-.067-.654c-.225-1.77-1.314-2.998-2.718-3.48c-1.386-.475-3.016-.203-4.322.858a.75.75 0 1 0 .945 1.164c.926-.751 2.018-.902 2.89-.603c.856.294 1.563 1.04 1.717 2.25v.002c-1.033-.203-2.118-.227-3.083-.059c-.82.144-1.614.437-2.22.94c-.625.52-1.027 1.25-1.03 2.164v.004a2 2 0 0 0 .004.148a3.5 3.5 0 0 0 .405 1.473c.223.416.573.84 1.106 1.156s1.207.498 2.043.498c1.8 0 3.056-.749 3.743-2.049c.328-.62.511-1.34.584-2.111c.918.66 1.403 1.396 1.597 2.1c.215.777.101 1.598-.298 2.372c-.808 1.565-2.766 2.868-5.18 2.868c-2.098 0-3.885-.532-5.15-1.757c-1.259-1.22-2.12-3.246-2.12-6.493m6.774.165c.905-.158 1.958-.103 2.912.137c-.023.817-.171 1.5-.445 2.018c-.394.745-1.098 1.25-2.417 1.25c-.613 0-1.014-.132-1.278-.29a1.46 1.46 0 0 1-.551-.576a2 2 0 0 1-.227-.83l-.001-.074c0-.432.171-.756.488-1.02c.339-.28.858-.5 1.52-.615"></path></svg>',
		'bluesky'   => '<svg viewBox="0 0 24 24"><path d="M6.335 5.144C4.681 3.945 2 3.017 2 5.97c0 .59.35 4.953.556 5.661C3.269 14.094 5.686 14.381 8 14c-4.045.665-4.889 3.208-2.667 5.41C6.363 20.428 7.246 21 8 21c2 0 3.134-2.769 3.5-3.5q.5-1 .5-1.5q0 .5.5 1.5c.366.731 1.5 3.5 3.5 3.5c.754 0 1.637-.571 2.667-1.59C20.889 17.207 20.045 14.664 16 14c2.314.38 4.73.094 5.444-2.369c.206-.708.556-5.072.556-5.661c0-2.953-2.68-2.025-4.335-.826C15.372 6.806 12.905 10.192 12 12c-.905-1.808-3.372-5.194-5.665-6.856" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>',
		'whatsapp'  => '<svg viewBox="0 0 32 32"><path d="M16,2A13,13,0,0,0,8,25.23V29a1,1,0,0,0,.51.87A1,1,0,0,0,9,30a1,1,0,0,0,.51-.14l3.65-2.19A12.64,12.64,0,0,0,16,28,13,13,0,0,0,16,2Zm0,24a11.13,11.13,0,0,1-2.76-.36,1,1,0,0,0-.76.11L10,27.23v-2.5a1,1,0,0,0-.42-.81A11,11,0,1,1,16,26Z"></path><path class="c" d="M19.86,15.18a1.9,1.9,0,0,0-2.64,0l-.09.09-1.4-1.4.09-.09a1.86,1.86,0,0,0,0-2.64L14.23,9.55a1.9,1.9,0,0,0-2.64,0l-.8.79a3.56,3.56,0,0,0-.5,3.76,10.64,10.64,0,0,0,2.62,4A8.7,8.7,0,0,0,18.56,21a2.92,2.92,0,0,0,2.1-.79l.79-.8a1.86,1.86,0,0,0,0-2.64Zm-.62,3.61c-.57.58-2.78,0-4.92-2.11a8.88,8.88,0,0,1-2.13-3.21c-.26-.79-.25-1.44,0-1.71l.7-.7,1.4,1.4-.7.7a1,1,0,0,0,0,1.41l2.82,2.82a1,1,0,0,0,1.41,0l.7-.7,1.4,1.4Z"></path></svg>',
		'pinterest' => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><circle cx="12" cy="12" r="9"></circle><path d="M10.3 19.5 12 12.5M9.8 14.6c-1.6-.9-2.3-2.7-1.8-4.5.5-1.9 2.1-3.1 4.1-3.1 2.5 0 4 1.8 4 3.8 0 2.4-1.4 4.2-3.3 4.2-.8 0-1.6-.4-2-1.1"></path></svg>',
		'snapchat'  => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><path d="M12 3.5c-2.6 0-4.3 2-4.3 4.5v2.3c-.7.2-1.7.3-2.2.5.4.9 1.3 1.1 2.1 1.3-.4 1.4-1.6 2.5-2.7 2.9.9.6 2 .6 2.9.9.4.5.7 1.3 1.4 1.3 1 0 1.6-.8 2.8-.8s1.8.8 2.8.8c.7 0 1-.8 1.4-1.3.9-.3 2-.3 2.9-.9-1.1-.4-2.3-1.5-2.7-2.9.8-.2 1.7-.4 2.1-1.3-.5-.2-1.5-.3-2.2-.5V8c0-2.5-1.7-4.5-4.3-4.5Z"></path></svg>',
		'discord'   => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><path d="M7 5.5c1.6-.7 3.1-1 5-1s3.4.3 5 1c1.8 3.2 2.7 6.4 2.7 10-1.3 1-2.7 1.7-4.2 2.2l-.9-1.6c.5-.2 1-.4 1.4-.7-1.2.5-2.5.8-4 .8s-2.8-.3-4-.8c.4.3.9.5 1.4.7l-.9 1.6c-1.5-.5-2.9-1.2-4.2-2.2 0-3.6.9-6.8 2.7-10Z"></path><circle cx="9.2" cy="12.2" r="1.2"></circle><circle cx="14.8" cy="12.2" r="1.2"></circle></svg>',
		'youtube'   => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><rect x="2" y="5" width="20" height="14" rx="4"></rect><path d="M10 9l5 3-5 3z"></path></svg>',
		'tiktok'    => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2 4 5 4"></path></svg>',
		'telegram'  => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><path d="M21 4L3 11l6 2 2 6 3-4 4 3z"></path><path d="M9 13l12-9"></path></svg>',
		'linkedin'  => '<svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 11v6M8 7.5v.01M12 17v-6m0 2c0-1.5 1-2 2-2s2 .8 2 2.5V17"></path></svg>',
	);
}

/**
 * Register the main Customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_options',
		array(
			'title'    => __( 'WPlus UI Theme Options', 'wplus-ui' ),
			'priority' => 30,
		)
	);

	$wp_customize->add_setting(
		'wplusui_default_mode',
		array(
			'default'           => 'light',
			'sanitize_callback' => function ( $value ) {
				return in_array( $value, array( 'light', 'dark', 'system' ), true ) ? $value : 'light';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_default_mode',
		array(
			'label'   => __( 'Default light/dark mode', 'wplus-ui' ),
			'section' => 'wplusui_options',
			'type'    => 'select',
			'choices' => array(
				'light'  => __( 'Light', 'wplus-ui' ),
				'dark'   => __( 'Dark', 'wplus-ui' ),
				'system' => __( 'System', 'wplus-ui' ),
			),
		)
	);

	$wp_customize->add_setting(
		'wplusui_default_scheme',
		array(
			'default'           => 0,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		'wplusui_default_scheme',
		array(
			'label'       => __( 'Default accent color scheme (0-15)', 'wplus-ui' ),
			'section'     => 'wplusui_options',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 0,
				'max' => 15,
			),
		)
	);

	$wp_customize->add_setting(
		'wplusui_notification_text',
		array(
			'default'           => '',
			'sanitize_callback' => 'wp_kses_post',
		)
	);
	$wp_customize->add_control(
		'wplusui_notification_text',
		array(
			'label'       => __( 'Dismissible notification bar text (leave empty to hide)', 'wplus-ui' ),
			'description' => __( 'HTML allowed, e.g. links. Visitors who dismiss it won’t see it again for 24h.', 'wplus-ui' ),
			'section'     => 'wplusui_options',
			'type'        => 'textarea',
		)
	);

	$wp_customize->add_setting(
		'wplusui_notification_cta_text',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_notification_cta_text',
		array(
			'label'   => __( 'Notification bar button label (optional, e.g. "Reach out!")', 'wplus-ui' ),
			'section' => 'wplusui_options',
			'type'    => 'text',
		)
	);

	$wp_customize->add_setting(
		'wplusui_notification_cta_url',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);
	$wp_customize->add_control(
		'wplusui_notification_cta_url',
		array(
			'label'   => __( 'Notification bar button URL', 'wplus-ui' ),
			'section' => 'wplusui_options',
			'type'    => 'url',
		)
	);

	$wp_customize->add_setting(
		'wplusui_home_categories',
		array(
			'default'           => 'documentation,product',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_home_categories',
		array(
			'label'       => __( 'Homepage category sections', 'wplus-ui' ),
			'description' => __( 'Comma-separated category slugs shown under Latest Posts (6 posts each). Leave empty to hide.', 'wplus-ui' ),
			'section'     => 'wplusui_options',
			'type'        => 'text',
		)
	);

	foreach ( array(
		'wplusui_carousel_enabled' => __( 'Show the homepage carousel', 'wplus-ui' ),
		'wplusui_pinned_enabled'   => __( 'Show the Pinned Post box on the homepage', 'wplus-ui' ),
	) as $setting_id => $setting_label ) {
		$wp_customize->add_setting(
			$setting_id,
			array(
				'default'           => true,
				'sanitize_callback' => 'rest_sanitize_boolean',
			)
		);
		$wp_customize->add_control(
			$setting_id,
			array(
				'label'   => $setting_label,
				'section' => 'wplusui_options',
				'type'    => 'checkbox',
			)
		);
	}

	// Optional custom carousel slides; with no image set the carousel shows posts tagged "featured".
	for ( $i = 1; $i <= 5; $i++ ) {
		$wp_customize->add_setting(
			"wplusui_carousel_image_$i",
			array(
				'default'           => '',
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				"wplusui_carousel_image_$i",
				array(
					/* translators: %d: slide number */
					'label'   => sprintf( __( 'Carousel slide %d image (optional)', 'wplus-ui' ), $i ),
					'section' => 'wplusui_options',
				)
			)
		);
		$wp_customize->add_setting(
			"wplusui_carousel_title_$i",
			array(
				'default'           => '',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
		$wp_customize->add_control(
			"wplusui_carousel_title_$i",
			array(
				/* translators: %d: slide number */
				'label'   => sprintf( __( 'Carousel slide %d title', 'wplus-ui' ), $i ),
				'section' => 'wplusui_options',
				'type'    => 'text',
			)
		);
		$wp_customize->add_setting(
			"wplusui_carousel_caption_$i",
			array(
				'default'           => '',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
		$wp_customize->add_control(
			"wplusui_carousel_caption_$i",
			array(
				/* translators: %d: slide number */
				'label'   => sprintf( __( 'Carousel slide %d caption (optional)', 'wplus-ui' ), $i ),
				'section' => 'wplusui_options',
				'type'    => 'text',
			)
		);
		$wp_customize->add_setting(
			"wplusui_carousel_url_$i",
			array(
				'default'           => '',
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			"wplusui_carousel_url_$i",
			array(
				/* translators: %d: slide number */
				'label'   => sprintf( __( 'Carousel slide %d link', 'wplus-ui' ), $i ),
				'section' => 'wplusui_options',
				'type'    => 'url',
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_customize_register' );
