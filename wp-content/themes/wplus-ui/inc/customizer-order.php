<?php
/**
 * Order of the Customizer: the WPlus UI sections follow the structure of the theme, top to bottom
 * of a page (look and feel, header and menus, homepage, posts, sidebar, sharing, footer), then
 * the extras (ads, engagement) and last the advanced code. Controls keep their setting IDs;
 * only their section and position change, so saved settings are not affected.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sections in order: id => array( title, description ). Priorities start after "Site Identity" (20)
 * and stay before the WordPress sections Menus (100) and Widgets (110).
 *
 * @return array<string,array{0:string,1:string}>
 */
function wplusui_customizer_sections() {
	return array(
		'wplusui_look'       => array( __( 'WPlus UI: Look and feel', 'wplus-ui' ), __( 'Colors, fonts and the general style of the theme. Visitors can still switch light/dark mode and pick another color scheme.', 'wplus-ui' ) ),
		'wplusui_header'     => array( __( 'WPlus UI: Header and menus', 'wplus-ui' ), __( 'The notification bar, the left menu and the mobile bottom bar. Create the menus themselves in Appearance > Menus.', 'wplus-ui' ) ),
		'wplusui_home'       => array( __( 'WPlus UI: Homepage', 'wplus-ui' ), __( 'What the front page shows, from top to bottom: carousel, pinned post, then the latest posts and category sections.', 'wplus-ui' ) ),
		'wplusui_posts'      => array( __( 'WPlus UI: Posts and comments', 'wplus-ui' ), __( 'What a single post shows around the article: table of contents, author box, related posts and comments.', 'wplus-ui' ) ),
		'wplusui_sidebar'    => array( __( 'WPlus UI: Sidebar', 'wplus-ui' ), __( 'Where the sidebar appears and how the Popular Posts box is built.', 'wplus-ui' ) ),
		'wplusui_share'      => array( __( 'WPlus UI: Sharing', 'wplus-ui' ), '' ),
		'wplusui_footer'     => array( __( 'WPlus UI: Footer', 'wplus-ui' ), __( 'The footer has an about block, four link columns, social icons and a copyright line.', 'wplus-ui' ) ),
		'wplusui_ads'        => array( __( 'WPlus UI: Ads', 'wplus-ui' ), __( 'Enter your AdSense publisher ID once, then fill the slots from the top of the page down: an ad unit number, AdSense code, any HTML, or an image address. Empty slots print nothing unless "Show ad placeholders" is ticked.', 'wplus-ui' ) ),
		'wplusui_engagement' => array( __( 'WPlus UI: Engagement', 'wplus-ui' ), __( 'Optional extras, all off by default: WhatsApp button, call-to-action popup, and the Coming Soon / Maintenance page.', 'wplus-ui' ) ),
		'wplusui_code'       => array( __( 'WPlus UI: Advanced code', 'wplus-ui' ), __( 'Code printed in the head and at the end of every page. For tracking and verification codes only.', 'wplus-ui' ) ),
	);
}

/**
 * Control => array( section, position ). Positions follow the order things appear on the page.
 *
 * @return array<string,array{0:string,1:int}>
 */
