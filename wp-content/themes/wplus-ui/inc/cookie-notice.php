<?php
/**
 * Cookie notice: a small card at the bottom of the page with a link to the cookie policy page and an OK button.
 * Off by default. When it is on, ads and the scripts in "Advanced code" can wait for the OK (the visitor's choice is
 * kept in the browser, nothing is sent to the server).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Customizer controls (WPlus UI: Engagement).
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function wplusui_cookie_customize( $wp_customize ) {
	$fields = array(
		'wplusui_cookie_enabled'      => array( __( 'Show a cookie notice', 'wplus-ui' ), 'checkbox', false, '' ),
		'wplusui_cookie_text'         => array( __( 'Cookie notice text', 'wplus-ui' ), 'textarea', '', __( 'Leave empty for the default text.', 'wplus-ui' ) ),
		'wplusui_cookie_ok'           => array( __( 'Cookie notice OK button text', 'wplus-ui' ), 'text', '', __( 'Leave empty for the default.', 'wplus-ui' ) ),
		'wplusui_cookie_policy_label' => array( __( 'Cookie policy button text', 'wplus-ui' ), 'text', '', __( 'Leave empty for the default.', 'wplus-ui' ) ),
		'wplusui_cookie_policy_url'   => array( __( 'Cookie policy link', 'wplus-ui' ), 'url', '', __( 'Leave empty to use the page with the address /cookie-policy. Without a link and without that page the button is hidden.', 'wplus-ui' ) ),
		'wplusui_cookie_gate'         => array( __( 'Load ads and scripts only after OK', 'wplus-ui' ), 'checkbox', true, __( 'Holds the AdSense loader and the script tags in Advanced code (and in ad slots) until the visitor presses OK. Meta tags, such as verification codes, still print at once.', 'wplus-ui' ) ),
	);
	foreach ( $fields as $id => $field ) {
		$sanitize = 'sanitize_text_field';
		if ( 'checkbox' === $field[1] ) {
			$sanitize = 'rest_sanitize_boolean';
		} elseif ( 'url' === $field[1] ) {
			$sanitize = 'esc_url_raw';
		} elseif ( 'textarea' === $field[1] ) {
			$sanitize = 'sanitize_textarea_field';
		}
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $field[2],
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'       => $field[0],
				'description' => $field[3],
				'section'     => 'wplusui_engagement',
				'type'        => $field[1],
			)
		);
	}
}
add_action( 'customize_register', 'wplusui_cookie_customize', 20 );

/**
 * Whether the cookie notice is on.
 *
 * @return bool
 */
function wplusui_cookie_active() {
	return (bool) get_theme_mod( 'wplusui_cookie_enabled', false );
}

/**
 * Whether ads and scripts wait for the OK.
 *
 * @return bool
 */
function wplusui_cookie_gate_active() {
	return wplusui_cookie_active() && get_theme_mod( 'wplusui_cookie_gate', true ) && ! is_customize_preview();
}

/**
 * Address of the cookie policy: the Customizer link, else the page /cookie-policy, else empty.
 *
 * @return string
 */
function wplusui_cookie_policy_url() {
	$url = trim( (string) get_theme_mod( 'wplusui_cookie_policy_url', '' ) );
	if ( '' !== $url ) {
		return $url;
	}
	$page = get_page_by_path( 'cookie-policy' );
	return $page && 'publish' === $page->post_status ? get_permalink( $page ) : '';
}

/**
 * Make the script tags in a piece of HTML wait for the OK: type="text/plain" plus a marker, which the notice script
 * turns back into real scripts. Data scripts (JSON-LD and so on) and everything that is not a script stay as they are.
 *
 * @param string $html Admin-supplied HTML.
 * @return string
 */
function wplusui_consent_gate_scripts( $html ) {
	if ( ! wplusui_cookie_gate_active() || false === stripos( $html, '<script' ) ) {
		return $html;
	}
	return preg_replace_callback(
		'#<script\b([^>]*)>#i',
		function ( $m ) {
			$attrs = $m[1];
			if ( preg_match( '#\btype\s*=\s*["\']?([^"\'\s>]*)#i', $attrs, $t ) && ! preg_match( '#^(?:text/javascript|application/javascript|module)$#i', $t[1] ) ) {
				return $m[0]; // JSON-LD, templates and other non-executable data.
			}
			$attrs = preg_replace( '#\btype\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+)#i', '', $attrs );
			return '<script type="text/plain" data-wplusui-consent="1"' . $attrs . '>';
		},
		$html
	);
}

