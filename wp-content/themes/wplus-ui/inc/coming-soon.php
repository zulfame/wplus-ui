<?php
/**
 * Coming Soon and Maintenance page for visitors, with an optional countdown.
 *
 * Off by default. Users who can edit posts always see the real site; an administrator can
 * open the page itself with ?wplusui-preview=1 (add it to any address of the site).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default texts of the page, by mode. Each can be replaced in the Customizer; an empty field uses these.
 *
 * @param bool $maintenance Whether the mode is Maintenance.
 * @return array<string,string>
 */
function wplusui_soon_defaults( $maintenance ) {
	return array(
		'title' => $maintenance ? __( 'We will be back soon', 'wplus-ui' ) : __( 'Coming Soon', 'wplus-ui' ),
		'text'  => $maintenance
			? __( 'The site is being updated. Please check back in a little while.', 'wplus-ui' )
			: __( 'Something new is on its way. Stay tuned!', 'wplus-ui' ),
		'badge' => $maintenance ? __( 'Maintenance', 'wplus-ui' ) : __( 'Coming Soon', 'wplus-ui' ),
		'units' => __( 'Days, Hours, Minutes, Seconds', 'wplus-ui' ),
		'live'  => $maintenance ? __( 'We are almost back. Please refresh in a moment.', 'wplus-ui' ) : __( 'We are live! Refresh the page to come in.', 'wplus-ui' ),
	);
}

/**
 * A text of the page: what the owner typed, or the default.
 *
 * @param string $key         Key of wplusui_soon_defaults().
 * @param bool   $maintenance Whether the mode is Maintenance.
 * @return string
 */
function wplusui_soon_text( $key, $maintenance ) {
	$value    = trim( (string) get_theme_mod( 'wplusui_soon_' . $key, '' ) );
	$defaults = wplusui_soon_defaults( $maintenance );
	return '' !== $value ? $value : $defaults[ $key ];
}

