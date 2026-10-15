<?php
/**
 * Finishes the WPlus UI demo import. Run AFTER importing the XML:
 *
 *   wp import wp-content/themes/wplus-ui/demo-content/wplus-ui-demo-content.xml --authors=create
 *   wp eval-file wp-content/themes/wplus-ui/demo-content/import-demo.php
 *
 * What it does: attaches the bundled images as featured images, re-points the
 * placeholder URL in content/menus to this site, assigns menus, widgets and
 * Customizer settings, pins the sticky post and tags the carousel posts.
 * Safe to run more than once.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

$dir = __DIR__ . '/images/';
$map = array(
	'ui-components-and-typography'      => array( 'ui-components-and-typography.png', array( 'featured' ), true ),
	'getting-started-and-installation'  => array( 'getting-started-and-installation.png', array( 'featured' ) ),
	'basic-setup-and-guidelines'        => array( 'basic-setup-and-guidelines.png', array( 'featured' ) ),
	'appearance-and-customization'      => array( 'appearance-and-customization.png' ),
	'navigation-menu-customization'     => array( 'navigation-menu-customization.png' ),
	'comment-settings-and-integrations' => array( 'comment-settings-and-integrations.png' ),
	'pagination-settings'               => array( 'pagination-settings.png' ),
	'google-adsense-documentation'      => array( 'google-adsense-documentation.png' ),
	'google-analytics-documentation'    => array( 'google-analytics-documentation.png' ),
	'google-translate-documentation'    => array( 'google-translate-documentation.png' ),
	'pwa-plugin-documentation'          => array( 'pwa-plugin-documentation.png' ),
	'firebase-configurations'           => array( 'firebase-configurations.png' ),
	'safelink-redirects'                => array( 'eren-yeager.png' ),
	'tabs-post'                         => array( 'eren-yeager.png', array( 'featured' ) ),
	'split-post'                        => array( 'eren-yeager.png', array( 'featured' ) ),
	'product-post'                      => array( 'HP_Pavilion.jpg' ),
	'resources-roundup'                 => array( 'frosty-pine-cones.webp' ),
	'sponsored-post-example'            => array( 'colorful-spider-fantasy.webp' ),
	'fullpage-layout-example'           => array( 'urban-basketball-game.webp' ),
	'about-2'                           => array( 'about.png' ),
);

function wplusui_demo_attachment( $dir, $file ) {
	static $cache = array();
	if ( isset( $cache[ $file ] ) ) {
		return $cache[ $file ];
	}
	$title    = sanitize_title( pathinfo( $file, PATHINFO_FILENAME ) );
	$existing = get_posts(
		array(
			'post_type'   => 'attachment',
			'meta_key'    => '_wplusui_demo_file',
			'meta_value'  => $file,
			'numberposts' => 1,
			'post_status' => 'inherit',
		)
	);
	if ( $existing ) {
		return $cache[ $file ] = $existing[0]->ID;
	}
	// A site that already has this image (same name, any extension: WebP conversion renames it) keeps it instead of getting a copy.
	global $wpdb;
	$found = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s LIMIT 1", '%/' . $wpdb->esc_like( pathinfo( $file, PATHINFO_FILENAME ) ) . '.%' ) );
	if ( $found ) {
		update_post_meta( (int) $found, '_wplusui_demo_file', $file );
		return $cache[ $file ] = (int) $found;
	}
	if ( ! file_exists( $dir . $file ) ) {
		return 0;
	}
	$tmp = wp_tempnam( $file );
	copy( $dir . $file, $tmp );
	$id = media_handle_sideload(
		array(
			'name'     => $file,
			'tmp_name' => $tmp,
		),
		0,
		$title
	);
	if ( is_wp_error( $id ) ) {
		return $cache[ $file ] = 0;
	}
	update_post_meta( $id, '_wplusui_demo_file', $file );
	return $cache[ $file ] = $id;
}

$sticky = array();
foreach ( $map as $slug => $row ) {
	$posts = get_posts(
		array(
			'name'        => $slug,
			'post_type'   => array( 'post', 'page' ),
			'numberposts' => 1,
			'post_status' => 'any',
		)
	);
	if ( ! $posts ) {
		continue;
	}
	$id  = $posts[0]->ID;
	$att = wplusui_demo_attachment( $dir, $row[0] );
	if ( $att ) {
		set_post_thumbnail( $id, $att );
	}
	if ( ! empty( $row[1] ) ) {
		wp_set_post_tags( $id, $row[1], true );
	}
	if ( ! empty( $row[2] ) ) {
		$sticky[] = $id;
	}
}
update_option( 'sticky_posts', $sticky );

// Popular Posts ranking (the theme counts real views; these are starting values).
$views = array(
	'ui-components-and-typography'      => 500,
	'getting-started-and-installation'  => 450,
	'basic-setup-and-guidelines'        => 400,
	'comment-settings-and-integrations' => 350,
	'navigation-menu-customization'     => 300,
	'appearance-and-customization'      => 250,
	'pagination-settings'               => 200,
	'google-adsense-documentation'      => 150,
	'google-analytics-documentation'    => 120,
);
foreach ( $views as $slug => $n ) {
	$p = get_posts(
		array(
			'name'        => $slug,
			'post_type'   => 'post',
			'numberposts' => 1,
		)
	);
	if ( $p ) {
		update_post_meta( $p[0]->ID, 'wplusui_views', $n );
	}
}

// Remove WordPress' default sample content.
foreach ( array(
	'hello-world' => 'post',
	'sample-page' => 'page',
) as $slug => $type ) {
	$p = get_posts(
		array(
			'name'        => $slug,
			'post_type'   => $type,
			'numberposts' => 1,
		)
	);
	if ( $p ) {
		wp_delete_post( $p[0]->ID, true );
	}
}

// Placeholder host -> this site (content, excerpts, menu item URLs).
global $wpdb;
// The demo posts point some pictures (the galleries) at the theme folder; the theme no longer carries them, so they
// become media-library files and the posts get their addresses.
foreach ( $wpdb->get_col( "SELECT post_content FROM {$wpdb->posts} WHERE post_type IN ('post','page') AND post_content LIKE '%/assets/images/%'" ) as $content ) {
	if ( preg_match_all( '#/wp-content/themes/[A-Za-z0-9_-]+/assets/images/([A-Za-z0-9._-]+\.(?:jpe?g|png|webp))#', $content, $found, PREG_SET_ORDER ) ) {
		foreach ( $found as $hit ) {
			$att_id = wplusui_demo_attachment( $dir, $hit[1] );
			$url    = $att_id ? wp_get_attachment_url( $att_id ) : '';
			if ( $url ) {
				$wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->posts} SET post_content = REPLACE(post_content, %s, %s) WHERE post_type IN ('post','page')", $hit[0], wp_make_link_relative( $url ) ) );
			}
		}
	}
}

$home = untrailingslashit( home_url() );
$wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->posts} SET post_content = REPLACE(post_content, %s, %s), post_excerpt = REPLACE(post_excerpt, %s, %s)", 'https://wplusui-demo.invalid', $home, 'https://wplusui-demo.invalid', $home ) );
$wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->postmeta} SET meta_value = REPLACE(meta_value, %s, %s) WHERE meta_key = '_menu_item_url'", 'https://wplusui-demo.invalid', $home ) );

// Site settings.
update_option( 'blogname', 'WPlus UI Demo' );
update_option( 'blogdescription', 'WPlus UI is a modern responsive WordPress theme which provides a set of useful features.' );
update_option( 'posts_per_page', 6 );
update_option( 'show_on_front', 'posts' );

// Menus.
$locations = array();
foreach ( array(
	'Primary Menu' => 'primary',
	'Quick Links'  => 'quicklinks',
) as $name => $loc ) {
	$menu = wp_get_nav_menu_object( $name );
	if ( $menu ) {
		$locations[ $loc ] = $menu->term_id;
	}
}
set_theme_mod( 'nav_menu_locations', $locations );


// "Documentation" quick link (category items are not carried by the XML import).
$ql  = wp_get_nav_menu_object( 'Quick Links' );
$doc = get_category_by_slug( 'documentation' );
if ( $ql && $doc ) {
	$has = false;
	$its = wp_get_nav_menu_items( $ql->term_id );
	foreach ( (array) $its as $it ) {
		if ( 'category' === $it->object && (int) $it->object_id === (int) $doc->term_id ) {
			$has = true;
		}
	}
	if ( ! $has ) {
		foreach ( (array) $its as $it ) {
			wp_update_post(
				array(
					'ID'         => $it->ID,
					'menu_order' => $it->menu_order + 1,
				)
			);
		}
		wp_update_nav_menu_item(
			$ql->term_id,
			0,
			array(
				'menu-item-type'      => 'taxonomy',
				'menu-item-object'    => 'category',
				'menu-item-object-id' => $doc->term_id,
				'menu-item-status'    => 'publish',
				'menu-item-position'  => 1,
			)
		);
	}
}

// Customizer.
$about = get_page_by_path( 'about-2' );
$logo  = wplusui_demo_attachment( $dir, 'wplus-ui-logo-square.png' );
if ( $logo ) {
	set_theme_mod( 'custom_logo', $logo );
}
// Contact page (with a Contact Form 7 form when that plugin is active); the "Contact" menu item points to it.
if ( function_exists( 'wplusui_create_contact_page' ) ) {
	$contact_page = wplusui_create_contact_page();
	$primary_menu = get_nav_menu_locations()['primary'] ?? 0;
	if ( $contact_page && $primary_menu ) {
		foreach ( (array) wp_get_nav_menu_items( $primary_menu ) as $menu_item ) {
			if ( 'Contact' === $menu_item->title && in_array( trim( $menu_item->url ), array( '', '#' ), true ) ) {
				update_post_meta( $menu_item->ID, '_menu_item_url', get_permalink( $contact_page ) );
			}
		}
	}
}

// Placeholder links so the footer and drawer show the six demo social icons.
foreach ( array( 'facebook', 'instagram', 'twitter', 'threads', 'bluesky', 'whatsapp' ) as $network ) {
	set_theme_mod( 'wplusui_social_' . $network, '#' );
}
set_theme_mod( 'wplusui_notification_text', 'Notification texts go here... <a href="#">Link</a>' );
set_theme_mod( 'wplusui_notification_cta_text', 'Reach out!' );
set_theme_mod( 'wplusui_notification_cta_url', $about ? get_permalink( $about ) : '' );
set_theme_mod( 'wplusui_footer_about', 'WPlus UI is a sleek, modern, and fully responsive WordPress theme designed to provide an exceptional user experience across all devices.' );
set_theme_mod( 'wplusui_home_categories', 'documentation,product' );
// A second import adds every menu item again; keep one copy.
if ( function_exists( 'wplusui_demo_remove_duplicate_menu_items' ) ) {
	wplusui_demo_remove_duplicate_menu_items();
}

// Each ad slot shows a picture placeholder of the recommended size (an empty slot would not show at all).
foreach ( wplusui_ad_slot_sizes() as $slot => $size ) {
	set_theme_mod( 'wplusui_ad_' . $slot, sprintf( '<img src="https://placehold.co/%1$dx%2$d?text=Ad+%1$dx%2$d" width="%1$d" height="%2$d" alt="Ad space %1$d x %2$d">', $size[0], $size[1] ) );
}

// Documentation category banner.
$doc = get_category_by_slug( 'documentation' );
if ( $doc ) {
	wp_update_term( $doc->term_id, 'category', array( 'description' => 'Browse all posts related to documentation, including guides, references, tutorials, and other helpful resources.' ) );
	$banner = wplusui_demo_attachment( $dir, 'HP_Pavilion.jpg' );
	if ( $banner ) {
		update_term_meta( $doc->term_id, 'wplusui_banner_image_id', $banner );
	}
}

// Footer columns (four text widgets).
$cols     = array(
	'footer-1' => array( 'Product', array( 'Design', 'Development', 'Enterprise', 'Templates' ) ),
	'footer-2' => array( 'Resources', array( 'Community', 'Forum', 'Inspiration', 'Blog' ) ),
	'footer-3' => array( 'Support', array( 'Contact', 'Documentation', 'Donate' ) ),
	'footer-4' => array( 'Company', array( 'About', 'Contact', 'Sitemap', 'Careers' ) ),
);
$widgets  = array( '_multiwidget' => 1 );
$sidebars = (array) get_option( 'sidebars_widgets', array() );
$n        = 1;
foreach ( $cols as $area => $col ) {
	$items = '';
	foreach ( $col[1] as $label ) {
		$items .= '<li><a href="#">' . $label . '</a></li>';
	}
	$widgets[ $n ]     = array(
		'title'  => $col[0],
		'text'   => '<ul>' . $items . '</ul>',
		'filter' => false,
	);
	$sidebars[ $area ] = array( 'text-' . $n );
	++$n;
}
// A fresh WordPress install fills the blog sidebar with its default widgets
// (search, recent posts and comments, archives, categories); the demo layout has none.
if ( isset( $sidebars['sidebar-1'] ) && array( 'block-2', 'block-3', 'block-4', 'block-5', 'block-6' ) === $sidebars['sidebar-1'] ) {
	$sidebars['sidebar-1'] = array();
}
update_option( 'widget_text', $widgets );
update_option( 'sidebars_widgets', $sidebars );

flush_rewrite_rules();
echo "WPlus UI demo content is ready.\n";
