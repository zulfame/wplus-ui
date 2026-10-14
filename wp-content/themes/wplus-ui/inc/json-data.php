<?php
/**
 * Rebuilds the theme runtime's <script id="json:data"> config block
 * from real WP data.
 *
 * The file assets/js/script.js is the theme's own runtime and expects this
 * object's full original shape (it does Object.defineProperties()-style
 * merges against nested keys like pl.rp/pl.cm/cf.mad/fb.cf) — trimming keys
 * that don't need to change breaks it with "Object.defineProperties called
 * on non-object". So only bg/vw (page identity), st.ui (color scheme) and lb
 * (category counts) are computed; everything else is copied verbatim from
 * the original Plus UI markup own json:data block.
 *
 * @package wplus-ui
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Category names and post counts for the runtime config.
 *
 * @return array
 */
function wplusui_category_counts() {
	$cats = get_categories( array( 'hide_empty' => true ) );
	$out  = array();
	foreach ( $cats as $cat ) {
		$out[ $cat->name ] = (int) $cat->count;
	}
	return $out;
}

/**
 * Page type flags for the runtime config.
 *
 * @return array
 */
function wplusui_page_type_flags() {
	$flags = array(
		'iHm' => false,
		'iSi' => false,
		'iPs' => false,
		'iPg' => false,
		'iPv' => false,
		'iAr' => false,
		'iEr' => false,
		'iSr' => false,
	);

	if ( is_front_page() && ! is_paged() ) {
		$flags['iHm'] = true;
		$pg_typ       = 'index';
	} elseif ( is_singular( 'post' ) ) {
		$flags['iPs'] = true;
		$pg_typ       = 'item';
	} elseif ( is_page() ) {
		$flags['iSi'] = true;
		$flags['iPg'] = true;
		$pg_typ       = 'static_page';
	} elseif ( is_search() ) {
		$flags['iSr'] = true;
		$pg_typ       = 'search';
	} elseif ( is_404() ) {
		$flags['iEr'] = true;
		$pg_typ       = 'error_page';
	} else {
		$flags['iAr'] = true;
		$pg_typ       = 'label_archive';
	}

	return array( $flags, $pg_typ );
}

/**
 * Title of the current page for the runtime config.
 *
 * @return string
 */
function wplusui_page_title() {
	if ( is_front_page() ) {
		return get_bloginfo( 'name' );
	}
	if ( is_singular() ) {
		return get_the_title();
	}
	if ( is_category() || is_tag() || is_tax() ) {
		return single_term_title( '', false );
	}
	if ( is_search() ) {
		/* translators: %s: search query */
		return sprintf( __( 'Search results for: %s', 'wplus-ui' ), get_search_query() );
	}
	if ( is_404() ) {
		return __( 'Page not found', 'wplus-ui' );
	}
	return wp_get_document_title();
}

/**
 * Print the runtime config block.
 */
