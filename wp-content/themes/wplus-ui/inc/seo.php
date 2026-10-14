<?php
/**
 * Basic SEO and sharing tags: meta description, Open Graph, Twitter card and a
 * fallback favicon. Skipped entirely when a dedicated SEO plugin is active.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether a known SEO plugin already prints these tags.
 *
 * @return bool
 */
function wplusui_seo_plugin_active() {
	$active = defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' ) || defined( 'THE_SEO_FRAMEWORK_VERSION' );
	return (bool) apply_filters( 'wplusui_seo_plugin_active', $active );
}

/**
 * Description for the current request.
 *
 * @return string
 */
function wplusui_meta_description() {
	$text = '';
	if ( is_singular() ) {
		$post = get_queried_object();
		$text = has_excerpt( $post ) ? wp_strip_all_tags( $post->post_excerpt ) : wp_strip_all_tags( strip_shortcodes( $post->post_content ) );
	} elseif ( is_category() || is_tag() || is_tax() ) {
		$text = term_description();
	} elseif ( is_front_page() || is_home() ) {
		$text = get_bloginfo( 'description' );
	}
	$text = trim( preg_replace( '/\s+/', ' ', wp_strip_all_tags( $text ) ) );
	return wp_trim_words( $text, 30, '…' );
}

/**
 * Print description, Open Graph and Twitter tags.
 */
function wplusui_meta_tags() {
	if ( wplusui_seo_plugin_active() || is_404() ) {
		return;
	}
	$desc  = wplusui_meta_description();
	$title = wp_get_document_title();
	if ( is_singular() ) {
		$url = get_permalink();
	} elseif ( is_category() || is_tag() || is_tax() ) {
		$url = get_term_link( get_queried_object() );
	} elseif ( is_front_page() || is_home() ) {
		$url = home_url( '/' );
	} else {
		$url = get_pagenum_link( 1 ); // Search, author and date archives: their own address, not the home page.
	}
	$image = '';
	if ( is_singular() && has_post_thumbnail() ) {
		$image = get_the_post_thumbnail_url( null, 'large' );
	} elseif ( has_custom_logo() ) {
		$image = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
	}

	if ( $desc ) {
		echo '<meta name="description" content="' . esc_attr( $desc ) . '" />' . "\n";
	}
	echo '<meta property="og:type" content="' . esc_attr( is_singular( 'post' ) ? 'article' : 'website' ) . '" />' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
	if ( $desc ) {
		echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
	}
	if ( ! is_wp_error( $url ) ) {
		echo '<meta property="og:url" content="' . esc_url( $url ) . '" />' . "\n";
	}
	if ( $image ) {
		echo '<meta property="og:image" content="' . esc_url( $image ) . '" />' . "\n";
	}
	echo '<meta name="twitter:card" content="' . esc_attr( $image ? 'summary_large_image' : 'summary' ) . '" />' . "\n";
}
add_action( 'wp_head', 'wplusui_meta_tags', 2 );

/**
 * Fallback favicon (the theme logo) so browsers do not request /favicon.ico.
 */
function wplusui_fallback_icon() {
	if ( has_site_icon() ) {
		return;
	}
	echo '<link rel="icon" href="' . esc_url( WPLUSUI_URI . '/assets/images/wplus-ui-logo-square.png' ) . '" type="image/png" />' . "\n";
}
add_action( 'wp_head', 'wplusui_fallback_icon', 3 );

/**
 * Preload the first carousel image (the largest contentful paint on the home page).
 */
function wplusui_preload_lcp_image() {
	if ( ! is_front_page() || is_paged() || ! get_theme_mod( 'wplusui_carousel_enabled', true ) ) {
		return;
	}
	$slides = wplusui_get_carousel_slides();
	if ( empty( $slides[0]['thumb_id'] ) ) {
		return;
	}
	$id     = (int) $slides[0]['thumb_id'];
	$src    = wp_get_attachment_image_src( $id, 'large' );
	$srcset = wp_get_attachment_image_srcset( $id, 'large' );
	if ( ! $src ) {
		return;
	}
	echo '<link rel="preload" as="image" href="' . esc_url( $src[0] ) . '"';
	if ( $srcset ) {
		echo ' imagesrcset="' . esc_attr( $srcset ) . '" imagesizes="(max-width: 896px) 100vw, 822px"';
	}
	echo ' fetchpriority="high" />' . "\n";
}
add_action( 'wp_head', 'wplusui_preload_lcp_image', 1 );
