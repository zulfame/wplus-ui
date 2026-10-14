<?php
/**
 * Reusable output helpers shared by index.php / single.php / archive.php /
 * search.php / sidebar.php — the theme repeats the same "post card" markup
 * (article.itm) in the pinned-post box, the main grid, the popular-posts
 * widget and the related-posts box.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fallback when no menu is assigned.
 */
function wplusui_default_menu_fallback() {
	echo '<ul id="primary-menu" class="mnMn">';
	wp_list_pages(
		array(
			'title_li' => '',
			'echo'     => true,
		)
	);
	echo '</ul>';
}

/**
 * The data-bm-* attributes read by script.js for every .bm-button (all fields
 * are needed: the bookmark list renderer crashes when e.g. the image is missing).
 */
function wplusui_bookmark_attrs() {
	$labels = wp_list_pluck( get_the_category(), 'name' );
	$thumb  = get_the_post_thumbnail_url( get_the_ID(), 'post-thumbnail' );
	$attrs  = array(
		'data-bm-id'        => get_the_ID(),
		'data-bm-image'     => $thumb ? $thumb : '',
		'data-bm-labels'    => wp_json_encode( array_values( $labels ) ),
		'data-bm-published' => get_the_date( 'c' ),
		'data-bm-snippet'   => wp_trim_words( get_the_excerpt(), 20 ),
		'data-bm-title'     => the_title_attribute( array( 'echo' => false ) ),
		'data-bm-updated'   => get_the_modified_date( 'c' ),
		'data-bm-url'       => get_permalink(),
		'data-save'         => __( 'Save', 'wplus-ui' ),
		'data-saved'        => __( 'Saved', 'wplus-ui' ),
	);
	$out    = '';
	foreach ( $attrs as $k => $v ) {
		$out .= ' ' . $k . '="' . esc_attr( $v ) . '"';
	}
	return $out;
}

/**
 * Hover overlay on card thumbnails: "tfxM T" (edit link + bookmark button)
 * and "tfxM B" (author byline). The bookmark button carries the data-bm-*
 * attributes read by script.js (bookmark popup + localStorage).
 */
