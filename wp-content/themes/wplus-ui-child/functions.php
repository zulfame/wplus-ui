<?php
/**
 * WPlus UI Child theme.
 *
 * @package wplus-ui-child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load this theme's stylesheet after the parent theme's styles.
 */
function wplusui_child_enqueue_styles() {
	wp_enqueue_style(
		'wplusui-child-style',
		get_stylesheet_uri(),
		array( 'wplusui-wp-extras' ),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'wplusui_child_enqueue_styles', 30 );

/**
 * WordPress keeps Customizer settings per theme (it only carries menus and widgets
 * over). On the first activation of the child theme, copy the parent's settings so
 * the site looks the same; settings already set on the child win.
 */
function wplusui_child_copy_parent_mods() {
	if ( get_option( 'wplusui_child_mods_copied' ) ) {
		return;
	}
	$parent_mods = get_option( 'theme_mods_' . get_option( 'template' ) );
	if ( is_array( $parent_mods ) ) {
		$child_mods = (array) get_option( 'theme_mods_' . get_option( 'stylesheet' ) );
		update_option( 'theme_mods_' . get_option( 'stylesheet' ), $child_mods + $parent_mods );
	}
	update_option( 'wplusui_child_mods_copied', 1 );
}
add_action( 'after_switch_theme', 'wplusui_child_copy_parent_mods' );
