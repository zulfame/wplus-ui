<?php
/**
 * Replicates the theme's checkbox-hack dropdown menu markup
 * using
 * wp_nav_menu() + real menu items instead of hand-edited HTML.
 *
 * A handful of the original demo's per-item visual flourishes have no WP
 * menu-item field of their own, so they're driven by "CSS Classes" set on
 * the item in Appearance > Menus (enable via Screen Options):
 *   - "nt"          notification dot on the item
 *   - "br"          divider line drawn after the item
 *   - "mr"          dropdown starts pre-opened ("More..." style)
 *   - "new" / "free" small badge after the label (CSS content: var(--m-new/free))
 *   - "ico-about" / "ico-contact"   swaps the default folder icon
 * The "WPlus UI icon" field of each item (inc/nav-icon-library.php), or an "ico-<name>" class such as "ico-home",
 * overrides the icon at any level ("ico-none" removes it).
 * A top-level Custom Link titled --- draws a divider line (also in the Customizer menu editor).
 * The item for the current page (and its parents) gets the "active" class.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Walker that prints the theme's checkbox-hack dropdown menu markup.
 */
class Wplusui_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * Counter for dropdown checkbox IDs.
	 *
	 * @var int
	 */
	private static $checkbox_index = 0;

	/**
	 * True while rendering the children of a "More..." (mr) group: those get icons, the group label does not.
	 *
	 * @var bool
	 */
	private $in_mr = false;

	/**
	 * Start a sub menu list.
	 *
	 * @param string        $output Output.
	 * @param int           $depth Depth.
	 * @param stdClass|null $args Arguments.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '<ul>';
	}

	/**
	 * End a sub menu list.
	 *
	 * @param string        $output Output.
	 * @param int           $depth Depth.
	 * @param stdClass|null $args Arguments.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '</ul>';
	}

	/**
	 * Start a menu item.
	 *
	 * @param string        $output Output.
	 * @param WP_Post       $item Menu item.
	 * @param int           $depth Depth.
	 * @param stdClass|null $args Arguments.
	 * @param int           $id Item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes = array_merge( $classes, wplusui_nav_option_classes( $item->ID ) );
		if ( 0 === $depth && '---' === trim( $item->title ) ) {
			// A Custom Link titled --- is a divider line.
			$output .= '<li class="br" role="separator" aria-hidden="true">';
			return;
		}
		$li_classes = array_intersect( $classes, array( 'nt', 'br', 'mr' ) );
		$is_current = in_array( 'current-menu-item', $classes, true );
		if ( $is_current || in_array( 'current-menu-ancestor', $classes, true ) || in_array( 'current-menu-parent', $classes, true ) ) {
			$li_classes[] = 'active';
		}
		$class_str = $li_classes ? ' class="' . esc_attr( implode( ' ', $li_classes ) ) . '"' : '';

		$has_children = in_array( 'menu-item-has-children', $classes, true );
		$is_mr        = $has_children && in_array( 'mr', $classes, true );
		if ( '' !== wplusui_nav_icon_key( $classes, $item->ID ) ) {
			$icon = wplusui_nav_icon( $classes, $item->ID );
			if ( $is_mr && 0 === $depth ) {
				$this->in_mr = true;
			}
		} elseif ( $is_mr ) {
			$icon = '';
			if ( 0 === $depth ) {
				$this->in_mr = true;
			}
		} elseif ( $depth > 0 ) {
			$icon = $this->in_mr ? wplusui_nav_icon( $classes ) : '';
		} else {
			$icon = wplusui_nav_icon( $classes );
		}
		$badge_class = in_array( 'new', $classes, true ) ? 'new' : ( in_array( 'free', $classes, true ) ? 'free' : '' );

		$output .= '<li' . $class_str . '>';

		if ( $has_children ) {
			++self::$checkbox_index;
			$checkbox_id = 'nav-drop-' . self::$checkbox_index;
			$checked     = ( in_array( 'mr', $classes, true ) || in_array( 'open', $classes, true ) || in_array( 'current-menu-ancestor', $classes, true ) || in_array( 'current-menu-parent', $classes, true ) ) ? ' checked="checked"' : '';
			$output     .= '<input id="' . esc_attr( $checkbox_id ) . '"' . $checked . ' type="checkbox" />';
			$output     .= '<label for="' . esc_attr( $checkbox_id ) . '">';
			$output     .= $icon;
			$output     .= '<span>' . esc_html( $item->title ) . '</span>';
			$output     .= '</label>';
		} else {
			$attributes = '';
			if ( ! empty( $item->attr_title ) ) {
				$attributes .= ' aria-label="' . esc_attr( $item->attr_title ) . '"';
			} else {
				$attributes .= ' aria-label="' . esc_attr( $item->title ) . '"';
			}
			if ( ! empty( $item->target ) ) {
				$attributes .= ' target="' . esc_attr( $item->target ) . '"';
			}
			if ( ! empty( $item->xfn ) ) {
				$attributes .= ' rel="' . esc_attr( $item->xfn ) . '"';
			}
			$attributes .= ' href="' . esc_url( $item->url ) . '" itemprop="url"';
			if ( $is_current ) {
				$attributes .= ' aria-current="page"';
			}

			$output    .= '<a' . $attributes . '>';
			$output    .= $icon;
			$span_class = $badge_class ? ' class="' . esc_attr( $badge_class ) . '"' : '';
			$output    .= '<span' . $span_class . ' itemprop="name">' . esc_html( $item->title ) . '</span>';
			$output    .= '</a>';
		}
	}

	/**
	 * End a menu item.
	 *
	 * @param string        $output Output.
	 * @param WP_Post       $item Menu item.
	 * @param int           $depth Depth.
	 * @param stdClass|null $args Arguments.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		if ( 0 === $depth ) {
			$this->in_mr = false;
		}
		$output .= '</li>';
	}
}
