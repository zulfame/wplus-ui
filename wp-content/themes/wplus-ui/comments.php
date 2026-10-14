<?php
/**
 * Comments template: the comment list and the comment form shown in the popup.
 *
 * @package wplus-ui
 */

if ( post_password_required() ) {
	return;
}

if ( wplusui_disqus_shortname() ) {
	wplusui_render_disqus();
	return;
}
?>
<div class="cmt-wrap">

<?php if ( have_comments() ) : ?>
	<h3 class="title cmt-count">
		<?php
		printf(
			/* translators: %s: number of comments */
			esc_html( _n( '%s Comment', '%s Comments', get_comments_number(), 'wplus-ui' ) ),
			esc_html( number_format_i18n( get_comments_number() ) )
		);
		?>
	</h3>
	<ol class="cmt-list">
		<?php
		wp_list_comments(
			array(
				'style'      => 'ol',
				'short_ping' => true,
				'callback'   => 'wplusui_comment_callback',
			)
		);
		?>
	</ol>
	<?php the_comments_pagination(); ?>
<?php endif; ?>

<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
	<p class="cmt-closed"><?php esc_html_e( 'Comments are closed.', 'wplus-ui' ); ?></p>
<?php endif; ?>

<?php
comment_form(
	array(
		'title_reply'          => '',
		'title_reply_before'   => '',
		'title_reply_after'    => '',
		'comment_notes_before' => '<p class="comment-notes">' . esc_html__( 'Your email address will not be published. Required fields are marked *', 'wplus-ui' ) . '</p>',
		'submit_button'        => '<button name="%1$s" type="submit" id="%2$s" class="%3$s">%4$s</button>',
		'class_submit'         => 'button',
		'label_submit'         => __( 'Post Comment', 'wplus-ui' ),
		'comment_field'        => '<p class="comment-form-comment"><textarea id="comment" name="comment" class="cmt-textarea" placeholder="' . esc_attr__( 'Comment message', 'wplus-ui' ) . '" required></textarea></p>',
	)
);
?>
</div>
