<?php
/**
 * Share block + share popup: quick buttons (#share > .pSh), the popup (.shBr) with a
 * post preview (.shP), the network grid (.shL) and the copy-link field (.cpL).
 * The popup is toggled by the #forShare checkbox that the header-row share icon
 * (label[for=forShare]) points at. Networks and buttons come from the Customizer
 * ("WPlus UI: Sharing").
 *
 * @package wplus-ui
 */

if ( ! wplusui_share_enabled() ) {
	return;
}

$wplusui_networks = wplusui_share_networks();
$wplusui_enc      = array(
	'{u}' => rawurlencode( get_permalink() ),
	'{t}' => rawurlencode( get_the_title() ),
);
$wplusui_cats     = get_the_category();
$wplusui_cat_name = $wplusui_cats ? $wplusui_cats[0]->name : '';
$wplusui_quick    = wplusui_share_quick_networks();
$wplusui_popup    = wplusui_share_popup_networks();
?>
<div id="share">
	<div class="pSh">
		<div class="pShc" data-text="<?php esc_attr_e( 'Share:', 'wplus-ui' ); ?>">
			<?php foreach ( $wplusui_quick as $wplusui_key ) : ?>
				<?php $wplusui_n = $wplusui_networks[ $wplusui_key ]; ?>
			<a aria-label="<?php echo esc_attr( $wplusui_n['aria'] ); ?>" class="c <?php echo esc_attr( $wplusui_n['class'] ); ?>" data-text="<?php esc_attr_e( 'Share', 'wplus-ui' ); ?>" href="<?php echo esc_url( strtr( $wplusui_n['url'], $wplusui_enc ) ); ?>" rel="noopener noreferrer" target="_blank">
				<?php echo $wplusui_n['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG. ?>
			</a>
			<?php endforeach; ?>
			<label for="forShare">
				<svg viewBox="0 0 512 512"><path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256 c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32 C448,238.3,434.3,224,417.4,224z"></path></svg>
				<span class="sr-only"><?php esc_html_e( 'Share to other apps', 'wplus-ui' ); ?></span>
			</label>
		</div>
	</div>
	<input class="shIn fixI" hidden id="forShare" type="checkbox" />
	<div class="shBr fixL">
		<div class="shBri fixLi">
			<div class="shBrs fixLs">
				<div class="shH fixH fixT" data-text="<?php esc_attr_e( 'Share to other apps', 'wplus-ui' ); ?>">
					<label class="c" data-text="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>" for="forShare">
						<svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg>
						<span class="sr-only"><?php esc_html_e( 'Close', 'wplus-ui' ); ?></span>
					</label>
				</div>
				<div class="shC fixC">
					<div class="shP">
						<div class="pThmb">
							<div class="thmb">
								<?php
								if ( has_post_thumbnail() ) {
									the_post_thumbnail(
										'post-thumbnail',
										array(
											'class'   => 'imgThm lblr',
											'loading' => 'lazy',
										)
									);
								}
								?>
							</div>
						</div>
						<div class="shPc">
							<div class="shPt" data-text="<?php echo esc_attr( get_the_title() ); ?>"></div>
							<div class="shPl" data-text="<?php echo esc_attr( $wplusui_cat_name ); ?>"></div>
						</div>
					</div>
					<div class="shL">
						<?php foreach ( $wplusui_popup as $wplusui_key ) : ?>
							<?php $wplusui_n = $wplusui_networks[ $wplusui_key ]; ?>
						<div data-text="<?php echo esc_attr( $wplusui_n['label'] ); ?>">
							<a aria-label="<?php echo esc_attr( $wplusui_n['aria'] ); ?>"<?php echo 'pinterest' === $wplusui_key ? ' data-pin-config="beside"' : ''; ?> href="<?php echo esc_url( strtr( $wplusui_n['url'], $wplusui_enc ) ); ?>" rel="noopener" target="_blank">
								<?php echo $wplusui_n['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG. ?>
							</a>
						</div>
						<?php endforeach; ?>
					</div>
					<div class="cpL show-if-js" data-message="<?php esc_attr_e( 'Copy to clipboard', 'wplus-ui' ); ?>" data-text="<?php esc_attr_e( 'or copy link', 'wplus-ui' ); ?>">
						<div class="cpLb">
							<svg class="line" viewBox="0 0 24 24"><path d="M13.0601 10.9399C15.3101 13.1899 15.3101 16.8299 13.0601 19.0699C10.8101 21.3099 7.17009 21.3199 4.93009 19.0699C2.69009 16.8199 2.68009 13.1799 4.93009 10.9399"></path><path class="c" d="M10.59 13.4099C8.24996 11.0699 8.24996 7.26988 10.59 4.91988C12.93 2.56988 16.73 2.57988 19.08 4.91988C21.43 7.25988 21.42 11.0599 19.08 13.4099"></path></svg>
							<input id="shareLinkInput" onclick="this.select()" readonly="" type="text" value="<?php echo esc_url( get_permalink() ); ?>" />
							<label for="shareLinkInput" onclick="if (PU.cpT) PU.cpT(document.getElementById('shareLinkInput').value).then(() => PU.tNtf(PU.ms.linkCopiedToClipboard));">
								<svg class="line" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect class="c" height="4" rx="1" ry="1" width="8" x="8" y="2"></rect></svg>
								<span class="sr-only"><?php esc_html_e( 'Copy', 'wplus-ui' ); ?></span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<label class="fCls" for="forShare"></label>
	</div>
</div>
