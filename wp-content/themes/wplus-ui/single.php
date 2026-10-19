<?php
/**
 * Single post: article with breadcrumb, share popup, related posts, split-page pager
 * and the popup comment form. The "Related Posts" box (#related) is rendered
 * server-side by wplusui_get_related_posts().
 *
 * @package wplus-ui
 */

get_header();

while ( have_posts() ) :
	the_post();
	$wplusui_post_id = get_the_ID();
	$cats            = get_the_category();
	$reading         = wplusui_reading_time( $wplusui_post_id );
	// Show one date: Updated when the post was changed on a later day than it was published, Published otherwise.
	$wplusui_updated = get_the_modified_date( 'Y-m-d' ) !== get_the_date( 'Y-m-d' );
	?>

<div class="section" id="sec_Main_Widgets">
	<?php wplusui_ad_slot( 'above_posts' ); ?>
	<div class="widget Blog">
		<div class="blogP">
			<div class="pHead">
				<div class="pGV">
					<span class="pGrt" data-text="<?php esc_attr_e( 'Welcome!', 'wplus-ui' ); ?>" id="postGreeting">
						<svg class="line" viewBox="0 0 24 24"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"></path><path class="c" d="M15.5 9.75C16.3284 9.75 17 9.07843 17 8.25C17 7.42157 16.3284 6.75 15.5 6.75C14.6716 6.75 14 7.42157 14 8.25C14 9.07843 14.6716 9.75 15.5 9.75Z" stroke-miterlimit="10"></path><path class="c" d="M8.5 9.75C9.32843 9.75 10 9.07843 10 8.25C10 7.42157 9.32843 6.75 8.5 6.75C7.67157 6.75 7 7.42157 7 8.25C7 9.07843 7.67157 9.75 8.5 9.75Z" stroke-miterlimit="10"></path><path d="M8.4 13.3H15.6C16.1 13.3 16.5 13.7 16.5 14.2C16.5 16.69 14.49 18.7 12 18.7C9.51 18.7 7.5 16.69 7.5 14.2C7.5 13.7 7.9 13.3 8.4 13.3Z" stroke-miterlimit="10"></path></svg>
					</span>
				</div>
			</div>
			<article <?php post_class( 'ntry ps post' ); ?>>

				<?php if ( $cats ) : ?>
				<div class="brdCmb">
					<div class="hm"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><span><?php esc_html_e( 'Home', 'wplus-ui' ); ?></span></a></div>
					<div class="lb"><a href="<?php echo esc_url( get_category_link( $cats[0] ) ); ?>"><span><?php echo esc_html( $cats[0]->name ); ?></span></a></div>
				</div>
				<?php endif; ?>

				<h1 class="pTtl aTtl sml itm"><span><?php the_title(); ?></span></h1>

				<?php if ( has_excerpt() ) : ?>
				<div class="pDesc"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></div>
				<?php endif; ?>

				<div class="pInf pSml ps">
					<div class="pAi">
						<div class="pAt">
							<?php echo get_avatar( get_the_author_meta( 'ID' ), 40, '', get_the_author(), array( 'class' => 'im' ) ); ?>
							<a aria-label="<?php the_author(); ?>" class="nm" data-write="<?php esc_attr_e( 'Published by', 'wplus-ui' ); ?>" data-text="<?php the_author(); ?>" href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author" title="<?php /* translators: %s: author name */ echo esc_attr( sprintf( __( 'Published by %s', 'wplus-ui' ), get_the_author() ) ); ?>"></a>
						</div>
						<div class="pCm">
							<div class="pIc">
								<button aria-label="<?php esc_attr_e( 'Read later', 'wplus-ui' ); ?>" class="tIc bm-button show-if-js"<?php echo wplusui_bookmark_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput ?> type="button">
									<svg class="line" viewBox="0 0 24 24"><path class="a h c" d="M14.5 10.6499H9.5" stroke-miterlimit="10"></path><path class="a v c" d="M12 8.20996V13.21" stroke-miterlimit="10"></path><path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"></path><path class="t" d="M9.58997 11L11.09 12.5L15.09 8.5"></path></svg>
								</button>
								<?php if ( comments_open() || get_comments_number() ) : ?>
								<a aria-label="<?php esc_attr_e( 'Comments', 'wplus-ui' ); ?>" class="cmnt tIc" href="#comment" role="button">
									<svg class="line" viewBox="0 0 24 24"><g transform="translate(2.000000, 2.000000)"><path d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"></path></g></svg>
								</a>
								<?php endif; ?>
								<?php if ( wplusui_share_enabled() ) : ?>
								<label class="sh tIc" data-text="<?php esc_attr_e( 'Share', 'wplus-ui' ); ?>" for="forShare">
									<svg class="line" viewBox="0 0 24 24"><path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path><path class="c" d="M10.11 13.6501L13.69 10.0601"></path></svg>
									<span class="sr-only"><?php esc_html_e( 'Share', 'wplus-ui' ); ?></span>
								</label>
								<?php endif; ?>
							</div>
						</div>
					</div>
					<div class="pDr">
						<?php if ( $wplusui_updated ) : ?>
						<div class="pDt u"><time class="aTtmp pTtmp upd" data-text="<?php esc_attr_e( 'Updated', 'wplus-ui' ); ?>" data-time="<?php echo esc_attr( get_the_modified_date() ); ?>" datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>" title="<?php echo esc_attr( get_the_modified_date() ); ?>"></time></div>
						<?php else : ?>
						<div class="pDt p"><time class="aTtmp pTtmp pbl" data-text="<?php esc_attr_e( 'Published', 'wplus-ui' ); ?>" data-time="<?php echo esc_attr( get_the_date() ); ?>" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>" title="<?php echo esc_attr( get_the_date() ); ?>"></time></div>
						<?php endif; ?>
						<?php if ( wplusui_reading_time_enabled() ) : ?>
						<div class="pRd"><span data-minutes="<?php echo (int) $reading; ?>" data-text="<?php esc_attr_e( 'Estimated read time', 'wplus-ui' ); ?>" id="postReadTime"></span></div>
						<?php endif; ?>
					</div>
				</div>

				<div class="pInr">
					<div class="pEnt" id="postID-<?php echo esc_attr( $wplusui_post_id ); ?>">
						<div class="pS post-body postBody" id="postBody">
							<?php the_content(); ?>
						</div>

						<?php wplusui_split_pager(); ?>

						<?php
						// "featured" is an internal curation tag (drives the homepage
						// carousel — see wplusui_get_carousel_posts()), not reader-facing.
						// get_the_tags() returns false (not an empty array) when a post
						// has no tags at all, so it has to be checked before filtering.
						$raw_tags = get_the_tags();
						$tags     = $raw_tags ? array_filter(
							$raw_tags,
							function ( $t ) {
								return 'featured' !== $t->slug;
							}
						) : array();
						if ( $tags ) :
							?>
						<div class="pTgs widget Label wL pSml bg">
							<div class="lbL">
								<?php foreach ( $tags as $wplusui_tag ) : ?>
								<a aria-label="<?php echo esc_attr( $wplusui_tag->name ); ?>" data-label="<?php echo esc_attr( $wplusui_tag->name ); ?>" href="<?php echo esc_url( get_tag_link( $wplusui_tag ) ); ?>" rel="tag"></a>
								<?php endforeach; ?>
							</div>
						</div>
						<?php endif; ?>
					</div>

					<?php get_template_part( 'template-parts/share' ); ?>
				</div>

				<?php
				wplusui_render_author_box();

				$wplusui_related_opts = wplusui_related_settings();
				$related              = $wplusui_related_opts['show'] ? wplusui_get_related_posts( $wplusui_post_id, $wplusui_related_opts['count'] ) : false;
				if ( $related && $related->have_posts() ) :
					?>
				<div id="related">
					<div class="relPosts">
						<h2 class="title dt"><?php echo esc_html( $wplusui_related_opts['title'] ); ?></h2>
						<div class="itemRp">
							<?php
							while ( $related->have_posts() ) :
								$related->the_post();
								wplusui_post_card( 'grid' );
