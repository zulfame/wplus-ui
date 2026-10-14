<?php
/**
 * A small group heading inside a Customizer section (no setting, no input).
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Prints its label as a heading, to group the controls that follow.
 */
class Wplusui_Customize_Heading extends WP_Customize_Control {

	/**
	 * Control type.
	 *
	 * @var string
	 */
	public $type = 'wplusui-heading';

	/**
	 * Print the heading.
	 */
	protected function render_content() {
		echo '<span class="customize-control-title" style="margin:14px 0 0;padding-top:12px;border-top:1px solid #dcdcde;font-size:13px;text-transform:uppercase;letter-spacing:.04em;">' . esc_html( $this->label ) . '</span>';
	}
}
