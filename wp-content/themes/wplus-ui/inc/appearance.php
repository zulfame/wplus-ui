<?php
/**
 * Custom accent colors, button radius and Google Fonts from the Customizer.
 *
 * The stylesheet is driven by CSS variables, so the settings only override a
 * few of them on :root. Visitors who pick another color scheme keep that scheme.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Clean a Google Fonts family name.
 *
 * @param string $value Raw value.
 * @return string
 */
function wplusui_sanitize_font_name( $value ) {
	$value = trim( (string) $value );
	return preg_match( '/^[A-Za-z0-9 ]{1,60}$/', $value ) ? $value : '';
}

/**
 * Customizer controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_appearance_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_appearance',
		array(
			'title'       => __( 'WPlus UI: Colors and fonts', 'wplus-ui' ),
			'description' => __( 'Leave a field empty to keep the theme default. Visitors can still choose another color scheme.', 'wplus-ui' ),
			'priority'    => 165,
		)
	);

	foreach ( array(
		'wplusui_accent_light' => __( 'Accent color (light mode)', 'wplus-ui' ),
		'wplusui_accent_dark'  => __( 'Accent color (dark mode)', 'wplus-ui' ),
	) as $id => $label ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => '',
				'sanitize_callback' => 'sanitize_hex_color',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$id,
				array(
					'label'   => $label,
					'section' => 'wplusui_appearance',
				)
			)
		);
	}

	$wp_customize->add_setting(
		'wplusui_button_radius',
		array(
			'default'           => '',
			'sanitize_callback' => function ( $value ) {
				return '' === $value || null === $value ? '' : (string) min( 30, max( 0, absint( $value ) ) );
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_button_radius',
		array(
			'label'       => __( 'Button and link corner radius (px)', 'wplus-ui' ),
			'section'     => 'wplusui_appearance',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 0,
				'max' => 30,
			),
		)
	);

	foreach ( array(
		'wplusui_font_body'    => __( 'Body font (Google Fonts name)', 'wplus-ui' ),
		'wplusui_font_heading' => __( 'Heading font (Google Fonts name)', 'wplus-ui' ),
	) as $id => $label ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => '',
				'sanitize_callback' => 'wplusui_sanitize_font_name',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'       => $label,
				'description' => __( 'For example: Inter, Lora, Merriweather. Loaded from fonts.googleapis.com.', 'wplus-ui' ),
				'section'     => 'wplusui_appearance',
				'type'        => 'text',
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_appearance_customize_register' );

/**
 * Google Fonts stylesheet URL for the chosen families (empty if none).
 *
 * @return string
 */
function wplusui_google_fonts_url() {
	$families = array();
	foreach ( array( 'wplusui_font_body', 'wplusui_font_heading' ) as $mod ) {
		$name = wplusui_sanitize_font_name( get_theme_mod( $mod, '' ) );
		if ( '' !== $name ) {
			$families[ $name ] = 'family=' . str_replace( ' ', '+', $name ) . ':wght@400;500;600;700';
		}
	}
	if ( ! $families ) {
		return '';
	}
	return 'https://fonts.googleapis.com/css2?' . implode( '&', $families ) . '&display=swap';
}

/**
 * CSS overrides built from the settings.
 *
 * @return string
 */
function wplusui_custom_css() {
	$vars = array();

	$light = sanitize_hex_color( (string) get_theme_mod( 'wplusui_accent_light', '' ) );
	if ( $light ) {
		$vars[] = "--lLinkC:$light;--lLinkB:$light;--lStatusC:$light;";
	}
	$dark = sanitize_hex_color( (string) get_theme_mod( 'wplusui_accent_dark', '' ) );
	if ( $dark ) {
		$vars[] = "--darkL:$dark;";
	}
	$radius = get_theme_mod( 'wplusui_button_radius', '' );
	if ( '' !== $radius && null !== $radius ) {
		$vars[] = '--linkR:' . min( 30, absint( $radius ) ) . 'px;';
	}
	$body = wplusui_sanitize_font_name( get_theme_mod( 'wplusui_font_body', '' ) );
	if ( '' !== $body ) {
		$vars[] = '--fontB:"' . $body . '",var(--fontS);--fontBa:"' . $body . '",var(--fontS);';
	}
	$heading = wplusui_sanitize_font_name( get_theme_mod( 'wplusui_font_heading', '' ) );
	if ( '' !== $heading ) {
		$vars[] = '--fontH:"' . $heading . '",var(--fontS);';
	}

	$css = $vars ? ':root{' . implode( '', $vars ) . '}' : '';
	if ( '' !== $heading ) {
		// The post and page title uses the "alternate body" font in the stylesheet; it is a heading too.
		$css .= '.pTtl.itm{font-family:var(--fontH)}';
	}
	return $css;
}

/**
 * Attach the overrides and the font stylesheet.
 */
function wplusui_enqueue_appearance() {
	$url = wplusui_google_fonts_url();
	if ( $url ) {
		wp_enqueue_style( 'wplusui-google-fonts', $url, array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	}
	$css = wplusui_custom_css();
	if ( $css ) {
		wp_add_inline_style( 'wplusui-wp-extras', $css );
	}
}
add_action( 'wp_enqueue_scripts', 'wplusui_enqueue_appearance', 20 );
