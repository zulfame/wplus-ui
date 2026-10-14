<?php
/**
 * Search results — same "Blog widget" grid as archive.php/index.php;
 * the original static rebuild had no local search backend to build this
 * from, so this is new.
 *
 * @package wplus-ui
 */

get_header();
?>

<div class="section" id="sec_Main_Widgets">
	<div class="widget Blog" data-version="2" id="Blog01">
		<div class="blogT">
			<div class="t srch">
				<span class="hm" data-text="<?php esc_attr_e( 'Home', 'wplus-ui' ); ?>"></span>
				<?php
				printf(
					/* translators: %s: search query */
					esc_html__( 'Search results for: %s', 'wplus-ui' ),
					'<strong>' . esc_html( get_search_query() ) . '</strong>'
				);
				?>
			</div>
		</div>

		<?php if ( have_posts() ) : ?>
		<div class="blogP oGrd">
			<?php
			while ( have_posts() ) :
				the_post();
				wplusui_post_card( 'grid' );
endwhile;
			?>
		</div>
			<?php wplusui_paging_nav(); ?>
		<?php else : ?>
		<div class="n"><p><?php esc_html_e( 'No results found', 'wplus-ui' ); ?></p></div>
		<?php endif; ?>
	</div>
</div>

<?php
wplusui_end_main( wplusui_show_sidebar( 'search' ) );
get_footer();
