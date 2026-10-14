<?php
/**
 * Block editor support: block styles that map to the theme's UI components
 * (notes, alerts, steps, quotes, accordion, spoiler, buttons), block patterns
 * for the larger components, and editor assets so they preview in the editor.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block style => CSS classes the stylesheet expects.
 *
 * @return array<string,array<string,array{0:string,1:string}>> Block name => style name => [ label, classes ].
 */
function wplusui_block_style_map() {
	$alerts = array(
		'alert'         => array( __( 'Alert', 'wplus-ui' ), 'alert' ),
		'alert-info'    => array( __( 'Alert: info', 'wplus-ui' ), 'alert info' ),
		'alert-success' => array( __( 'Alert: success', 'wplus-ui' ), 'alert success' ),
		'alert-warning' => array( __( 'Alert: warning', 'wplus-ui' ), 'alert warning' ),
		'alert-error'   => array( __( 'Alert: error', 'wplus-ui' ), 'alert error' ),
	);
	foreach ( $alerts as $name => $row ) {
		$alerts[ $name . '-outline' ] = array(
			/* translators: %s: alert style label */
			sprintf( __( '%s (outline)', 'wplus-ui' ), $row[0] ),
			$row[1] . ' outline',
		);
	}

	return array(
		'core/paragraph' => array(
			'note'         => array( __( 'Note', 'wplus-ui' ), 'note' ),
			'note-warning' => array( __( 'Note: warning', 'wplus-ui' ), 'note wr' ),
			'indent'       => array( __( 'First line indent', 'wplus-ui' ), 'pIndent' ),
			'reference'    => array( __( 'Reference', 'wplus-ui' ), 'pRef' ),
		),
		'core/group'     => $alerts + array(
			'accordion-group' => array( __( 'Accordion group', 'wplus-ui' ), 'showH' ),
		),
		'core/table'     => array(
			'data-table' => array( __( 'Data table', 'wplus-ui' ), 'table sticky bordered stripped hovered' ),
		),
		'core/list'      => array(
			'steps' => array( __( 'Steps', 'wplus-ui' ), 'steps' ),
		),
		'core/quote'     => array(
			'quote-highlight' => array( __( 'Highlighted', 'wplus-ui' ), 's1' ),
			'quote-icon'      => array( __( 'With quote icon', 'wplus-ui' ), 's2' ),
		),
		'core/details'   => array(
			'accordion'     => array( __( 'Accordion', 'wplus-ui' ), 'ac' ),
			'accordion-alt' => array( __( 'Accordion (alternate)', 'wplus-ui' ), 'ac alt' ),
			'spoiler'       => array( __( 'Spoiler', 'wplus-ui' ), 'sp' ),
		),
	);
}

/**
 * Register the block styles.
 */
function wplusui_register_block_styles() {
	foreach ( wplusui_block_style_map() as $block => $styles ) {
		foreach ( $styles as $name => $row ) {
			register_block_style(
				$block,
				array(
					'name'  => $name,
					'label' => $row[0],
				)
			);
		}
	}
}
add_action( 'init', 'wplusui_register_block_styles' );

/**
 * Front end: add the component classes (and the markup the CSS needs).
 *
 * @param string $content Rendered block.
 * @param array  $block   Parsed block.
 * @return string
 */
