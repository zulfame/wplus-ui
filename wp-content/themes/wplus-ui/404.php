<?php
/**
 * 404: the glitch-effect error section. It sits inside the same header/footer
 * chrome as every other template; the "erroC" CSS does not depend on its
 * ancestor structure.
 *
 * @package wplus-ui
 */

get_header();
?>
<section class="erroP">
	<div class="erroC section">
		<div class="widget HTML">
			<h3><span class="e" title="404">404</span><span><?php esc_html_e( 'Something Wrong!', 'wplus-ui' ); ?></span></h3>
			<p><?php esc_html_e( "The page you've requested can't be found. Why don't you browse around?", 'wplus-ui' ); ?></p>
			<a class="button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Take me back', 'wplus-ui' ); ?></a>
		</div>
	</div>
</section>
<?php
get_footer();
