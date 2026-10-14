<?php
/**
 * Media: generate WebP sub-sizes for new JPEG and PNG uploads (the original file is kept).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Output WebP for generated image sizes when the server supports it.
 *
 * @param array<string,string> $formats Source mime type => output mime type.
 * @return array<string,string>
 */
function wplusui_webp_output_format( $formats ) {
	if ( ! apply_filters( 'wplusui_webp_subsizes', true ) || ! wp_image_editor_supports( array( 'mime_type' => 'image/webp' ) ) ) {
		return $formats;
	}
	$formats['image/jpeg'] = 'image/webp';
	$formats['image/png']  = 'image/webp';
	return $formats;
}
add_filter( 'image_editor_output_format', 'wplusui_webp_output_format' );