function wplusui_customizer_map() {
	$map = array(
		// Look and feel.
		'wplusui_default_mode'          => array( 'wplusui_look', 10 ),
		'wplusui_default_scheme'        => array( 'wplusui_look', 20 ),
		'wplusui_accent_light'          => array( 'wplusui_look', 30 ),
		'wplusui_accent_dark'           => array( 'wplusui_look', 40 ),
		'wplusui_button_radius'         => array( 'wplusui_look', 50 ),
		'wplusui_box_design'            => array( 'wplusui_look', 60 ),
		'wplusui_font_body'             => array( 'wplusui_look', 70 ),
		'wplusui_font_heading'          => array( 'wplusui_look', 80 ),
		// Header and menus.
		'wplusui_notification_text'     => array( 'wplusui_header', 10 ),
		'wplusui_notification_cta_text' => array( 'wplusui_header', 20 ),
		'wplusui_notification_cta_url'  => array( 'wplusui_header', 30 ),
		'wplusui_header_logo'           => array( 'wplusui_header', 31 ),
		'wplusui_header_sub_show'       => array( 'wplusui_header', 32 ),
		'wplusui_header_sub_text'       => array( 'wplusui_header', 33 ),
		'wplusui_menu_default'          => array( 'wplusui_header', 40 ),
		'wplusui_mobile_bar_show'       => array( 'wplusui_header', 50 ),
		// Homepage.
		'wplusui_carousel_enabled'      => array( 'wplusui_home', 10 ),
		'wplusui_pinned_enabled'        => array( 'wplusui_home', 100 ),
		'wplusui_home_categories'       => array( 'wplusui_home', 110 ),
		'wplusui_home_exclude_cats'     => array( 'wplusui_home', 120 ),
		// Posts and comments.
		'wplusui_toc_show'              => array( 'wplusui_posts', 10 ),
		'wplusui_reading_time_show'     => array( 'wplusui_posts', 15 ),
		'wplusui_author_box'            => array( 'wplusui_posts', 20 ),
		'wplusui_related_show'          => array( 'wplusui_posts', 30 ),
		'wplusui_related_title'         => array( 'wplusui_posts', 40 ),
		'wplusui_related_count'         => array( 'wplusui_posts', 50 ),
		'wplusui_disqus_shortname'      => array( 'wplusui_posts', 60 ),
		// Sidebar.
		'wplusui_sidebar_home'          => array( 'wplusui_sidebar', 10 ),
		'wplusui_sidebar_single'        => array( 'wplusui_sidebar', 20 ),
		'wplusui_sidebar_search'        => array( 'wplusui_sidebar', 30 ),
		'wplusui_popular_show'          => array( 'wplusui_sidebar', 40 ),
		'wplusui_popular_title'         => array( 'wplusui_sidebar', 50 ),
		'wplusui_popular_count'         => array( 'wplusui_sidebar', 60 ),
		'wplusui_popular_order'         => array( 'wplusui_sidebar', 70 ),
		// Ads: AdSense account first, then the slots from the top of the page down.
		'wplusui_adsense_id'            => array( 'wplusui_ads', 10 ),
		'wplusui_adsense_lazy'          => array( 'wplusui_ads', 20 ),
		'wplusui_ad_placeholders'       => array( 'wplusui_ads', 30 ),
		'wplusui_ad_under_header'       => array( 'wplusui_ads', 40 ),
		'wplusui_ad_above_pinned'       => array( 'wplusui_ads', 50 ),
		'wplusui_ad_above_posts'        => array( 'wplusui_ads', 60 ),
		'wplusui_ad_below_posts'        => array( 'wplusui_ads', 70 ),
		'wplusui_ad_sidebar_sticky'     => array( 'wplusui_ads', 80 ),
		'wplusui_ad_in_article'         => array( 'wplusui_ads', 90 ),
		'wplusui_ad_in_article_after'   => array( 'wplusui_ads', 100 ),
	);
	// Footer, as it is laid out: about block with the social icons, then the link columns, then the copyright line.
	$map['wplusui_footer_about'] = array( 'wplusui_footer', 10 );
	$position                    = 20;
	foreach ( array_keys( wplusui_social_networks() ) as $network ) {
		$map[ 'wplusui_social_' . $network ] = array( 'wplusui_footer', $position );
		$position                           += 10;
	}
	for ( $col = 1; $col <= 4; $col++ ) {
		$map[ "wplusui_footer_menu_$col" ]  = array( 'wplusui_footer', 200 + $col * 10 );
		$map[ "wplusui_footer_title_$col" ] = array( 'wplusui_footer', 200 + $col * 10 + 1 );
	}
	$map['wplusui_footer_copyright'] = array( 'wplusui_footer', 300 );
	// Carousel slides: image, title, caption, link, one after the other, right after the on/off switch.
	for ( $i = 1; $i <= 5; $i++ ) {
		$map[ "wplusui_carousel_image_$i" ]   = array( 'wplusui_home', 10 + $i * 10 + 1 );
		$map[ "wplusui_carousel_title_$i" ]   = array( 'wplusui_home', 10 + $i * 10 + 2 );
		$map[ "wplusui_carousel_caption_$i" ] = array( 'wplusui_home', 10 + $i * 10 + 3 );
		$map[ "wplusui_carousel_url_$i" ]     = array( 'wplusui_home', 10 + $i * 10 + 4 );
	}
	return $map;
}

/**
 * Group headings: control id => heading shown just above it.
 *
 * @return array<string,string>
 */
