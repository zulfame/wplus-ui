<?php
/**
 * Customizer section "WPlus UI: Footer": about text, the four link columns (title and menu),
 * copyright text and social links.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the section and its controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_footer_customize( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_footer',
		array(
			'title'       => __( 'WPlus UI: Footer', 'wplus-ui' ),
			'description' => __( 'The footer has an about block, four link columns, social icons and a copyright line.', 'wplus-ui' ),
			'priority'    => 166,
		)
	);

	$wp_customize->add_setting(
		'wplusui_footer_about',
		array(
			'default'           => __( 'A modern, responsive WordPress theme.', 'wplus-ui' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_footer_about',
		array(
			'label'   => __( 'About text under the site name', 'wplus-ui' ),
			'section' => 'wplusui_footer',
			'type'    => 'textarea',
		)
	);

	$menus = array( 0 => __( 'No menu (use the widgets of this column)', 'wplus-ui' ) );
	foreach ( wp_get_nav_menus() as $menu ) {
		$menus[ $menu->term_id ] = $menu->name;
	}
	$menu_hint = sprintf(
		/* translators: %s: link to the menus screen */
		__( 'Pick a menu for this column, or create one in %s. Without a menu the column shows its widgets (Appearance > Widgets).', 'wplus-ui' ),
		'<a href="' . esc_url( admin_url( 'nav-menus.php' ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Appearance > Menus', 'wplus-ui' ) . '</a>'
	);

	foreach ( wplusui_footer_column_titles() as $col => $default_title ) {
		$wp_customize->add_setting(
			'wplusui_footer_menu_' . $col,
			array(
				'default'           => 0,
				'sanitize_callback' => 'absint',
			)
		);
		$wp_customize->add_control(
			'wplusui_footer_menu_' . $col,
			array(
				/* translators: %d: column number */
				'label'       => sprintf( __( 'Column %d: menu', 'wplus-ui' ), $col ),
				'description' => 1 === $col ? $menu_hint : '',
				'section'     => 'wplusui_footer',
				'type'        => 'select',
				'choices'     => $menus,
			)
		);

		$wp_customize->add_setting(
			'wplusui_footer_title_' . $col,
			array(
				'default'           => '',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
		$wp_customize->add_control(
			'wplusui_footer_title_' . $col,
			array(
				/* translators: 1: column number, 2: default title */
				'label'       => sprintf( __( 'Column %1$d: title (default: %2$s)', 'wplus-ui' ), $col, $default_title ),
				'description' => 1 === $col ? __( 'The title is used when the column shows a menu. A column that shows widgets keeps the title of its widget.', 'wplus-ui' ) : '',
				'section'     => 'wplusui_footer',
				'type'        => 'text',
				'input_attrs' => array( 'placeholder' => $default_title ),
			)
		);
	}

	$wp_customize->add_setting(
		'wplusui_footer_copyright',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_footer_copyright',
		array(
			'label'       => __( 'Copyright text', 'wplus-ui' ),
			'description' => __( 'Leave empty for "© year · Site name · All rights reserved." Write {year} to print the current year.', 'wplus-ui' ),
			'section'     => 'wplusui_footer',
			'type'        => 'text',
		)
	);

	foreach ( wplusui_social_networks() as $key => $label ) {
		$setting = 'wplusui_social_' . $key;
		$wp_customize->add_setting(
			$setting,
			array(
				'default'           => '',
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			$setting,
			array(
				/* translators: %s: social network name */
				'label'       => sprintf( __( '%s URL', 'wplus-ui' ), $label ),
				'description' => 'facebook' === $key ? __( 'Social icons show only for the networks with a link. They appear in the footer, the menu drawer and the Coming Soon page.', 'wplus-ui' ) : '',
				'section'     => 'wplusui_footer',
				'type'        => 'url',
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_footer_customize' );
