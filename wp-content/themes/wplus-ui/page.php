<?php
/**
 * Static page: <article class="ntry itm"> in the original Plus UI layout.
 * Deliberately bare next to single.php: no byline/date row, no sidebar, no
 * comments (matches the original "static-page layout (no post meta/comments)"
 * behaviour noted in the original Plus UI markup).
 *
 * @package wplus-ui
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>

<div class="section" id="sec_Main_Widgets">
	<div class="widget Blog">
		<div class="blogP">
			<article <?php post_class( 'ntry ps post' ); ?>>
				<div class="brdCmb">
					<div class="hm"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><span><?php esc_html_e( 'Home', 'wplus-ui' ); ?></span></a></div>
					<div class="tl" data-text="<?php the_title_attribute(); ?>"></div>
				</div>
				<h1 class="pTtl aTtl sml itm"><span><?php the_title(); ?></span></h1>
				<div class="pInr">
					<div class="pEnt" id="postID-<?php the_ID(); ?>">
						<div class="pS post-body postBody" id="postBody">
							<?php the_content(); ?>
						</div>
						<?php wplusui_split_pager(); ?>
					</div>
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

wplusui_end_main( false );
get_footer();
