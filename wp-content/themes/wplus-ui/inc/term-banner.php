<?php
/**
 * Banner image field on category and tag screens (Posts > Categories / Tags). The image is stored in
 * the term meta "wplusui_banner_image_id" and shown on the blurred card at the top of the archive.
 * Without an image the archive uses the newest post of the term that has a featured image.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Taxonomies that get the banner field.
 *
 * @return string[]
 */
function wplusui_banner_taxonomies() {
	return array( 'category', 'post_tag' );
}

/**
 * Field markup (add form and edit form share it).
 *
 * @param int $image_id Current attachment ID.
 */
function wplusui_term_banner_field_inner( $image_id ) {
	wp_nonce_field( 'wplusui_term_banner', 'wplusui_term_banner_nonce' );
	$url = $image_id ? wp_get_attachment_image_url( $image_id, 'medium' ) : '';
	?>
	<div class="wplusui-banner-field">
		<input type="hidden" name="wplusui_banner_image_id" value="<?php echo esc_attr( (int) $image_id ); ?>" />
		<p><img alt="" src="<?php echo esc_url( $url ); ?>" style="max-width:260px;height:auto;<?php echo $url ? '' : 'display:none;'; ?>" /></p>
		<button type="button" class="button wplusui-banner-pick"><?php esc_html_e( 'Choose image', 'wplus-ui' ); ?></button>
		<button type="button" class="button wplusui-banner-clear"<?php echo $url ? '' : ' style="display:none;"'; ?>><?php esc_html_e( 'Remove image', 'wplus-ui' ); ?></button>
		<p class="description"><?php esc_html_e( 'Shown on the blurred card at the top of this archive. Leave empty to use the featured image of the newest post.', 'wplus-ui' ); ?></p>
	</div>
	<?php
}

/**
 * Field on the "add new" form.
 */
function wplusui_term_banner_add_field() {
	echo '<div class="form-field term-wplusui-banner-wrap"><label>' . esc_html__( 'Archive banner image (WPlus UI)', 'wplus-ui' ) . '</label>';
	wplusui_term_banner_field_inner( 0 );
	echo '</div>';
}

/**
 * Field on the edit form.
 *
 * @param WP_Term $term Term.
 */
function wplusui_term_banner_edit_field( $term ) {
	echo '<tr class="form-field term-wplusui-banner-wrap"><th scope="row"><label>' . esc_html__( 'Archive banner image (WPlus UI)', 'wplus-ui' ) . '</label></th><td>';
	wplusui_term_banner_field_inner( (int) get_term_meta( $term->term_id, 'wplusui_banner_image_id', true ) );
	echo '</td></tr>';
}

/**
 * Save the field.
 *
 * @param int $term_id Term ID.
 */
function wplusui_term_banner_save( $term_id ) {
	if ( ! isset( $_POST['wplusui_term_banner_nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wplusui_term_banner_nonce'] ) ), 'wplusui_term_banner' ) ) {
		return;
	}
	if ( ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	$id = isset( $_POST['wplusui_banner_image_id'] ) ? absint( $_POST['wplusui_banner_image_id'] ) : 0;
	if ( $id && wp_attachment_is_image( $id ) ) {
		update_term_meta( $term_id, 'wplusui_banner_image_id', $id );
	} else {
		delete_term_meta( $term_id, 'wplusui_banner_image_id' );
	}
}

foreach ( wplusui_banner_taxonomies() as $wplusui_banner_tax ) {
	add_action( $wplusui_banner_tax . '_add_form_fields', 'wplusui_term_banner_add_field' );
	add_action( $wplusui_banner_tax . '_edit_form_fields', 'wplusui_term_banner_edit_field' );
	add_action( 'created_' . $wplusui_banner_tax, 'wplusui_term_banner_save' );
	add_action( 'edited_' . $wplusui_banner_tax, 'wplusui_term_banner_save' );
}

/**
 * Media picker script on the term screens.
 *
 * @param string $hook Admin page hook.
 */
function wplusui_term_banner_assets( $hook ) {
	if ( ! in_array( $hook, array( 'edit-tags.php', 'term.php' ), true ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( ! $screen || ! in_array( $screen->taxonomy, wplusui_banner_taxonomies(), true ) ) {
		return;
	}
	wp_enqueue_media();
	wp_register_script( 'wplusui-term-banner', '', array( 'jquery' ), WPLUSUI_VERSION, true );
	wp_enqueue_script( 'wplusui-term-banner' );
	wp_add_inline_script(
		'wplusui-term-banner',
		<<<'JS'
jQuery(function($){var frame;$(document).on('click','.wplusui-banner-pick',function(e){e.preventDefault();var box=$(this).closest('.wplusui-banner-field');if(!frame){frame=wp.media({multiple:false,library:{type:'image'}});frame.on('open',function(){frame.content.mode('browse');});}frame.off('select').on('select',function(){var a=frame.state().get('selection').first().toJSON();var u=a.sizes&&a.sizes.medium?a.sizes.medium.url:a.url;box.find('input[type=hidden]').val(a.id);box.find('img').attr('src',u).show();box.find('.wplusui-banner-clear').show();});frame.open();});$(document).on('click','.wplusui-banner-clear',function(e){e.preventDefault();var box=$(this).closest('.wplusui-banner-field');box.find('input[type=hidden]').val('');box.find('img').hide().attr('src','');$(this).hide();});$(document).ajaxComplete(function(e,x,s){if(s&&s.data&&String(s.data).indexOf('action=add-tag')>-1){$('.wplusui-banner-field input[type=hidden]').val('');$('.wplusui-banner-field img').hide();$('.wplusui-banner-clear').hide();}});});
JS
	);
}
add_action( 'admin_enqueue_scripts', 'wplusui_term_banner_assets' );