function wplusui_render_block_classes( $content, $block ) {
	if ( '' === $content || ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
		return $content;
	}
	$name = $block['blockName'];

	if ( 'core/quote' === $name ) {
		// The component CSS styles the attribution as a trailing <span>, not <cite>.
		$content = preg_replace( '#<cite>(.*?)</cite>#s', '<span>$1</span>', $content );
	}

	if ( 'core/button' === $name ) {
		$p = new WP_HTML_Tag_Processor( $content );
		if ( $p->next_tag( 'a' ) ) {
			$p->add_class( 'button' );
			if ( false !== strpos( (string) ( $block['attrs']['className'] ?? '' ), 'is-style-outline' ) ) {
				$p->add_class( 'ln' );
			}
			return $p->get_updated_html();
		}
		return $content;
	}

	$map = wplusui_block_style_map();
	if ( ! isset( $map[ $name ] ) ) {
		return $content;
	}
	$class = (string) ( $block['attrs']['className'] ?? '' );
	foreach ( $map[ $name ] as $style => $row ) {
		if ( false === strpos( ' ' . $class . ' ', ' is-style-' . $style . ' ' ) ) {
			continue;
		}
		$p = new WP_HTML_Tag_Processor( $content );
		if ( ! $p->next_tag() ) {
			return $content;
		}
		foreach ( explode( ' ', $row[1] ) as $c ) {
			$p->add_class( $c );
		}
		$content = $p->get_updated_html();
		if ( 'core/details' === $name ) {
			// The component CSS expects the body wrapped in a <div> after <summary>.
			$content = preg_replace( '#</summary>(.*)</details>\s*$#s', '</summary><div>$1</div></details>', $content );
		}
		break;
	}
	return $content;
}
add_filter( 'render_block', 'wplusui_render_block_classes', 10, 2 );

/**
 * Editor script that gives styled blocks the same classes in the editor as on the front end.
 */
