<?php
/**
 * JSON-LD structured data: WebSite on the front page, Article and BreadcrumbList
 * on posts, BreadcrumbList on pages, and FAQPage when a post contains an
 * accordion group. Skipped when an SEO plugin is active.
 *
 * @package wplus-ui
 */

/**
 * Question/answer pairs from the accordion-group blocks of a post.
 *
 * @param array[] $blocks Parsed blocks.
 * @return array[] List of question and answer text.
 */
function wplusui_schema_faq_items( $blocks ) {
	$items = array();
	foreach ( $blocks as $block ) {
		if ( 'core/group' === $block['blockName'] && false !== strpos( (string) ( $block['attrs']['className'] ?? '' ), 'is-style-accordion-group' ) ) {
			foreach ( $block['innerBlocks'] as $details ) {
				if ( 'core/details' !== $details['blockName'] ) {
					continue;
				}
				$question = '';
				if ( preg_match( '#<summary[^>]*>(.*?)</summary>#s', (string) $details['innerHTML'], $found ) ) {
					$question = trim( wp_strip_all_tags( $found[1] ) );
				}
				$answer = trim( wp_strip_all_tags( implode( ' ', array_map( 'render_block', $details['innerBlocks'] ) ) ) );
				if ( '' !== $question && '' !== $answer ) {
					$items[] = array(
						'q' => $question,
						'a' => $answer,
					);
				}
			}
		} elseif ( ! empty( $block['innerBlocks'] ) ) {
			$items = array_merge( $items, wplusui_schema_faq_items( $block['innerBlocks'] ) );
		}
	}
	return $items;
}

/**
 * Schema graph for the current request.
 *
 * @return array[] Graph nodes.
 */
function wplusui_schema_graph() {
	$home  = home_url( '/' );
	$graph = array();

	$publisher = array(
		'@type' => 'Organization',
		'@id'   => $home . '#organization',
		'name'  => get_bloginfo( 'name' ),
		'url'   => $home,
	);
	if ( has_custom_logo() ) {
		$publisher['logo'] = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
	}
	$graph[] = $publisher;

	if ( is_front_page() ) {
		$graph[] = array(
			'@type'           => 'WebSite',
			'@id'             => $home . '#website',
			'url'             => $home,
			'name'            => get_bloginfo( 'name' ),
			'inLanguage'      => get_bloginfo( 'language' ),
			'publisher'       => array( '@id' => $home . '#organization' ),
			'potentialAction' => array(
				'@type'       => 'SearchAction',
				'target'      => $home . '?s={search_term_string}',
				'query-input' => 'required name=search_term_string',
			),
		);
	}

	if ( is_singular() ) {
		$url   = get_permalink();
		$crumb = array(
			array(
				'@type'    => 'ListItem',
				'position' => 1,
				'name'     => __( 'Home', 'wplus-ui' ),
				'item'     => $home,
			),
		);
		if ( is_singular( 'post' ) ) {
			$cats = get_the_category();
			if ( $cats ) {
				$crumb[] = array(
					'@type'    => 'ListItem',
					'position' => 2,
					'name'     => $cats[0]->name,
					'item'     => get_category_link( $cats[0] ),
				);
			}
		}
		$crumb[] = array(
			'@type'    => 'ListItem',
			'position' => count( $crumb ) + 1,
			'name'     => get_the_title(),
		);
		$graph[] = array(
			'@type'           => 'BreadcrumbList',
			'itemListElement' => $crumb,
		);

		if ( is_singular( 'post' ) ) {
			$article = array(
				'@type'            => 'Article',
				'@id'              => $url . '#article',
				'mainEntityOfPage' => $url,
				'headline'         => wp_strip_all_tags( get_the_title() ),
				'datePublished'    => get_the_date( 'c' ),
				'dateModified'     => get_the_modified_date( 'c' ),
				'author'           => array(
					'@type' => 'Person',
					'name'  => get_the_author(),
				),
				'publisher'        => array( '@id' => $home . '#organization' ),
				'inLanguage'       => get_bloginfo( 'language' ),
			);
			if ( has_post_thumbnail() ) {
				$article['image'] = get_the_post_thumbnail_url( null, 'full' );
			}
			$graph[] = $article;
		}

		$faq = wplusui_schema_faq_items( parse_blocks( get_post_field( 'post_content' ) ) );
		if ( $faq ) {
			$entities = array();
			foreach ( $faq as $row ) {
				$entities[] = array(
					'@type'          => 'Question',
					'name'           => $row['q'],
					'acceptedAnswer' => array(
						'@type' => 'Answer',
						'text'  => $row['a'],
					),
				);
			}
			$graph[] = array(
				'@type'      => 'FAQPage',
				'mainEntity' => $entities,
			);
		}
	}

	return apply_filters( 'wplusui_schema_graph', $graph );
}

/**
 * Print the JSON-LD block.
 */
function wplusui_print_schema() {
	if ( wplusui_seo_plugin_active() || ! apply_filters( 'wplusui_schema_enabled', true ) || ! ( is_front_page() || is_singular() ) ) {
		return;
	}
	$data = array(
		'@context' => 'https://schema.org',
		'@graph'   => wplusui_schema_graph(),
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . "</script>\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON-encoded with JSON_HEX_TAG.
}
add_action( 'wp_head', 'wplusui_print_schema', 20 );
