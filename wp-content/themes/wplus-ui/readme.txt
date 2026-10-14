=== WPlus UI ===

Contributors: zulfadlirizal
Tags: blog, two-columns, right-sidebar, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready, block-patterns, block-styles, editor-style

Requires at least: 6.3
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.7.0
License: GNU General Public License v2 or later
License URI: LICENSE

== Description ==

WPlus UI is a WordPress theme forked from Plus UI (wplus-ui) by Fineshop Design and adapted for WordPress by Zulfadli Rizal.

* Header with live search, bookmarks and light/dark/system mode.
* 16 accent color schemes picked by the visitor, plus a custom accent color, button radius and Google Fonts from the Customizer.
* Homepage carousel (posts tagged "featured", or custom slides), Pinned Post (sticky post), Latest Posts grid, Popular Posts (by views, then comments) and Labels in the sidebar.
* Category sections on the homepage (choose slugs in the Customizer).
* Single posts with table of contents, share popup, related posts, author box, tabs (`[pu_tabs]`) and split pages (`<!--nextpage-->`).
* Popup comments, bookmark list stored in the visitor's browser.
* Ad slots (under header, above/below posts, sticky sidebar, in-article) and header/footer code from the Customizer.
* Share buttons and social links configurable from the Customizer.
* Sidebar, table of contents, related posts and author box options in the Customizer.
* Popular Posts options, categories hidden from the home page and optional Disqus comments.
* Block editor: block styles, patterns and editor preview for the UI components.
* Notification bar, quick links bar and footer columns editable from the Customizer, menus and widgets.

== Installation ==

1. Upload the theme in Appearance > Themes > Add New > Upload Theme and activate it.
2. Optional demo content: import demo-content/wplus-ui-demo-content.xml in Tools > Import, then press "Finish demo setup" under Appearance > WPlus UI Demo (or see demo-content/README.md for WP-CLI).
3. Assign menus to "Primary Menu" and "Quick Links" in Appearance > Menus.
4. Set Settings > Reading > Blog pages show at most to 6.

== Frequently Asked Questions ==

= How do I show a post in the carousel? =
Tag it "featured" (up to five are shown), or fill the carousel slides in the Customizer.

= How do I change the Pinned Post? =
Make a post sticky.

= Where do I add my own CSS? =
Use the child theme (wplus-ui-child) or Appearance > Customize > Additional CSS. Do not edit assets/css/style.css.

== Changelog ==

= 1.7.0 - Oct 14, 2026 =

