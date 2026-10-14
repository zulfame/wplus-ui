<?php
/**
 * Popular Posts settings, categories hidden from the home page and Disqus comments.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Popular Posts settings.
 *
 * @return array{show:bool,title:string,count:int,order:string}
 */
function wplusui_popular_settings() {
	$title = trim( (string) get_theme_mod( 'wplusui_popular_title', '' ) );
	$order = get_theme_mod( 'wplusui_popular_order', 'views' );
	return array(
		'show'  => (bool) get_theme_mod( 'wplusui_popular_show', true ),
		'title' => '' !== $title ? $title : __( 'Popular Posts', 'wplus-ui' ),
		'count' => max( 1, min( 10, (int) get_theme_mod( 'wplusui_popular_count', 5 ) ) ),
		'order' => in_array( $order, array( 'views', 'comments', 'recent' ), true ) ? $order : 'views',
	);
}

/**
 * Category IDs hidden from the home page post grid.
 *
 * @return int[]
 */
function wplusui_home_excluded_categories() {
	$ids = array();
	foreach ( explode( ',', (string) get_theme_mod( 'wplusui_home_exclude_cats', '' ) ) as $part ) {
		$part = trim( $part );
		if ( '' === $part ) {
			continue;
		}
		$term = is_numeric( $part ) ? get_term( (int) $part, 'category' ) : get_category_by_slug( $part );
		if ( $term && ! is_wp_error( $term ) ) {
			$ids[] = (int) $term->term_id;
		}
	}
	return array_values( array_unique( $ids ) );
}

/**
 * Keep the excluded categories out of the home page grid.
 *
 * @param WP_Query $query Query.
 */
function wplusui_exclude_home_categories( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_home() ) {
		return;
	}
	$ids = wplusui_home_excluded_categories();
	if ( $ids ) {
		$query->set( 'category__not_in', $ids );
	}
}
add_action( 'pre_get_posts', 'wplusui_exclude_home_categories' );

/**
 * Disqus shortname (empty when Disqus is off).
 *
 * @return string
 */
function wplusui_disqus_shortname() {
	return sanitize_key( (string) get_theme_mod( 'wplusui_disqus_shortname', '' ) );
}

/**
 * Print the Disqus thread; the embed loads the first time the comments popup opens.
 */
function wplusui_render_disqus() {
	$short = wplusui_disqus_shortname();
	if ( '' === $short ) {
		return;
	}
	$config = array(
		'url'        => get_permalink(),
		'identifier' => (string) get_the_ID(),
	);
	?>
	<div id="disqus_thread"></div>
	<script>
		( function () {
			var started = false;
			window.disqus_config = function () {
				this.page.url = <?php echo wp_json_encode( $config['url'] ); ?>;
				this.page.identifier = <?php echo wp_json_encode( $config['identifier'] ); ?>;
			};
			function load() {
				if ( started ) { return; }
				started = true;
				var s = document.createElement( 'script' );
				s.src = <?php echo wp_json_encode( 'https://' . $short . '.disqus.com/embed.js' ); ?>;
				s.setAttribute( 'data-timestamp', String( +new Date() ) );
				( document.head || document.body ).appendChild( s );
			}
			var box = document.getElementById( 'forComments' );
			if ( box ) {
				box.addEventListener( 'change', function () { if ( box.checked ) { load(); } } );
				if ( box.checked ) { load(); }
			} else {
				load();
			}
		}() );
	</script>
	<noscript><?php esc_html_e( 'Please enable JavaScript to view the comments.', 'wplus-ui' ); ?></noscript>
	<?php
}

/**
 * Customizer controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_content_options_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_content',
		array(
			'title'    => __( 'WPlus UI: Popular posts and comments', 'wplus-ui' ),
			'priority' => 166,
		)
	);

	$wp_customize->add_setting(
		'wplusui_popular_show',
		array(
			'default'           => true,
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
	$wp_customize->add_control(
		'wplusui_popular_show',
		array(
			'label'   => __( 'Show Popular Posts in the sidebar', 'wplus-ui' ),
			'section' => 'wplusui_content',
			'type'    => 'checkbox',
		)
	);

	$wp_customize->add_setting(
		'wplusui_popular_title',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_popular_title',
		array(
			'label'       => __( 'Popular Posts title', 'wplus-ui' ),
			'description' => __( 'Leave empty for the default.', 'wplus-ui' ),
			'section'     => 'wplusui_content',
			'type'        => 'text',
		)
	);

	$wp_customize->add_setting(
		'wplusui_popular_count',
		array(
			'default'           => 5,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		'wplusui_popular_count',
		array(
			'label'       => __( 'Number of popular posts', 'wplus-ui' ),
			'section'     => 'wplusui_content',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 10,
			),
		)
	);

	$wp_customize->add_setting(
		'wplusui_popular_order',
		array(
			'default'           => 'views',
			'sanitize_callback' => function ( $value ) {
				return in_array( $value, array( 'views', 'comments', 'recent' ), true ) ? $value : 'views';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_popular_order',
		array(
			'label'   => __( 'Rank popular posts by', 'wplus-ui' ),
			'section' => 'wplusui_content',
			'type'    => 'select',
			'choices' => array(
				'views'    => __( 'Views, then comments', 'wplus-ui' ),
				'comments' => __( 'Comments', 'wplus-ui' ),
				'recent'   => __( 'Newest', 'wplus-ui' ),
			),
		)
	);

	$wp_customize->add_setting(
		'wplusui_home_exclude_cats',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_home_exclude_cats',
		array(
			'label'       => __( 'Hide categories from the home page', 'wplus-ui' ),
			'description' => __( 'Comma-separated category slugs or IDs. They still show in archives and search.', 'wplus-ui' ),
			'section'     => 'wplusui_content',
			'type'        => 'text',
		)
	);

	$wp_customize->add_setting(
		'wplusui_disqus_shortname',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_key',
		)
	);
	$wp_customize->add_control(
		'wplusui_disqus_shortname',
		array(
			'label'       => __( 'Disqus shortname', 'wplus-ui' ),
			'description' => __( 'Use Disqus instead of WordPress comments. Leave empty to keep native comments.', 'wplus-ui' ),
			'section'     => 'wplusui_content',
			'type'        => 'text',
		)
	);
}
add_action( 'customize_register', 'wplusui_content_options_customize_register' );
