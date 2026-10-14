<?php
/**
 * Shared footer (<footer class="mainF">): about block, social icons, link columns and copyright.
 * The 4 "Product/Resources/Support/Company" link columns and the sidebar
 * ad slot are now real widget areas (Appearance > Widgets) instead of
 * hardcoded demo links.
 *
 * @package wplus-ui
 */

?>
			<footer class="mainF">
				<div class="fotM secIn">
					<div class="fotN m2">
						<div class="fotA bl-grid-section" id="sec_Footer_Organization">
							<div class="widget Image abtU" data-text="<?php esc_attr_e( 'Made with tea by', 'wplus-ui' ); ?>">
								<div class="abtT">
									<div class="abtL">
										<?php
										if ( has_custom_logo() ) :
											the_custom_logo(); else :
												?>
										<img alt="<?php bloginfo( 'name' ); ?>" class="abtI" height="150" src="<?php echo esc_url( WPLUSUI_URI . '/assets/images/wplus-ui-logo-square.png' ); ?>" width="150" />
										<?php endif; ?>
									</div>
									<h2 class="notranslate"><?php bloginfo( 'name' ); ?></h2>
								</div>
								<p class="abtD"><?php echo esc_html( get_theme_mod( 'wplusui_footer_about', get_bloginfo( 'description' ) ) ); ?></p>
							</div>
							<?php $wplusui_social = wplusui_social_links(); ?>
							<?php if ( $wplusui_social ) : ?>
							<div class="widget LinkList">
								<ul class="fotS">
									<?php foreach ( $wplusui_social as $wplusui_key => $wplusui_url ) : ?>
									<li><a href="<?php echo esc_url( $wplusui_url ); ?>" aria-label="<?php echo esc_attr( wplusui_social_networks()[ $wplusui_key ] ); ?>" target="_blank" rel="noreferrer noopener"><?php echo wplusui_social_icon_svgs()[ $wplusui_key ]; // phpcs:ignore ?></a></li>
									<?php endforeach; ?>
								</ul>
							</div>
							<?php endif; ?>
						</div>
						<div class="fotW bl-grid-section" id="sec_Footer_Widgets">
							<?php
							for ( $col = 1; $col <= 4; $col++ ) :
								$wplusui_menu_id = (int) get_theme_mod( 'wplusui_footer_menu_' . $col, 0 );
								if ( $wplusui_menu_id && wp_get_nav_menu_object( $wplusui_menu_id ) ) :
									wplusui_footer_menu_column( $col, $wplusui_menu_id );
								elseif ( has_nav_menu( 'footer-' . $col ) ) :
									wplusui_footer_menu_column( $col );
								elseif ( is_active_sidebar( 'footer-' . $col ) ) :
									dynamic_sidebar( 'footer-' . $col );
								endif;
							endfor;
							?>
						</div>
					</div>
					<div class="fotB" id="sec_Footer_Bottom">
						<div class="widget HTML fotC">
							<span class="credit">
								<?php $wplusui_copyright = trim( (string) get_theme_mod( 'wplusui_footer_copyright', '' ) ); ?>
								<?php if ( '' !== $wplusui_copyright ) : ?>
									<?php echo esc_html( str_replace( '{year}', gmdate( 'Y' ), $wplusui_copyright ) ); ?>
								<?php else : ?>
								<span style="font-family: Arial, Helvetica, sans-serif">&#169;</span>
								<span id="footer_year"><?php echo esc_html( gmdate( 'Y' ) ); ?></span> &#8231;
								<bdi><a class="notranslate" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></bdi>
								&#8231; <?php esc_html_e( 'All rights reserved.', 'wplus-ui' ); ?>
								<?php endif; ?>
							</span>
							<span class="creator"><?php esc_html_e( 'Forked from Plus UI by', 'wplus-ui' ); ?> <a href="https://fineshopdesign.com">Fineshop Design</a>, <?php esc_html_e( 'adapted by', 'wplus-ui' ); ?> Zulfadli Rizal, <?php esc_html_e( 'powered by', 'wplus-ui' ); ?> <a href="https://wordpress.org">WordPress</a>.</span>
						</div>
					</div>
				</div>
			</footer>
			<?php wplusui_render_mobile_bar(); ?>
		</div><!-- .mainR -->
	</div><!-- .mainN -->
</div><!-- #root -->
<?php wp_footer(); ?>
</body>
</html>
