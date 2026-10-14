<?php
/**
 * Icon library for menu items and the "Icon" field in Appearance > Menus.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Outline icons (24x24 viewBox) offered for menu items: key => array( label, inner markup ).
 *
 * @return array<string,array{0:string,1:string}>
 */
function wplusui_nav_icon_library() {
	$icons = array(
		'home'      => array( __( 'Home', 'wplus-ui' ), '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>' ),
		'user'      => array( __( 'User', 'wplus-ui' ), '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>' ),
		'users'     => array( __( 'Users', 'wplus-ui' ), '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 2.9-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6"/><path d="M18 14.7c2.2.6 3.5 2.3 3.5 5.3"/>' ),
		'mail'      => array( __( 'Mail', 'wplus-ui' ), '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 6 8-6"/>' ),
		'phone'     => array( __( 'Phone', 'wplus-ui' ), '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>' ),
		'map-pin'   => array( __( 'Location', 'wplus-ui' ), '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>' ),
		'star'      => array( __( 'Star', 'wplus-ui' ), '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>' ),
		'heart'     => array( __( 'Heart', 'wplus-ui' ), '<path d="M12 20s-8-4.9-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.1 12 20 12 20z"/>' ),
		'bookmark'  => array( __( 'Bookmark', 'wplus-ui' ), '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"/>' ),
		'tag'       => array( __( 'Tag', 'wplus-ui' ), '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>' ),
		'file'      => array( __( 'Document', 'wplus-ui' ), '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>' ),
		'image'     => array( __( 'Image', 'wplus-ui' ), '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>' ),
		'video'     => array( __( 'Video', 'wplus-ui' ), '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9.5 5 2.5-5 2.5z"/>' ),
		'music'     => array( __( 'Music', 'wplus-ui' ), '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>' ),
		'code'      => array( __( 'Code', 'wplus-ui' ), '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m14 5-4 14"/>' ),
		'terminal'  => array( __( 'Terminal', 'wplus-ui' ), '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 10 3 2-3 2"/><path d="M12.5 15H17"/>' ),
		'settings'  => array( __( 'Settings', 'wplus-ui' ), '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>' ),
		'search'    => array( __( 'Search', 'wplus-ui' ), '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>' ),
		'cart'      => array( __( 'Cart', 'wplus-ui' ), '<path d="M3 4h2.5l2.2 11h10.6l2-8H6.5"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/>' ),
		'bag'       => array( __( 'Shopping bag', 'wplus-ui' ), '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>' ),
		'card'      => array( __( 'Payment', 'wplus-ui' ), '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/>' ),
		'calendar'  => array( __( 'Calendar', 'wplus-ui' ), '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>' ),
		'clock'     => array( __( 'Clock', 'wplus-ui' ), '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' ),
		'globe'     => array( __( 'Globe', 'wplus-ui' ), '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>' ),
		'link'      => array( __( 'Link', 'wplus-ui' ), '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>' ),
		'info'      => array( __( 'Info', 'wplus-ui' ), '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.01"/>' ),
		'help'      => array( __( 'Help', 'wplus-ui' ), '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><path d="M12 17v.01"/>' ),
		'bell'      => array( __( 'Notifications', 'wplus-ui' ), '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7.5 2 7.5H4S6 15 6 9z"/><path d="M10 20a2 2 0 0 0 4 0"/>' ),
		'rss'       => array( __( 'RSS', 'wplus-ui' ), '<path d="M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9"/><circle cx="5" cy="19" r="1.5"/>' ),
		'download'  => array( __( 'Download', 'wplus-ui' ), '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>' ),
		'grid'      => array( __( 'Grid', 'wplus-ui' ), '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>' ),
		'layers'    => array( __( 'Layers', 'wplus-ui' ), '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>' ),
		'award'     => array( __( 'Award', 'wplus-ui' ), '<circle cx="12" cy="9" r="6"/><path d="m8.5 14 -1.5 7 5-3 5 3-1.5-7"/>' ),
		'briefcase' => array( __( 'Briefcase', 'wplus-ui' ), '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>' ),
		'book'      => array( __( 'Book', 'wplus-ui' ), '<path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H3zM21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h7z"/>' ),
		'camera'    => array( __( 'Camera', 'wplus-ui' ), '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>' ),
		'lock'      => array( __( 'Lock', 'wplus-ui' ), '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>' ),
		'shield'    => array( __( 'Security', 'wplus-ui' ), '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>' ),
		'bolt'      => array( __( 'Lightning', 'wplus-ui' ), '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>' ),
		'trend'     => array( __( 'Trends', 'wplus-ui' ), '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>' ),
		'chart'     => array( __( 'Chart', 'wplus-ui' ), '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>' ),
		'wrench'    => array( __( 'Tools', 'wplus-ui' ), '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>' ),
		'coffee'    => array( __( 'Coffee', 'wplus-ui' ), '<path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>' ),
		'chat'      => array( __( 'Chat', 'wplus-ui' ), '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>' ),
		'folder'    => array( __( 'Folder (default)', 'wplus-ui' ), '' ),
	);
	return apply_filters( 'wplusui_nav_icon_library', $icons );
}

