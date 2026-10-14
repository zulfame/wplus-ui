<?php
/**
 * Blog sidebar — replaces the static "Popular Posts" + "Labels" widgets
 * seen in the original Plus UI markup <aside class="sideB"> with real
 * WP_Query data (see wplusui_get_popular_posts() in functions.php) and
 * real category counts.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

$exclude     = is_singular( 'post' ) ? array( get_the_ID() ) : array();
$wplusui_pop = wplusui_popular_settings();
$popular     = $wplusui_pop['show'] ? wplusui_get_popular_posts( $wplusui_pop['count'], $exclude, $wplusui_pop['order'] ) : false;
if ( $popular && $exclude && ! $popular->have_posts() ) {
	// The current post is the only one: show it rather than hiding the whole box.
	$popular = wplusui_get_popular_posts( $wplusui_pop['count'], array(), $wplusui_pop['order'] );
}
?>
<aside class="sideB">
	<div class="section" id="sec_Side_Widgets">
		<?php if ( $popular && $popular->have_posts() ) : ?>
		<div class="widget PopularPosts" data-version="2" id="PopularPosts01">
			<h2 class="title dt"><?php echo esc_html( $wplusui_pop['title'] ); ?></h2>
			<div class="itemPp" role="feed">
				<?php
				$first = true;
				while ( $popular->have_posts() ) :
					$popular->the_post();
					?>
					<article class="itm<?php echo $first ? ' mostP' : ''; ?>">
						<?php if ( $first && has_post_thumbnail() ) : ?>
						<div class="iThmb pThmb">
							<a aria-label="<?php the_title_attribute(); ?>" class="thmb" href="<?php the_permalink(); ?>">
								<?php
								the_post_thumbnail(
									'post-thumbnail',
									array(
										'class'   => 'imgThm lblr',
										'loading' => 'eager', // Top of the sidebar beside the article on desktop: often the largest image in view.
									)
								);
								?>
							</a>
							<?php wplusui_card_overlay_top(); ?>
						</div>
						<?php elseif ( $first ) : ?>
							<?php wplusui_placeholder_thumb( true ); ?>
						<?php endif; ?>
						<div class="iInf pSml">
							<time class="aTtmp iTtmp pbl" data-time="<?php echo esc_attr( get_the_date( 'M j' ) ); ?>" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>" title="<?php echo esc_attr( get_the_date() ); ?>"></time>
							<?php $cats = get_the_category(); if ( $cats ) : ?>
							<div class="pLbls" data-text="<?php esc_attr_e( 'in', 'wplus-ui' ); ?>">
								<?php foreach ( $cats as $wplusui_cat ) : ?>
								<a aria-label="<?php echo esc_attr( $wplusui_cat->name ); ?>" data-text="<?php echo esc_attr( $wplusui_cat->name ); ?>" href="<?php echo esc_url( get_category_link( $wplusui_cat ) ); ?>" rel="tag"></a>
								<?php endforeach; ?>
							</div>
							<?php endif; ?>
						</div>
						<div class="iCtnt">
							<div class="iInr">
								<h3 class="iTtl aTtl"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
								<?php if ( $first ) : ?>
								<div class="pSnpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20 ) ); ?></div>
								<?php endif; ?>
							</div>
						</div>
					</article>
					<?php
					$first = false;
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
		<?php endif; ?>

		<?php $cats = get_categories( array( 'hide_empty' => true ) ); ?>
		<?php if ( $cats ) : ?>
		<div class="widget Label wL pSml ls bg" data-version="2" id="Label01">
			<h2 class="title dt"><?php esc_html_e( 'Labels', 'wplus-ui' ); ?></h2>
			<input class="lbI" hidden id="forLabel01" type="checkbox" />
			<div class="lbL">
				<?php foreach ( $cats as $i => $wplusui_cat ) : ?>
				<a aria-label="<?php echo esc_attr( $wplusui_cat->name ); ?>"<?php echo $i < 6 ? ' class="s"' : ''; ?> data-count="<?php echo (int) $wplusui_cat->count; ?>" data-label="<?php echo esc_attr( $wplusui_cat->name ); ?>" href="<?php echo esc_url( get_category_link( $wplusui_cat ) ); ?>"></a>
				<?php endforeach; ?>
			</div>
			<?php if ( count( $cats ) > 6 ) : ?>
			<label class="lbM" data-hide="<?php esc_attr_e( 'Show less', 'wplus-ui' ); ?>" data-more="<?php echo (int) ( count( $cats ) - 6 ); ?>" data-show="<?php esc_attr_e( 'Show more', 'wplus-ui' ); ?>" for="forLabel01"><span class="sr-only"><?php esc_html_e( 'Show more', 'wplus-ui' ); ?></span></label>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<?php dynamic_sidebar( 'sidebar-1' ); ?>
		<?php endif; ?>
	</div>
	<div class="sideS section" id="sec_Side_Sticky">
		<?php wplusui_ad_slot( 'sidebar_sticky' ); ?>
	</div>
</aside>
