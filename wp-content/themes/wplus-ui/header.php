<?php
/**
 * Shared header: site title, live search, bookmark list and light/dark appearance
 * popup, the quick-links bar, notification bar and the mobile/desktop navigation drawer.
 *
 * @package wplus-ui
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> class="nJs" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes" name="viewport" />
<?php if ( ! is_singular() && ! is_front_page() ) : ?>
<meta content="<?php echo esc_attr( get_bloginfo( 'description' ) ); ?>" name="description" />
<?php endif; ?>
<meta content="general" name="rating" />
<?php if ( has_site_icon() ) : ?>
<link href="<?php echo esc_url( get_site_icon_url( 32 ) ); ?>" rel="icon" />
<link href="<?php echo esc_url( get_site_icon_url( 180 ) ); ?>" rel="apple-touch-icon" />
<?php endif; ?>
<meta content="#482dff" name="theme-color" />
<meta content="wordpress" name="generator" />

<noscript>
<style>
	@font-face{font-family:"Google Sans Text";font-style:normal;font-weight:400;font-display:swap;src:local("Google Sans Text"),local("Google-Sans-Text"),url(https://fonts.gstatic.com/s/googlesanstext/v16/5aUu9-KzpRiLCAt4Unrc-xIKmCU5qEp2iw.woff2) format("woff2")}
	@font-face{font-family:"Google Sans Text";font-style:normal;font-weight:700;font-display:swap;src:local("Google Sans Text"),local("Google-Sans-Text"),url(https://fonts.gstatic.com/s/googlesanstext/v16/5aUp9-KzpRiLCAt4Unrc-xIKmCU5oPFTnmhjtg.woff2) format("woff2")}
	@font-face{font-family:"Google Sans Mono";font-style:normal;font-weight:400;font-display:swap;src:local("Google Sans Mono"),local("Google-Sans-Mono"),url(https://fonts.gstatic.com/s/googlesansmono/v4/P5sUzYWFYtnZ_Cg-t0Uq_rfivrdYH4RE8-pZ5gQ1abT53wVQGrk.woff2) format("woff2")}
	:root.nJs .show-if-js { display: none; }
</style>
</noscript>
<?php wplusui_json_data(); ?>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<input class="navI" hidden id="forNavigation" type="checkbox" />
<input class="modI" hidden id="forMode" type="checkbox" />
<div class="mainW <?php echo 'expanded' === get_theme_mod( 'wplusui_menu_default', 'collapsed' ) ? 'ex' : 'co'; ?>" id="root">
	<header class="mainH s" id="header">
		<div class="headC">
			<div class="headD headL">
				<label class="tNav tIc" for="forNavigation">
					<svg class="line" viewBox="0 0 24 24">
						<polyline class="c" points="2 17 7 12 2 7"></polyline>
						<line x1="8" x2="22" y1="5" y2="5"></line>
						<line x1="12" x2="22" y1="12" y2="12"></line>
						<line x1="8" x2="22" y1="19" y2="19"></line>
					</svg>
					<span class="sr-only"><?php esc_html_e( 'Navigation menu', 'wplus-ui' ); ?></span>
				</label>
				<div class="headN bl-hide-title section" id="sec_Header_Title">
					<?php
					// Site name as text (default), logo + name (.b) or logo only (.r, name kept for
					// screen readers and SEO); the logo is the custom logo from Site Identity.
					$wplusui_logo_mode = wplusui_header_logo_mode();
					$wplusui_sub       = wplusui_header_sub_label();
					$wplusui_tag       = ( is_front_page() || is_archive() ) ? 'h1' : 'h2';
					$wplusui_head_cls  = array(
						'text'      => 'n',
						'logo_text' => 'b',
						'logo'      => 'r',
					)[ $wplusui_logo_mode ];
					?>
					<div class="widget Header headW notranslate <?php echo esc_attr( $wplusui_head_cls ); ?>" data-version="2" id="Header01">
						<?php if ( 'text' !== $wplusui_logo_mode ) : ?>
						<a class="headI" href="<?php echo esc_url( home_url( '/' ) ); ?>" tabindex="-1">
							<?php
							echo wp_get_attachment_image(
								(int) get_theme_mod( 'custom_logo' ),
								'full',
								false,
								array(
									'class'   => 'headIm',
									'alt'     => get_bloginfo( 'name' ),
									'loading' => 'eager',
								)
							); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- core-escaped markup. 
							?>
												</a>
						<?php endif; ?>
						<<?php echo esc_attr( $wplusui_tag ); ?> class="headH<?php echo '' !== $wplusui_sub ? ' hasSub' : ''; ?>"<?php echo '' !== $wplusui_sub ? ' data-sub="' . esc_attr( $wplusui_sub ) . '"' : ''; ?>>
							<bdi>
								<?php if ( is_front_page() ) : ?>
								<span class="headT"><?php bloginfo( 'name' ); ?></span>
								<?php else : ?>
								<a class="headT" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
								<?php endif; ?>
							</bdi>
						</<?php echo esc_attr( $wplusui_tag ); ?>>
					</div>
				</div>
			</div>
			<div class="headD headR">
				<div class="headS bl-hide-title section" id="sec_Header_Search">
					<div class="widget BlogSearch srchW" data-version="2" id="BlogSearch01">
						<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="srchF" method="get">
							<input aria-label="<?php esc_attr_e( 'Search this site', 'wplus-ui' ); ?>" autocomplete="off" class="i" id="forSearch" minlength="3" name="s" placeholder="<?php esc_attr_e( 'Looking for something?', 'wplus-ui' ); ?>" required type="search" value="<?php echo esc_attr( get_search_query() ); ?>" />
							<label class="b s" for="forSearch">
								<svg class="line" viewBox="0 0 24 24"><g><circle cx="11.36167" cy="11.36167" r="9.36167"></circle><line class="c" x1="22" x2="19.9332" y1="22" y2="19.9332"></line></g></svg>
							</label>
							<button aria-label="<?php esc_attr_e( 'Clear', 'wplus-ui' ); ?>" class="b r" type="reset">
								<svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg>
							</button>
						</form>
						<div class="fCls"></div>
					</div>
				</div>
				<div class="headP bl-hide-title section" id="sec_Header_Icon">
					<div class="widget TextList" data-version="2" id="TextList01">
						<ul class="headIc">
							<li class="isSrh">
								<label class="tSrch tIc" for="forSearch">
									<svg class="line" viewBox="0 0 24 24"><g><circle cx="11.36167" cy="11.36167" r="9.36167"></circle><line class="c" x1="22" x2="19.9332" y1="22" y2="19.9332"></line></g></svg>
									<span class="sr-only"><?php esc_html_e( 'Search', 'wplus-ui' ); ?></span>
								</label>
							</li>
							<li class="isBkm show-if-js">
								<label class="tBkm tIc n" for="forBookmark">
									<svg class="line" viewBox="0 0 24 24">
										<path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"></path>
									</svg>
									<span class="sr-only"><?php esc_html_e( 'Bookmark', 'wplus-ui' ); ?></span>
								</label>
							</li>
							<li class="isMode">
								<label class="navM tMode tIc tDL show-if-js" for="forAppearance">
									<svg class="line" viewBox="0 0 24 24">
										<g class="d1">
											<path d="M183.72453,170.371a10.4306,10.4306,0,0,1-.8987,3.793,11.19849,11.19849,0,0,1-5.73738,5.72881,10.43255,10.43255,0,0,1-3.77582.89138,1.99388,1.99388,0,0,0-1.52447,3.18176,10.82936,10.82936,0,1,0,15.118-15.11819A1.99364,1.99364,0,0,0,183.72453,170.371Z" transform="translate(-169.3959 -166.45548)"></path>
										</g>
										<g class="d2">
											<path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"></path>
											<path class="c" d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke-width="2"></path>
										</g>
									</svg>
									<span class="sr-only"><?php esc_html_e( 'Appearance', 'wplus-ui' ); ?></span>
								</label>
								<noscript>
									<label class="tMode tIc tDL" for="forMode">
										<svg class="line" viewBox="0 0 24 24">
											<g class="d1"><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"></path><path class="c" d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke-width="2"></path></g>
											<g class="d2"><path d="M183.72453,170.371a10.4306,10.4306,0,0,1-.8987,3.793,11.19849,11.19849,0,0,1-5.73738,5.72881,10.43255,10.43255,0,0,1-3.77582.89138,1.99388,1.99388,0,0,0-1.52447,3.18176,10.82936,10.82936,0,1,0,15.118-15.11819A1.99364,1.99364,0,0,0,183.72453,170.371Z" transform="translate(-169.3959 -166.45548)"></path></g>
										</svg>
										<span class="sr-only"><?php esc_html_e( 'Mode', 'wplus-ui' ); ?></span>
									</label>
								</noscript>
							</li>
						</ul>
						<input class="aprI" hidden id="forAppearance" type="checkbox" />
						<div class="aprW" data-text="<?php esc_attr_e( 'Appearance', 'wplus-ui' ); ?>">
							<button aria-label="Light" class="lgtB" onclick="if (PU.ui) PU.ui.lT(event);" type="button"></button>
							<button aria-label="Dark" class="drkB" onclick="if (PU.ui) PU.ui.dT(event);" type="button"></button>
							<button aria-label="System" class="sysB" onclick="if (PU.ui) PU.ui.sT(event);" type="button"></button>
							<label class="thmB" data-text="<?php esc_attr_e( 'Theme', 'wplus-ui' ); ?>" for="forTheme">
								<span class="sr-only"><?php esc_html_e( 'Theme', 'wplus-ui' ); ?></span>
							</label>
						</div>
						<label class="fCls" for="forAppearance"></label>
						<input class="thmI" hidden id="forTheme" type="checkbox" />
						<div class="thmW" data-text="<?php esc_attr_e( 'Theme', 'wplus-ui' ); ?>">
							<div class="thmP">
								<?php foreach ( wplusui_get_color_scheme_swatches() as $i => $hex ) : ?>
								<button aria-label="<?php /* translators: %d: color scheme number */ echo esc_attr( sprintf( __( 'Color scheme %d', 'wplus-ui' ), $i + 1 ) ); ?>" class="csB<?php echo (int) $i; ?>" onclick="if (PU.ui) PU.ui.sC(<?php echo (int) $i; ?>);" type="button"></button>
								<?php endforeach; ?>
							</div>
						</div>
						<label class="fCls" for="forTheme"></label>
						<div class="widget LinkList" data-version="2" id="LinkList02">
						<input class="bkmI" hidden id="forBookmark" type="checkbox" />
						<div class="wBkm fixLs" hidden>
							
							<div class="bkmH fixH fixT" data-text="<?php esc_attr_e( 'Bookmark Posts', 'wplus-ui' ); ?>">
								<label class="c" data-text="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>" for="forBookmark">
									<svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg>
									<span class="sr-only"><?php esc_html_e( 'Close', 'wplus-ui' ); ?></span>
								</label>
							</div>
							<div class="fixC bkmC" id="dBmPs">
								<div class="n">
									<svg class="line" viewBox="0 0 24 24">
										<g transform="translate(3.650100, 2.749900)">
											<path d="M16.51,5.55 L10.84,0.15 C10.11,0.05 9.29,0 8.39,0 C2.1,0 -1.95399252e-14,2.32 -1.95399252e-14,9.25 C-1.95399252e-14,16.19 2.1,18.5 8.39,18.5 C14.69,18.5 16.79,16.19 16.79,9.25 C16.79,7.83 16.7,6.6 16.51,5.55 Z"></path>
											<path d="M10.2839,0.0827 L10.2839,2.7437 C10.2839,4.6017 11.7899,6.1067 13.6479,6.1067 L16.5989,6.1067"></path>
											<line class="svgC" x1="10.6623" x2="5.7623" y1="10.2306" y2="10.2306"></line>
											<line class="svgC" x1="8.2131" x2="8.2131" y1="12.6808" y2="7.7808"></line>
										</g>
									</svg>
									<p><?php esc_html_e( 'The list of favorite articles does not exist yet...', 'wplus-ui' ); ?></p>
									<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'View all articles', 'wplus-ui' ); ?></a>
								</div>
							</div>
						</div>
						<label class="fCls" for="forBookmark"></label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
		<div class="mainN">
			<div class="mainL">
				<div class="mnBr">
					<div class="mnBrs">
						<div class="mnH">
							<label class="c" data-text="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>" for="forNavigation">
								<svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg>
								<span class="sr-only"><?php esc_html_e( 'Close', 'wplus-ui' ); ?></span>
							</label>
						</div>
						<div class="mnMen bl-hide-title section" id="sec_Nav_Widgets_1">
							<div class="widget HTML" data-version="2" id="HTML01">
								<?php
								wp_nav_menu(
									array(
										'theme_location' => 'primary',
										'container'      => false,
										'items_wrap'     => '<ul id="%1$s" class="mnMn" itemscope itemtype="https://schema.org/SiteNavigationElement">%3$s</ul>',
										'walker'         => new Wplusui_Nav_Walker(),
										'fallback_cb'    => 'wplusui_default_menu_fallback',
									)
								);
								?>
							</div>
						</div>
						<div class="mnMob">
							<div class="mNav">
								<label class="tIc" for="forNavigation">
									<svg class="line" viewBox="0 0 24 24"><path d="M6 12H18"></path><path d="M12 18V6"></path></svg>
									<span class="sr-only"><?php esc_html_e( 'Navigation menu', 'wplus-ui' ); ?></span>
								</label>
							</div>
							<div class="bl-hide-title section" id="sec_Nav_Widgets_2">
								<div class="widget PageList" data-version="2" id="PageList02">
									<ul class="mMenu">
										<li><a href="<?php echo esc_url( home_url( '/sitemap.xml' ) ); ?>"><?php esc_html_e( 'Sitemap', 'wplus-ui' ); ?></a></li>
										<li><span><?php esc_html_e( 'Disclaimer', 'wplus-ui' ); ?></span></li>
										<li><span><?php esc_html_e( 'Privacy', 'wplus-ui' ); ?></span></li>
									</ul>
								</div>
								<div class="widget LinkList" data-version="2" id="LinkList04">
									<ul class="mSoc">
										<?php
										foreach ( wplusui_social_icon_svgs() as $key => $svg ) :
											$label = wplusui_social_networks()[ $key ];
											$url   = get_theme_mod( 'wplusui_social_' . $key );
											if ( ! $url ) {
												continue;
											}
											?>
										<li><a class="a tIc" href="<?php echo esc_url( $url ); ?>" aria-label="<?php echo esc_attr( $label ); ?>" target="_blank" rel="noreferrer noopener"><?php echo $svg; // phpcs:ignore ?></a></li>
											<?php
