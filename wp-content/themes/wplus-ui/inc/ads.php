<?php
/**
 * Ad slots, in-article ads and custom header/footer code.
 *
 * Every slot of the original layout (under header, above the pinned post, above and
 * below the posts, sticky in the sidebar) is filled from the Customizer. A slot with
 * no code prints nothing unless "Show ad placeholders" is on (used by the demo).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ad slots: key => [ widget id, label, extra .adB class, widget gets data-version ].
 *
 * @return array<string,array{0:string,1:string,2:string,3:bool}>
 */
function wplusui_ad_slots() {
	return array(
		'under_header'   => array( 'LinkList81', __( 'Under header', 'wplus-ui' ), '', false ),
		'above_pinned'   => array( 'LinkList82', __( 'Above pinned post (home)', 'wplus-ui' ), '', false ),
		'above_posts'    => array( 'LinkList83', __( 'Above posts (desktop only)', 'wplus-ui' ), '', false ),
		'below_posts'    => array( 'LinkList85', __( 'Below posts (home and archives)', 'wplus-ui' ), '', true ),
		'sidebar_sticky' => array( 'LinkList86', __( 'Sticky sidebar (desktop only)', 'wplus-ui' ), 'h240', false ),
	);
}

/**
 * Recommended picture size of each slot (width, height in pixels): the slot is as wide as its column on the page
 * (992 px under the header, about 667 px above and below the posts, 300 px in the sidebar) and a larger picture
 * shrinks to fit, so these sizes keep the picture sharp without making it taller than the column.
 *
 * @return array<string,array{0:int,1:int}>
 */
function wplusui_ad_slot_sizes() {
	return array(
		'under_header'   => array( 970, 90 ),
		'above_pinned'   => array( 728, 90 ),
		'above_posts'    => array( 728, 90 ),
		'below_posts'    => array( 728, 90 ),
		'sidebar_sticky' => array( 300, 250 ),
	);
}

/**
 * The AdSense publisher ID, normalised to the form AdSense expects (ca-pub-0000000000000000), or an empty string.
 * Accepts "pub-123...", "ca-pub-123..." or just the digits.
 *
 * @return string
 */
function wplusui_adsense_client() {
	$raw = trim( (string) get_theme_mod( 'wplusui_adsense_id', '' ) );
	if ( preg_match( '/^(?:ca-)?(?:pub-)?(\d{10,20})$/i', $raw, $m ) ) {
		return 'ca-pub-' . $m[1];
	}
	return '';
}

/**
 * Turn what the owner typed into a slot into markup. Three kinds of input work, so the slot is flexible:
 *
 * 1. an AdSense ad unit number (digits only): the theme builds a responsive unit with the publisher ID;
 * 2. an image address (optionally followed on the next line by the link): printed as a (linked) image;
 * 3. anything else is printed as it is: the code from AdSense, another ad network, or your own HTML.
 *
 * @param string $value Value of the slot setting.
 * @return string Markup, or an empty string.
 */
function wplusui_ad_markup( $value ) {
	$value = trim( (string) $value );
	if ( '' === $value ) {
		return '';
	}

	if ( preg_match( '/^\d{6,20}$/', $value ) ) {
		$client = wplusui_adsense_client();
		if ( '' === $client ) {
			return ''; // A unit number needs the publisher ID.
		}
		return '<ins class="adsbygoogle" style="display:block" data-ad-client="' . esc_attr( $client ) . '" data-ad-slot="' . esc_attr( $value ) . '" data-ad-format="auto" data-full-width-responsive="true"></ins>'
			. '<script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>';
	}

	$lines = preg_split( '/\R/', $value );
	if ( count( $lines ) <= 2 && preg_match( '#^https?://\S+\.(?:jpe?g|png|gif|webp|avif|svg)(?:\?\S*)?$#i', trim( $lines[0] ) ) ) {
		$img  = '<img src="' . esc_url( trim( $lines[0] ) ) . '" alt="" loading="lazy" style="display:block;max-width:100%;height:auto;margin:0 auto">';
		$link = isset( $lines[1] ) ? trim( $lines[1] ) : '';
		if ( '' !== $link && preg_match( '#^https?://\S+$#i', $link ) ) {
			return '<a href="' . esc_url( $link ) . '" rel="sponsored noopener" target="_blank">' . $img . '</a>';
		}
		return $img;
	}

	return wplusui_consent_gate_scripts( $value );
}

/**
 * Whether the AdSense loader is already part of the code the owner pasted into a slot or the head/footer code.
 *
 * @return bool
 */
function wplusui_adsense_loader_pasted() {
	foreach ( array( 'wplusui_ad_under_header', 'wplusui_ad_above_pinned', 'wplusui_ad_above_posts', 'wplusui_ad_below_posts', 'wplusui_ad_sidebar_sticky', 'wplusui_ad_in_article', 'wplusui_head_code', 'wplusui_footer_code' ) as $mod ) {
		if ( false !== strpos( (string) get_theme_mod( $mod, '' ), 'adsbygoogle.js' ) ) {
			return true;
		}
	}
	return false;
}