/**
 * Customizer controls (they live in the "WPlus UI: Engagement" section).
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_soon_customize( $wp_customize ) {
	$text_setting = function ( $id, $label, $type, $sanitize, $default_value = '', $description = '' ) use ( $wp_customize ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $default_value,
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'       => $label,
				'description' => $description,
				'section'     => 'wplusui_engagement',
				'type'        => $type,
			)
		);
	};

	$wp_customize->add_setting(
		'wplusui_soon_mode',
		array(
			'default'           => '',
			'sanitize_callback' => function ( $value ) {
				return in_array( $value, array( 'off', 'coming_soon', 'maintenance' ), true ) ? $value : '';
			},
		)
	);
	$wp_customize->add_control(
		'wplusui_soon_mode',
		array(
			'label'       => __( 'Coming Soon / Maintenance page for visitors', 'wplus-ui' ),
			'description' => __( 'Visitors see a single page instead of the site. People who can edit posts still see the site; to see the page yourself add ?wplusui-preview=1 to an address of your site.', 'wplus-ui' ),
			'section'     => 'wplusui_engagement',
			'type'        => 'radio',
			'choices'     => array(
				'off'         => __( 'Off (the site is open)', 'wplus-ui' ),
				'coming_soon' => __( 'Coming Soon (before launch)', 'wplus-ui' ),
				'maintenance' => __( 'Maintenance (back soon)', 'wplus-ui' ),
			),
		)
	);

	$empty_hint = __( 'Leave empty to use the default text.', 'wplus-ui' );
	$text_setting( 'wplusui_soon_title', __( 'Page title', 'wplus-ui' ), 'text', 'sanitize_text_field', '', __( 'Default: "Coming Soon", or "We will be back soon" in Maintenance mode.', 'wplus-ui' ) );
	$text_setting( 'wplusui_soon_text', __( 'Page text', 'wplus-ui' ), 'textarea', 'sanitize_textarea_field', '', $empty_hint );
	$text_setting( 'wplusui_soon_badge', __( 'Small label above the title', 'wplus-ui' ), 'text', 'sanitize_text_field', '', __( 'Default: "Coming Soon" or "Maintenance".', 'wplus-ui' ) );
	$text_setting(
		'wplusui_soon_date',
		__( 'Launch / back-online date and time', 'wplus-ui' ),
		'datetime-local',
		function ( $value ) {
			return preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', (string) $value ) ? $value : '';
		},
		'',
		__( 'Optional. Uses the time zone of the site (Settings > General). Shows a countdown.', 'wplus-ui' )
	);

	$text_setting( 'wplusui_soon_units', __( 'Countdown labels', 'wplus-ui' ), 'text', 'sanitize_text_field', '', __( 'Four words separated by commas, in this order: days, hours, minutes, seconds. Default: Days, Hours, Minutes, Seconds.', 'wplus-ui' ) );
	$text_setting( 'wplusui_soon_live', __( 'Message when the countdown ends', 'wplus-ui' ), 'text', 'sanitize_text_field', '', $empty_hint );

	foreach ( array(
		'wplusui_soon_auto_open' => array( __( 'Open the site automatically when the countdown ends', 'wplus-ui' ), true ),
		'wplusui_soon_social'    => array( __( 'Show the social icons from Customizer > WPlus UI', 'wplus-ui' ), true ),
	) as $id => $row ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $row[1],
				'sanitize_callback' => 'rest_sanitize_boolean',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $row[0],
				'section' => 'wplusui_engagement',
				'type'    => 'checkbox',
			)
		);
	}

	$wp_customize->add_setting(
		'wplusui_soon_image',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'wplusui_soon_image',
			array(
				'label'   => __( 'Background picture (optional)', 'wplus-ui' ),
				'section' => 'wplusui_engagement',
			)
		)
	);

	$text_setting( 'wplusui_soon_button_text', __( 'Button text (optional)', 'wplus-ui' ), 'text', 'sanitize_text_field' );
	$text_setting( 'wplusui_soon_button_url', __( 'Button link (optional)', 'wplus-ui' ), 'url', 'esc_url_raw', '', __( 'For example a contact page, WhatsApp link or mailto: address.', 'wplus-ui' ) );
}
add_action( 'customize_register', 'wplusui_soon_customize' );

/**
 * Current mode: off, coming_soon or maintenance. Sites that used the old on/off switch keep working.
 *
 * @return string
 */
function wplusui_soon_mode() {
	$mode = (string) get_theme_mod( 'wplusui_soon_mode', '' );
	if ( '' === $mode ) {
		$mode = get_theme_mod( 'wplusui_soon_enabled', false ) ? 'coming_soon' : 'off';
	}
	return $mode;
}

/**
 * Launch time as a Unix timestamp, or 0 when none is set.
 *
 * @return int
 */
function wplusui_soon_target() {
	$value = (string) get_theme_mod( 'wplusui_soon_date', '' );
	if ( '' === $value ) {
		return 0;
	}
	$date = date_create_immutable_from_format( 'Y-m-d\TH:i', $value, wp_timezone() );
	return $date ? $date->getTimestamp() : 0;
}

/**
 * Whether visitors should get the page right now.
 *
 * @return bool
 */
function wplusui_soon_active() {
	if ( 'off' === wplusui_soon_mode() ) {
		return false;
	}
	$target = wplusui_soon_target();
	if ( $target && $target <= time() && get_theme_mod( 'wplusui_soon_auto_open', true ) ) {
		return false; // The countdown is over: the site opens by itself.
	}
	return true;
}

/**
 * Whether this request must be left alone (back end, REST, cron, feeds, Customizer, staff).
 *
 * @return bool
 */
function wplusui_soon_skip_request() {
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || is_feed() || is_customize_preview() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		return true;
	}
	return is_user_logged_in() && current_user_can( 'edit_posts' );
}

/**
 * Print the page and stop.
 */