endforeach;
										?>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<label class="fCls" for="forNavigation"></label>
			</div>
			<div class="mainR">
				<?php if ( ! is_404() ) : // The original 404 page has no under-header row, ad slot or mainC/mainB wrapper. ?>
				<div class="bl-hide-title bl-hide-description section" id="sec_Under_Header">
					<?php
					// This scroller's CSS renders each item's visible label purely
					// via `.navS .l:before { content: attr(title); }` (see style.css)
					// — the <a>/<span> itself must stay empty, so it can't go through
					// the normal Wplusui_Nav_Walker markup used for the main menu.
					$quicklink_items      = array();
					$quicklinks_locations = get_nav_menu_locations();
					if ( ! empty( $quicklinks_locations['quicklinks'] ) ) {
						$quicklink_items = wp_get_nav_menu_items( $quicklinks_locations['quicklinks'] );
					}
					if ( $quicklink_items ) :
						?>
					<div class="widget LinkList navS scrlH" data-version="2" id="LinkList05">
						<ul class="secIn">
							<?php foreach ( $quicklink_items as $item ) : ?>
							<li>
								<?php if ( '#' === $item->url || '' === $item->url ) : ?>
								<span class="l" title="<?php echo esc_attr( $item->title ); ?>"> </span>
								<?php elseif ( wplusui_nav_item_is_current( $item ) ) : ?>
								<a aria-current="page" aria-label="<?php echo esc_attr( $item->title ); ?>" class="l active" href="<?php echo esc_url( $item->url ); ?>" title="<?php echo esc_attr( $item->title ); ?>"></a>
								<?php else : ?>
								<a aria-label="<?php echo esc_attr( $item->title ); ?>" class="l" href="<?php echo esc_url( $item->url ); ?>" title="<?php echo esc_attr( $item->title ); ?>"></a>
								<?php endif; ?>
							</li>
							<?php endforeach; ?>
						</ul>
					</div>
					<?php endif; ?>
					<?php
					$notification     = get_theme_mod( 'wplusui_notification_text', '' );
					$notification_cta = get_theme_mod( 'wplusui_notification_cta_text', '' );
					$notification_url = get_theme_mod( 'wplusui_notification_cta_url', '' );
					?>
					<?php if ( $notification ) : ?>
					<div class="widget LinkList" data-version="2" id="LinkList06">
						<input class="ntfI" data-max-age-sec="86400" hidden id="forNotification" type="checkbox" />
						<div class="ntfC" data-nosnippet>
							<div class="secIn">
								<div class="ntfT">
									<div class="ntfA">
										<span><?php echo wp_kses_post( $notification ); ?></span>
										<?php if ( $notification_cta && $notification_url ) : ?>
										<a href="<?php echo esc_url( $notification_url ); ?>" target="_blank"><?php echo esc_html( $notification_cta ); ?></a>
										<?php endif; ?>
									</div>
								</div>
								<label class="c" for="forNotification"><span class="sr-only"><?php esc_html_e( 'Close', 'wplus-ui' ); ?></span></label>
							</div>
						</div>
					</div>
					<?php endif; ?>
					<?php do_action( 'wplusui_after_under_header' ); ?>
				</div>
				<div class="mainC secIn">
					<div class="mainA bl-hide-title section" id="sec_Horizontal-Ad">
						<?php wplusui_ad_slot( 'under_header' ); ?>
					</div>
					<?php do_action( 'wplusui_above_main_ad' ); ?>
					<div class="mainB">
						<main class="blogB">
				<?php endif; ?>
