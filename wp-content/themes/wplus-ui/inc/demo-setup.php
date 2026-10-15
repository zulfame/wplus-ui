<?php
/**
 * Appearance > WPlus UI Demo: finish the demo import from the dashboard (no WP-CLI needed).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the admin page.
 */
function wplusui_demo_menu() {
	add_theme_page(
		__( 'WPlus UI Demo', 'wplus-ui' ),
		__( 'WPlus UI Demo', 'wplus-ui' ),
		'manage_options',
		'wplusui-demo',
		'wplusui_demo_page'
	);
}
add_action( 'admin_menu', 'wplusui_demo_menu' );

/**
 * Folder where the downloaded demo pack lives.
 *
 * @return string
 */
function wplusui_demo_upload_dir() {
	$uploads = wp_upload_dir();
	return trailingslashit( $uploads['basedir'] ) . 'wplus-ui-demo';
}

/**
 * Folder with the demo files: the one inside the theme (a copy of the repository has the demo content there) or the
 * downloaded pack. Empty when the demo content is not installed.
 *
 * @return string
 */
function wplusui_demo_dir() {
	foreach ( array( WPLUSUI_DIR . '/demo-content', wplusui_demo_upload_dir() ) as $dir ) {
		if ( is_readable( $dir . '/wplus-ui-demo-content.xml' ) ) {
			return $dir;
		}
	}
	return '';
}

/**
 * Address of the demo content file (for the "download" link of the import step).
 *
 * @return string
 */
function wplusui_demo_xml_url() {
	$dir = wplusui_demo_dir();
	if ( '' === $dir ) {
		return '';
	}
	if ( 0 === strpos( $dir, WPLUSUI_DIR ) ) {
		return WPLUSUI_URI . '/demo-content/wplus-ui-demo-content.xml';
	}
	$uploads = wp_upload_dir();
	return trailingslashit( $uploads['baseurl'] ) . 'wplus-ui-demo/wplus-ui-demo-content.xml';
}

/**
 * Download the demo pack of the latest release, check it against its checksum and unpack it into the uploads folder.
 *
 * @return true|WP_Error
 */
function wplusui_demo_fetch_pack() {
	$release = wplusui_latest_release( true );
	if ( ! $release || '' === $release['demo'] ) {
		return new WP_Error( 'wplusui_demo_none', __( 'The demo content could not be found online right now. Please try again later.', 'wplus-ui' ) );
	}
	require_once ABSPATH . 'wp-admin/includes/file.php';
	$file = download_url( $release['demo'], 120 );
	if ( is_wp_error( $file ) ) {
		return $file;
	}
	if ( '' !== $release['demo_sha'] && ! hash_equals( $release['demo_sha'], (string) hash_file( 'sha256', $file ) ) ) {
		wp_delete_file( $file );
		return new WP_Error( 'wplusui_checksum', __( 'The downloaded demo file does not match its checksum, so it was not used.', 'wplus-ui' ) );
	}
	if ( ! WP_Filesystem() ) {
		wp_delete_file( $file );
		return new WP_Error( 'wplusui_demo_fs', __( 'WordPress cannot write files here. Check the permissions of the uploads folder.', 'wplus-ui' ) );
	}
	global $wp_filesystem;
	$tmp    = trailingslashit( get_temp_dir() ) . 'wplusui-demo-' . wp_generate_password( 8, false );
	$result = unzip_file( $file, $tmp );
	wp_delete_file( $file );
	if ( is_wp_error( $result ) ) {
		return $result;
	}
	$source = $tmp . '/wplus-ui-demo';
	$dest   = wplusui_demo_upload_dir();
	if ( ! is_readable( $source . '/wplus-ui-demo-content.xml' ) || ! is_readable( $source . '/import-demo.php' ) ) {
		$wp_filesystem->delete( $tmp, true );
		return new WP_Error( 'wplusui_demo_bad', __( 'The demo file is not complete.', 'wplus-ui' ) );
	}
	if ( is_dir( $dest ) ) {
		$wp_filesystem->delete( $dest, true );
	}
	wp_mkdir_p( $dest );
	$copied = copy_dir( $source, $dest );
	$wp_filesystem->delete( $tmp, true );
	return is_wp_error( $copied ) ? $copied : true;
}

