<?php
/**
 * Theme updates from the GitHub releases of the theme's public repository.
 *
 * WordPress shows "update available" for the theme under Appearance > Themes and on Dashboard > Updates, with a
 * button (and optional automatic updates), and the release notes open in the usual "View version details" window.
 * The latest release is asked from api.github.com at most once every 12 hours (the answer is cached); nothing
 * about the site is sent except its IP address and a user agent with the theme version. Turn it off with
 * `define( 'WPLUSUI_DISABLE_UPDATES', true );` in wp-config.php or the `wplusui_updates_enabled` filter.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether update checks are on.
 *
 * @return bool
 */
function wplusui_updates_enabled() {
	$on = ! ( defined( 'WPLUSUI_DISABLE_UPDATES' ) && WPLUSUI_DISABLE_UPDATES );
	return (bool) apply_filters( 'wplusui_updates_enabled', $on );
}

/**
 * Repository (owner/name) that publishes the releases.
 *
 * @return string
 */
function wplusui_update_repo() {
	return (string) apply_filters( 'wplusui_update_repo', 'zulfame/wplus-ui' );
}

/**
 * Address of the "latest release" answer.
 *
 * @return string
 */
function wplusui_update_api_url() {
	return (string) apply_filters( 'wplusui_update_api_url', 'https://api.github.com/repos/' . wplusui_update_repo() . '/releases/latest' );
}

/**
 * Only theme files that live under this address are ever offered for download.
 *
 * @return string
 */
function wplusui_update_package_prefix() {
	return (string) apply_filters( 'wplusui_update_package_prefix', 'https://github.com/' . wplusui_update_repo() . '/releases/download/' );
}

/**
 * Turn the API answer into the few facts the theme needs, or null when it is not a usable release.
 *
 * @param mixed $data Decoded JSON.
 * @return array<string,string>|null
 */
function wplusui_parse_release( $data ) {
	if ( ! is_array( $data ) || empty( $data['tag_name'] ) || ! empty( $data['draft'] ) || ! empty( $data['prerelease'] ) ) {
		return null;
	}
	$version = ltrim( (string) $data['tag_name'], 'vV' );
	if ( ! preg_match( '/^\d+\.\d+\.\d+$/', $version ) ) {
		return null;
	}
	$package  = '';
	$sha256   = '';
	$demo     = '';
	$demo_sha = '';
	foreach ( (array) ( isset( $data['assets'] ) ? $data['assets'] : array() ) as $asset ) {
		if ( is_array( $asset ) && isset( $asset['name'], $asset['browser_download_url'] ) && 'wplus-ui-' . $version . '.zip' === $asset['name'] ) {
			$package = esc_url_raw( (string) $asset['browser_download_url'] );
			if ( isset( $asset['digest'] ) && preg_match( '/^sha256:([a-f0-9]{64})$/i', (string) $asset['digest'], $m ) ) {
				$sha256 = strtolower( $m[1] );
			}
		}
		if ( is_array( $asset ) && isset( $asset['name'], $asset['browser_download_url'] ) && 'wplus-ui-demo-' . $version . '.zip' === $asset['name'] ) {
			$demo = esc_url_raw( (string) $asset['browser_download_url'] );
			if ( isset( $asset['digest'] ) && preg_match( '/^sha256:([a-f0-9]{64})$/i', (string) $asset['digest'], $m ) ) {
				$demo_sha = strtolower( $m[1] );
			}
		}
	}
	if ( '' !== $demo && 0 !== strpos( $demo, wplusui_update_package_prefix() ) ) {
		$demo     = '';
		$demo_sha = '';
	}
	if ( '' === $package || 0 !== strpos( $package, wplusui_update_package_prefix() ) ) {
		return null;
	}
	return array(
		'checked'   => (string) time(),
		'version'   => $version,
		'package'   => $package,
		'sha256'    => $sha256,
		'demo'      => $demo,
		'demo_sha'  => $demo_sha,
		'notes'     => isset( $data['body'] ) ? (string) $data['body'] : '',
		'published' => isset( $data['published_at'] ) ? (string) $data['published_at'] : '',
		'page'      => isset( $data['html_url'] ) ? esc_url_raw( (string) $data['html_url'] ) : '',
	);
}