/**
 * Print the AdSense loader once. With a publisher ID set, AdSense Auto ads work too (when enabled in the AdSense account).
 * By default it loads after the visitor scrolls or taps, or after five seconds, so it does not slow the first paint.
 */
function wplusui_print_adsense_loader() {
	$client = wplusui_adsense_client();
	if ( '' === $client || is_customize_preview() || wplusui_adsense_loader_pasted() ) {
		return;
	}
	$src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . $client;
	if ( ! get_theme_mod( 'wplusui_adsense_lazy', true ) ) {
		// With the cookie notice holding scripts, this tag waits for the OK as well.
		echo wplusui_consent_gate_scripts( '<script async src="' . esc_url( $src ) . '" crossorigin="anonymous"></script>' ) . "\n"; // phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript,WordPress.Security.EscapeOutput.OutputNotEscaped -- third-party ad loader, printed once.
		return;
	}
	$loader = '(function(){var d=0;function l(){if(d)return;d=1;var s=document.createElement("script");s.async=true;s.crossOrigin="anonymous";s.src=' . wp_json_encode( $src ) . ';document.head.appendChild(s)}'
		. '["scroll","touchstart","mousemove","keydown"].forEach(function(e){addEventListener(e,l,{once:true,passive:true})});setTimeout(l,5000)})();';
	if ( wplusui_cookie_gate_active() ) {
		$loader = 'wplusuiConsent.on(function(){' . $loader . '});'; // Starts after the visitor pressed OK.
	}
	echo '<script>' . $loader . '</script>' . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- script built from fixed strings and a JSON-encoded URL.
}
add_action( 'wp_footer', 'wplusui_print_adsense_loader', 98 );

/**
 * Print an ad slot.
 *
 * @param string $key Slot key from wplusui_ad_slots().
 */
function wplusui_ad_slot( $key ) {
	$slots = wplusui_ad_slots();
	if ( ! isset( $slots[ $key ] ) ) {
		return;
	}
	list( $id, , $class, $versioned ) = $slots[ $key ];
	$code                             = wplusui_ad_markup( get_theme_mod( "wplusui_ad_$key", '' ) );

	// An empty slot prints nothing at all: no frame, no text, no space.
	if ( '' === $code ) {
		return;
	}

	$data_version = $versioned ? ' data-version="2"' : '';
	$classes      = implode( ' ', array_filter( array( 'adB', $class, 'is-live' ) ) );
	echo '<div class="widget LinkList show-if-js"' . $data_version . ' id="' . esc_attr( $id ) . '">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo '<div class="' . esc_attr( $classes ) . '">' . $code . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ad code is trusted admin input.
	echo '</div>';
}

/**
 * Sanitize code fields: only users who may post unfiltered HTML can store scripts.
 *
 * @param string $value Submitted value.
 * @return string
 */
function wplusui_sanitize_code( $value ) {
	return current_user_can( 'unfiltered_html' ) ? (string) $value : wp_kses_post( (string) $value );
}

