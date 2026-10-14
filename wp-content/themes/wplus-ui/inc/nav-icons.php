<?php
/**
 * Menu item icons for the navigation walker.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The icon explicitly chosen for a menu item: its "WPlus UI icon" field, or an
 * "ico-<name>" CSS class (works in the Customizer menu editor too). Empty when
 * the theme should pick the default.
 *
 * @param string[] $classes Menu item CSS classes.
 * @param int      $item_id Menu item ID.
 * @return string Library key, "none", "folder" or "".
 */
function wplusui_nav_icon_key( $classes, $item_id = 0 ) {
	$meta = $item_id ? (string) get_post_meta( $item_id, '_wplusui_menu_icon', true ) : '';
	if ( '' !== $meta ) {
		return $meta;
	}
	$library = wplusui_nav_icon_library();
	foreach ( $classes as $class ) {
		if ( 0 === strpos( $class, 'ico-' ) ) {
			$key = substr( $class, 4 );
			if ( 'none' === $key || isset( $library[ $key ] ) ) {
				return $key;
			}
		}
	}
	return '';
}

/**
 * Icon markup for a menu item.
 *
 * @param string[] $classes Menu item CSS classes.
 * @param int      $item_id Menu item ID (its Icon field overrides the CSS classes).
 * @return string
 */
function wplusui_nav_icon( $classes, $item_id = 0 ) {
	$chosen = wplusui_nav_icon_key( $classes, $item_id );
	if ( 'none' === $chosen ) {
		return '';
	}
	if ( '' !== $chosen && 'folder' !== $chosen ) {
		$svg = wplusui_nav_library_icon( $chosen );
		if ( '' !== $svg ) {
			return $svg;
		}
	}
	if ( 'folder' !== $chosen && in_array( 'ico-about', $classes, true ) ) {
		return '<svg class="line" viewBox="0 0 24 24"><g transform="translate(2.749500, 2.549500)"><path d="M6.809,18.9067 C3.137,18.9067 9.41469125e-14,18.3517 9.41469125e-14,16.1277 C9.41469125e-14,13.9037 3.117,11.8997 6.809,11.8997 C10.481,11.8997 13.617,13.8847 13.617,16.1077 C13.617,18.3307 10.501,18.9067 6.809,18.9067 Z"></path><path d="M6.809,8.728 C9.219,8.728 11.173,6.774 11.173,4.364 C11.173,1.954 9.219,-2.48689958e-14 6.809,-2.48689958e-14 C4.399,-2.48689958e-14 2.44496883,1.954 2.44496883,4.364 C2.436,6.766 4.377,8.72 6.778,8.728 L6.809,8.728 Z"></path><path class="c" d="M14.0517,7.5293 C15.4547,7.1543 16.4887007,5.8753 16.4887007,4.3533 C16.4897,2.7653 15.3627,1.4393 13.8647,1.1323"></path><path class="c" d="M14.7113,11.104 C16.6993,11.104 18.3973,12.452 18.3973,13.655 C18.3973,14.364 17.8123,15.092 16.9223,15.301"></path></g></svg>';
	}
	if ( 'folder' !== $chosen && in_array( 'ico-contact', $classes, true ) ) {
		return '<svg class="line" viewBox="0 0 24 24"><path d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5" stroke-miterlimit="10"></path><path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke-miterlimit="10"></path><path class="c" d="M19.21 14.77L15.6701 18.31C15.5301 18.45 15.4 18.71 15.37 18.9L15.18 20.25C15.11 20.74 15.45 21.0801 15.94 21.0101L17.29 20.82C17.48 20.79 17.75 20.66 17.88 20.52L21.4201 16.9801C22.0301 16.3701 22.3201 15.6601 21.4201 14.7601C20.5301 13.8701 19.82 14.16 19.21 14.77Z" stroke-miterlimit="10"></path><path class="c" d="M18.7001 15.28C19.0001 16.36 19.8401 17.2 20.9201 17.5" stroke-miterlimit="10"></path></svg>';
	}
	if ( 'folder' !== $chosen && in_array( 'ico-none', $classes, true ) ) {
		return '';
	}
	// Default: folder icon, used for most demo items (Sub Menu, Custom Menu, Hidden Menu).
	return '<svg class="line" viewBox="0 0 24 24"><path class="c" d="M8 2H17C19 2 20 3 20 5V6.38" stroke-miterlimit="10"></path><path d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z" stroke-miterlimit="10"></path></svg>';
}