* Rebranding: the theme is now called WPlus UI (slug wplus-ui). Plus UI v3.2.0 by Fineshop Design is the source of the fork and stays credited.
* Versioning: the theme has its own version number now (releases 3.2.0 to 3.2.10 used the Blogger template's number, which is kept as "Source: Plus UI v3.2.0" in the Template Information block).
* Fix: carousel slides after the first were 40px too low and the carousel was 40px taller than its 5:2 ratio.
* Fix: home page, search results, archives and Related Posts show one card per row on phones.
* Fix: search results beside the sidebar use 3 columns on desktop, like the home page.
* Fix: the bookmark panel failed for posts without a featured image.
* New: optional caption for each custom carousel slide.
* New: optional cookie notice with a Cookie Policy button and an OK button; ads and scripts can wait for the OK. The demo content has a sample Cookie Policy page.
* Demo content: removed the in-page Table of Contents, Related Posts sample and Blogger statistics chart.

= 3.2.10 - Oct 14, 2026 =

* Fix: typing in the header search box showed "Loading..." for ever and the search results page logged a JavaScript error, because the original live search asked Blogger's feed, which WordPress does not have. The live search is switched off; Enter still opens the search results page.

= 3.2.9 - Oct 14, 2026 =

* New: Google AdSense publisher ID in Customizer > WPlus UI: Ads. Enter it once; the script loads once (after the visitor scrolls or taps, or at once if you untick that option). Ad slots take an ad unit number, pasted code or HTML, or an image address (add the link on the next line).
* New: "Archive banner image (WPlus UI)" field on the Categories and Tags edit screens.
* New: documentation for every feature in the repository (docs/): feature list, user guide, configuration advice, and a machine-checked list of 353 claims.
* Change: WooCommerce restyled from scratch (product cards, product page with tabs, buttons and fields, notices, pagination, account, cart and checkout) in light and dark.
* Change: CSS and JS files are versioned by their modification time so browsers load new files right away.
* Fix: Pinned Post shows only the newest sticky post when there are several.
* Fix: Comments icon of the mobile bottom bar opens the comments panel; the table of contents panel closes after an entry is chosen.
* Fix: Contact Form 7 error messages no longer push the submit button away (the first click was lost); the sample form of Contact Form 7 gets the theme's layout while untouched.
* Fix: in-article ad counts top-level paragraphs only; Open Graph URL of search/author/date archives; tag archive banner fallback; table of contents setting also applies to pages; read time of short posts is at least 1 minute; button radius capped at 30px; menu options stored once; WPML config covers the child theme; the WhatsApp button clears the mobile bar.

= 3.2.8 - Oct 05, 2026 =

* New: posts without a featured image get a placeholder picture in the theme's colors (cards, pinned post, Popular Posts and carousel), which follows the color scheme and dark mode.
* New: Customizer > WPlus UI: Layout and posts > "Left menu on desktop": collapsed (icons only, the default) or expanded (icons and labels) when a page opens. Visitors can still toggle it; phones always use the drawer.

= 3.2.7 - Oct 05, 2026 =

* Fix: HTML tags stored in a post excerpt (for example <p>...</p> from an import or an editor) were printed as text under the post title and in the meta description; they are now stripped.

= 3.2.6 - Oct 05, 2026 =

* New: the homepage carousel and the Pinned Post box can each be switched off in Customizer > WPlus UI (both stay on by default).
* New: the sidebar and quick-links menus mark the current page (class "active", aria-current="page"); a parent opens by default when one of its sub-items is the current page.
* New: every menu item has a "WPlus UI icon" field in Appearance > Menus with 40 icons (or "No icon"); the CSS classes ico-home, ico-mail, ico-none, etc. do the same in the Customizer menu editor. Icons work at every level.
* New: "WPlus UI menu options" per item: divider line after the item, notification dot, "More..." group that starts open, and New/Free badge. A Custom Link titled --- is a divider on its own, which also works in the Customizer.
* Fix: the collapsed sidebar flyout no longer runs off the window or under the header; long sub-menus scroll.

= 3.2.5 - Oct 05, 2026 =

* Fix: menus assigned to the "Footer Column" locations now show in the footer (they were registered but never printed). A column without a menu still shows its widgets. Column titles are set in Customizer > WPlus UI (defaults Product, Resources, Support, Company).
* Fix: footer and mobile drawer social icons only appear when a URL is set (six icons used to show even when empty). The demo setup fills the six demo icons with "#".
* Fix: the Appearance and Theme color panels no longer flash unstyled for a moment when moving between pages (their hiding rules are now part of the inline critical CSS).

= 3.2.4 - Oct 03, 2026 =

* Fix: WooCommerce shop, product and archive pages use the static-page layout (the product grid was squeezed into one narrow column) and shop buttons follow the theme colors.
* Fix: Custom HTML scripts that use the theme runtime (the chart on the About page) no longer fail with "PU is not defined".
* Fix: local images without a media-library entry are lazy-loaded and sized, which brings the UI Components page from 75 back to 89 on mobile Lighthouse.
* Fix: the demo setup removes WordPress' default sidebar widgets on a fresh install so the demo layout matches the reference.
* Fix: the child theme copies the parent's Customizer settings on first activation.
* Fix: the WhatsApp button no longer overlaps the scroll button.
* New: translation files are loaded for the editor blocks; the translation template lists all new strings.
* Change: requires WordPress 6.3 (the Details block).

= 3.2.3 - Oct 03, 2026 =

* New: Editable blocks for Tabs (default and code), Download box, Table of contents and YouTube embed, plus gallery styles (image grid, hidden grid with Show All, scrolling) and a related-links group style. The demo content uses them.
* New: Code blocks can carry a source label and a comment; <mark> annotations are available as a rich-text format.
* New: WooCommerce support (shop, product, cart, checkout and account pages inside the theme layout). Tested with WooCommerce 11.1.
* New: Polylang and WPML support for the free-text Customizer strings. Tested with Polylang 3.8.
* New: JSON-LD structured data (WebSite, Article, BreadcrumbList, FAQPage from accordion groups); skipped when an SEO plugin is active.
* New: Customizer section "WPlus UI: Engagement" with a floating WhatsApp button, a call-to-action popup and a Coming Soon page, all off by default.

= 3.2.2 - Oct 02, 2026 =

* New: Demo content uses native blocks (no more Classic blocks) with new block styles: indent, reference, accordion group and alternate, data table, quote citations.
* New: Critical CSS inlined per page type, full stylesheet loaded without blocking the first paint.
* New: WebP sub-sizes for new image uploads.
* Fix: Block spacing for alerts, code blocks, buttons and tables now matches the original components.
* Fix: Demo setup no longer duplicates images that already exist in the media library.

= 3.2.1 - Oct 02, 2026 =

* New: Appearance > WPlus UI Demo page to finish the demo setup from the dashboard (no WP-CLI needed).
* New: Release zips and CI workflows, NOTICE about the origin of the fork.

= 3.2.0 - Oct 02, 2026 =

* New: First WordPress release, forked from Plus UI v3.2.0 by Fineshop Design.
* New: Block styles and patterns for the UI components.
* New: Customizer options for ads, header/footer code, sharing, layout and posts, colors and fonts.
* New: Minified CSS/JS builds, SEO meta tags, accessibility fixes.
* New: Popular Posts options, home category exclusion and Disqus support.
* Fix: Related posts overwritten by the runtime script.

== Copyright ==

Forked from Plus UI v3.2.0, copyright Fineshop Design (Deo Kumar, Sagar Bishnoi, Armaan Kumar). WordPress fork by Zulfadli Rizal. The redistribution terms of the original template are not verified: see NOTICE.md in the repository, and do not redistribute publicly until confirmed.