function wplusui_editor_assets() {
	wp_enqueue_script( 'wplusui-editor', WPLUSUI_URI . '/assets/js/editor.js', array( 'wp-hooks', 'wp-compose', 'wp-element', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-i18n', 'wp-rich-text', 'wp-server-side-render' ), WPLUSUI_VERSION, true );
	wp_set_script_translations( 'wplusui-editor', 'wplus-ui', WPLUSUI_DIR . '/languages' );

	$classes = array();
	foreach ( wplusui_block_style_map() as $block => $styles ) {
		foreach ( $styles as $name => $row ) {
			$classes[ $block ][ 'is-style-' . $name ] = $row[1];
		}
	}
	wp_add_inline_script( 'wplusui-editor', 'window.wplusuiBlockClasses=' . wp_json_encode( $classes ) . ';', 'before' );
}
add_action( 'enqueue_block_editor_assets', 'wplusui_editor_assets' );

/**
 * Load the theme stylesheet inside the (iframed) editor canvas only; WordPress
 * scopes these rules to the editor content wrapper.
 */
function wplusui_editor_style() {
	$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
	add_theme_support( 'editor-styles' );
	add_editor_style( "assets/css/style{$min}.css" );
	if ( '' === $min ) {
		add_editor_style( 'assets/css/wp-extras.css' );
	}
}
add_action( 'after_setup_theme', 'wplusui_editor_style' );

/**
 * Block pattern category and patterns for the components.
 */
function wplusui_register_patterns() {
	register_block_pattern_category( 'wplus-ui', array( 'label' => __( 'WPlus UI', 'wplus-ui' ) ) );

	$para  = function ( $style, $html ) {
		return '<!-- wp:paragraph {"className":"is-style-' . $style . '"} --><p class="is-style-' . $style . '">' . $html . '</p><!-- /wp:paragraph -->';
	};
	$alert = function ( $style, $title ) {
		return '<!-- wp:group {"className":"is-style-' . $style . '"} --><div class="wp-block-group is-style-' . $style . '"><!-- wp:paragraph --><p><strong>' . $title . '</strong> ' . esc_html__( 'Your message goes here.', 'wplus-ui' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:group -->';
	};
	$li    = function ( $t ) {
		return '<!-- wp:list-item --><li>' . $t . '</li><!-- /wp:list-item -->';
	};
	$det   = function ( $style, $summary ) {
		return '<!-- wp:details {"className":"is-style-' . $style . '"} --><details class="wp-block-details is-style-' . $style . '"><summary>' . $summary . '</summary><!-- wp:paragraph --><p>' . esc_html__( 'Your text goes here.', 'wplus-ui' ) . '</p><!-- /wp:paragraph --></details><!-- /wp:details -->';
	};

	$patterns = array(
		'note'         => array( __( 'Note', 'wplus-ui' ), $para( 'note', '<strong>' . esc_html__( 'Info!', 'wplus-ui' ) . '</strong><br>' . esc_html__( 'Your note goes here.', 'wplus-ui' ) ) ),
		'note-warning' => array( __( 'Warning note', 'wplus-ui' ), $para( 'note-warning', '<strong>' . esc_html__( 'Warning!', 'wplus-ui' ) . '</strong><br>' . esc_html__( 'Your warning goes here.', 'wplus-ui' ) ) ),
		'alerts'       => array(
			__( 'Alerts', 'wplus-ui' ),
			$alert( 'alert-info', esc_html__( 'Info', 'wplus-ui' ) ) . $alert( 'alert-success', esc_html__( 'Success', 'wplus-ui' ) ) . $alert( 'alert-warning', esc_html__( 'Warning', 'wplus-ui' ) ) . $alert( 'alert-error', esc_html__( 'Error', 'wplus-ui' ) ),
		),
		'steps'        => array(
			__( 'Steps', 'wplus-ui' ),
			'<!-- wp:list {"ordered":true,"className":"is-style-steps"} --><ol class="wp-block-list is-style-steps">' . $li( esc_html__( 'First step', 'wplus-ui' ) ) . $li( esc_html__( 'Second step', 'wplus-ui' ) ) . $li( esc_html__( 'Third step', 'wplus-ui' ) ) . '</ol><!-- /wp:list -->',
		),
		'accordion'    => array( __( 'Accordion', 'wplus-ui' ), $det( 'accordion', esc_html__( 'Question or title', 'wplus-ui' ) ) ),
		'spoiler'      => array( __( 'Spoiler', 'wplus-ui' ), $det( 'spoiler', esc_html__( 'Spoiler:', 'wplus-ui' ) ) ),
		'buttons'      => array(
			__( 'Buttons', 'wplus-ui' ),
			'<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#">' . esc_html__( 'Button text', 'wplus-ui' ) . '</a></div><!-- /wp:button --><!-- wp:button {"className":"is-style-outline"} --><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#">' . esc_html__( 'Outline button', 'wplus-ui' ) . '</a></div><!-- /wp:button --></div><!-- /wp:buttons -->',
		),
		'quotes'       => array(
			__( 'Quotes', 'wplus-ui' ),
			'<!-- wp:quote {"className":"is-style-quote-highlight"} --><blockquote class="wp-block-quote is-style-quote-highlight"><!-- wp:paragraph --><p>' . esc_html__( 'A highlighted quote.', 'wplus-ui' ) . '</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote --><!-- wp:quote {"className":"is-style-quote-icon"} --><blockquote class="wp-block-quote is-style-quote-icon"><!-- wp:paragraph --><p>' . esc_html__( 'A quote with an icon.', 'wplus-ui' ) . '</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote -->',
		),
		'download'     => array(
			__( 'Download box', 'wplus-ui' ),
			'<!-- wp:html --><div class="dlBox"><span class="fT" data-text="zip"></span><div class="fN"><span>file_name.zip</span><span class="fS">200kb</span></div><a aria-label="' . esc_attr__( 'Download', 'wplus-ui' ) . '" class="button" href="#" rel="nofollow noreferrer noopener" target="_blank"><i class="icon dl"></i></a></div><!-- /wp:html -->',
		),
		'tabs'         => array(
			__( 'Tabs', 'wplus-ui' ),
			'<!-- wp:shortcode -->[pu_tabs][pu_tab title="' . esc_attr__( 'First', 'wplus-ui' ) . '"]' . esc_html__( 'First tab content', 'wplus-ui' ) . '[/pu_tab][pu_tab title="' . esc_attr__( 'Second', 'wplus-ui' ) . '"]' . esc_html__( 'Second tab content', 'wplus-ui' ) . '[/pu_tab][/pu_tabs]<!-- /wp:shortcode -->',
		),
	);

	foreach ( $patterns as $slug => $row ) {
		register_block_pattern(
			'wplus-ui/' . $slug,
			array(
				'title'      => $row[0],
				'categories' => array( 'wplus-ui' ),
				'content'    => $row[1],
			)
		);
	}
}
add_action( 'init', 'wplusui_register_patterns' );