/**
 * The latest release, from the cache or (when the cache is empty or $force is set) from GitHub.
 * A failed request is remembered for an hour so a slow or blocked connection does not slow every admin page.
 *
 * @param bool $force Ask GitHub now.
 * @return array<string,string>|null
 */
function wplusui_latest_release( $force = false ) {
	if ( ! wplusui_updates_enabled() ) {
		return null;
	}
	$cached = get_site_transient( 'wplusui_latest_release' );
	// An answer stored by an older version of the theme may lack fields the current code reads: treat it as no answer.
	if ( is_array( $cached ) && array_diff( array( 'checked', 'version', 'package', 'sha256', 'demo', 'demo_sha', 'notes', 'published', 'page' ), array_keys( $cached ) ) ) {
		$cached = false;
	}
	if ( ! $force && false !== $cached ) {
		return is_array( $cached ) ? $cached : null;
	}
	$response = wp_remote_get(
		wplusui_update_api_url(),
		array(
			'timeout'     => 8,
			'redirection' => 3,
			'headers'     => array(
				'Accept'     => 'application/vnd.github+json',
				'User-Agent' => 'WPlusUI/' . WPLUSUI_VERSION,
			),
		)
	);
	$release  = null;
	if ( ! is_wp_error( $response ) && 200 === (int) wp_remote_retrieve_response_code( $response ) ) {
		$release = wplusui_parse_release( json_decode( wp_remote_retrieve_body( $response ), true ) );
	}
	set_site_transient( 'wplusui_latest_release', $release ? $release : 'none', $release ? 12 * HOUR_IN_SECONDS : HOUR_IN_SECONDS );
	return $release;
}

/**
 * Slug of this theme (its folder name).
 *
 * @return string
 */
function wplusui_theme_slug() {
	return basename( WPLUSUI_DIR );
}

/**
 * Address of the release notes window (opened by the "View version details" link).
 *
 * @return string
 */
function wplusui_notes_url() {
	return add_query_arg( 'wplusui-notes', '1', admin_url( 'index.php' ) );
}

/**
 * Tell WordPress about the new version (or that there is none), so the usual update screens and auto-updates work.
 *
 * @param mixed $transient The update_themes site transient being saved.
 * @return mixed
 */
function wplusui_filter_update_themes( $transient ) {
	if ( ! is_object( $transient ) || ! wplusui_updates_enabled() ) {
		return $transient;
	}
	$slug = wplusui_theme_slug();
	if ( ! isset( $transient->checked ) || ! is_array( $transient->checked ) || ! isset( $transient->checked[ $slug ] ) ) {
		return $transient;
	}
	$installed = (string) $transient->checked[ $slug ];
	$release   = wplusui_latest_release();
	$theme     = wp_get_theme( $slug );
	$entry     = array(
		'theme'        => $slug,
		'new_version'  => $installed,
		'url'          => wplusui_notes_url(),
		'package'      => '',
		'requires'     => (string) $theme->get( 'RequiresWP' ),
		'requires_php' => (string) $theme->get( 'RequiresPHP' ),
	);
	if ( ! isset( $transient->response ) || ! is_array( $transient->response ) ) {
		$transient->response = array();
	}
	if ( ! isset( $transient->no_update ) || ! is_array( $transient->no_update ) ) {
		$transient->no_update = array();
	}
	if ( $release && version_compare( $release['version'], $installed, '>' ) ) {
		$entry['new_version']         = $release['version'];
		$entry['package']             = $release['package'];
		$transient->response[ $slug ] = $entry;
		unset( $transient->no_update[ $slug ] );
	} else {
		$transient->no_update[ $slug ] = $entry;
		unset( $transient->response[ $slug ] );
	}
	return $transient;
}
add_filter( 'pre_set_site_transient_update_themes', 'wplusui_filter_update_themes' );

