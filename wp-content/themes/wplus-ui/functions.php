<?php
/**
 * WPlus UI theme bootstrap.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPLUSUI_VERSION', '1.7.3' );
define( 'WPLUSUI_DIR', get_template_directory() );
define( 'WPLUSUI_URI', get_template_directory_uri() );

/**
 * This theme's content is pre-formatted raw HTML (the component markup the
 * stylesheet targets), never plain text relying on WordPress to infer paragraph breaks. Leaving
 * wpautop() on actively corrupts it: it wraps loose top-level tags like
 * <input> in stray <p> tags and turns single newlines between tags into
 * <br>, which breaks the CSS adjacent-/general-sibling selectors several
 * components rely on (e.g. .inImg:not(:checked) + .hdImg .shImg, and the
 * .psImg flex-wrap image grids).
 */
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

require WPLUSUI_DIR . '/inc/nav-icon-library.php';
require WPLUSUI_DIR . '/inc/nav-icons.php';
require WPLUSUI_DIR . '/inc/class-wplusui-nav-walker.php';
require WPLUSUI_DIR . '/inc/template-tags.php';
require WPLUSUI_DIR . '/inc/customizer.php';
require WPLUSUI_DIR . '/inc/footer-options.php';
require WPLUSUI_DIR . '/inc/mobile-bar.php';
require WPLUSUI_DIR . '/inc/customizer-order.php';
require WPLUSUI_DIR . '/inc/json-data.php';
require WPLUSUI_DIR . '/inc/meta-boxes.php';
require WPLUSUI_DIR . '/inc/comments.php';
require WPLUSUI_DIR . '/inc/seo.php';
require WPLUSUI_DIR . '/inc/schema.php';
require WPLUSUI_DIR . '/inc/blocks.php';
require WPLUSUI_DIR . '/inc/custom-blocks.php';
require WPLUSUI_DIR . '/inc/ads.php';
require WPLUSUI_DIR . '/inc/share.php';
require WPLUSUI_DIR . '/inc/post-options.php';
require WPLUSUI_DIR . '/inc/content-options.php';
require WPLUSUI_DIR . '/inc/appearance.php';
require WPLUSUI_DIR . '/inc/media.php';
require WPLUSUI_DIR . '/inc/critical-css.php';
require WPLUSUI_DIR . '/inc/multilingual.php';
require WPLUSUI_DIR . '/inc/engagement.php';
require WPLUSUI_DIR . '/inc/cookie-notice.php';
require WPLUSUI_DIR . '/inc/updater.php';
require WPLUSUI_DIR . '/inc/coming-soon.php';
require WPLUSUI_DIR . '/inc/contact-form.php';
require WPLUSUI_DIR . '/inc/term-banner.php';
if ( class_exists( 'WooCommerce' ) ) {
	require WPLUSUI_DIR . '/inc/woocommerce.php';
}
if ( is_admin() ) {
	require WPLUSUI_DIR . '/inc/demo-setup.php';
}

/**
 * Theme setup: menus, thumbnails, HTML5, title-tag.
 */