function wplusui_coming_soon() {
	$preview = isset( $_GET['wplusui-preview'] ) && is_user_logged_in() && current_user_can( 'edit_theme_options' ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only preview switch.
	if ( ! $preview && ( ! wplusui_soon_active() || wplusui_soon_skip_request() ) ) {
		return;
	}
	$maintenance = 'maintenance' === wplusui_soon_mode();
	$title       = wplusui_soon_text( 'title', $maintenance );
	$text        = wplusui_soon_text( 'text', $maintenance );
	$badge       = wplusui_soon_text( 'badge', $maintenance );
	$live        = wplusui_soon_text( 'live', $maintenance );
	$units       = array_map( 'trim', explode( ',', wplusui_soon_text( 'units', $maintenance ) ) );
	$fallback    = array_map( 'trim', explode( ',', wplusui_soon_defaults( $maintenance )['units'] ) );
	for ( $i = 0; $i < 4; $i++ ) {
		if ( empty( $units[ $i ] ) ) {
			$units[ $i ] = $fallback[ $i ] ?? '';
		}
	}
	$target = wplusui_soon_target();
	$image  = (string) get_theme_mod( 'wplusui_soon_image', '' );
	$accent = sanitize_hex_color( (string) get_theme_mod( 'wplusui_accent_light', '' ) );
	$accent = $accent ? $accent : '#1976d2';
	$dark   = sanitize_hex_color( (string) get_theme_mod( 'wplusui_accent_dark', '' ) );
	$dark   = $dark ? $dark : '#8ab4f8';
	$social = get_theme_mod( 'wplusui_soon_social', true ) ? wplusui_social_links() : array();
	$svgs   = $social ? wplusui_social_icon_svgs() : array();
	$names  = wplusui_social_networks();
	$btn_t  = trim( (string) get_theme_mod( 'wplusui_soon_button_text', '' ) );
	$btn_u  = trim( (string) get_theme_mod( 'wplusui_soon_button_url', '' ) );
	$logo   = has_custom_logo() ? wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'medium' ) : '';

	if ( ! $preview ) {
		status_header( 503 );
		header( 'Retry-After: ' . ( $target > time() ? max( 60, $target - time() ) : 3600 ) );
		nocache_headers();
	}
	?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?php echo esc_html( $title . ' – ' . get_bloginfo( 'name' ) ); ?></title>
	<?php if ( has_site_icon() ) : ?>
<link rel="icon" href="<?php echo esc_url( get_site_icon_url( 64 ) ); ?>">
<?php endif; ?>
<style>
:root{--bg:#fdfcff;--card:#ffffff;--fg:#08102b;--muted:#5c6277;--line:#e6e6ee;--accent:<?php echo esc_html( $accent ); ?>}
@media (prefers-color-scheme:dark){:root{--bg:#161619;--card:#1f1f24;--fg:#f1f1f5;--muted:#a3a7b8;--line:#33343c;--accent:<?php echo esc_html( $dark ); ?>}}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.6;text-align:center;position:relative}
	<?php if ( $image ) : ?>
body{background:var(--bg) url("<?php echo esc_url( $image ); ?>") center/cover no-repeat fixed}
body:before{content:"";position:fixed;inset:0;background:var(--bg);opacity:.72}
	<?php else : ?>
body:before{content:"";position:fixed;inset:0;background:radial-gradient(circle at 15% 20%,color-mix(in srgb,var(--accent) 22%,transparent) 0 14%,transparent 14.5%),radial-gradient(circle at 85% 80%,color-mix(in srgb,var(--accent) 14%,transparent) 0 24%,transparent 24.5%);pointer-events:none}
	<?php endif; ?>
main{position:relative;width:100%;max-width:620px;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:40px 28px;box-shadow:0 10px 40px rgba(0,0,0,.08)}
.logo{max-height:64px;width:auto;margin:0 auto 14px;display:block}
.site{font-weight:600;letter-spacing:.02em;color:var(--muted);margin:0 0 10px}
.badge{display:inline-block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);border:1px solid var(--accent);border-radius:99px;padding:3px 12px;margin-bottom:14px}
h1{font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.15;margin:0 0 12px}
.text{margin:0 auto 22px;color:var(--muted);max-width:46ch;white-space:pre-line}
.cd{display:flex;justify-content:center;gap:8px;margin:0 0 24px}
.cd div{flex:1 1 0;min-width:0;max-width:96px;padding:12px 4px;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--accent) 6%,var(--card))}
.cd b{display:block;font-size:clamp(1.5rem,6vw,2.1rem);line-height:1.1;font-variant-numeric:tabular-nums;color:var(--accent)}
.cd span{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
@media (max-width:440px){.cd span{font-size:10px;letter-spacing:.02em}main{padding:32px 18px}}
.live{display:none;font-weight:600;color:var(--accent);margin:0 0 20px}
.btn{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;border-radius:10px;padding:11px 22px}
.btn:hover{filter:brightness(1.08)}
.soc{display:flex;justify-content:center;gap:14px;list-style:none;margin:24px 0 0;padding:0;flex-wrap:wrap}
.soc a{display:block;color:var(--fg);opacity:.75}
.soc a:hover{opacity:1;color:var(--accent)}
.soc svg{width:22px;height:22px;display:block;fill:currentColor}
footer{margin-top:26px;font-size:12px;color:var(--muted)}
</style>
</head>
<body>
<main>
	<?php if ( $logo ) : ?>
	<img class="logo" src="<?php echo esc_url( $logo ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
	<?php else : ?>
	<p class="site"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
	<?php endif; ?>
	<span class="badge"><?php echo esc_html( $badge ); ?></span>
	<h1><?php echo esc_html( $title ); ?></h1>
	<p class="text"><?php echo esc_html( $text ); ?></p>
	<?php if ( $target ) : ?>
	<div class="cd" id="cd" data-target="<?php echo esc_attr( $target ); ?>" data-reload="<?php echo get_theme_mod( 'wplusui_soon_auto_open', true ) ? '1' : '0'; ?>" role="timer" aria-live="off">
		<div><b data-u="d">00</b><span><?php echo esc_html( $units[0] ); ?></span></div>
		<div><b data-u="h">00</b><span><?php echo esc_html( $units[1] ); ?></span></div>
		<div><b data-u="m">00</b><span><?php echo esc_html( $units[2] ); ?></span></div>
		<div><b data-u="s">00</b><span><?php echo esc_html( $units[3] ); ?></span></div>
	</div>
	<p class="live" id="live"><?php echo esc_html( $live ); ?></p>
	<?php endif; ?>
	<?php if ( '' !== $btn_t && '' !== $btn_u ) : ?>
	<a class="btn" href="<?php echo esc_url( $btn_u ); ?>"><?php echo esc_html( $btn_t ); ?></a>
	<?php endif; ?>
	<?php if ( $social ) : ?>
	<ul class="soc">
		<?php foreach ( $social as $key => $url ) : ?>
		<li><a href="<?php echo esc_url( $url ); ?>" aria-label="<?php echo esc_attr( $names[ $key ] ); ?>" rel="noopener noreferrer" target="_blank"><?php echo $svgs[ $key ]; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG. ?></a></li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
	<footer>&copy; <?php echo esc_html( gmdate( 'Y' ) . ' ' . get_bloginfo( 'name' ) ); ?></footer>
</main>
	<?php if ( $target ) : ?>
<script>
(function(){var cd=document.getElementById('cd');if(!cd)return;var t=+cd.dataset.target*1000,live=document.getElementById('live');
function pad(n){return n<10?'0'+n:''+n}
function tick(){var left=Math.max(0,Math.floor((t-Date.now())/1000));
cd.querySelector('[data-u=d]').textContent=pad(Math.floor(left/86400));
cd.querySelector('[data-u=h]').textContent=pad(Math.floor(left%86400/3600));
cd.querySelector('[data-u=m]').textContent=pad(Math.floor(left%3600/60));
cd.querySelector('[data-u=s]').textContent=pad(left%60);
if(left===0){clearInterval(timer);if(live)live.style.display='block';if(cd.dataset.reload==='1'){setTimeout(function(){location.reload()},1500)}}}
var timer=setInterval(tick,1000);tick()})();
</script>
	<?php endif; ?>
</body>
</html>
	<?php
	exit;
}
add_action( 'template_redirect', 'wplusui_coming_soon', 0 );