function wplusui_customizer_headings() {
	return array(
		'wplusui_default_mode'         => __( 'Mode and colors', 'wplus-ui' ),
		'wplusui_button_radius'        => __( 'Shape and style', 'wplus-ui' ),
		'wplusui_font_body'            => __( 'Fonts', 'wplus-ui' ),
		'wplusui_notification_text'    => __( 'Notification bar', 'wplus-ui' ),
		'wplusui_header_logo'          => __( 'Site name and logo', 'wplus-ui' ),
		'wplusui_menu_default'         => __( 'Navigation', 'wplus-ui' ),
		'wplusui_carousel_enabled'     => __( 'Carousel', 'wplus-ui' ),
		'wplusui_pinned_enabled'       => __( 'Pinned post and category sections', 'wplus-ui' ),
		'wplusui_toc_show'             => __( 'Around the article', 'wplus-ui' ),
		'wplusui_disqus_shortname'     => __( 'Comments', 'wplus-ui' ),
		'wplusui_sidebar_home'         => __( 'Where the sidebar shows', 'wplus-ui' ),
		'wplusui_popular_show'         => __( 'Popular Posts box', 'wplus-ui' ),
		'wplusui_share_quick_1'        => __( 'Quick buttons (shown next to the post)', 'wplus-ui' ),
		'wplusui_share_popup_facebook' => __( 'Networks in the share popup', 'wplus-ui' ),
		'wplusui_footer_about'         => __( 'About block', 'wplus-ui' ),
		'wplusui_social_facebook'      => __( 'Social links (also in the menu drawer)', 'wplus-ui' ),
		'wplusui_footer_menu_1'        => __( 'Link columns', 'wplus-ui' ),
		'wplusui_footer_copyright'     => __( 'Copyright line', 'wplus-ui' ),
		'wplusui_wa_enabled'           => __( 'Floating WhatsApp button', 'wplus-ui' ),
		'wplusui_cta_enabled'          => __( 'Call-to-action popup', 'wplus-ui' ),
		'wplusui_cookie_enabled'       => __( 'Cookie notice', 'wplus-ui' ),
		'wplusui_soon_mode'            => __( 'Coming Soon / Maintenance page', 'wplus-ui' ),
	);
}

/**
 * Apply the order: create the new sections, move the controls, drop the old sections.
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_customizer_reorder( $wp_customize ) {
	$priority = 30;
	foreach ( wplusui_customizer_sections() as $id => $row ) {
		$section = $wp_customize->get_section( $id );
		if ( $section ) {
			$section->title       = $row[0];
			$section->description = $row[1];
			$section->priority    = $priority;
		} else {
			$wp_customize->add_section(
				$id,
				array(
					'title'       => $row[0],
					'description' => $row[1],
					'priority'    => $priority,
				)
			);
		}
		++$priority;
	}

	foreach ( wplusui_customizer_map() as $control_id => $place ) {
		$control = $wp_customize->get_control( $control_id );
		if ( $control ) {
			$control->section  = $place[0];
			$control->priority = $place[1];
		}
	}

	// Controls without a place in the map keep the order they were registered in, spaced by ten.
	$by_section = array();
	foreach ( $wp_customize->controls() as $control ) {
		$map_has = isset( wplusui_customizer_map()[ $control->id ] );
		if ( ! $map_has && isset( wplusui_customizer_sections()[ $control->section ] ) ) {
			$by_section[ $control->section ][] = $control;
		}
	}
	foreach ( $by_section as $controls ) {
		usort(
			$controls,
			function ( $a, $b ) {
				return $a->instance_number <=> $b->instance_number;
			}
		);
		foreach ( $controls as $n => $control ) {
			$control->priority = ( $n + 1 ) * 10;
		}
	}

	// Group headings: heading label, shown just before the given control.
	require_once WPLUSUI_DIR . '/inc/class-wplusui-customize-heading.php';
	foreach ( wplusui_customizer_headings() as $before => $label ) {
		$anchor = $wp_customize->get_control( $before );
		if ( ! $anchor ) {
			continue;
		}
		$wp_customize->add_control(
			new Wplusui_Customize_Heading(
				$wp_customize,
				'wplusui_heading_' . $before,
				array(
					'label'    => $label,
					'section'  => $anchor->section,
					'settings' => array(),
					'priority' => $anchor->priority - 5,
				)
			)
		);
	}

	foreach ( array( 'wplusui_options', 'wplusui_layout', 'wplusui_content', 'wplusui_appearance' ) as $old ) {
		$wp_customize->remove_section( $old );
	}
}
add_action( 'customize_register', 'wplusui_customizer_reorder', 99 );
