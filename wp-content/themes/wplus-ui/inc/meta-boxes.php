<?php
/**
 * [pu_tabs] shortcode — reproduces the checkbox-hack tab markup from
 * the original Plus UI markup (div.tabs.stick > input[type=radio] +
 * label[data-text] + div.tabC-N), so post authors get the same tabbed-content
 * component by writing:
 *
 *   [pu_tabs]
 *     [pu_tab title="Tab 01"]Content...[/pu_tab]
 *     [pu_tab title="Tab 02"]Content...[/pu_tab]
 *   [/pu_tabs]
 *
 * Split-post pagination needs no shortcode: WordPress's native
 * <!--nextpage--> quicktag + wp_link_pages() (already wired in single.php)
 * is a drop-in replacement for the original Plus UI markup #postSplit.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode(
	'pu_tab',
	function ( $atts, $content = '' ) {
		// Rendered by the pu_tabs parent; a bare [pu_tab] outside [pu_tabs] just shows its content.
		return do_shortcode( $content );
	}
);

add_shortcode(
	'pu_tabs',
	function ( $atts, $content = '' ) {
		if ( ! $content ) {
			return '';
		}

		$pattern = get_shortcode_regex( array( 'pu_tab' ) );
		if ( ! preg_match_all( '/' . $pattern . '/s', $content, $matches, PREG_SET_ORDER ) || empty( $matches ) ) {
			return do_shortcode( $content );
		}

		$tabs = array();
		foreach ( $matches as $m ) {
			$tab_atts = shortcode_parse_atts( $m[3] );
			$tabs[]   = array(
				'title'   => is_array( $tab_atts ) && ! empty( $tab_atts['title'] ) ? $tab_atts['title'] : __( 'Tab', 'wplus-ui' ),
				'content' => $m[5],
			);
		}

		if ( empty( $tabs ) || count( $tabs ) > 5 ) {
			$tabs = array_slice( $tabs, 0, 5 );
		}

		$sticky = ! isset( $atts['sticky'] ) || 'false' !== $atts['sticky'];
		foreach ( $tabs as &$tab ) {
			$tab['content'] = do_shortcode( $tab['content'] );
		}
		unset( $tab );

		return wplusui_render_tabs(
			$tabs,
			array(
				'variant' => 'default',
				'sticky'  => $sticky,
			)
		);
	}
);