function wplusui_json_data() {
	list( $flags, $pg_typ ) = wplusui_page_type_flags();

	$current_url = is_singular() ? get_permalink() : home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );

	// Static defaults, copied as-is from the original Plus UI markup own
	// json:data block — these are UI strings / feature toggles the runtime
	// needs present with their original shape, not per-site content.
	$data = array(
		'tm' => array(
			'nm' => 'WPlus UI',
			'id' => 'wplus-ui',
			'v'  => WPLUSUI_VERSION,
		),
		'bg' => array(
			'iPr'    => false,
			'iPrB'   => false,
			'iMb'    => false,
			'iMbR'   => false,
			'hDmn'   => false,
			'hAds'   => false,
			'eSsl'   => is_ssl(),
			'lnDr'   => is_rtl() ? 'rtl' : 'ltr',
			'ttl'    => get_bloginfo( 'name' ),
			'cnU'    => home_url( '/' ),
			'cnHmU'  => home_url( '/' ),
			'des'    => get_bloginfo( 'description' ),
			'mDes'   => get_bloginfo( 'description' ),
			'fvU'    => '/favicon.ico',
			'bgrU'   => '#',
			'bgId'   => '',
			'psId'   => '',
			'psTh'   => '',
			'psIm'   => '',
			'siId'   => '',
			'adCi'   => '',
			'adHi'   => '',
			'adlC'   => false,
			'vw'     => '',
			'lcCn'   => null,
			'lcUn'   => 'en',
			'lcUnDl' => 'en',
			'anAc'   => null,
			'adAt'   => false,
			'hmU'    => home_url( '/' ),
			'pgNm'   => wplusui_page_title(),
			'pgTtl'  => wp_get_document_title(),
			'pgTyp'  => $pg_typ,
			'url'    => $current_url,
			'srU'    => home_url( '/' ),
			'enc'    => 'UTF-8',
			'lc'     => get_bloginfo( 'language' ),
			'lcLn'   => get_bloginfo( 'language' ),
		),
		'vw' => array_merge(
			$flags,
			array(
				'iMi' => is_home() || is_front_page() || is_category(),
				'iMb' => false,
				'iAd' => false, // No remote admin lookup.
				'iBt' => false,
				'iAi' => false,
				'sr'  => null,
				'typ' => $pg_typ,
				'des' => get_bloginfo( 'description' ),
				'ttl' => wplusui_page_title(),
				'url' => $current_url,
			)
		),
		'ms' => array(
			'home'                  => __( 'Home', 'wplus-ui' ),
			'edit'                  => __( 'Edit', 'wplus-ui' ),
			'postAComment'          => __( 'Post a Comment', 'wplus-ui' ),
			'share'                 => __( 'Share', 'wplus-ui' ),
			'newerPosts'            => __( 'Newer Posts', 'wplus-ui' ),
			'olderPosts'            => __( 'Older Posts', 'wplus-ui' ),
			'comments'              => __( 'Comments', 'wplus-ui' ),
			'linkCopiedToClipboard' => __( 'Link copied to clipboard!', 'wplus-ui' ),
			'showLess'              => __( 'Show less', 'wplus-ui' ),
			'showMore'              => __( 'Show more', 'wplus-ui' ),
			'poweredByBlogger'      => 'WordPress',
			'posts'                 => __( 'Posts', 'wplus-ui' ),
			'labels'                => __( 'Labels', 'wplus-ui' ),
			'search'                => __( 'Search', 'wplus-ui' ),
			'searchThisBlog'        => __( 'Search this site', 'wplus-ui' ),
			'latestPosts'           => __( 'Latest Posts', 'wplus-ui' ),
			'copyToClipboard'       => __( 'Copy to clipboard', 'wplus-ui' ),
			'loadMorePosts'         => __( 'Load more posts', 'wplus-ui' ),
			'loading'               => __( 'Loading&hellip;', 'wplus-ui' ),
			'noResultsFound'        => __( 'No results found', 'wplus-ui' ),
			'postedBy'              => __( 'Posted by', 'wplus-ui' ),
			'theresNothingHere'     => __( "There's nothing here!", 'wplus-ui' ),
			'adsGoHere'             => __( 'Ads go here', 'wplus-ui' ),
			'emailAddress'          => __( 'Email Address', 'wplus-ui' ),
			'keepReading'           => __( 'Keep reading', 'wplus-ui' ),
		),
		'ml' => array(
			'labels'   => __( 'in', 'wplus-ui' ),
			'location' => __( 'Location:', 'wplus-ui' ),
		),
		'mc' => array(
			'new'                  => __( 'New!', 'wplus-ui' ),
			'free'                 => __( 'Free!', 'wplus-ui' ),
			'open'                 => __( 'Open', 'wplus-ui' ),
			'close'                => __( 'Close', 'wplus-ui' ),
			'hideAll'              => __( 'Hide all', 'wplus-ui' ),
			'showAll'              => __( 'Show all', 'wplus-ui' ),
			'previous'             => __( 'Previous', 'wplus-ui' ),
			'next'                 => __( 'Next', 'wplus-ui' ),
			'copy'                 => __( 'Copy', 'wplus-ui' ),
			'copied'               => __( 'Copied', 'wplus-ui' ),
			'noImage'              => __( 'No image', 'wplus-ui' ),
			'failedToLoad'         => __( 'Failed to load', 'wplus-ui' ),
			'published'            => __( 'Published', 'wplus-ui' ),
			'updated'              => __( 'Updated', 'wplus-ui' ),
			'save'                 => __( 'Save', 'wplus-ui' ),
			'saved'                => __( 'Saved', 'wplus-ui' ),
			'appearance'           => __( 'Appearance', 'wplus-ui' ),
			'mode'                 => __( 'Mode', 'wplus-ui' ),
			'theme'                => __( 'Theme', 'wplus-ui' ),
			'light'                => __( 'Light', 'wplus-ui' ),
			'dark'                 => __( 'Dark', 'wplus-ui' ),
			'system'               => __( 'System', 'wplus-ui' ),
			'reply'                => __( 'Reply', 'wplus-ui' ),
			'delete'               => __( 'Delete', 'wplus-ui' ),
			'welcome'              => __( 'Welcome!', 'wplus-ui' ),
			'goodMorning'          => __( 'Good morning!', 'wplus-ui' ),
			'goodAfternoon'        => __( 'Good afternoon!', 'wplus-ui' ),
			'goodEvening'          => __( 'Good evening!', 'wplus-ui' ),
			'goodNight'            => __( 'Good night!', 'wplus-ui' ),
			'timeToSleep'          => __( 'Time to sleep!', 'wplus-ui' ),
			'haveSweetDreams'      => __( 'Have sweet dreams!', 'wplus-ui' ),
			'estimatedReadTime'    => __( 'Estimated read time', 'wplus-ui' ),
			'continueReading'      => __( 'Continue reading...', 'wplus-ui' ),
			'codeBlock'            => __( 'Code block', 'wplus-ui' ),
			'inlineCode'           => __( 'Inline code', 'wplus-ui' ),
			'copyCode'             => __( 'Copy code', 'wplus-ui' ),
			'copiedCode'           => __( 'Copied code!', 'wplus-ui' ),
			'orCopyLink'           => __( 'or copy link', 'wplus-ui' ),
			'youAreOffline'        => __( 'You are offline', 'wplus-ui' ),
			'youAreOnline'         => __( 'You are online', 'wplus-ui' ),
			'relatedPosts'         => __( 'Related Posts', 'wplus-ui' ),
			'addedToBookmarks'     => __( 'Added to bookmarks', 'wplus-ui' ),
			'removedFromBookmarks' => __( 'Removed from bookmarks', 'wplus-ui' ),
		),
		'pl' => array(
			'ad'  => array(
				'ok'    => false,
				'typ'   => 3,
				'cId'   => '',
				'hId'   => '',
				'hOk'   => false,
				'src'   => null,
				'ampAa' => false,
				'uaF'   => false,
				'dWa'   => false,
			),
			'an'  => array(
				'ok'   => false,
				'typ'  => 1,
				'trId' => null,
				'src'  => null,
			),
			'cl'  => array(
				'ok'   => false,
				'typ'  => 3,
				'trId' => null,
				'src'  => null,
			),
			'lb'  => array(
				'ok'  => true,
				'cap' => true,
			),
			'sy'  => array(
				'ok' => true,
				'cp' => true,
				'ln' => true,
				'hl' => true,
			),
			'cm'  => array(
				'blgOk' => false,
				'disOk' => false,
				'fbOk'  => false,
				'pop'   => true,
				'exRp'  => true,
				'or'    => 1,
				'par'   => true,
				'lnk'   => false,
				'im'    => true,
				'disSn' => null,
			),
			'mt'  => array(
				'wsOk'  => false,
				'arTyp' => 3,
				'dpt'   => 'BlogPosting',
				'uJs'   => false,
				'orgLg' => null,
				'defTh' => null,
			),
			'amp' => array(
				'ok'     => false,
				'strOk'  => false,
				'strTyp' => 1,
			),
			'vw'  => array(
				'ok' => false,
				'av' => true,
				'wm' => true,
			),
			'rp'  => array(
				'ok' => true,
				'mr' => 6,
				'sb' => 'published',
				'ld' => 2,
			),
			'pg'  => array(
				'bgTyp' => 2,
				'ifTyp' => 1,
				'psOk'  => true,
				'psLd'  => 2,
			),
			'ls'  => array(
				'ok' => false, // The original live search asks Blogger's /feeds/posts/summary, which WordPress does not have; the box would show "Loading…" for ever.
				'mr' => 50,
			),
			'pl'  => array( 'ok' => false ),
			'qe'  => array(
				'ok'  => false,
				'eps' => true,
				'sc'  => false,
				'dlC' => true,
			),
			'pb'  => array( 'ok' => false ),
			'sb'  => array( 'ok' => true ),
			'op'  => array(
				'exLz'  => true,
				'imgLd' => 3,
				'fntLd' => 2,
				'spR'   => true,
			),
			'sl'  => array(
				'ok'  => false,
				'pg'  => array(),
				'cdS' => 20,
				'dAc' => false,
				'an'  => true,
				'aNt' => true,
				'dNt' => true,
			),
			'rt'  => array( 'ok' => true ),
			'pwa' => array(
				'wbm' => null,
				'use' => false,
			),
		),
		'st' => array(
			'ui'  => array(
				'csOk' => true,
				'csH'  => wplusui_get_color_scheme_swatches(),
				'dft'  => get_theme_mod( 'wplusui_default_mode', 'light' ),
				'dfs'  => (int) get_theme_mod( 'wplusui_default_scheme', 0 ),
				'vt'   => true,
			),
			'fnt' => array(
				'css' => "@font-face{font-family:'Google Sans Text';font-style:normal;font-weight:400;font-display:swap;src:local('Google Sans Text'),local('Google-Sans-Text'),url(https://fonts.gstatic.com/s/googlesanstext/v16/5aUu9-KzpRiLCAt4Unrc-xIKmCU5qEp2iw.woff2) format('woff2')} @font-face{font-family:'Google Sans Text';font-style:normal;font-weight:700;font-display:swap;src:local('Google Sans Text'),local('Google-Sans-Text'),url(https://fonts.gstatic.com/s/googlesanstext/v16/5aUp9-KzpRiLCAt4Unrc-xIKmCU5oPFTnmhjtg.woff2) format('woff2')} @font-face{font-family:'Google Sans Mono';font-style:normal;font-weight:400;font-display:swap;src:local('Google Sans Mono'),local('Google-Sans-Mono'),url(https://fonts.gstatic.com/s/googlesansmono/v4/P5sUzYWFYtnZ_Cg-t0Uq_rfivrdYH4RE8-pZ5gQ1abT53wVQGrk.woff2) format('woff2')}",
				'lnk' => array(),
			),
		),
		'cf' => array(
			'con' => new stdClass(),
			'bst' => new stdClass(),
			'gtr' => new stdClass(),
			'blk' => array(
				'ip'   => array(),
				'ctry' => array(),
				'tzn'  => array(),
			),
			'mtm' => null,
			'mad' => array(),
		),
		'fb' => array(
			'v'  => '10.12.4',
			'cf' => new stdClass(),
		),
		'lb' => wplusui_category_counts(),
		'ps' => new stdClass(),
		'pg' => array(
			'new' => null,
			'old' => null,
		),
	);

	echo '<script id="json:data" type="application/json">' . wp_json_encode( $data ) . "</script>\n";
}