endwhile;
							wp_reset_postdata();
							?>
						</div>
					</div>
				</div>
				<?php endif; ?>

				<div class="pCmnts" id="comment">
					<input class="cmSh fixI" hidden id="forComments" type="checkbox" />
					<div class="cmShw">
						<label class="cmBtn" for="forComments"><?php esc_html_e( 'Post a Comment', 'wplus-ui' ); ?></label>
					</div>
					<section class="cm cmBr fixL" id="comment-blogger">
						<div class="cmBri mty">
							<div class="cmBrs fixLs">
								<div class="cmH fixH">
									<h3 class="title"><?php esc_html_e( 'Post a Comment', 'wplus-ui' ); ?></h3>
									<div class="cmI cl">
										<label class="x" data-text="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>" for="forComments">
											<svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg>
											<span class="sr-only"><?php esc_html_e( 'Close', 'wplus-ui' ); ?></span>
										</label>
									</div>
								</div>
								<div class="cmC fixC">
									<?php comments_template(); ?>
								</div>
							</div>
						</div>
						<label class="fCls" for="forComments"></label>
					</section>
				</div>
			</article>
		</div>
		<?php
		if ( wplusui_toc_enabled() ) {
			wplusui_render_toc_shell();
		}
		?>
	</div>
</div>

	<?php
endwhile;

wplusui_end_main( wplusui_show_sidebar( 'single' ) );
get_footer();
