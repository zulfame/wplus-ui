<?php
/**
 * Comment list callback. Comments use the native WordPress comment system and
 * are shown in the popup panel (the "fixL/fixH/fixC" classes) opened from the
 * "Post a Comment" button under each post.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render one comment.
 *
 * @param WP_Comment $comment Comment.
 * @param array      $args Comment list arguments.
 * @param int        $depth Nesting depth.
 */
function wplusui_comment_callback( $comment, $args, $depth ) {
	$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';
	?>
	<<?php echo esc_attr( $tag ); ?> <?php comment_class( 'cmt-item', $comment ); ?> id="comment-<?php comment_ID(); ?>">
		<article class="cmt-body" id="div-comment-<?php comment_ID(); ?>">
			<div class="cmt-avatar"><?php echo get_avatar( $comment, 48 ); ?></div>
			<div class="cmt-main">
				<div class="cmt-meta">
					<span class="cmt-author"><?php comment_author(); ?></span>
					<time class="cmt-date" datetime="<?php comment_time( 'c' ); ?>">
						<a href="<?php echo esc_url( get_comment_link( $comment ) ); ?>"><?php comment_date(); ?> <?php comment_time(); ?></a>
					</time>
				</div>
				<?php if ( '0' === $comment->comment_approved ) : ?>
				<p class="cmt-moderation"><?php esc_html_e( 'Your comment is awaiting moderation.', 'wplus-ui' ); ?></p>
				<?php endif; ?>
				<div class="cmt-text"><?php comment_text(); ?></div>
				<div class="cmt-reply">
					<?php
					comment_reply_link(
						array_merge(
							$args,
							array(
								'depth'      => $depth,
								'max_depth'  => $args['max_depth'],
								'reply_text' => __( 'Reply', 'wplus-ui' ),
							)
						)
					);
					?>
				</div>
			</div>
		</article>
	<?php
}
