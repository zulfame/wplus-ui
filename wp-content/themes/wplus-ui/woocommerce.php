<?php
/**
 * WooCommerce shop, product and archive pages inside the static-page shell.
 *
 * @package wplus-ui
 */

get_header();
?>

<div class="section" id="sec_Main_Widgets">
	<div class="widget Blog">
		<div class="blogP">
			<article class="ntry ps post">
				<div class="pInr">
					<div class="pEnt">
						<div class="pS post-body postBody" id="postBody">
							<?php woocommerce_content(); ?>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</div>

<?php
wplusui_end_main( false );
get_footer();
