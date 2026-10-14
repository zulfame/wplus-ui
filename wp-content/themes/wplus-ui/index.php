<?php
/**
 * Blog home / post feed. Markup follows the original Plus UI <main class="blogB">
 * (carousel + Pinned Post box + "Latest Posts" grid) — see wplusui_get_carousel_posts(),
 * wplusui_get_pinned_post() in functions.php for the WP_Query behind each section.
 *
 * @package wplus-ui
 */

get_header();

$is_home_unpaged = ( is_home() || is_front_page() ) && ! is_paged();

if ( $is_home_unpaged ) {
	wplusui_render_carousel();

	$pinned = get_theme_mod( 'wplusui_pinned_enabled', true ) ? wplusui_get_pinned_post() : false;
	if ( $pinned ) :
		?>
		<div class="section" id="sec_Top_Widgets">
			<?php wplusui_ad_slot( 'above_pinned' ); ?>
			<div class="widget FeaturedPost" data-version="2" id="FeaturedPost01">
				<h2 class="title dt"><?php esc_html_e( 'Pinned Post', 'wplus-ui' ); ?></h2>
				<div class="itemFt" role="feed">
					<?php
					while ( $pinned->have_posts() ) :
						$pinned->the_post();
						wplusui_post_card( 'pinned' );
					endwhile;
					wp_reset_postdata();
					?>
				</div>
			</div>
		</div>
		<?php
	endif;
}
?>

<div class="section" id="sec_Main_Widgets">
	<?php wplusui_ad_slot( 'above_posts' ); ?>
	<div class="widget Blog" data-version="2" id="Blog01">
		<?php if ( $is_home_unpaged ) : ?>
		<div class="blogT hm">
			<h2 class="title dt"><?php esc_html_e( 'Latest Posts', 'wplus-ui' ); ?></h2>
		</div>
		<?php endif; ?>

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
		<div class="n">
			<p><?php esc_html_e( "There's nothing here!", 'wplus-ui' ); ?></p>
		</div>
		<?php endif; ?>
	</div>
	<?php
	if ( $is_home_unpaged ) {
		wplusui_render_home_categories();
	}
	?>
</div>

<div class="section" id="sec_Bottom_Widgets">
	<?php wplusui_ad_slot( 'below_posts' ); ?>
</div>

<?php
wplusui_end_main( wplusui_show_sidebar( 'home' ) );
get_footer();
