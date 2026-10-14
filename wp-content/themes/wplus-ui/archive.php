<?php
/**
 * Category/tag archive, following the original Plus UI layout. The
 * blurred banner card (.ldW) sits in the DOM *above* <div class="mainC secIn">
 * in the original markup, outside the region single templates control, so
 * it's hooked into header.php's 'wplusui_after_under_header' action (see
 * that file) rather than printed inline here. No sidebar on this template —
 * confirmed by archive.html having no <aside> at all.
 *
 * @package wplus-ui
 */

add_action( 'wplusui_after_under_header', 'wplusui_archive_banner' );
/**
 * Print the archive banner card.
 */
function wplusui_archive_banner() {
	$title       = wplusui_page_title();
	$description = '';
	$image       = '';
	$count       = '';
	$size        = array();

	if ( is_category() || is_tag() || is_tax() ) {
		$term        = get_queried_object();
		$description = term_description( $term );
		$count       = (int) $term->count;
		$banner_id   = get_term_meta( $term->term_id, 'wplusui_banner_image_id', true );
		if ( $banner_id ) {
			$src = wp_get_attachment_image_src( $banner_id, 'large' );
			if ( $src ) {
				$image = $src[0];
				$size  = array( $src[1], $src[2] );
			}
		} else {
			$recent = get_posts(
				array(
					'posts_per_page' => 1,
					'meta_key'       => '_thumbnail_id',
					'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- one small query, only on a term archive.
						array(
							'taxonomy' => $term->taxonomy,
							'terms'    => $term->term_id,
						),
					),
				)
			);
			if ( $recent ) {
				$image = get_the_post_thumbnail_url( $recent[0]->ID, 'large' );
			}
		}
	}
	?>
	<div class="widget LinkList ldW c d" data-version="2" id="LinkList07">
		<?php if ( $image ) : ?>
		<img alt="<?php echo esc_attr( $title ); ?>" class="show-if-js ldC"<?php echo $size ? ' width="' . (int) $size[0] . '" height="' . (int) $size[1] . '"' : ''; ?> src="<?php echo esc_url( $image ); ?>" />
		<?php endif; ?>
		<div class="secIn">
			<div class="ldI">
				<h2 class="ldH"><?php echo esc_html( $title ); ?></h2>
				<?php if ( '' !== $count ) : ?>
				<div class="ldP show-if-js" data-label="<?php echo esc_attr( $title ); ?>" data-num-posts="<?php echo esc_attr( $count ); ?>">
					<svg class="line" viewBox="0 0 24 24"><path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke-miterlimit="10"></path><path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke-miterlimit="10"></path><path d="M8 13H12" stroke-miterlimit="10"></path><path d="M8 17H16" stroke-miterlimit="10"></path></svg>
				</div>
				<?php endif; ?>
				<?php if ( $description ) : ?>
				<div class="ldD"><?php echo esc_html( wp_strip_all_tags( $description ) ); ?></div>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<?php
}

get_header();
?>

<div class="section" id="sec_Main_Widgets">
	<div class="widget Blog" data-version="2" id="Blog01">
		<div class="blogT">
			<div class="t srch">
				<span class="hm" data-text="<?php esc_attr_e( 'Home', 'wplus-ui' ); ?>"></span><?php echo esc_html( wplusui_page_title() ); ?>
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
		<div class="n"><p><?php esc_html_e( "There's nothing here!", 'wplus-ui' ); ?></p></div>
		<?php endif; ?>
	</div>
</div>

<div class="section" id="sec_Bottom_Widgets">
	<?php wplusui_ad_slot( 'below_posts' ); ?>
</div>

<?php
wplusui_end_main( false );
get_footer();