/**
 * Check the downloaded zip against the checksum GitHub published for it before WordPress installs it.
 *
 * @param bool|string|WP_Error $reply   Earlier answer; false when nobody handled the download yet.
 * @param string               $package Address of the package.
 * @return bool|string|WP_Error
 */
function wplusui_verify_download( $reply, $package ) {
	if ( false !== $reply || ! wplusui_updates_enabled() ) {
		return $reply;
	}
	$cached = get_site_transient( 'wplusui_latest_release' );
	if ( ! is_array( $cached ) || ! isset( $cached['package'], $cached['sha256'] ) || $package !== $cached['package'] || '' === $cached['sha256'] ) {
		return $reply;
	}
	$file = download_url( $package );
	if ( is_wp_error( $file ) ) {
		return $file;
	}
	if ( ! hash_equals( $cached['sha256'], (string) hash_file( 'sha256', $file ) ) ) {
		wp_delete_file( $file );
		return new WP_Error( 'wplusui_checksum', __( 'The downloaded theme file does not match its checksum, so it was not installed.', 'wplus-ui' ) );
	}
	return $file;
}
add_filter( 'upgrader_pre_download', 'wplusui_verify_download', 10, 2 );

/**
 * A small, safe subset of Markdown (headings, bullet lists, bold, code, links) for the release notes.
 *
 * @param string $text Markdown from the release.
 * @return string HTML.
 */
function wplusui_notes_html( $text ) {
	$html    = '';
	$in_list = false;
	foreach ( preg_split( '/\R/', (string) $text ) as $line ) {
		$line = rtrim( $line );
		if ( preg_match( '/^\s*[-*]\s+(.*)$/', $line, $m ) ) {
			$label = '';
			if ( preg_match( '/^(New|Fix|Improved|Safe)\s*:\s*(.*)$/', $m[1], $l ) ) {
				$label = '<strong>' . esc_html( $l[1] ) . '</strong> ';
				$m[1]  = $l[2];
			}
			$html   .= ( $in_list ? '' : '<ul>' ) . '<li>' . $label . wplusui_notes_inline( $m[1] ) . '</li>';
			$in_list = true;
			continue;
		}
		if ( $in_list ) {
			$html   .= '</ul>';
			$in_list = false;
		}
		if ( preg_match( '/^#{1,6}\s+(.*)$/', $line, $m ) ) {
			$html .= '<h3>' . wplusui_notes_inline( $m[1] ) . '</h3>';
		} elseif ( '' !== trim( $line ) ) {
			$html .= '<p>' . wplusui_notes_inline( $line ) . '</p>';
		}
	}
	return $html . ( $in_list ? '</ul>' : '' );
}

/**
 * Inline formatting for one line of release notes. The text is escaped first, so nothing from the release can add markup.
 *
 * @param string $line One line.
 * @return string
 */
function wplusui_notes_inline( $line ) {
	$line = esc_html( $line );
	$line = preg_replace( '/\*\*(.+?)\*\*/', '<strong>$1</strong>', $line );
	$line = preg_replace( '/`([^`]+)`/', '<code>$1</code>', $line );
	return preg_replace_callback(
		'/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/',
		function ( $m ) {
			return '<a href="' . esc_url( html_entity_decode( $m[2] ) ) . '" target="_blank" rel="noopener noreferrer">' . $m[1] . '</a>';
		},
		$line
	);
}

/**
 * The newest entries of the changelog that ships with the installed theme.
 *
 * @param int $versions How many versions.
 * @return string Markdown.
 */
function wplusui_installed_changelog( $versions = 1 ) {
	$file = WPLUSUI_DIR . '/CHANGELOG.md';
	if ( ! is_readable( $file ) ) {
		return '';
	}
	$out   = array();
	$count = 0;
	foreach ( preg_split( '/\R/', (string) file_get_contents( $file ) ) as $line ) { // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- local file.
		if ( 0 === strpos( $line, '## ' ) ) {
			++$count;
			if ( $count > $versions ) {
				break;
			}
			continue; // The version is shown in the heading of the screen, not repeated here.
		}
		if ( $count > 0 ) {
			$out[] = $line;
		}
	}
	return trim( implode( "\n", $out ) );
}