/**
 * The "Download demo content" button.
 */
function wplusui_demo_download_action() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You are not allowed to do this.', 'wplus-ui' ), 403 );
	}
	check_admin_referer( 'wplusui_demo_download' );
	$result = wplusui_demo_fetch_pack();
	set_transient( 'wplusui_demo_notice_' . get_current_user_id(), is_wp_error( $result ) ? array( 'error', $result->get_error_message() ) : array( 'success', __( 'The demo content is ready.', 'wplus-ui' ) ), 120 );
	wp_safe_redirect( admin_url( 'themes.php?page=wplusui-demo' ) );
	exit;
}
add_action( 'admin_post_wplusui_demo_download', 'wplusui_demo_download_action' );

/**
 * How many items each demo menu has. Used to tell an untouched demo menu from one that an import doubled.
 *
 * @return array<string,int>
 */
function wplusui_demo_menu_sizes() {
	return array(
		'Primary Menu' => 15,
		'Quick Links'  => 10,
	);
}

/**
 * Whether a list of imported posts is the demo content of this theme (its posts carry the demo placeholder address).
 *
 * @param array $posts Posts of the import file.
 * @return bool
 */
function wplusui_demo_is_demo_import( $posts ) {
	foreach ( (array) $posts as $post ) {
		if ( isset( $post['guid'] ) && false !== strpos( (string) $post['guid'], 'wplusui-demo.invalid' ) ) {
			return true;
		}
	}
	return false;
}

/**
 * The WordPress Importer skips posts, pages, pictures and categories it already has, but it adds every menu item
 * again, so importing the demo a second time doubled the Primary and Quick Links menus. When the demo file is imported
 * and one of its menus already has items, that menu's items are left out of the import.
 *
 * @param array $posts Posts of the import file.
 * @return array
 */
function wplusui_demo_skip_existing_menu_items( $posts ) {
	if ( ! is_array( $posts ) || ! wplusui_demo_is_demo_import( $posts ) ) {
		return $posts;
	}
	$skip = array();
	foreach ( $posts as $post ) {
		if ( 'nav_menu_item' !== $post['post_type'] ) {
			continue;
		}
		foreach ( (array) $post['terms'] as $term ) {
			if ( 'nav_menu' === $term['domain'] && ! isset( $skip[ $term['slug'] ] ) ) {
				$menu                  = wp_get_nav_menu_object( $term['slug'] );
				$skip[ $term['slug'] ] = $menu && wp_get_nav_menu_items( $menu->term_id, array( 'post_status' => 'any' ) );
			}
		}
	}
	return array_values(
		array_filter(
			$posts,
			function ( $post ) use ( $skip ) {
				if ( 'nav_menu_item' !== $post['post_type'] ) {
					return true;
				}
				foreach ( (array) $post['terms'] as $term ) {
					if ( 'nav_menu' === $term['domain'] && ! empty( $skip[ $term['slug'] ] ) ) {
						return false;
					}
				}
				return true;
			}
		)
	);
}
add_filter( 'wp_import_posts', 'wplusui_demo_skip_existing_menu_items' );

/**
 * Clean up a site whose demo menus an older version of the theme let the importer double: a demo menu that now has
 * exactly two or more times its usual number of items keeps the oldest copies (the ones the setup has worked on).
 *
 * @return int How many items were removed.
 */
function wplusui_demo_remove_duplicate_menu_items() {
	if ( ! get_page_by_path( 'ui-components-and-typography', OBJECT, 'post' ) ) {
		return 0;
	}
	$removed = 0;
	foreach ( wplusui_demo_menu_sizes() as $name => $size ) {
		$menu = wp_get_nav_menu_object( $name );
		if ( ! $menu ) {
			continue;
		}
		$items = wp_get_nav_menu_items( $menu->term_id, array( 'post_status' => 'any' ) );
		if ( ! $items || count( $items ) <= $size || 0 !== count( $items ) % $size ) {
			continue;
		}
		usort(
			$items,
			function ( $a, $b ) {
				return $a->ID <=> $b->ID;
			}
		);
		foreach ( array_slice( $items, $size ) as $copy ) {
			wp_delete_post( $copy->ID, true );
			++$removed;
		}
	}
	return $removed;
}