/**
 * Customizer: ads and custom code.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function wplusui_ads_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'wplusui_ads',
		array(
			'title'       => __( 'WPlus UI: Ads', 'wplus-ui' ),
			'description' => __( 'Enter your AdSense publisher ID once, then fill the slots from the top of the page down: an ad unit number, AdSense code, any HTML, or an image address. Empty slots print nothing unless "Show ad placeholders" is ticked.', 'wplus-ui' ),
			'priority'    => 161,
		)
	);

	$wp_customize->add_setting(
		'wplusui_adsense_id',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'wplusui_adsense_id',
		array(
			'label'       => __( 'Google AdSense publisher ID', 'wplus-ui' ),
			'description' => __( 'Enter it once, for example pub-1234567890123456 (AdSense > Account > Account information). Then, in a slot below, write only the ad unit number, for example 1234567890, and the theme builds a responsive ad. A slot also takes the AdSense code, any HTML, or an image address (put the link on the next line to make the image clickable).', 'wplus-ui' ),
			'section'     => 'wplusui_ads',
			'type'        => 'text',
			'input_attrs' => array( 'placeholder' => 'pub-1234567890123456' ),
		)
	);
	$wp_customize->add_setting(
		'wplusui_adsense_lazy',
		array(
			'default'           => true,
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
	$wp_customize->add_control(
		'wplusui_adsense_lazy',
		array(
			'label'   => __( 'Load AdSense after the visitor scrolls or taps (faster first load)', 'wplus-ui' ),
			'section' => 'wplusui_ads',
			'type'    => 'checkbox',
		)
	);

	foreach ( wplusui_ad_slots() as $key => $row ) {
		$wp_customize->add_setting(
			"wplusui_ad_$key",
			array(
				'default'           => '',
				'sanitize_callback' => 'wplusui_sanitize_code',
			)
		);
		$size = wplusui_ad_slot_sizes()[ $key ];
		$wp_customize->add_control(
			"wplusui_ad_$key",
			array(
				'label'       => $row[1],
				/* translators: 1: width in pixels, 2: height in pixels */
				'description' => sprintf( __( 'Recommended picture size: %1$d x %2$d px. Leave empty to hide this slot.', 'wplus-ui' ), $size[0], $size[1] ),
				'section'     => 'wplusui_ads',
				'type'        => 'textarea',
				'input_attrs' => array( 'placeholder' => sprintf( '<img src="https://placehold.co/%1$dx%2$d?text=%1$dx%2$d" width="%1$d" height="%2$d" alt="">', $size[0], $size[1] ) ),
			)
		);
	}

	$wp_customize->add_setting(
		'wplusui_ad_in_article',
		array(
			'default'           => '',
			'sanitize_callback' => 'wplusui_sanitize_code',
		)
	);
	$wp_customize->add_control(
		'wplusui_ad_in_article',
		array(
			'label'       => __( 'In-article ad (single posts)', 'wplus-ui' ),
			'section'     => 'wplusui_ads',
			'type'        => 'textarea',
			'input_attrs' => array( 'placeholder' => '1234567890   |   <ins class="adsbygoogle" ...>   |   https://example.com/banner.jpg' ),
		)
	);
	$wp_customize->add_setting(
		'wplusui_ad_in_article_after',
		array(
			'default'           => 3,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		'wplusui_ad_in_article_after',
		array(
			'label'       => __( 'Insert in-article ad after paragraph', 'wplus-ui' ),
			'section'     => 'wplusui_ads',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 30,
			),
		)
	);

	$wp_customize->add_section(
		'wplusui_code',
		array(
			'title'       => __( 'WPlus UI: Header/footer code', 'wplus-ui' ),
			'description' => __( 'Analytics, site verification or other snippets. Printed on every page.', 'wplus-ui' ),
			'priority'    => 162,
		)
	);
	foreach ( array(
		'wplusui_head_code'   => __( 'Code before </head>', 'wplus-ui' ),
		'wplusui_footer_code' => __( 'Code before </body>', 'wplus-ui' ),
	) as $id => $label ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => '',
				'sanitize_callback' => 'wplusui_sanitize_code',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $label,
				'section' => 'wplusui_code',
				'type'    => 'textarea',
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_ads_customize_register' );

/**
 * Byte offset just after the closing tag of the Nth paragraph that sits at the top level of the
 * content (paragraphs inside groups, quotes, lists or accordions are not counted, so the ad never
 * lands inside another block).
 *
 * @param string $html Post content.
 * @param int    $n    Paragraph number (1 = first).
 * @return int|false Offset, or false when the content has fewer paragraphs.
 */
function wplusui_nth_top_level_paragraph_end( $html, $n ) {
	$void  = array( 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr' );
	$depth = 0;
	$count = 0;
	if ( ! preg_match_all( '#<(/?)([a-z][a-z0-9-]*)\b[^>]*?(/?)>#i', $html, $m, PREG_SET_ORDER | PREG_OFFSET_CAPTURE ) ) {
		return false;
	}
	foreach ( $m as $tag ) {
		$name = strtolower( $tag[2][0] );
		if ( in_array( $name, $void, true ) || '/' === $tag[3][0] ) {
			continue;
		}
		if ( '/' === $tag[1][0] ) {
			--$depth;
			if ( 0 === $depth && 'p' === $name && ++$count === $n ) {
				return $tag[0][1] + strlen( $tag[0][0] );
			}
		} else {
			++$depth;
		}
	}
	return false;
}

/**
 * Insert the in-article ad after the Nth paragraph of single posts.
 *
 * @param string $content Post content.
 * @return string
 */
function wplusui_insert_in_article_ad( $content ) {
	if ( ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() ) {
		return $content;
	}
	$code = wplusui_ad_markup( get_theme_mod( 'wplusui_ad_in_article', '' ) );
	if ( '' === $code ) {
		return $content;
	}
	$after = max( 1, (int) get_theme_mod( 'wplusui_ad_in_article_after', 3 ) );
	$at    = wplusui_nth_top_level_paragraph_end( $content, $after );
	if ( false === $at ) {
		return $content;
	}
	return substr( $content, 0, $at ) . '<div class="adB is-live">' . $code . '</div>' . substr( $content, $at );
}
add_filter( 'the_content', 'wplusui_insert_in_article_ad', 20 );

/**
 * Print the custom head/footer code.
 *
 * @param string $mod Theme mod name.
 */
function wplusui_print_custom_code( $mod ) {
	if ( is_customize_preview() ) {
		return;
	}
	$code = trim( (string) get_theme_mod( $mod, '' ) );
	if ( '' !== $code ) {
		echo wplusui_consent_gate_scripts( $code ) . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- trusted admin input.
	}
}
add_action(
	'wp_head',
	function () {
		wplusui_print_custom_code( 'wplusui_head_code' );
	},
	99
);
add_action(
	'wp_footer',
	function () {
		wplusui_print_custom_code( 'wplusui_footer_code' );
	},
	99
);