/**
 * Small style sheet for the two screens that show release notes.
 *
 * @return string
 */
function wplusui_notes_css() {
	return '.wplusui-notes{font-size:14px;line-height:1.55}.wplusui-notes ul{list-style:disc;margin:0 0 0 1.3em;padding:0}.wplusui-notes li{margin:0 0 .6em}.wplusui-notes p{margin:.4em 0 .8em}.wplusui-notes code{background:#f0f0f1;padding:1px 4px;border-radius:3px;font-size:13px}';
}

/**
 * The release notes window opened from "View version details": one small self-contained page (it does not load the
 * rest of the admin, so no other plugin can add anything to it).
 */
function wplusui_render_notes_window() {
	if ( ! isset( $_GET['wplusui-notes'] ) || ! current_user_can( 'update_themes' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only page.
		return;
	}
	$release = wplusui_latest_release();
	$version = $release ? $release['version'] : WPLUSUI_VERSION;
	$notes   = $release ? $release['notes'] : wplusui_installed_changelog( 1 );
	header( 'Content-Type: text/html; charset=' . get_option( 'blog_charset' ) );
	echo '<!DOCTYPE html><html lang="' . esc_attr( get_bloginfo( 'language' ) ) . '"><head><meta charset="' . esc_attr( get_option( 'blog_charset' ) ) . '"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . esc_html__( 'WPlus UI release notes', 'wplus-ui' ) . '</title>';
	echo '<style>body{margin:0;padding:20px 24px;background:#fff;color:#1d2327;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}h1{font-size:20px;margin:0 0 4px}.d{color:#646970;margin:0 0 16px;font-size:13px}' . wplusui_notes_css() . '</style></head><body>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed style strings.
	/* translators: %s: version number */
	echo '<h1>' . esc_html( sprintf( __( 'WPlus UI %s', 'wplus-ui' ), $version ) ) . '</h1>';
	if ( $release && '' !== $release['published'] ) {
		echo '<p class="d">' . esc_html( mysql2date( get_option( 'date_format' ), $release['published'] ) ) . '</p>';
	}
	echo '<div class="wplusui-notes">' . wp_kses_post( wplusui_notes_html( $notes ) ) . '</div></body></html>';
	exit;
}
add_action( 'admin_init', 'wplusui_render_notes_window' );

/**
 * Appearance > WPlus UI Update.
 */
function wplusui_updates_menu() {
	add_theme_page( __( 'WPlus UI Update', 'wplus-ui' ), __( 'WPlus UI Update', 'wplus-ui' ), 'update_themes', 'wplusui-updates', 'wplusui_render_updates_page' );
}
add_action( 'admin_menu', 'wplusui_updates_menu' );

/**
 * Check now: ask again and refresh the stored update information without waiting for the 12 hours.
 */
function wplusui_check_updates_now() {
	if ( ! current_user_can( 'update_themes' ) ) {
		wp_die( esc_html__( 'You are not allowed to do this.', 'wplus-ui' ), 403 );
	}
	check_admin_referer( 'wplusui_check_updates' );
	wplusui_latest_release( true );
	$stored = get_site_transient( 'update_themes' );
	if ( is_object( $stored ) ) {
		set_site_transient( 'update_themes', $stored ); // Runs wplusui_filter_update_themes() with the fresh answer.
	}
	wp_safe_redirect( add_query_arg( 'checked', '1', admin_url( 'themes.php?page=wplusui-updates' ) ) );
	exit;
}
add_action( 'admin_post_wplusui_check_updates', 'wplusui_check_updates_now' );

/**
 * Page content for Appearance > WPlus UI Update: where you stand, one button, and what is new.
 */
function wplusui_render_updates_page() {
	if ( ! current_user_can( 'update_themes' ) ) {
		return;
	}
	$enabled = wplusui_updates_enabled();
	$release = $enabled ? wplusui_latest_release() : null;
	$newer   = $release && version_compare( $release['version'], WPLUSUI_VERSION, '>' );
	$slug    = wplusui_theme_slug();
	$notes   = $newer ? $release['notes'] : wplusui_installed_changelog( 1 );
	$about   = $newer ? $release['version'] : WPLUSUI_VERSION;

	echo '<div class="wrap"><h1>' . esc_html__( 'WPlus UI Update', 'wplus-ui' ) . '</h1>';
	if ( isset( $_GET['checked'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only message.
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Checked just now.', 'wplus-ui' ) . '</p></div>';
	}
	echo '<style>' . wplusui_notes_css() . '.wplusui-card{max-width:640px;margin-top:16px;padding:4px 24px 20px}.wplusui-status{display:flex;align-items:center;gap:8px;font-size:16px;margin:16px 0 4px}.wplusui-status .dashicons{width:24px;height:24px;font-size:24px}.wplusui-actions{display:flex;align-items:center;gap:8px;margin:12px 0}.wplusui-actions form{margin:0}.wplusui-card h2{font-size:15px;margin:20px 0 8px;padding:0}</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed style strings.
	echo '<div class="card wplusui-card">';
	if ( ! $enabled ) {
		echo '<p class="wplusui-status"><span class="dashicons dashicons-minus" style="color:#646970"></span> <strong>' . esc_html__( 'Update checks are turned off for this site.', 'wplus-ui' ) . '</strong></p>';
	} elseif ( $newer ) {
		/* translators: %s: version number */
		echo '<p class="wplusui-status"><span class="dashicons dashicons-update" style="color:#2271b1"></span> <strong>' . esc_html( sprintf( __( 'Version %s is available', 'wplus-ui' ), $release['version'] ) ) . '</strong></p>';
		/* translators: %s: version number */
		echo '<p class="description">' . esc_html( sprintf( __( 'You have version %s.', 'wplus-ui' ), WPLUSUI_VERSION ) ) . '</p>';
	} elseif ( $release ) {
		/* translators: %s: version number */
		echo '<p class="wplusui-status"><span class="dashicons dashicons-yes-alt" style="color:#00a32a"></span> <strong>' . esc_html( sprintf( __( 'You have the latest version (%s)', 'wplus-ui' ), WPLUSUI_VERSION ) ) . '</strong></p>';
	} else {
		/* translators: %s: version number */
		echo '<p class="wplusui-status"><span class="dashicons dashicons-warning" style="color:#996800"></span> <strong>' . esc_html( sprintf( __( 'Version %s. The latest version could not be checked right now.', 'wplus-ui' ), WPLUSUI_VERSION ) ) . '</strong></p>';
	}
	if ( $enabled ) {
		echo '<div class="wplusui-actions">';
		if ( $newer ) {
			echo '<a class="button button-primary" href="' . esc_url( wp_nonce_url( self_admin_url( 'update.php?action=upgrade-theme&theme=' . rawurlencode( $slug ) ), 'upgrade-theme_' . $slug ) ) . '">' . esc_html__( 'Update now', 'wplus-ui' ) . '</a>';
		}
		echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '"><input type="hidden" name="action" value="wplusui_check_updates" />';
		wp_nonce_field( 'wplusui_check_updates' );
		submit_button( __( 'Check now', 'wplus-ui' ), 'secondary', 'submit', false );
		echo '</form></div>';
		if ( $release && '' !== $release['checked'] ) {
			/* translators: %s: how long ago, for example "5 minutes" */
			echo '<p class="description">' . esc_html( sprintf( __( 'Last checked %s ago.', 'wplus-ui' ), human_time_diff( (int) $release['checked'] ) ) ) . '</p>';
		}
	}
	if ( '' !== $notes ) {
		/* translators: %s: version number */
		echo '<h2>' . esc_html( $newer ? sprintf( __( 'What is new in %s', 'wplus-ui' ), $about ) : sprintf( __( 'What was new in %s', 'wplus-ui' ), $about ) ) . '</h2>';
		echo '<div class="wplusui-notes">' . wp_kses_post( wplusui_notes_html( $notes ) ) . '</div>';
	}
	echo '</div></div>';
}