/**
 * Once per theme version, clean up a site whose demo menus were already doubled by an earlier import.
 */
function wplusui_demo_menu_cleanup_once() {
	if ( get_option( 'wplusui_demo_menu_cleanup' ) === WPLUSUI_VERSION || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	wplusui_demo_remove_duplicate_menu_items();
	update_option( 'wplusui_demo_menu_cleanup', WPLUSUI_VERSION, false );
}
add_action( 'admin_init', 'wplusui_demo_menu_cleanup_once' );

/**
 * Run the demo setup script and return its output.
 *
 * @return string
 */
function wplusui_demo_run_setup() {
	$dir = wplusui_demo_dir();
	if ( '' === $dir || ! is_readable( $dir . '/import-demo.php' ) ) {
		return __( 'The demo content is not installed yet. Download it first.', 'wplus-ui' );
	}
	ob_start();
	include $dir . '/import-demo.php';
	return trim( wp_strip_all_tags( ob_get_clean() ) );
}

/**
 * Render the admin page.
 */
function wplusui_demo_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$notice = get_transient( 'wplusui_demo_notice_' . get_current_user_id() );
	if ( $notice ) {
		delete_transient( 'wplusui_demo_notice_' . get_current_user_id() );
	}
	$message = '';
	if ( isset( $_POST['wplusui_demo_run'] ) ) {
		check_admin_referer( 'wplusui_demo_run' );
		$message = wplusui_demo_run_setup();
	}

	$xml_url    = wplusui_demo_xml_url();
	$importer   = admin_url( 'import.php' );
	$has_import = (bool) get_page_by_path( 'ui-components-and-typography', OBJECT, 'post' );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'WPlus UI Demo', 'wplus-ui' ); ?></h1>
		<?php if ( $notice ) : ?>
		<div class="notice notice-<?php echo 'error' === $notice[0] ? 'error' : 'success'; ?>"><p><?php echo esc_html( $notice[1] ); ?></p></div>
		<?php endif; ?>
		<?php if ( $message ) : ?>
		<div class="notice notice-success"><p><?php echo esc_html( $message ); ?></p></div>
		<?php endif; ?>
		<?php if ( '' === $xml_url ) : ?>
		<p><?php esc_html_e( 'The demo content (sample posts and pictures, about 3 MB) is not part of the theme, to keep the theme small. It is downloaded once, and only when you press the button.', 'wplus-ui' ); ?></p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="wplusui_demo_download" />
			<?php wp_nonce_field( 'wplusui_demo_download' ); ?>
			<?php submit_button( __( 'Download demo content', 'wplus-ui' ), 'primary', 'submit', false ); ?>
		</form>
		<?php else : ?>
		<ol>
			<li>
				<?php
				printf(
					/* translators: 1: link to the XML file, 2: link to Tools > Import */
					wp_kses_post( __( 'Download the <a href="%1$s" download>demo content file</a>, then open <a href="%2$s">Tools &rarr; Import</a>, install the WordPress Importer and import it. Assign the posts to your user and leave "Download and import file attachments" unticked.', 'wplus-ui' ) ),
					esc_url( $xml_url ),
					esc_url( $importer )
				);
				?>
				<?php if ( $has_import ) : ?>
				<strong><?php esc_html_e( 'Demo posts found.', 'wplus-ui' ); ?></strong>
				<?php endif; ?>
			</li>
			<li><?php esc_html_e( 'Press the button below. It adds the demo pictures to the media library, assigns the menus and footer widgets, applies the Customizer settings and sets the sticky and featured posts. It is safe to run more than once.', 'wplus-ui' ); ?></li>
		</ol>
		<form method="post">
			<?php wp_nonce_field( 'wplusui_demo_run' ); ?>
			<?php submit_button( __( 'Finish demo setup', 'wplus-ui' ), 'primary', 'wplusui_demo_run' ); ?>
		</form>
		<p class="description"><?php esc_html_e( 'This also sets "Blog pages show at most" to 6 and removes the default "Hello world!" post and sample page.', 'wplus-ui' ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}
