<?php
/**
 * Layout and post options: sidebar visibility, table of contents, related posts
 * and an author box.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether the sidebar shows for a context.
 *
 * @param string $context home, single or search.
 * @return bool
 */
function wplusui_show_sidebar( $context ) {
	return (bool) get_theme_mod( 'wplusui_sidebar_' . $context, true );
}

/**
 * Whether the estimated read time shows under the post title.
 *
 * @return bool
 */
function wplusui_reading_time_enabled() {
	return (bool) get_theme_mod( 'wplusui_reading_time_show', true );
}

/**
 * How the site name in the header is drawn: text, logo_text or logo.
 * A logo style only applies when a custom logo is set (Site Identity).
 *
 * @return string
 */
function wplusui_header_logo_mode() {
	$mode = get_theme_mod( 'wplusui_header_logo', 'text' );
	if ( ! in_array( $mode, array( 'logo_text', 'logo' ), true ) || ! has_custom_logo() ) {
		return 'text';
	}
	return $mode;
}

/**
 * The small label next to the site name in the header: the theme version unless the owner typed another text or switched it off.
 *
 * @return string Empty when hidden.
 */
function wplusui_header_sub_label() {
	if ( ! get_theme_mod( 'wplusui_header_sub_show', true ) ) {
		return '';
	}
	$text = trim( (string) get_theme_mod( 'wplusui_header_sub_text', '' ) );
	return '' !== $text ? $text : WPLUSUI_VERSION;
}

/**
 * Whether the table of contents is enabled.
 *
 * @return bool
 */
function wplusui_toc_enabled() {
	return (bool) get_theme_mod( 'wplusui_toc_show', true );
}

/**
 * Related posts settings.
 *
 * @return array{show:bool,title:string,count:int}
 */
function wplusui_related_settings() {
	$title = trim( (string) get_theme_mod( 'wplusui_related_title', '' ) );
	return array(
		'show'  => (bool) get_theme_mod( 'wplusui_related_show', true ),
		'title' => '' !== $title ? $title : __( 'Related Posts', 'wplus-ui' ),
		'count' => max( 1, min( 12, (int) get_theme_mod( 'wplusui_related_count', 6 ) ) ),
	);
}

/**
 * Print the author box (after the post body, before related posts).
 */
function wplusui_render_author_box() {
	if ( ! get_theme_mod( 'wplusui_author_box', false ) ) {
		return;
	}
	$id   = (int) get_the_author_meta( 'ID' );
	$bio  = get_the_author_meta( 'description', $id );
	$link = get_author_posts_url( $id );
	?>
	<div class="authorBox">
		<div class="authorAvatar"><?php echo get_avatar( $id, 72, '', get_the_author(), array( 'class' => 'im' ) ); ?></div>
		<div class="authorInfo">
			<div class="authorLabel"><?php esc_html_e( 'Written by', 'wplus-ui' ); ?></div>
			<a class="authorName" href="<?php echo esc_url( $link ); ?>" rel="author"><?php echo esc_html( get_the_author() ); ?></a>
			<?php if ( $bio ) : ?>
			<p class="authorBio"><?php echo esc_html( $bio ); ?></p>
			<?php endif; ?>
		</div>
	</div>
	<?php
}

/**
 * Customizer controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_post_options_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_layout',
		array(
			'title'    => __( 'WPlus UI: Layout and posts', 'wplus-ui' ),
			'priority' => 164,
		)
	);

	$wp_customize->add_setting(
		'wplusui_box_design',
		array(
			'default'           => false,
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
	$wp_customize->add_control(
		'wplusui_box_design',
		array(
			'label'       => __( 'Box design', 'wplus-ui' ),
			'description' => __( 'Draw post cards, popular and related posts, tables, quotes, accordions and pop-ups in bordered boxes instead of flat blocks.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'checkbox',
		)
	);

	$wp_customize->add_setting(
		'wplusui_header_logo',
		array(
			'default'           => 'text',
			'sanitize_callback' => function ( $value ) {
				return in_array( $value, array( 'logo_text', 'logo' ), true ) ? $value : 'text';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_header_logo',
		array(
			'label'       => __( 'Site name in the header', 'wplus-ui' ),
			'description' => __( 'The logo comes from Site Identity. Without a logo the site name is always shown as text.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'radio',
			'choices'     => array(
				'text'      => __( 'Site name only', 'wplus-ui' ),
				'logo_text' => __( 'Logo and site name', 'wplus-ui' ),
				'logo'      => __( 'Logo only', 'wplus-ui' ),
			),
		)
	);
	$wp_customize->add_setting(
		'wplusui_header_sub_text',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_header_sub_text',
		array(
			'label'       => __( 'Header label text', 'wplus-ui' ),
			'description' => __( 'Leave empty to show the theme version.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'text',
		)
	);
	$wp_customize->add_setting(
		'wplusui_menu_default',
		array(
			'default'           => 'collapsed',
			'sanitize_callback' => function ( $value ) {
				return 'expanded' === $value ? 'expanded' : 'collapsed';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_menu_default',
		array(
			'label'       => __( 'Left menu on desktop', 'wplus-ui' ),
			'description' => __( 'How the left menu looks when a page opens. Visitors can still open or close it with the button next to the site name. On phones the menu is always a drawer.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'radio',
			'choices'     => array(
				'collapsed' => __( 'Collapsed (icons only)', 'wplus-ui' ),
				'expanded'  => __( 'Expanded (icons and labels)', 'wplus-ui' ),
			),
		)
	);

	$checks = array(
		'wplusui_sidebar_home'      => array( __( 'Show sidebar on the home page', 'wplus-ui' ), true ),
		'wplusui_sidebar_single'    => array( __( 'Show sidebar on single posts', 'wplus-ui' ), true ),
		'wplusui_sidebar_search'    => array( __( 'Show sidebar on search results', 'wplus-ui' ), true ),
		'wplusui_toc_show'          => array( __( 'Show the table of contents button on posts and pages', 'wplus-ui' ), true ),
		'wplusui_reading_time_show' => array( __( 'Show the estimated read time under the post title', 'wplus-ui' ), true ),
		'wplusui_header_sub_show'   => array( __( 'Show a small label next to the site name in the header', 'wplus-ui' ), true ),
		'wplusui_author_box'        => array( __( 'Show an author box under posts', 'wplus-ui' ), false ),
		'wplusui_related_show'      => array( __( 'Show related posts', 'wplus-ui' ), true ),
	);
	foreach ( $checks as $id => $row ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $row[1],
				'sanitize_callback' => 'rest_sanitize_boolean',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $row[0],
				'section' => 'wplusui_layout',
				'type'    => 'checkbox',
			)
		);
	}

	$wp_customize->add_setting(
		'wplusui_related_title',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_related_title',
		array(
			'label'       => __( 'Related posts title', 'wplus-ui' ),
			'description' => __( 'Leave empty for the default.', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'text',
		)
	);
	$wp_customize->add_setting(
		'wplusui_related_count',
		array(
			'default'           => 6,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		'wplusui_related_count',
		array(
			'label'       => __( 'Number of related posts', 'wplus-ui' ),
			'section'     => 'wplusui_layout',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 12,
			),
		)
	);
}
add_action( 'customize_register', 'wplusui_post_options_customize_register' );