function wplusui_setup() {
	load_theme_textdomain( 'wplus-ui', WPLUSUI_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 150,
			'width'       => 150,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'script', 'style' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support(
		'post-formats',
		array( 'gallery', 'video', 'quote', 'link' )
	);

	set_post_thumbnail_size( 600, 337, true );
	add_image_size( 'wplusui-square', 150, 150, true );

	register_nav_menus(
		array(
			'primary'    => __( 'Primary Menu (desktop + mobile drawer)', 'wplus-ui' ),
			'footer-1'   => __( 'Footer Column: Product', 'wplus-ui' ),
			'footer-2'   => __( 'Footer Column: Resources', 'wplus-ui' ),
			'footer-3'   => __( 'Footer Column: Support', 'wplus-ui' ),
			'footer-4'   => __( 'Footer Column: Company', 'wplus-ui' ),
			'quicklinks' => __( 'Under-header Quick Links', 'wplus-ui' ),
		)
	);
}
add_action( 'after_setup_theme', 'wplusui_setup' );

/**
 * Version string for an asset: the file's modification time, so a browser fetches the file again as soon as it
 * changes (a fixed theme version would keep serving the cached old file after an edit or an update).
 *
 * @param string $relative_path Path inside the theme, for example 'assets/css/style.min.css'.
 * @return string
 */
function wplusui_asset_version( $relative_path ) {
	$file = WPLUSUI_DIR . '/' . ltrim( $relative_path, '/' );
	return is_readable( $file ) ? WPLUSUI_VERSION . '.' . filemtime( $file ) : WPLUSUI_VERSION;
}

/**
 * Enqueue the theme's compiled CSS/JS bundles. The minified builds
 * (`npm run build`) are used unless SCRIPT_DEBUG is on.
 */
function wplusui_scripts() {
	$min = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_style( 'wplusui-style', WPLUSUI_URI . "/assets/css/style{$min}.css", array(), wplusui_asset_version( "assets/css/style{$min}.css" ) );
	if ( '' === $min ) {
		wp_enqueue_style( 'wplusui-wp-extras', WPLUSUI_URI . '/assets/css/wp-extras.css', array( 'wplusui-style' ), wplusui_asset_version( 'assets/css/wp-extras.css' ) );
	} else {
		// The minified bundle already contains wp-extras.css; keep the handle for inline styles and child themes.
		wp_register_style( 'wplusui-wp-extras', false, array( 'wplusui-style' ), WPLUSUI_VERSION );
		wp_enqueue_style( 'wplusui-wp-extras' );
	}
	wp_enqueue_script( 'wplusui-script', WPLUSUI_URI . "/assets/js/script{$min}.js", array(), wplusui_asset_version( "assets/js/script{$min}.js" ), true );
	wp_enqueue_script(
		'wplusui-nav-flyout',
		WPLUSUI_URI . '/assets/js/nav-flyout.js',
		array(),
		WPLUSUI_VERSION,
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);

	// The runtime's "is the visitor an admin?" check came from the original Blogger
	// edition and is meaningless on WordPress (it also blocks the <html> iUs/lgT
	// state classes until it resolves), so pre-seed the cached answer without
	// touching any saved theme/scheme.
	// The same check injects a remote stylesheet; answer that request locally (as
	// "loaded") so no request leaves the site.
	wp_add_inline_script(
		'wplusui-script',
		'(function(){var b=function(n){return n&&n.tagName==="LINK"&&/blogger\\.com\\/dyn-css\\//.test(n.href||"");},f=function(n){setTimeout(function(){n.dispatchEvent(new Event("load"))},0);return n;},a=Node.prototype.appendChild,i=Element.prototype.insertAdjacentElement,o=Node.prototype.insertBefore;Node.prototype.appendChild=function(n){return b(n)?f(n):a.call(this,n);};Node.prototype.insertBefore=function(n,r){return b(n)?f(n):o.call(this,n,r);};Element.prototype.insertAdjacentElement=function(p,n){return b(n)?f(n):i.call(this,p,n);};})();',
		'before'
	);
	wp_add_inline_script(
		'wplusui-script',
		'try{var k="WPLUS_UI_STORAGE",v=JSON.parse(localStorage.getItem(k)||"null")||{state:{},version:0};v.state=v.state||{};if(typeof v.state.isAdmin!=="boolean"){v.state.isAdmin=false;localStorage.setItem(k,JSON.stringify(v));}}catch(e){}',
		'before'
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'wplusui_scripts' );

/**
 * Widget areas. The 4 footer columns replace the theme's static
 * "Product / Resources / Support / Company" link lists; the sidebar
 * replaces the Popular Posts + Labels widgets seen in the demo.
 */
function wplusui_widgets_init() {
	$footer_areas = array(
		'footer-1' => __( 'Footer Column 1 (Product)', 'wplus-ui' ),
		'footer-2' => __( 'Footer Column 2 (Resources)', 'wplus-ui' ),
		'footer-3' => __( 'Footer Column 3 (Support)', 'wplus-ui' ),
		'footer-4' => __( 'Footer Column 4 (Company)', 'wplus-ui' ),
	);
	foreach ( $footer_areas as $id => $name ) {
		register_sidebar(
			array(
				'id'            => $id,
				'name'          => $name,
				'before_widget' => '<div class="widget %2$s" id="%1$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="title">',
				'after_title'   => '</h3>',
			)
		);
	}

	register_sidebar(
		array(
			'id'            => 'sidebar-1',
			'name'          => __( 'Blog Sidebar (below Popular Posts / Labels)', 'wplus-ui' ),
			'before_widget' => '<div class="widget %2$s" id="%1$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="title dt">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'wplusui_widgets_init' );

/**
 * Whether cards, lists and components are drawn in boxes (the original template's "Box Design").
 *
 * @return bool
 */
function wplusui_box_design() {
	return (bool) get_theme_mod( 'wplusui_box_design', false );
}

/**
 * Body classes matching the theme's own bD/onId/onIt/onPs/... convention
 * , so assets/css/style.css rules key
 * off the same selectors as the original static rebuild.
 *
 * @param string[] $classes Body classes.
 * @return string[]
 */
function wplusui_body_classes( $classes ) {
	$classes[] = wplusui_box_design() ? 'bX' : 'bD';
	$classes[] = 'Ltr';
	$classes[] = 'MN-3';

	if ( is_front_page() || ( is_home() && ! is_category() ) ) {
		$classes[] = 'onId';
		$classes[] = 'onHm';
		if ( wplusui_show_sidebar( 'home' ) ) {
			$classes[] = 'hsSb';
		}
	} elseif ( is_singular( 'post' ) ) {
		$classes[] = 'onIt';
		$classes[] = 'onPs';
		if ( wplusui_show_sidebar( 'single' ) ) {
			$classes[] = 'hsSb';
		}
	} elseif ( is_page() ) {
		$classes[] = 'onIt';
		$classes[] = 'onPg';
	} elseif ( is_category() || is_tag() || is_tax() || is_archive() || is_search() || is_home() ) {
		$classes[] = 'onId';
		$classes[] = 'onMt';
		if ( is_search() && wplusui_show_sidebar( 'search' ) ) {
			$classes[] = 'hsSb';
		}
	} elseif ( is_404() ) {
		$classes[] = 'on404';
	}

	return $classes;
}
add_filter( 'body_class', 'wplusui_body_classes' );

/**
 * Set the content width.
 */
function wplusui_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'wplusui_content_width', 1080 );
}
add_action( 'after_setup_theme', 'wplusui_content_width', 0 );

/**
 * "Featured"/pinned post used for the homepage carousel + Pinned Post box —
 * defaults to the theme's own "featured" tag; falls back to the latest posts
 * when nothing is tagged yet so a fresh install doesn't show empty markup.
 *
 * @param int $count Number of posts.
 * @return WP_Query
 */
function wplusui_get_carousel_posts( $count = 5 ) {
	$query = new WP_Query(
		array(
			'post_type'           => 'post',
			'posts_per_page'      => $count,
			'tag'                 => 'featured',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		)
	);

	if ( ! $query->have_posts() ) {
		wp_reset_postdata();
		$query = new WP_Query(
			array(
				'post_type'           => 'post',
				'posts_per_page'      => $count,
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			)
		);
	}

	return $query;
}

/**
 * The sticky post shown in the Pinned Post box.
 *
 * @return WP_Query
 */
function wplusui_get_pinned_post() {
	$sticky = get_option( 'sticky_posts' );
	if ( ! empty( $sticky ) ) {
		$query = new WP_Query(
			array(
				'post_type'           => 'post',
				'post__in'            => $sticky,
				'posts_per_page'      => 1,
				'ignore_sticky_posts' => true, // Otherwise WordPress puts every sticky post in front and the box shows all of them.
				'no_found_rows'       => true,
			)
		);
		if ( $query->have_posts() ) {
			return $query;
		}
	}
	return false;
}

/**
 * Popular Posts: most viewed first (the theme counts single-post views), then
 * most commented, newest as tiebreak.
 *
 * @param int    $count Number of posts.
 * @param int[]  $exclude Post IDs to skip.
 * @param string $order views, comments or recent.
 * @return WP_Query
 */
function wplusui_get_popular_posts( $count = 5, $exclude = array(), $order = 'views' ) {
	$args = array(
		'post_type'           => 'post',
		'posts_per_page'      => $count,
		'post__not_in'        => $exclude,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);
	if ( 'recent' === $order ) {
		$args['orderby'] = 'date';
	} elseif ( 'comments' === $order ) {
		$args['orderby'] = array(
			'comment_count' => 'DESC',
			'date'          => 'DESC',
		);
	} else {
		$args['meta_query'] = array(
			'relation'     => 'OR',
			'views_clause' => array(
				'key'     => 'wplusui_views',
				'type'    => 'NUMERIC',
				'compare' => 'EXISTS',
			),
			array(
				'key'     => 'wplusui_views',
				'compare' => 'NOT EXISTS',
			),
		);
		$args['orderby']    = array(
			'views_clause'  => 'DESC',
			'comment_count' => 'DESC',
			'date'          => 'DESC',
		);
	}
	return new WP_Query( $args );
}

/**
 * Counts a view for each single-post request (skips previews and crawlers) —
 * Popular Posts ranks by this, then by comment count.
 */
function wplusui_count_post_view() {
	if ( ! is_singular( 'post' ) || is_preview() || is_user_logged_in() ) {
		return;
	}
	$ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';
	if ( '' === $ua || preg_match( '/bot|crawl|spider|slurp|preview/i', $ua ) ) {
		return;
	}
	$id = get_queried_object_id();
	update_post_meta( $id, 'wplusui_views', (int) get_post_meta( $id, 'wplusui_views', true ) + 1 );
}
add_action( 'template_redirect', 'wplusui_count_post_view' );

/**
 * Related posts: shares a category with the current post, newest first.
 *
 * @param int $post_id Current post ID.
 * @param int $count Number of posts.
 * @return WP_Query|false
 */
function wplusui_get_related_posts( $post_id, $count = 6 ) {
	$categories = wp_get_post_categories( $post_id );
	if ( empty( $categories ) ) {
		return false;
	}
	return new WP_Query(
		array(
			'post_type'           => 'post',
			'posts_per_page'      => $count,
			'category__in'        => $categories,
			'post__not_in'        => array( $post_id ),
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		)
	);
}

/**
 * Reading time estimate shown in the post header (assets/js/script.js also
 * computes/animates this client-side; this is the server-rendered fallback).
 *
 * @param int $post_id Post ID.
 * @return int
 */
function wplusui_reading_time( $post_id ) {
	$content    = get_post_field( 'post_content', $post_id );
	$word_count = str_word_count( wp_strip_all_tags( strip_shortcodes( $content ) ) );
	return max( 1, (int) ceil( $word_count / 200 ) );
}

/**
 * The sticky post is shown in the "Pinned Post" box, so keep it out of the
 * main grid (and stop WordPress from prepending it on top of the page size).
 *
 * @param WP_Query $query Query.
 */
function wplusui_exclude_pinned_from_home( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_home() ) {
		return;
	}
	$sticky = get_option( 'sticky_posts' );
	$query->set( 'ignore_sticky_posts', true );
	if ( $sticky ) {
		$query->set( 'post__not_in', array_map( 'absint', $sticky ) );
	}
}
add_action( 'pre_get_posts', 'wplusui_exclude_pinned_from_home' );

/**
 * Label/category archives list every post on one page, like the original
 * (the blog widget uses a larger max-results on archive pages).
 *
 * @param WP_Query $query Query.
 */
function wplusui_archive_page_size( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_category() ) {
		return;
	}
	$query->set( 'posts_per_page', (int) apply_filters( 'wplusui_archive_posts_per_page', 16 ) );
}
add_action( 'pre_get_posts', 'wplusui_archive_page_size' );

/**
 * The runtime script asks the home URL for a "lazy content" block on
 * every page view (?view=x-content-lazy). WordPress has no such block, so
 * answer with an empty document instead of rendering the whole page again.
 */
function wplusui_empty_lazy_view() {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	if ( isset( $_GET['view'] ) && 'x-content-lazy' === sanitize_key( wp_unslash( $_GET['view'] ) ) ) {
		nocache_headers();
		status_header( 200 );
		header( 'Content-Type: text/html; charset=utf-8' );
		exit;
	}
}
add_action( 'template_redirect', 'wplusui_empty_lazy_view', 0 );