/**
 * SVG markup of a library icon, or an empty string.
 *
 * @param string $key Icon key.
 * @return string
 */
function wplusui_nav_library_icon( $key ) {
	$icons = wplusui_nav_icon_library();
	if ( empty( $icons[ $key ][1] ) ) {
		return '';
	}
	return '<svg class="line" viewBox="0 0 24 24">' . $icons[ $key ][1] . '</svg>';
}

/**
 * Add the Icon field to every menu item in Appearance > Menus.
 *
 * @param int $item_id Menu item ID.
 */
function wplusui_menu_item_icon_field( $item_id ) {
	$current = (string) get_post_meta( $item_id, '_wplusui_menu_icon', true );
	$icons   = wplusui_nav_icon_library();
	?>
	<p class="field-wplusui-icon description description-wide">
		<label for="edit-menu-item-wplusui-icon-<?php echo esc_attr( $item_id ); ?>">
			<?php esc_html_e( 'WPlus UI icon', 'wplus-ui' ); ?><br />
			<select class="widefat" id="edit-menu-item-wplusui-icon-<?php echo esc_attr( $item_id ); ?>" name="menu-item-wplusui-icon[<?php echo esc_attr( $item_id ); ?>]">
				<option value=""><?php esc_html_e( 'Automatic (theme default)', 'wplus-ui' ); ?></option>
				<option value="none" <?php selected( $current, 'none' ); ?>><?php esc_html_e( 'No icon', 'wplus-ui' ); ?></option>
				<?php foreach ( $icons as $key => $row ) : ?>
				<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $current, $key ); ?>><?php echo esc_html( $row[0] ); ?></option>
				<?php endforeach; ?>
			</select>
		</label>
		<span class="description"><?php esc_html_e( 'In the Customizer menu editor, add the CSS class ico-home, ico-mail, ico-none, etc. instead.', 'wplus-ui' ); ?></span>
	</p>
	<?php
	$flags = (array) get_post_meta( $item_id, '_wplusui_menu_flags', true );
	$badge = (string) get_post_meta( $item_id, '_wplusui_menu_badge', true );
	?>
	<fieldset class="field-wplusui-flags description description-wide">
		<legend><?php esc_html_e( 'WPlus UI menu options', 'wplus-ui' ); ?></legend>
		<label><input type="checkbox" name="menu-item-wplusui-flag[<?php echo esc_attr( $item_id ); ?>][]" value="divider" <?php checked( in_array( 'divider', $flags, true ) ); ?> /> <?php esc_html_e( 'Divider line after this item', 'wplus-ui' ); ?></label><br />
		<label><input type="checkbox" name="menu-item-wplusui-flag[<?php echo esc_attr( $item_id ); ?>][]" value="dot" <?php checked( in_array( 'dot', $flags, true ) ); ?> /> <?php esc_html_e( 'Notification dot', 'wplus-ui' ); ?></label><br />
		<label><input type="checkbox" name="menu-item-wplusui-flag[<?php echo esc_attr( $item_id ); ?>][]" value="open" <?php checked( in_array( 'open', $flags, true ) ); ?> /> <?php esc_html_e( 'Sub-menu starts open (for items with sub-items)', 'wplus-ui' ); ?></label><br />
		<label><input type="checkbox" name="menu-item-wplusui-flag[<?php echo esc_attr( $item_id ); ?>][]" value="group" <?php checked( in_array( 'group', $flags, true ) ); ?> /> <?php esc_html_e( 'Flat "More..." group instead of a sub-menu (small label, no indent, always open)', 'wplus-ui' ); ?></label><br />
		<label><?php esc_html_e( 'Badge', 'wplus-ui' ); ?>
			<select name="menu-item-wplusui-badge[<?php echo esc_attr( $item_id ); ?>]">
				<option value=""><?php esc_html_e( 'None', 'wplus-ui' ); ?></option>
				<option value="new" <?php selected( $badge, 'new' ); ?>><?php esc_html_e( 'New', 'wplus-ui' ); ?></option>
				<option value="free" <?php selected( $badge, 'free' ); ?>><?php esc_html_e( 'Free', 'wplus-ui' ); ?></option>
			</select>
		</label>
		<span class="description"><?php esc_html_e( 'Tip: a Custom Link titled --- (three hyphens) draws a divider line on its own. In the Customizer, use the CSS classes br, nt, open, mr, new or free.', 'wplus-ui' ); ?></span>
	</fieldset>
	<?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'wplusui_menu_item_icon_field' );

