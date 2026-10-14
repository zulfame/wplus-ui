<?php
/**
 * Contact page with Contact Form 7: a recommended form template, the [wplusui_contact_form]
 * shortcode, a block pattern and a helper that creates the page. The form fields are styled in
 * assets/css/wp-extras.css (.wpcf7).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether Contact Form 7 is active.
 *
 * @return bool
 */
function wplusui_cf7_active() {
	return defined( 'WPCF7_VERSION' ) && class_exists( 'WPCF7_ContactForm' );
}

/**
 * Recommended Contact Form 7 form template: name and email side by side, then subject, message and button.
 *
 * @return string
 */
function wplusui_contact_form_template() {
	return '<div class="cf-grid">
<p><label>' . __( 'Your name', 'wplus-ui' ) . '
    [text* your-name autocomplete:name]</label></p>

<p><label>' . __( 'Your email', 'wplus-ui' ) . '
    [email* your-email autocomplete:email]</label></p>
</div>

<p><label>' . __( 'Subject', 'wplus-ui' ) . '
    [text* your-subject]</label></p>

<p><label>' . __( 'Your message', 'wplus-ui' ) . '
    [textarea* your-message]</label></p>

<p>[submit "' . __( 'Send message', 'wplus-ui' ) . '"]</p>';
}

/**
 * [wplusui_contact_form id="123"]: prints a Contact Form 7 form (the first one when no id is given).
 * Administrators see a hint when the plugin or the form is missing; visitors see nothing.
 *
 * @param array $atts Shortcode attributes.
 * @return string
 */
function wplusui_contact_form_shortcode( $atts ) {
	$atts = shortcode_atts( array( 'id' => 0 ), $atts, 'wplusui_contact_form' );
	$id   = (int) $atts['id'];
	if ( ! $id && wplusui_cf7_active() ) {
		$forms = get_posts(
			array(
				'post_type'   => 'wpcf7_contact_form',
				'numberposts' => 1,
				'orderby'     => 'ID',
				'order'       => 'ASC',
				'fields'      => 'ids',
			)
		);
		$id    = $forms ? (int) $forms[0] : 0;
	}
	if ( wplusui_cf7_active() && $id ) {
		return do_shortcode( '[contact-form-7 id="' . $id . '"]' );
	}
	if ( ! current_user_can( 'edit_pages' ) ) {
		return '';
	}
	$message = wplusui_cf7_active()
		? __( 'Create a form in Contact > Add New and it will appear here.', 'wplus-ui' )
		: __( 'Install and activate the Contact Form 7 plugin to show the contact form here.', 'wplus-ui' );
	return '<p class="note wr"><b>' . esc_html__( 'Contact form', 'wplus-ui' ) . '</b><br>' . esc_html( $message ) . '</p>';
}
add_shortcode( 'wplusui_contact_form', 'wplusui_contact_form_shortcode' );

/**
 * Block content of the contact page / pattern.
 *
 * @return string
 */
function wplusui_contact_page_content() {
	return '<!-- wp:paragraph -->
<p>' . esc_html__( 'Have a question or an idea? Send us a message with the form below and we will reply as soon as we can.', 'wplus-ui' ) . '</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[wplusui_contact_form]
<!-- /wp:shortcode -->

<!-- wp:paragraph {"className":"is-style-note"} -->
<p class="is-style-note"><strong>' . esc_html__( 'Good to know', 'wplus-ui' ) . '</strong><br>' . esc_html__( 'We usually answer within one or two working days.', 'wplus-ui' ) . '</p>
<!-- /wp:paragraph -->';
}

/**
 * Register the pattern.
 */
function wplusui_register_contact_pattern() {
	register_block_pattern(
		'wplus-ui/contact',
		array(
			'title'      => __( 'Contact page (Contact Form 7)', 'wplus-ui' ),
			'categories' => array( 'wplus-ui' ),
			'content'    => wplusui_contact_page_content(),
		)
	);
}
add_action( 'init', 'wplusui_register_contact_pattern', 11 );

/**
 * Create the Contact page (and a form when Contact Form 7 is active and has none). Safe to run twice.
 *
 * @return int Page ID, 0 when it could not be created.
 */
function wplusui_create_contact_page() {
	if ( wplusui_cf7_active() ) {
		$forms = get_posts(
			array(
				'post_type'   => 'wpcf7_contact_form',
				'numberposts' => 2,
				'fields'      => 'ids',
			)
		);
		if ( ! $forms ) {
			$form = WPCF7_ContactForm::get_template();
			$form->set_title( __( 'Contact form 1', 'wplus-ui' ) );
			$form->set_properties( array( 'form' => wplusui_contact_form_template() ) );
			$form->save();
		} elseif ( 1 === count( $forms ) ) {
			// Contact Form 7 creates a sample form of its own on activation. While it is still untouched, give it the
			// theme's layout (name and email side by side); a form the owner has edited is left alone.
			$sample = wpcf7_contact_form( $forms[0] );
			if ( $sample && $sample->prop( 'form' ) === WPCF7_ContactForm::get_template()->prop( 'form' ) ) {
				$sample->set_properties( array( 'form' => wplusui_contact_form_template() ) );
				$sample->save();
			}
		}
	}

	$page = get_page_by_path( 'contact' );
	if ( $page ) {
		return (int) $page->ID;
	}
	$id = wp_insert_post(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => __( 'Contact', 'wplus-ui' ),
			'post_name'    => 'contact',
			'post_content' => wplusui_contact_page_content(),
		)
	);
	return is_wp_error( $id ) ? 0 : (int) $id;
}
