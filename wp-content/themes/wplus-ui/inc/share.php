<?php
/**
 * Share button settings: which networks appear in the quick buttons and in the
 * share popup, or hiding sharing completely.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once WPLUSUI_DIR . '/inc/share-networks.php';

/**
 * Whether sharing is enabled.
 *
 * @return bool
 */
function wplusui_share_enabled() {
	return (bool) get_theme_mod( 'wplusui_share_enabled', true );
}

/**
 * Networks for the three quick buttons, in order.
 *
 * @return string[]
 */
function wplusui_share_quick_networks() {
	$defaults = array( 'facebook', 'whatsapp', 'x' );
	$networks = wplusui_share_networks();
	$out      = array();
	foreach ( $defaults as $i => $default ) {
		$key = get_theme_mod( 'wplusui_share_quick_' . ( $i + 1 ), $default );
		if ( isset( $networks[ $key ] ) && ! in_array( $key, $out, true ) ) {
			$out[] = $key;
		}
	}
	return $out;
}

/**
 * Networks listed in the share popup.
 *
 * @return string[]
 */
function wplusui_share_popup_networks() {
	$out = array();
	foreach ( array_keys( wplusui_share_networks() ) as $key ) {
		if ( get_theme_mod( 'wplusui_share_popup_' . $key, true ) ) {
			$out[] = $key;
		}
	}
	return $out;
}

/**
 * Customizer controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_share_customize_register( $wp_customize ) {
	$networks = wplusui_share_networks();
	$choices  = array( '' => __( '— None —', 'wplus-ui' ) );
	foreach ( $networks as $key => $row ) {
		$choices[ $key ] = $row['label'];
	}

	$wp_customize->add_section(
		'wplusui_share',
		array(
			'title'    => __( 'WPlus UI: Sharing', 'wplus-ui' ),
			'priority' => 163,
		)
	);

	$wp_customize->add_setting(
		'wplusui_share_enabled',
		array(
			'default'           => true,
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
	$wp_customize->add_control(
		'wplusui_share_enabled',
		array(
			'label'   => __( 'Show share buttons on posts', 'wplus-ui' ),
			'section' => 'wplusui_share',
			'type'    => 'checkbox',
		)
	);

	$defaults = array( 'facebook', 'whatsapp', 'x' );
	foreach ( $defaults as $i => $default ) {
		$id = 'wplusui_share_quick_' . ( $i + 1 );
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $default,
				'sanitize_callback' => function ( $value ) use ( $networks ) {
					return isset( $networks[ $value ] ) ? $value : '';
				},
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				/* translators: %d: button number */
				'label'   => sprintf( __( 'Quick button %d', 'wplus-ui' ), $i + 1 ),
				'section' => 'wplusui_share',
				'type'    => 'select',
				'choices' => $choices,
			)
		);
	}

	foreach ( $networks as $key => $row ) {
		$id = 'wplusui_share_popup_' . $key;
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => true,
				'sanitize_callback' => 'rest_sanitize_boolean',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				/* translators: %s: network name */
				'label'   => sprintf( __( 'Popup: %s', 'wplus-ui' ), $row['label'] ),
				'section' => 'wplusui_share',
				'type'    => 'checkbox',
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_share_customize_register' );
