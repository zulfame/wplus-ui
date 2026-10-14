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
 * Run the demo setup script and return its output.
 *
 * @return string
 */
function wplusui_demo_run_setup() {
	ob_start();
	include WPLUSUI_DIR . '/demo-content/import-demo.php';
	return trim( wp_strip_all_tags( ob_get_clean() ) );
}

/**
 * Render the admin page.
 */
function wplusui_demo_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$message = '';
	if ( isset( $_POST['wplusui_demo_run'] ) ) {
		check_admin_referer( 'wplusui_demo_run' );
		$message = wplusui_demo_run_setup();
	}

	$xml_url    = WPLUSUI_URI . '/demo-content/wplus-ui-demo-content.xml';
	$importer   = admin_url( 'import.php' );
	$has_import = (bool) get_page_by_path( 'ui-components-and-typography', OBJECT, 'post' );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'WPlus UI Demo', 'wplus-ui' ); ?></h1>
		<?php if ( $message ) : ?>
		<div class="notice notice-success"><p><?php echo esc_html( $message ); ?></p></div>
		<?php endif; ?>
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
			<li><?php esc_html_e( 'Press the button below. It attaches the bundled images, assigns the menus and footer widgets, applies the Customizer settings and sets the sticky and featured posts. It is safe to run more than once.', 'wplus-ui' ); ?></li>
		</ol>
		<form method="post">
			<?php wp_nonce_field( 'wplusui_demo_run' ); ?>
			<?php submit_button( __( 'Finish demo setup', 'wplus-ui' ), 'primary', 'wplusui_demo_run' ); ?>
		</form>
		<p class="description"><?php esc_html_e( 'This also sets "Blog pages show at most" to 6 and removes the default "Hello world!" post and sample page.', 'wplus-ui' ); ?></p>
	</div>
	<?php
}
