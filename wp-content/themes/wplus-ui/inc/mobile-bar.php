<?php
/**
 * Mobile bottom bar: a row of up to five icons stuck to the bottom of the screen on phones
 * and tablets (hidden on wide screens), with the standard actions of the original template:
 * Home, Search, Menu, Appearance and, depending on the page, Top, Share and Comments.
 * The only setting is whether to show it (Customizer > WPlus UI: Layout and posts).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Customizer control (in "WPlus UI: Layout and posts").
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_mobile_bar_customize( $wp_customize ) {
	$wp_customize->add_setting(
		'wplusui_mobile_bar_show',
		array(
			'default'           => false,
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
	$wp_customize->add_control(
		'wplusui_mobile_bar_show',
		array(
			'label'       => __( 'Show the mobile bottom bar', 'wplus-ui' ),
			'description' => __( 'A row of icons at the bottom of the screen on phones and tablets: Home, Search, Menu, Appearance and, depending on the page, Top, Share or Comments.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'checkbox',
		)
	);
}
add_action( 'customize_register', 'wplusui_mobile_bar_customize', 20 );

/**
 * List items of the bar, or an empty array when the bar is off.
 *
 * @return string[] List items markup.
 */
function wplusui_mobile_bar_items() {
	if ( ! get_theme_mod( 'wplusui_mobile_bar_show', false ) ) {
		return array();
	}
	$items = array();

	$svg_home   = '<svg class="line" viewBox="0 0 24 24"><path d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z"></path><path class="c" d="M12 17.99V14.99"></path></svg>';
	$svg_search = '<svg class="line" viewBox="0 0 24 24"><g><circle cx="11.36167" cy="11.36167" r="9.36167"></circle><line class="c" x1="22" x2="19.9332" y1="22" y2="19.9332"></line></g></svg>';
	$svg_menu   = '<svg class="line" viewBox="0 0 24 24"><path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"></path><path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"></path><path class="c" d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"></path><path class="c" d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"></path></svg>';
	$svg_mode   = '<svg class="line" viewBox="0 0 24 24"><g class="d1"><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"></path><path class="c" d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke-width="2"></path></g><g class="d2"><path d="M183.72453,170.371a10.4306,10.4306,0,0,1-.8987,3.793,11.19849,11.19849,0,0,1-5.73738,5.72881,10.43255,10.43255,0,0,1-3.77582.89138,1.99388,1.99388,0,0,0-1.52447,3.18176,10.82936,10.82936,0,1,0,15.118-15.11819A1.99364,1.99364,0,0,0,183.72453,170.371Z" transform="translate(-169.3959 -166.45548)"></path></g></svg>';
	$svg_top    = '<svg class="line" viewBox="0 0 24 24"><g transform="translate(2.500000, 3.000000)"><path d="M9.5,18 C3.00557739,18 0.456662548,17.5386801 0.0435259337,15.2033146 C-0.36961068,12.8679491 2.27382642,8.47741935 3.08841712,7.02846996 C5.81256986,2.18407813 7.66371927,0 9.5,0 C11.3362807,0 13.1874301,2.18407813 15.9115829,7.02846996 C16.7261736,8.47741935 19.3696107,12.8679491 18.9564741,15.2033146 C18.5443995,17.5386801 15.9944226,18 9.5,18 Z"></path></g></svg>';
	$svg_share  = '<svg class="line" viewBox="0 0 24 24"><path d="M92.30583,264.72053a3.42745,3.42745,0,0,1-.37,1.57,3.51,3.51,0,1,1,0-3.13995A3.42751,3.42751,0,0,1,92.30583,264.72053Z" transform="translate(-83.28571 -252.73452)"></path><circle class="c" cx="18.48892" cy="5.49436" r="3.51099"></circle><circle class="c" cx="18.48892" cy="18.50564" r="3.51099"></circle><line x1="12.53012" x2="8.65012" y1="8.476" y2="10.416"></line><line x1="12.53012" x2="8.65012" y1="15.496" y2="13.556"></line></svg>';
	$svg_cmt    = '<svg class="line" viewBox="0 0 24 24"><path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"></path><path class="c" d="M7 8H17"></path><path class="c" d="M7 13H13"></path></svg>';

	$home = __( 'Home', 'wplus-ui' );
	if ( is_front_page() ) {
		$items[] = '<li class="mH nmH"><span data-text="' . esc_attr( $home ) . '">' . $svg_home . '<span class="sr-only">' . esc_html( $home ) . '</span></span></li>';
	} else {
		$items[] = '<li class="mH"><a data-text="' . esc_attr( $home ) . '" href="' . esc_url( home_url( '/' ) ) . '" aria-label="' . esc_attr( $home ) . '">' . $svg_home . '<span class="sr-only">' . esc_html( $home ) . '</span></a></li>';
	}
	$items[] = '<li class="mS"><label data-text="' . esc_attr__( 'Search', 'wplus-ui' ) . '" for="forSearch">' . $svg_search . '<span class="sr-only">' . esc_html__( 'Search', 'wplus-ui' ) . '</span></label></li>';
	$items[] = '<li class="mN"><label data-text="' . esc_attr__( 'Menu', 'wplus-ui' ) . '" for="forNavigation">' . $svg_menu . '<span class="sr-only">' . esc_html__( 'Menu', 'wplus-ui' ) . '</span></label></li>';
	if ( ! is_singular( 'post' ) ) {
		$items[] = '<li class="mL"><button class="tDL show-if-js" data-light="Dark" aria-label="' . esc_attr__( 'Appearance', 'wplus-ui' ) . '" data-text="' . esc_attr__( 'Mode', 'wplus-ui' ) . '" onclick="if (PU.ui) PU.ui.tT(event);" type="button">' . $svg_mode . '</button></li>';
	}
	if ( is_front_page() ) {
		$items[] = '<li class="mS"><button class="show-if-js" aria-label="' . esc_attr__( 'Top', 'wplus-ui' ) . '" data-text="' . esc_attr__( 'Top', 'wplus-ui' ) . '" onclick="window.scrollTo({top: 0});" type="button">' . $svg_top . '</button></li>';
	}
	if ( is_singular( 'post' ) ) {
		if ( function_exists( 'wplusui_share_enabled' ) && wplusui_share_enabled() ) {
			$items[] = '<li class="mS"><label aria-label="' . esc_attr__( 'Share', 'wplus-ui' ) . '" data-text="' . esc_attr__( 'Share', 'wplus-ui' ) . '" for="forShare">' . $svg_share . '</label></li>';
		}
		if ( comments_open() ) {
			$items[] = '<li class="mC"><a aria-label="' . esc_attr__( 'Comments', 'wplus-ui' ) . '" data-text="' . esc_attr__( 'Comments', 'wplus-ui' ) . '" href="#comment">' . $svg_cmt . '</a></li>';
		}
	}
	return array_slice( $items, 0, 5 );
}

/**
 * Print the bar (called from footer.php inside .mainR, after the footer).
 */
function wplusui_render_mobile_bar() {
	if ( is_404() ) {
		return;
	}
	$items = wplusui_mobile_bar_items();
	if ( ! $items ) {
		return;
	}
	echo '<div class="section mobM bl-hide-title bl-hide-description" id="sec_Mobile_Menu"><div class="widget TextList mobC" id="TextList99"><ul>' . implode( '', $items ) . '</ul></div></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- each item is escaped where it is built.
}