/**
 * Save the icon and menu option fields.
 *
 * @param int $menu_id         Menu ID.
 * @param int $menu_item_db_id Menu item ID.
 */
function wplusui_menu_item_icon_save( $menu_id, $menu_item_db_id ) {
	unset( $menu_id );
	// phpcs:disable WordPress.Security.NonceVerification.Missing -- nav-menus.php verifies the nonce before wp_update_nav_menu_item runs.
	if ( ! isset( $_POST['menu-item-wplusui-icon'][ $menu_item_db_id ] ) ) {
		return; // Saved from somewhere else (Customizer, import): keep what is stored.
	}
	$icon = sanitize_key( wp_unslash( $_POST['menu-item-wplusui-icon'][ $menu_item_db_id ] ) );
	if ( '' !== $icon && ( 'none' === $icon || isset( wplusui_nav_icon_library()[ $icon ] ) ) ) {
		update_post_meta( $menu_item_db_id, '_wplusui_menu_icon', $icon );
	} else {
		delete_post_meta( $menu_item_db_id, '_wplusui_menu_icon' );
	}

	$flags_in = isset( $_POST['menu-item-wplusui-flag'][ $menu_item_db_id ] ) ? array_map( 'sanitize_key', (array) wp_unslash( $_POST['menu-item-wplusui-flag'][ $menu_item_db_id ] ) ) : array();
	$flags    = array_values( array_unique( array_intersect( $flags_in, array( 'divider', 'dot', 'open', 'group' ) ) ) );
	if ( $flags ) {
		update_post_meta( $menu_item_db_id, '_wplusui_menu_flags', $flags );
	} else {
		delete_post_meta( $menu_item_db_id, '_wplusui_menu_flags' );
	}

	$badge = isset( $_POST['menu-item-wplusui-badge'][ $menu_item_db_id ] ) ? sanitize_key( wp_unslash( $_POST['menu-item-wplusui-badge'][ $menu_item_db_id ] ) ) : '';
	if ( in_array( $badge, array( 'new', 'free' ), true ) ) {
		update_post_meta( $menu_item_db_id, '_wplusui_menu_badge', $badge );
	} else {
		delete_post_meta( $menu_item_db_id, '_wplusui_menu_badge' );
	}
	// phpcs:enable WordPress.Security.NonceVerification.Missing
}
add_action( 'wp_update_nav_menu_item', 'wplusui_menu_item_icon_save', 10, 2 );

/**
 * CSS classes the menu options of an item stand for, merged into the item's own classes.
 *
 * @param int $item_id Menu item ID.
 * @return string[]
 */
function wplusui_nav_option_classes( $item_id ) {
	$classes = array();
	$map     = array(
		'divider' => 'br',
		'dot'     => 'nt',
		'open'    => 'open',
		'group'   => 'mr',
	);
	foreach ( (array) get_post_meta( $item_id, '_wplusui_menu_flags', true ) as $flag ) {
		if ( isset( $map[ $flag ] ) ) {
			$classes[] = $map[ $flag ];
		}
	}
	$badge = (string) get_post_meta( $item_id, '_wplusui_menu_badge', true );
	if ( in_array( $badge, array( 'new', 'free' ), true ) ) {
		$classes[] = $badge;
	}
	return $classes;
}
