<?php
/**
 * WooCommerce support: theme declarations and shop styling. Loaded only when
 * WooCommerce is active; the shop pages render through woocommerce.php inside
 * the same static-page shell as page.php.
 *
 * @package wplus-ui
 */

/**
 * Declare WooCommerce features the theme supports.
 */
function wplusui_woocommerce_setup() {
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'wplusui_woocommerce_setup' );

/**
 * Shop styling that maps WooCommerce markup onto the theme tokens.
 */
function wplusui_woocommerce_styles() {
	wp_enqueue_style( 'wplusui-woocommerce', WPLUSUI_URI . '/assets/css/woocommerce.css', array( 'wplusui-style' ), wplusui_asset_version( 'assets/css/woocommerce.css' ) );
}
add_action( 'wp_enqueue_scripts', 'wplusui_woocommerce_styles', 20 );

/**
 * Shop pages use the static-page layout.
 *
 * @param string[] $classes Body classes.
 * @return string[]
 */
function wplusui_woocommerce_body_class( $classes ) {
	if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() ) ) {
		// Shop archives and products use the static-page layout, not the post-card grid.
		$classes   = array_diff( $classes, array( 'onId', 'onMt', 'onPs' ) );
		$classes[] = 'onIt';
		$classes[] = 'onPg';
		$classes[] = 'wplusui-shop';
	}
	return $classes;
}
add_filter( 'body_class', 'wplusui_woocommerce_body_class', 20 );
