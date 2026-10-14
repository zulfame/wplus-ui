<?php
/**
 * Multilingual support (Polylang and WPML): the free-text Customizer strings
 * are registered for translation and translated when read.
 *
 * @package wplus-ui
 */

/**
 * Customizer text settings that visitors read.
 *
 * @return string[] Setting id => label.
 */
function wplusui_translatable_mods() {
	return array(
		'wplusui_notification_text'     => 'Notification text',
		'wplusui_notification_cta_text' => 'Notification button text',
		'wplusui_popular_title'         => 'Popular posts title',
		'wplusui_related_title'         => 'Related posts title',
	);
}

/**
 * Register the strings with Polylang.
 */
function wplusui_register_translatable_strings() {
	if ( ! function_exists( 'pll_register_string' ) ) {
		return;
	}
	foreach ( wplusui_translatable_mods() as $key => $label ) {
		$value = (string) get_theme_mod( $key, '' );
		if ( '' !== $value ) {
			pll_register_string( $label, $value, 'WPlus UI' );
		}
	}
}
add_action( 'init', 'wplusui_register_translatable_strings' );

/**
 * Translate a Customizer string through Polylang or WPML.
 *
 * @param mixed $value Stored value.
 * @return mixed
 */
function wplusui_translate_mod( $value ) {
	if ( ! is_string( $value ) || '' === $value || is_customize_preview() ) {
		return $value;
	}
	if ( function_exists( 'pll__' ) ) {
		return pll__( $value );
	}
	return apply_filters( 'wpml_translate_single_string', $value, 'WPlus UI', $value );
}
foreach ( array_keys( wplusui_translatable_mods() ) as $wplusui_mod_key ) {
	add_filter( 'theme_mod_' . $wplusui_mod_key, 'wplusui_translate_mod' );
}
unset( $wplusui_mod_key );
