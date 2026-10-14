<?php
/**
 * Editable blocks for the UI components that have no core equivalent: Tabs, Download box,
 * Table of contents and lazy YouTube, plus the render rules that map core galleries and
 * groups to the component markup the stylesheet expects.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Tabs markup shared by the Tabs block and the [pu_tabs] shortcode.
 *
 * @param array<int,array{title:string,content:string}> $tabs    Tab titles and HTML content.
 * @param array{variant?:string,sticky?:bool}           $options Variant (default or code) and sticky header.
 * @return string
 */
function wplusui_render_tabs( $tabs, $options = array() ) {
	$tabs = array_slice( array_values( $tabs ), 0, 8 );
	if ( ! $tabs ) {
		return '';
	}
	$variant = isset( $options['variant'] ) && 'code' === $options['variant'] ? 'code' : 'default';
	$sticky  = ! empty( $options['sticky'] );

	static $instance = 0;
	++$instance;
	$prefix = ( 'code' === $variant ? 'preT' : 'tabT' ) . $instance . '-';
	$name   = ( 'code' === $variant ? 'preTab' : 'tabC' ) . $instance;
	$class  = 'code' === $variant ? 'pre tabs' : 'tabs' . ( $sticky ? ' stick' : '' );

	ob_start();
	?>
<div class="<?php echo esc_attr( $class ); ?>">
	<?php foreach ( $tabs as $i => $tab ) : ?>
	<input<?php echo 0 === $i ? ' checked' : ''; ?> id="<?php echo esc_attr( $prefix . ( $i + 1 ) ); ?>" name="<?php echo esc_attr( $name ); ?>" type="radio" />
	<?php endforeach; ?>
	<div>
		<?php foreach ( $tabs as $i => $tab ) : ?>
		<label data-text="<?php echo esc_attr( $tab['title'] ); ?>" for="<?php echo esc_attr( $prefix . ( $i + 1 ) ); ?>"></label>
		<?php endforeach; ?>
	</div>
	<?php foreach ( $tabs as $i => $tab ) : ?>
		<?php if ( 'code' === $variant ) : ?>
			<?php
			// The stylesheet shows the panel whose class ends in the checked input's number.
			$p = new WP_HTML_Tag_Processor( $tab['content'] );
			if ( $p->next_tag( 'pre' ) ) {
				$p->add_class( 'preC' . $instance . '-' . ( $i + 1 ) );
			}
			echo $p->get_updated_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- rendered block output.
			?>
		<?php else : ?>
	<div class="tabC-<?php echo (int) ( $i + 1 ); ?>">
			<?php echo $tab['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- rendered block/shortcode output. ?>
	</div>
		<?php endif; ?>
	<?php endforeach; ?>
</div>
	<?php
	return trim( preg_replace( '/\n\s*\n/', "\n", ob_get_clean() ) );
}

/**
 * Render callback of the Tabs block.
 *
 * @param array<string,mixed> $attributes Block attributes.
 * @param string              $content    Inner blocks HTML (unused).
 * @param WP_Block            $block      Block instance.
 * @return string
 */
function wplusui_render_tabs_block( $attributes, $content, $block ) {
	$tabs = array();
	foreach ( $block->inner_blocks as $child ) {
		$title  = isset( $child->attributes['title'] ) ? (string) $child->attributes['title'] : '';
		$tabs[] = array(
			'title'   => '' !== $title ? $title : __( 'Tab', 'wplus-ui' ),
			'content' => $child->render(),
		);
	}
	return wplusui_render_tabs(
		$tabs,
		array(
			'variant' => $attributes['variant'] ?? 'default',
			'sticky'  => ! empty( $attributes['sticky'] ),
		)
	);
}

/**
 * Render callback of the Download box block.
 *
 * @param array<string,mixed> $attributes Block attributes.
 * @return string
 */
function wplusui_render_download_block( $attributes ) {
	$type = sanitize_text_field( $attributes['type'] ?? 'zip' );
	$name = sanitize_text_field( $attributes['name'] ?? '' );
	$size = sanitize_text_field( $attributes['size'] ?? '' );
	$url  = esc_url( $attributes['url'] ?? '#' );
	ob_start();
	?>
<div class="dlBox">
	<span class="fT" data-text="<?php echo esc_attr( $type ); ?>"></span>
	<div class="fN"><span><?php echo esc_html( $name ); ?></span><span class="fS"><?php echo esc_html( $size ); ?></span></div>
	<a aria-label="<?php esc_attr_e( 'Download', 'wplus-ui' ); ?>" class="button" href="<?php echo esc_url( $url ); ?>" rel="nofollow noreferrer noopener" target="_blank"><i class="icon dl"></i></a>
</div>
	<?php
	return trim( preg_replace( '/\n\s*\n/', "\n", ob_get_clean() ) );
}

/**
 * Render callback of the Table of contents block (the runtime fills .aToc from the headings).
 *
 * @param array<string,mixed> $attributes Block attributes.
 * @return string
 */
function wplusui_render_toc_block( $attributes ) {
	$title = sanitize_text_field( $attributes['title'] ?? '' );
	$open  = ! isset( $attributes['open'] ) || $attributes['open'];
	return '<details class="sp toc"' . ( $open ? ' open' : '' ) . '><summary data-hide="' . esc_attr__( 'Hide all', 'wplus-ui' ) . '" data-show="' . esc_attr__( 'Show all', 'wplus-ui' ) . '">' . esc_html( '' !== $title ? $title : __( 'Table of Contents', 'wplus-ui' ) ) . '</summary><div class="aToc"></div></details>';
}

/**
 * Render callback of the lazy YouTube block.
 *
 * @param array<string,mixed> $attributes Block attributes.
 * @return string
 */
function wplusui_render_youtube_block( $attributes ) {
	$id    = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) ( $attributes['videoId'] ?? '' ) );
	$ratio = preg_replace( '/[^0-9 \/.]/', '', (string) ( $attributes['ratio'] ?? '' ) );
	if ( '' === $id ) {
		return '';
	}
	$style = $ratio && '16 / 9' !== trim( $ratio ) ? ' style="--ratio: ' . esc_attr( trim( $ratio ) ) . '"' : '';
	return '<div class="lazyYt"' . $style . ' data-embed="' . esc_attr( $id ) . '"></div>';
}