function wplusui_card_overlay_top() {
	$labels = wp_list_pluck( get_the_category(), 'name' );
	$thumb  = get_the_post_thumbnail_url( get_the_ID(), 'post-thumbnail' );
	$edit   = admin_url( 'post.php?post=' . get_the_ID() . '&action=edit' );
	?>
	<div class="tfxM T">
		<div class="tfxC">
			<a aria-label="<?php esc_attr_e( 'Edit this post', 'wplus-ui' ); ?>" class="edit show-if-admin" data-text="<?php esc_attr_e( 'Edit', 'wplus-ui' ); ?>" href="<?php echo esc_url( $edit ); ?>" rel="nofollow noreferrer noopener" target="_blank"><svg class="line" viewBox="0 0 24 24"><g transform="translate(3.500000, 3.500000)"><line class="c" x1="9.8352" x2="16.2122" y1="16.0078" y2="16.0078"></line><path d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"></path><line x1="7.0041" x2="11.8681" y1="3.7114" y2="7.3624"></line></g></svg></a>
		</div>
		<div class="tfxC">
			<button aria-label="<?php esc_attr_e( 'Add to bookmark', 'wplus-ui' ); ?>" class="bM bm-button show-if-js"<?php echo wplusui_bookmark_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput ?> type="button"><svg class="line" viewBox="0 0 24 24"><path class="a h c" d="M14.5 10.6499H9.5" stroke-miterlimit="10"></path><path class="a v c" d="M12 8.20996V13.21" stroke-miterlimit="10"></path><path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"></path><path class="t" d="M9.58997 11L11.09 12.5L15.09 8.5"></path></svg></button>
		</div>
	</div>
	<div class="tfxM B">
		<div class="tfxC">
			<div class="aNm">
				<?php echo get_avatar( get_the_author_meta( 'ID' ), 15, '', get_the_author(), array( 'class' => 'im' ) ); ?>
				<bdi class="nm" data-text="<?php echo esc_attr( get_the_author() ); ?>"></bdi>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Variant (1 to 4) of the placeholder picture for a post or slide, so neighbouring cards do not look identical.
 *
 * @param int $seed Post ID or slide number.
 * @return int
 */
function wplusui_placeholder_variant( $seed ) {
	return 1 + ( absint( $seed ) % 4 );
}

/**
 * Placeholder thumbnail for a post without a featured image: the theme's own "no image"
 * block (.pThmb.nul) with a soft picture drawn in the accent color, so it follows the
 * color scheme and dark mode. Keeps the hover overlay (edit, bookmark, byline) of real thumbnails.
 *
 * @param bool $pinned Whether the card is the pinned/popular layout (.iThmb).
 */
function wplusui_placeholder_thumb( $pinned = false ) {
	?>
		<div class="<?php echo $pinned ? 'iThmb pThmb nul' : 'pThmb nul'; ?>">
			<a aria-label="<?php the_title_attribute(); ?>" class="thmb" href="<?php the_permalink(); ?>">
				<span aria-hidden="true" class="imgThm plcH plcV<?php echo (int) wplusui_placeholder_variant( get_the_ID() ); ?>" data-text="<?php esc_attr_e( 'No image', 'wplus-ui' ); ?>"></span>
			</a>
			<?php wplusui_card_overlay_top(); ?>
		</div>
	<?php
}

/**
 * Loading attributes for a card thumbnail. The first three cards of a listing sit in the first screen and one of them
 * is usually the largest image there (LCP), so they load at once and the very first with high priority; the rest
 * wait until they come near the screen. Under a post (related posts) every card is far down and stays lazy.
 *
 * @return array{loading:string,fetchpriority?:string}
 */
function wplusui_card_loading_attrs() {
	static $count = 0;
	if ( is_singular() ) {
		return array( 'loading' => 'lazy' );
	}
	++$count;
	if ( $count > 3 ) {
		return array( 'loading' => 'lazy' );
	}
	return 1 === $count ? array(
		'loading'       => 'eager',
		'fetchpriority' => 'high',
	) : array( 'loading' => 'eager' );
}

/**
 * One post card. The theme has two distinct card layouts for this (verified
 * directly against the original Plus UI markup lines ~1380 and ~1545):
 *
 * - 'grid'   (Blog widget, article.ntry): .pThmb + .pCntn > .pHdr.pSml
 *   (category) > h2.pTtl.aTtl.sml > .pSnpt > .pInf.pSml (Updated + Keep reading)
 * - 'pinned' (FeaturedPost widget, article.itm): .iThmb.pThmb (with the
 *   edit/bookmark hover overlay + author byline) + .iCtnt > .pHdr.pSml
 *   (category) > h3.pTtl.aTtl (NOT .iTtl) > .pSnpt > .pInf.pSml — i.e. the
 *   same inner pattern as 'grid', just wrapped differently and with a
 *   thumbnail author overlay. It does NOT use the .iInf/.iTtl pattern that
 *   the sidebar's Popular Posts widget uses (that one's built directly in
 *   sidebar.php, not through this function).
 *
 * @param string $variant grid or pinned.
 */
function wplusui_post_card( $variant = 'grid' ) {
	$cats = get_the_category();
	// On a category archive the current label is shown as plain text, not a link.
	$current = is_category() ? get_queried_object_id() : 0;
	$pinned  = 'pinned' === $variant;
	?>
	<article class="<?php echo $pinned ? 'itm' : 'ntry'; ?>">
		<?php if ( has_post_thumbnail() ) : ?>
		<div class="<?php echo $pinned ? 'iThmb pThmb' : 'pThmb'; ?>">
			<a aria-label="<?php the_title_attribute(); ?>" class="thmb" href="<?php the_permalink(); ?>">
				<?php
				the_post_thumbnail(
					'post-thumbnail',
					array_merge( array( 'class' => 'imgThm lblr' ), wplusui_card_loading_attrs() )
				);
				?>
			</a>
			<?php wplusui_card_overlay_top(); ?>
		</div>
		<?php else : ?>
			<?php wplusui_placeholder_thumb( $pinned ); ?>
		<?php endif; ?>

		<div class="<?php echo $pinned ? 'iCtnt' : 'pCntn'; ?>">
			<?php if ( $cats ) : ?>
			<div class="pHdr pSml">
				<div class="pLbls" data-text="<?php esc_attr_e( 'in', 'wplus-ui' ); ?>">
					<?php foreach ( $cats as $cat ) : ?>
						<?php if ( is_category() && (int) $cat->term_id === $current ) : ?>
					<span data-text="<?php echo esc_attr( $cat->name ); ?>"></span>
						<?php else : ?>
					<a aria-label="<?php echo esc_attr( $cat->name ); ?>" data-text="<?php echo esc_attr( $cat->name ); ?>" href="<?php echo esc_url( get_category_link( $cat ) ); ?>" rel="tag"></a>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			</div>
			<?php endif; ?>
			<?php if ( $pinned ) : ?>
			<h3 class="pTtl aTtl"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
			<?php else : ?>
			<h2 class="pTtl aTtl sml">
				<a data-text="<?php the_title_attribute(); ?>" href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
			</h2>
			<?php endif; ?>
			<div class="pSnpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20 ) ); ?></div>
			<div class="pInf pSml">
				<time class="aTtmp pTtmp upd" data-text="<?php esc_attr_e( 'Updated', 'wplus-ui' ); ?>" data-time="<?php echo esc_attr( get_the_modified_date( 'M j, Y' ) ); ?>" datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>" title="<?php echo esc_attr( get_the_modified_date() ); ?>"></time>
				<a aria-label="<?php esc_attr_e( 'Keep reading', 'wplus-ui' ); ?>" class="pJmp" href="<?php the_permalink(); ?>"></a>
			</div>
		</div>
	</article>
	<?php
}

/**
 * Homepage category sections ("aCat" blocks). They are rendered server-side
 * in the final markup the runtime script would otherwise build. data-label/data-title are left off so
 * the runtime does not try to fill them again.
 */
function wplusui_render_home_categories() {
	$slugs = array_filter( array_map( 'trim', explode( ',', (string) get_theme_mod( 'wplusui_home_categories', 'documentation,product' ) ) ) );
	$out   = '';
	foreach ( $slugs as $slug ) {
		$term = get_category_by_slug( $slug );
		if ( ! $term ) {
			continue;
		}
		$q = new WP_Query(
			array(
				'cat'                 => $term->term_id,
				'posts_per_page'      => 6,
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			)
		);
		if ( ! $q->have_posts() ) {
			continue;
		}
		ob_start();
		?>
		<div class="aCat loaded" data-max-results="6" data-one-grid="true" data-sort-by="published">
			<div class="blogT">
				<h2 class="title"><?php echo esc_html( $term->name ); ?></h2>
				<a aria-label="<?php esc_attr_e( 'View all', 'wplus-ui' ); ?>" href="<?php echo esc_url( get_category_link( $term ) ); ?>"></a>
			</div>
			<div class="blogP oGrd">
				<?php
				while ( $q->have_posts() ) {
					$q->the_post();
					wplusui_post_card( 'grid' );
				}
				?>
			</div>
		</div>
		<?php
		$out .= ob_get_clean();
		wp_reset_postdata();
	}
	if ( $out ) {
		echo '<div class="widget LinkList" data-version="2" id="LinkList08">' . $out . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
}

/**
 * Carousel slides: the custom Customizer slides, or posts tagged "featured".
 *
 * @return array<int,array<string,mixed>> Slides with num, title, caption, url, thumb and thumb_id.
 */
function wplusui_get_carousel_slides() {
	$slides = array();
	for ( $i = 1; $i <= 5; $i++ ) {
		$img = get_theme_mod( "wplusui_carousel_image_$i", '' );
		if ( $img ) {
			$slides[] = array(
				'num'      => sprintf( '%02d', count( $slides ) + 1 ),
				'title'    => get_theme_mod( "wplusui_carousel_title_$i", '' ),
				'caption'  => get_theme_mod( "wplusui_carousel_caption_$i", '' ),
				'url'      => get_theme_mod( "wplusui_carousel_url_$i", '' ),
				'thumb'    => $img,
				'thumb_id' => attachment_url_to_postid( $img ),
			);
		}
	}
	if ( ! $slides ) {
		$query = wplusui_get_carousel_posts( 5 );
		$n     = 1;
		while ( $query->have_posts() ) {
			$query->the_post();
			// assets/css/style.css keys the "which slide is showing" logic off a
			// 2-digit, 1-based numeric SUFFIX on both the radio id and data-i
			// (`.sldW > [id$="01"]:checked ~ * > [data-i$="01"]`), so the number
			// must be zero-padded or the attribute-suffix selectors never match.
			$slides[] = array(
				'num'      => sprintf( '%02d', $n ),
				'title'    => get_the_title(),
				'caption'  => wp_trim_words( wp_strip_all_tags( get_the_excerpt() ), 18 ),
				'url'      => get_permalink(),
				'thumb'    => get_the_post_thumbnail_url( get_the_ID(), 'full' ),
				'thumb_id' => get_post_thumbnail_id(),
			);
			++$n;
		}
		wp_reset_postdata();
	}
	return $slides;
}

/**
 * Homepage carousel; slides come from wplusui_get_carousel_slides().
 */
function wplusui_render_carousel() {
	if ( ! get_theme_mod( 'wplusui_carousel_enabled', true ) ) {
		return;
	}
	$slides = wplusui_get_carousel_slides();
	$total  = count( $slides );
	if ( $total < 1 ) {
		return;
	}
	?>
	<div class="sldW" data-auto-advance-after="4">
		<?php foreach ( $slides as $s ) : ?>
		<input <?php checked( '01' === $s['num'] ); ?> hidden id="ciImage<?php echo esc_attr( $s['num'] ); ?>" name="iRcarousel" type="radio" />
		<?php endforeach; ?>
		<div class="sldO bl-hide-description section" id="sec_Carousel">
			<?php foreach ( $slides as $s ) : ?>
			<div class="widget Image sldA" data-i="Image<?php echo esc_attr( $s['num'] ); ?>" data-version="2" id="Image<?php echo esc_attr( $s['num'] ); ?>">
				<?php if ( ! $s['thumb'] ) : ?>
				<span aria-hidden="true" class="sldI plcH plcV<?php echo (int) wplusui_placeholder_variant( (int) $s['num'] ); ?>"></span>
				<?php else : ?>
					<?php
					$first = '01' === $s['num'];
					$img   = $s['thumb_id'] ? wp_get_attachment_image(
						$s['thumb_id'],
						'large',
						false,
						array(
							'alt'           => $s['title'],
							'class'         => 'sldI',
							'sizes'         => '(max-width: 896px) 100vw, 822px',
							'loading'       => $first ? 'eager' : 'lazy',
							'fetchpriority' => $first ? 'high' : 'low',
							'decoding'      => $first ? 'sync' : 'async',
						)
					) : '';
					if ( $img ) {
						echo $img; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- core-escaped markup.
					} else {
						?>
				<img alt="<?php echo esc_attr( $s['title'] ); ?>" class="sldI" height="432" src="<?php echo esc_url( $s['thumb'] ); ?>" width="1080"<?php echo $first ? ' fetchpriority="high"' : ' loading="lazy"'; ?> />
						<?php
					}
					?>
				<?php endif; ?>
				<?php if ( '' !== $s['title'] ) : ?>
				<div class="sldT" data-title="<?php echo esc_attr( $s['title'] ); ?>"<?php echo '' !== $s['caption'] ? ' data-caption="' . esc_attr( $s['caption'] ) . '"' : ''; ?>></div>
				<?php endif; ?>
				<?php if ( '' !== $s['url'] ) : ?>
				<a aria-label="<?php echo esc_attr( $s['title'] ); ?>" class="sldL" href="<?php echo esc_url( $s['url'] ); ?>" title="<?php echo esc_attr( $s['title'] ); ?>"></a>
				<?php endif; ?>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="sldB sldP">
			<?php
			foreach ( $slides as $idx => $s ) :
				$prev = $slides[ ( $idx - 1 + $total ) % $total ]['num'];
				?>
			<label data-i="Image<?php echo esc_attr( $s['num'] ); ?>" for="ciImage<?php echo esc_attr( $prev ); ?>"><span class="sr-only"><?php esc_html_e( 'Previous', 'wplus-ui' ); ?></span></label>
			<?php endforeach; ?>
		</div>
		<div class="sldB sldN">
			<?php
			foreach ( $slides as $idx => $s ) :
				$next = $slides[ ( $idx + 1 ) % $total ]['num'];
				?>
			<label data-i="Image<?php echo esc_attr( $s['num'] ); ?>" for="ciImage<?php echo esc_attr( $next ); ?>"><span class="sr-only"><?php esc_html_e( 'Next', 'wplus-ui' ); ?></span></label>
			<?php endforeach; ?>
		</div>
		<div class="sldD">
			<?php foreach ( $slides as $s ) : ?>
			<label data-i="Image<?php echo esc_attr( $s['num'] ); ?>" for="ciImage<?php echo esc_attr( $s['num'] ); ?>"><span class="sr-only"><?php echo esc_html( $s['title'] ); ?></span></label>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}

/**
 * Table-of-contents mount point — assets/js/script.js walks the post's
 * headings and fills #postToc .tocIn itself, so this is just the empty
 * shell the runtime expects.
 */
function wplusui_render_toc_shell() {
	?>
	<input class="tocI" hidden id="forTocJs" type="checkbox" />
	<div class="tocL" hidden id="postToc">
		<div class="tocLi">
			<div class="tocLs">
				<label class="tocH fixH" for="forTocJs">
					<div class="tocC">
						<span>
							<svg class="line" viewBox="0 0 24 24"><g transform="translate(3.610000, 2.750100)"><line class="c" x1="11.9858" x2="4.7658" y1="12.9463" y2="12.9463"></line><line class="c" x1="11.9858" x2="4.7658" y1="9.1865" y2="9.1865"></line><line class="c" x1="7.521" x2="4.766" y1="5.4272" y2="5.4272"></line><path d="M7.63833441e-14,9.25 C7.63833441e-14,16.187 2.098,18.5 8.391,18.5 C14.685,18.5 16.782,16.187 16.782,9.25 C16.782,2.313 14.685,0 8.391,0 C2.098,0 7.63833441e-14,2.313 7.63833441e-14,9.25 Z"></path></g></svg>
						</span>
					</div>
					<div class="tocT fixT" data-text="<?php esc_attr_e( 'Table of contents', 'wplus-ui' ); ?>">
						<span class="c" data-text="<?php esc_attr_e( 'Close', 'wplus-ui' ); ?>"><svg class="line" viewBox="0 0 24 24"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"></path></svg></span>
					</div>
					<span class="sr-only"><?php esc_html_e( 'Table of contents', 'wplus-ui' ); ?></span>
				</label>
				<div class="tocIn"></div>
			</div>
		</div>
		<label class="fCls" for="forTocJs"></label>
	</div>
	<script>
	/* After choosing an entry the panel closes, so it does not cover the heading the visitor just jumped to. */
	(function(){var p=document.getElementById('postToc'),c=document.getElementById('forTocJs');if(p&&c){p.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.tocIn a')){c.checked=false;}});}})();
	</script>
	<?php
}

/**
 * Closes </main><!-- mainB -->, optionally renders the sidebar, then closes
 * the mainC.secIn / mainR / mainN wrapper divs opened in header.php — see
 * that file's docblock for why the split happens here instead of a single
 * header/footer pair (the sidebar's presence differs per page type).
 *
 * @param bool $sidebar Whether to print the sidebar.
 */
function wplusui_end_main( $sidebar = true ) {
	// <aside class="sideB"> must be a sibling of <main class="blogB">, both
	// inside div.mainB — assets/css/style.css's desktop 2-column layout keys
	// off `.blogB:not(:last-child)` (shrinks main when a sidebar follows it)
	// and a negative-margin `.sideB` pulled up beside it, not flexbox — so
	// the sidebar has to land here, before .mainB closes, not after it.
	echo '</main>';
	if ( $sidebar ) {
		get_sidebar();
	}
	echo '</div><!-- .mainB --></div><!-- .mainC.secIn -->'; // .mainR/.mainN stay open: <footer> lives inside .mainR (see footer.php)
}

/**
 * Newest / Home / Oldest pager.
 */
function wplusui_paging_nav() {
	global $wp_query;
	$max = (int) $wp_query->max_num_pages;
	if ( $max < 2 && ! is_category() ) {
		return;
	}
	$paged = max( 1, (int) get_query_var( 'paged' ) );
	$left  = '<svg class="line" viewBox="0 0 24 24"><path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke-miterlimit="10"></path><path d="M20.5 12H3.67004" stroke-miterlimit="10"></path></svg>';
	$right = '<svg class="line" viewBox="0 0 24 24"><path d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke-miterlimit="10"></path><path d="M3.5 12H20.33" stroke-miterlimit="10"></path></svg>';
	$home  = '<svg class="line" viewBox="0 0 24 24"><g transform="translate(2.400000, 2.000000)"><path d="M1.24344979e-14,11.713 C1.24344979e-14,6.082 0.614,6.475 3.919,3.41 C5.365,2.246 7.615,0 9.558,0 C11.5,0 13.795,2.235 15.254,3.41 C18.559,6.475 19.172,6.082 19.172,11.713 C19.172,20 17.213,20 9.586,20 C1.959,20 1.24344979e-14,20 1.24344979e-14,11.713 Z"></path></g></svg>';

	echo '<div class="blogN" id="blog-pager">';
	if ( $paged > 1 ) {
		echo '<a aria-label="' . esc_attr__( 'Newest', 'wplus-ui' ) . '" class="nwLnk" data-text="' . esc_attr__( 'Newest', 'wplus-ui' ) . '" href="' . esc_url( get_pagenum_link( $paged - 1 ) ) . '" rel="prev">' . $left . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput
	} else {
		echo '<div class="nwLnk nPst" data-text="' . esc_attr__( 'Newest', 'wplus-ui' ) . '">' . $left . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
	if ( $paged > 1 || ! is_front_page() ) {
		echo '<a aria-label="' . esc_attr__( 'Home', 'wplus-ui' ) . '" class="hmLnk" href="' . esc_url( home_url( '/' ) ) . '">' . $home . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput
	} else {
		echo '<div class="hmLnk nPst">' . $home . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
	if ( $paged < $max ) {
		echo '<a aria-label="' . esc_attr__( 'Oldest', 'wplus-ui' ) . '" class="olLnk" data-text="' . esc_attr__( 'Oldest', 'wplus-ui' ) . '" href="' . esc_url( get_pagenum_link( $paged + 1 ) ) . '" rel="next">' . $right . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput
	} else {
		echo '<div class="olLnk nPst" data-text="' . esc_attr__( 'Oldest', 'wplus-ui' ) . '">' . $right . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo '</div>';
}

/**
 * Split-post pager. Mirrors the markup built by the theme's own split-post.js
 * (assets/js/script.js): "Page N of M:" label, prev/next arrows,
 * a window of +-3 pages around the current one plus first/last, and "..."
 * gaps. Driven by WordPress's native <!--nextpage--> pagination.
 */
function wplusui_split_pager() {
	global $page, $numpages;
	if ( $numpages < 2 ) {
		return;
	}
	$prev = '<svg class="line" viewBox="0 0 24 24"><path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke-miterlimit="10"></path><path d="M20.5 12H3.67004" stroke-miterlimit="10"></path></svg>';
	$next = '<svg class="line" viewBox="0 0 24 24"><path d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke-miterlimit="10"></path><path d="M3.5 12H20.33" stroke-miterlimit="10"></path></svg>';
	$url  = function ( $i ) {
		preg_match( '/href="([^"]+)"/', _wp_link_page( $i ), $m );
		return $m ? $m[1] : '';
	};
	$s    = (int) $page;
	$n    = (int) $numpages;
	echo '<div class="blogN numP">';
	/* translators: 1: current page, 2: total pages */
	echo '<div class="nPst" data-text="' . esc_attr( sprintf( __( 'Page %1$d of %2$d:', 'wplus-ui' ), $s, $n ) ) . '"></div>';
	if ( 1 === $s ) {
		echo '<div class="nwLnk nPst">' . $prev . '</div>'; // phpcs:ignore
	}
	for ( $e = 1; $e <= $n; $e++ ) {
		if ( $e === $s ) {
			echo '<div class="nPst" data-text="' . (int) $e . '"></div>';
		} elseif ( $e === $s - 1 ) {
			echo '<a class="nwLnk" href="' . $url( $e ) . '" aria-label="' . esc_attr__( 'Previous', 'wplus-ui' ) . '" data-text="' . (int) $e . '">' . $prev . '</a>'; // phpcs:ignore
		} elseif ( $e === $s + 1 ) {
			echo '<a class="olLnk" href="' . $url( $e ) . '" aria-label="' . esc_attr__( 'Next', 'wplus-ui' ) . '" data-text="' . (int) $e . '">' . $next . '</a>'; // phpcs:ignore
		} elseif ( ( $e >= $s - 3 && $e <= $s + 3 ) || 1 === $e || $e === $n ) {
			/* translators: %d: page number */
			echo '<a href="' . $url( $e ) . '" aria-label="' . esc_attr( sprintf( __( 'Page %d', 'wplus-ui' ), $e ) ) . '" data-text="' . (int) $e . '"></a>'; // phpcs:ignore
		} elseif ( $e === $s - 4 || $e === $s + 4 ) {
			echo '<div class="nPst" data-text="..."></div>';
		}
	}
	if ( $s + 1 > $n ) {
		echo '<div class="olLnk nPst">' . $next . '</div>'; // phpcs:ignore
	}
	echo '</div>';
}

/**
 * Default titles of the four footer link columns.
 *
 * @return string[] Column number => title.
 */
function wplusui_footer_column_titles() {
	return array(
		1 => __( 'Product', 'wplus-ui' ),
		2 => __( 'Resources', 'wplus-ui' ),
		3 => __( 'Support', 'wplus-ui' ),
		4 => __( 'Company', 'wplus-ui' ),
	);
}

/**
 * Print one footer link column from the menu assigned to its location. It uses the
 * same markup as a text widget, so it looks identical to a widget column.
 *
 * @param int $col     Column number, 1 to 4.
 * @param int $menu_id Menu to print; 0 uses the menu assigned to the footer-N theme location.
 */
function wplusui_footer_menu_column( $col, $menu_id = 0 ) {
	$defaults = wplusui_footer_column_titles();
	$title    = trim( (string) get_theme_mod( 'wplusui_footer_title_' . $col, '' ) );
	if ( '' === $title ) {
		$title = $defaults[ $col ];
	}
	echo '<div class="widget widget_text" id="footer-menu-' . (int) $col . '"><h3 class="title">' . esc_html( $title ) . '</h3><div class="textwidget">';
	wp_nav_menu(
		array(
			'menu'           => $menu_id ? $menu_id : '',
			'theme_location' => $menu_id ? '' : 'footer-' . (int) $col,
			'container'      => false,
			'menu_class'     => '',
			'items_wrap'     => '<ul>%3$s</ul>',
			'depth'          => 1,
			'fallback_cb'    => false,
		)
	);
	echo '</div></div>';
}

/**
 * Whether a menu item (from wp_get_nav_menu_items) points at the page being viewed.
 *
 * @param WP_Post $item Menu item.
 * @return bool
 */
function wplusui_nav_item_is_current( $item ) {
	if ( 'post_type' === $item->type && is_singular() ) {
		return (int) get_queried_object_id() === (int) $item->object_id;
	}
	if ( 'taxonomy' === $item->type && ( is_category() || is_tag() || is_tax() ) ) {
		return (int) get_queried_object_id() === (int) $item->object_id;
	}
	if ( 'post_type_archive' === $item->type ) {
		return is_post_type_archive( $item->object );
	}
	$url = trim( (string) $item->url );
	if ( '' === $url || '#' === $url ) {
		return false;
	}
	$here = home_url( add_query_arg( array() ) );
	return untrailingslashit( set_url_scheme( $url ) ) === untrailingslashit( set_url_scheme( $here ) );
}