/**
 * Tiny helper in the head so the ad loader can wait for the OK: wplusuiConsent.on( callback ).
 */
function wplusui_cookie_head_helper() {
	if ( ! wplusui_cookie_gate_active() ) {
		return;
	}
	echo '<script>window.wplusuiConsent={ok:function(){try{return localStorage.getItem("wplusui_cookie_ok")==="1"}catch(e){return /(?:^|; )wplusui_cookie_ok=1/.test(document.cookie)}},on:function(f){if(this.ok())f();else addEventListener("wplusui:consent",f,{once:true})}};</script>' . "\n";
}
add_action( 'wp_head', 'wplusui_cookie_head_helper', 1 );

/**
 * Stylesheet (shared with the other engagement features).
 */
function wplusui_cookie_assets() {
	if ( wplusui_cookie_active() ) {
		wp_enqueue_style( 'wplusui-engagement', WPLUSUI_URI . '/assets/css/engagement.css', array( 'wplusui-style' ), wplusui_asset_version( 'assets/css/engagement.css' ) );
	}
}
add_action( 'wp_enqueue_scripts', 'wplusui_cookie_assets', 20 );

/**
 * The notice and its script.
 */
function wplusui_cookie_markup() {
	if ( ! wplusui_cookie_active() ) {
		return;
	}
	$text   = trim( (string) get_theme_mod( 'wplusui_cookie_text', '' ) );
	$ok     = trim( (string) get_theme_mod( 'wplusui_cookie_ok', '' ) );
	$label  = trim( (string) get_theme_mod( 'wplusui_cookie_policy_label', '' ) );
	$policy = wplusui_cookie_policy_url();
	if ( '' === $text ) {
		$text = __( 'We use cookies to understand preferences and optimize your experience using our site, this includes advertising affiliated with Google.', 'wplus-ui' );
	}
	if ( '' === $ok ) {
		$ok = __( 'OK, got it.', 'wplus-ui' );
	}
	if ( '' === $label ) {
		$label = __( 'Cookie Policy', 'wplus-ui' );
	}
	?>
<div aria-label="<?php esc_attr_e( 'Cookie notice', 'wplus-ui' ); ?>" class="puCk" hidden role="dialog">
	<p class="puCkT"><?php echo esc_html( $text ); ?></p>
	<div class="puCkB">
		<?php if ( '' !== $policy ) : ?>
		<a class="puCkP" href="<?php echo esc_url( $policy ); ?>"><?php echo esc_html( $label ); ?></a>
		<?php endif; ?>
		<button class="puCkO" type="button"><?php echo esc_html( $ok ); ?></button>
	</div>
</div>
<script>
(function(){var K="wplusui_cookie_ok",n=document.querySelector(".puCk");
function ok(){try{return localStorage.getItem(K)==="1"}catch(e){return /(?:^|; )wplusui_cookie_ok=1/.test(document.cookie)}}
function save(){try{localStorage.setItem(K,"1")}catch(e){}document.cookie=K+"=1; max-age=31536000; path=/; SameSite=Lax"}
function clear(){try{localStorage.removeItem(K)}catch(e){}document.cookie=K+"=; max-age=0; path=/; SameSite=Lax"}
function run(){document.querySelectorAll('script[data-wplusui-consent]').forEach(function(o){var s=document.createElement("script");[].forEach.call(o.attributes,function(a){if(a.name!=="type"&&a.name!=="data-wplusui-consent")s.setAttribute(a.name,a.value)});s.text=o.text;s.async=false;o.parentNode.replaceChild(s,o)});dispatchEvent(new Event("wplusui:consent"))}
function init(){document.querySelectorAll("[data-wplusui-cookie-reset]").forEach(function(b){b.hidden=false;b.addEventListener("click",function(){clear();location.reload()})});
if(ok()){run();return}
n.hidden=false;n.querySelector(".puCkO").addEventListener("click",function(){save();n.hidden=true;run()})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init()})();
</script>
	<?php
}
add_action( 'wp_footer', 'wplusui_cookie_markup', 6 );