/**
 * Register the blocks and the block category.
 */
function wplusui_register_custom_blocks() {
	register_block_type(
		'wplusui/tabs',
		array(
			'api_version'     => 3,
			'title'           => __( 'Tabs', 'wplus-ui' ),
			'category'        => 'wplus-ui',
			'attributes'      => array(
				'variant' => array(
					'type'    => 'string',
					'default' => 'default',
				),
				'sticky'  => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'wplusui_render_tabs_block',
			'supports'        => array( 'html' => false ),
		)
	);
	register_block_type(
		'wplusui/tab',
		array(
			'api_version' => 3,
			'title'       => __( 'Tab', 'wplus-ui' ),
			'category'    => 'wplus-ui',
			'parent'      => array( 'wplusui/tabs' ),
			'attributes'  => array(
				'title' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
			'supports'    => array( 'html' => false ),
		)
	);
	register_block_type(
		'wplusui/download',
		array(
			'api_version'     => 3,
			'title'           => __( 'Download box', 'wplus-ui' ),
			'category'        => 'wplus-ui',
			'attributes'      => array(
				'type' => array(
					'type'    => 'string',
					'default' => 'zip',
				),
				'name' => array(
					'type'    => 'string',
					'default' => 'file_name.zip',
				),
				'size' => array(
					'type'    => 'string',
					'default' => '200kb',
				),
				'url'  => array(
					'type'    => 'string',
					'default' => '#',
				),
			),
			'render_callback' => 'wplusui_render_download_block',
		)
	);
	register_block_type(
		'wplusui/toc',
		array(
			'api_version'     => 3,
			'title'           => __( 'Table of contents', 'wplus-ui' ),
			'category'        => 'wplus-ui',
			'attributes'      => array(
				'title' => array(
					'type'    => 'string',
					'default' => '',
				),
				'open'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			'render_callback' => 'wplusui_render_toc_block',
		)
	);
	register_block_type(
		'wplusui/youtube',
		array(
			'api_version'     => 3,
			'title'           => __( 'Lazy YouTube', 'wplus-ui' ),
			'category'        => 'wplus-ui',
			'attributes'      => array(
				'videoId' => array(
					'type'    => 'string',
					'default' => '',
				),
				'ratio'   => array(
					'type'    => 'string',
					'default' => '',
				),
			),
			'render_callback' => 'wplusui_render_youtube_block',
		)
	);
}
add_action( 'init', 'wplusui_register_custom_blocks' );

/**
 * Block category for the theme's blocks.
 *
 * @param array<int,array<string,string>> $categories Categories.
 * @return array<int,array<string,string>>
 */
function wplusui_block_category( $categories ) {
	array_unshift(
		$categories,
		array(
			'slug'  => 'wplus-ui',
			'title' => __( 'WPlus UI', 'wplus-ui' ),
		)
	);
	return $categories;
}
add_filter( 'block_categories_all', 'wplusui_block_category' );

/**
 * Component markup for galleries (image grid, hidden "Show All" grid, scrolling gallery)
 * and for the related-links group.
 *
 * @param string $content Rendered block.
 * @param array  $block   Parsed block.
 * @return string
 */
function wplusui_render_component_blocks( $content, $block ) {
	$name  = $block['blockName'];
	$class = ' ' . (string) ( $block['attrs']['className'] ?? '' ) . ' ';

	if ( 'core/gallery' === $name ) {
		$styles = array(
			' is-style-image-grid '   => array( 'psImg grImg', false ),
			' is-style-image-hidden ' => array( 'psImg hdImg', true ),
			' is-style-image-scroll ' => array( 'glImg', false ),
		);
		foreach ( $styles as $needle => $row ) {
			if ( false === strpos( $class, $needle ) ) {
				continue;
			}
			if ( ! preg_match_all( '#<img\b[^>]*>#i', $content, $m ) ) {
				return $content;
			}
			$imgs = $m[0];
			if ( $row[1] && count( $imgs ) > 4 ) {
				// Hidden grid: the first four images stay visible (the fourth sits under the
				// "Show All" button); the rest are revealed by the checkbox.
				static $hidden = 0;
				++$hidden;
				$id = 'for-hideImage-' . (int) $hidden;
				return '<input class="inImg hidden" id="' . esc_attr( $id ) . '" type="checkbox">'
					. '<div class="psImg hdImg">' . implode( '', array_slice( $imgs, 0, 3 ) )
					. '<div class="btImg">' . $imgs[3] . '<label aria-label="' . esc_attr__( 'Show all image', 'wplus-ui' ) . '" for="' . esc_attr( $id ) . '">' . esc_html__( 'Show All', 'wplus-ui' ) . '</label></div>'
					. '<div class="psImg shImg">' . implode( '', array_slice( $imgs, 4 ) ) . '</div></div>';
			}
			return '<div class="' . esc_attr( $row[0] ) . '">' . implode( '', $imgs ) . '</div>';
		}
	}

	if ( 'core/group' === $name && false !== strpos( $class, ' is-style-related-links ' ) ) {
		$inner = preg_replace( '#^\s*<div[^>]*>\s*(?:<div[^>]*wp-block-group__inner-container[^>]*>)?#s', '', $content );
		$inner = preg_replace( '#(?:</div>\s*)+$#s', '', $inner );
		$inner = preg_replace( '#<p[^>]*>\s*(<b>.*?</b>)\s*</p>#s', '$1', $inner, 1 );
		return '<div class="pRelate">' . trim( $inner ) . '</div>';
	}

	return $content;
}
add_filter( 'render_block', 'wplusui_render_component_blocks', 9, 2 );

/**
 * Block styles handled by wplusui_render_component_blocks().
 */
function wplusui_register_component_styles() {
	foreach ( array(
		'image-grid'   => __( 'Image grid', 'wplus-ui' ),
		'image-hidden' => __( 'Image grid with Show All', 'wplus-ui' ),
		'image-scroll' => __( 'Scrolling images', 'wplus-ui' ),
	) as $style => $label ) {
		register_block_style(
			'core/gallery',
			array(
				'name'  => $style,
				'label' => $label,
			)
		);
	}
	register_block_style(
		'core/group',
		array(
			'name'  => 'related-links',
			'label' => __( 'Related links', 'wplus-ui' ),
		)
	);
}
add_action( 'init', 'wplusui_register_component_styles' );

/**
 * Inline scripts in Custom HTML blocks that call the theme runtime (`PU`) are
 * run once the runtime has loaded; the runtime is printed in the footer, after
 * the post content.
 *
 * @param string $content Rendered block.
 * @param array  $block   Parsed block.
 * @return string
 */
function wplusui_defer_runtime_scripts( $content, $block ) {
	if ( 'core/html' !== $block['blockName'] || false === strpos( $content, '(PU, window, document)' ) ) {
		return $content;
	}
	return preg_replace_callback(
		'#<script>(.*?)</script>#s',
		function ( $m ) {
			if ( false === strpos( $m[1], 'PU' ) ) {
				return $m[0];
			}
			return '<script>(function(){var s=document.currentScript;function r(){Object.defineProperty(document,"currentScript",{configurable:true,get:function(){return s}});try{' . $m[1] . '}finally{delete document.currentScript}}if(window.PU){r()}else{addEventListener("load",r)}})();</script>';
		},
		$content
	);
}
add_filter( 'render_block', 'wplusui_defer_runtime_scripts', 10, 2 );

/**
 * Images that point at a file in the theme or uploads folder without being a
 * media-library attachment (demo content, pasted URLs) get lazy loading and
 * their real size, so they neither compete with the first screen nor shift the layout.
 *
 * @param string $content Rendered block.
 * @return string
 */
function wplusui_prepare_local_images( $content ) {
	if ( false === strpos( $content, '<img' ) ) {
		return $content;
	}
	$base = wp_parse_url( home_url( '/' ), PHP_URL_PATH );
	$base = $base ? untrailingslashit( $base ) : '';
	$p    = new WP_HTML_Tag_Processor( $content );
	while ( $p->next_tag( 'img' ) ) {
		if ( null === $p->get_attribute( 'loading' ) ) {
			$p->set_attribute( 'loading', 'lazy' );
			$p->remove_attribute( 'fetchpriority' );
		}
		if ( null !== $p->get_attribute( 'width' ) || null !== $p->get_attribute( 'height' ) ) {
			continue;
		}
		$src = (string) $p->get_attribute( 'src' );
		$rel = wp_parse_url( $src, PHP_URL_PATH );
		if ( ! $rel || 0 !== strpos( $rel, $base . '/wp-content/' ) || false !== strpos( $rel, '..' ) ) {
			continue;
		}
		$file = ABSPATH . ltrim( substr( $rel, strlen( $base ) ), '/' );
		if ( ! is_file( $file ) ) {
			continue;
		}
		$size = wp_getimagesize( $file );
		if ( $size ) {
			$p->set_attribute( 'width', (string) $size[0] );
			$p->set_attribute( 'height', (string) $size[1] );
		}
	}
	return $p->get_updated_html();
}

/**
 * Apply the local image preparation to image-bearing blocks.
 *
 * @param string $content Rendered block.
 * @param array  $block   Parsed block.
 * @return string
 */
function wplusui_prepare_block_images( $content, $block ) {
	if ( in_array( $block['blockName'], array( 'core/image', 'core/gallery', 'core/html' ), true ) ) {
		return wplusui_prepare_local_images( $content );
	}
	return $content;
}
add_filter( 'render_block', 'wplusui_prepare_block_images', 11, 2 );
