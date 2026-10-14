# Changelog

## 1.7.3 - 2026-10-15

- Changed: an ad slot you leave empty is no longer shown at all, with no frame, no text and no space. The "Show ad placeholders" checkbox is gone; to see where a slot sits, fill it with a picture.
- New: every ad slot in the Customizer tells you the picture size that fits (for example 728 x 90 px) and shows an example image tag. Pictures never get wider than their column.
- Improved: the demo fills the ad slots with sample pictures of those sizes.
- Fix: the WPlus UI Update page no longer shows a strange "last checked" time right after an update.

## 1.7.2 - 2026-10-15

- Smaller download: the demo content (sample posts and pictures) is no longer inside the theme zip, which went from 6 MB to under 1 MB. Press Download demo content in Appearance > WPlus UI Demo when you want the sample site.
- Improved: the WPlus UI Update page is shorter and clearer. It shows whether you are up to date, an Update button when there is a new version, and what is new.
- Fix: the "View version details" window no longer shows warnings from WordPress or other plugins.

## 1.7.1 - 2026-10-15

- New: update WPlus UI from the WordPress dashboard. When a new version is released, WordPress shows it under Appearance > Themes with an Update button, and you can turn on automatic updates.
- New: Appearance > WPlus UI Update shows your version, the latest version and what is new.
- Safe: the download is checked before it is installed.

## 1.7.0 - 2026-10-14

- First release as WPlus UI.
- New: cookie notice with a Cookie Policy page (optional). Ads and scripts can wait until the visitor presses OK.
- New: header logo options, a header label you can change or hide, and an optional caption on each carousel slide.
- Better post pages: one date (Published or Updated), a read time you can switch off, a tidier author box, and no repeated table of contents or related posts.
- Better on phones: one card per row on the home page, search results and related posts, and no gap above the carousel slides.
- Faster and steadier: the first images load at once, search results no longer jump, and shop styles load only on shop pages.
- Easier to read and tap: bigger tap area for category labels and better contrast.

## 3.2.10 - 2026-10-14

- Fix: typing in the header search box showed "Loading…" for ever and the search results page logged a JavaScript error, because the original live search asked Blogger's feed, which WordPress does not have. The live search is switched off; Enter still opens the search results page.
- Fix: opening the bookmark panel for a post without a featured image threw a JavaScript error (the "No image" and "Failed to load" strings were missing from the runtime string table).
- Demo content: removed the Blogger statistics chart from the About page (it called a Blogger-only endpoint and logged an error).
- Dev: added `tests/visual/js-errors.mjs` (`npm run js-errors`), a JavaScript error check over 17 page types, desktop and mobile.

## 3.2.9 - 2026-10-14

- Fix: the Pinned Post box showed every sticky post when there were several; it now shows only the newest one, as documented.
- Fix: the estimated read time of very short posts showed "0 min"; it is now at least 1 minute.
- Fix: the button corner radius is capped at 30px when printed, as documented, even if a larger value was stored.
- Fix: the Comments icon of the mobile bottom bar pointed to a missing anchor, so tapping it did nothing; it now opens the comments panel.
- Fix: the table of contents panel now closes after an entry is chosen instead of covering the heading.
- Fix: Contact Form 7 error messages no longer push the submit button away when a field loses focus (the first click on the button used to be lost). The sample form that Contact Form 7 creates is replaced with the theme's two-column form while it is untouched.
- Change: WooCommerce is restyled from scratch (product cards, single product with tabs, buttons and fields, notices, pagination, account, cart and checkout blocks), in light and dark, on phones and desktop.
- Change: CSS and JS files are versioned by their modification time, so browsers load the new file right after a change instead of keeping a cached copy.
- Fix: `wpml-config.xml` now also covers the child theme settings, so WPML picks up the translatable texts when the child theme is active.
- Fix: the floating WhatsApp button covered an icon of the mobile bottom bar; it now sits above the bar.
- Fix: Open Graph URL on search results, author and date archives was the home page address; it is now the address of the page itself.
- Fix: menu options ticked in Appearance > Menus could be stored twice for an item; they are stored once.
- New: Google AdSense publisher ID in Customizer > WPlus UI: Ads. Enter it once; the theme loads the AdSense script once (after the visitor scrolls or taps by default, or at once if you untick that option) and AdSense Auto ads can work. A code is not loaded twice when you paste the AdSense code yourself.
- New: ad slots are flexible. Write only the ad unit number and the theme builds a responsive AdSense unit; or paste any code or HTML; or write an image address (add the link on the next line to make it clickable). The in-article ad takes the same kinds of input.
- New: "Archive banner image (WPlus UI)" field on the Categories and Tags edit screens (media library picker). Before, the banner image had no setting at all.
- Fix: the in-article ad counted every closing paragraph, including paragraphs inside groups, quotes and accordions, so the ad could land inside another block. It now counts top-level paragraphs only.
- Fix: the archive banner fallback image for tags used a category query with the tag ID; it now queries the term's own taxonomy.
- Fix: static pages always printed the table of contents tab even when the setting was off. The setting now applies to pages too (label: "...on posts and pages").
- Fix: the heading font setting now also applies to the post and page title (it used the body font).
- Change: the Customizer is reordered to follow the structure of the theme. The old "WPlus UI Theme Options", "WPlus UI: Layout and posts", "WPlus UI: Colors and fonts" and "WPlus UI: Popular posts and comments" sections are replaced by "Look and feel", "Header and menus", "Homepage", "Posts and comments" and "Sidebar", followed by Sharing, Footer, Ads, Engagement and "Advanced code". Small group headings split the long sections (for example Carousel, Social links, Call-to-action popup). Setting IDs are unchanged, so saved settings carry over.
- Change: new theme screenshot (1200x900, the size WordPress recommends) made from this theme itself: desktop with the open left menu, the carousel, pinned post and popular posts, plus a phone view with the bottom bar. Parent and child theme.
- Fix: the "Updated" date on post cards uses the short form (for example "Okt 27, 2024", like the popular posts and the Blogger template) instead of the site's long date format, so it is no longer cut off in the card footer.
- New: "Box design" switch in Customizer > WPlus UI: Layout and posts, like the Blogger template's "Box Design" option. When on, post cards, popular and related posts, tables, quotes, accordions and pop-ups are drawn in bordered boxes with soft shadows (the stylesheet already carried these rules under `.bX`; the theme only ever printed the flat `.bD` class). It is off by default. The inline critical CSS has its own `-box` set, so the first paint is correct in both designs (`CRITICAL_SUFFIX=-box node bin/critical-css.mjs`).
- New: the mobile bottom bar of the original template: icons stuck to the bottom of phones and tablets (Home, Search, Menu, Appearance and, depending on the page, Top, Share or Comments), hidden on wide screens. One switch, "Show the mobile bottom bar", in Customizer > WPlus UI: Layout and posts; it is off by default and the icons are fixed.
- Change: the "Mobile Bottom Menu" menu location was registered but never printed, so it did nothing; it is removed.
- New: the call-to-action popup can show a picture, above the text or beside it on wide screens (stacked on phones). The close button stays readable on top of the picture.
- Fix: popup spacing. The distance under the button now equals the distance above the title (28px each); the theme's button margin used to add about 34px more at the bottom.
- Fix: with fewer than four footer link columns, the columns fill the right side first (one column sits in the fourth slot, two in the last two, and so on) instead of crowding next to the about block. Phones are unchanged.
- New: Customizer section "WPlus UI: Footer" (about text, the four link columns, copyright text and the social links), moved out of "WPlus UI Theme Options". Each link column has its own menu picker next to its title, so a column can use any menu without touching theme locations; a column without a menu shows its widgets. The Footer Column menu locations keep working. The copyright line can be replaced (use {year} for the current year).
- Fix: the Contact Form 7 form is as wide as the text above it (it was limited to 680px).
- New: Contact Form 7 is styled in the theme's look (fields, select, checkbox/radio, button, error tips and the sent/error message box, light and dark mode). Add the class `cf-grid` to a group around two fields to put them side by side.
- New: `[wplusui_contact_form]` shortcode, a "Contact page (Contact Form 7)" block pattern and a recommended two-column form template. The demo setup creates a Contact page (and the form when Contact Form 7 is active) and points the "Contact" menu item to it. Without the plugin, visitors see nothing and administrators see a hint.
- Fix: Popular Posts is no longer hidden on a post page when that post is the only one on the site. The box leaves out the post being read, and falls back to listing it when nothing else is left.
- Fix: the menu option for a sub-menu that starts open now keeps the normal sub-menu look (indent and branch lines). The flat "More..." group (small label, no indent) is a separate option, and the CSS class `open` does the same as the first one in the Customizer menu editor.
- Fix: the ad placeholder boxes follow the "Show ad placeholders on empty slots" setting everywhere. The Customizer preview used to show them even when the box was unticked, so the setting seemed to do nothing.
- New: the Coming Soon page is now a Coming Soon / Maintenance page: pick the mode, set a launch or back-online date with a live countdown (site time zone), optionally open the site by itself when the countdown ends, add a background picture, a button and the social icons. Every text (title, text, label, countdown words, end message) can be changed; an empty field uses a default. Visitors get HTTP 503 with `Retry-After`; people who can edit posts see the real site, and `?wplusui-preview=1` shows the page to an administrator. The old on/off switch keeps working.
- Fix: the avatar in the author box is no longer squashed when the biography is long.
- Fix: names and icons agree everywhere: "X / Twitter" is used in both the social and the share settings, "WhatsApp" and "LinkedIn" are spelled the same in the share buttons, and the "Tools" menu icon is a wrench.
- Fix: the active item of a sidebar sub-menu is shown with colored text only (no block that touches the neighbouring items).
- Fix: the footer and drawer social icons now match their names. The six original icons were Threads, Bluesky and WhatsApp but were filed under Pinterest, Snapchat and Discord, so a Discord link showed the WhatsApp icon. Threads, Bluesky and WhatsApp are now separate networks, and Pinterest, Snapchat and Discord have their own icons. Links already saved for Pinterest, Snapchat and Discord keep working with the correct icons.

## 3.2.8 - 2026-10-05

- New: placeholder picture for posts without a featured image (accent-colored shapes, four variants, light/dark aware) on cards, pinned post, Popular Posts and the carousel.
- New: setting for the default state of the left menu on desktop (collapsed or expanded).

## 3.2.7 - 2026-10-05

- Fix: tags in a post excerpt no longer show as text under the title or in the meta/Open Graph description.

## 3.2.6 - 2026-10-05

- New: Customizer switches for the homepage carousel and the Pinned Post box.
- New: active state for the sidebar and quick-links menus (`active`, `aria-current`); parents of the current page open by default.
- New: per-item icon (library of 40, any level), divider, notification dot, "More..." group, New/Free badge; a `---` Custom Link is a divider; `ico-<name>` classes for the Customizer menu editor.
- Fix: collapsed sidebar flyout stays inside the window (`assets/js/nav-flyout.js`).

## 3.2.5 - 2026-10-05

- Fix: footer menu locations are rendered (menu first, widgets as fallback); new Customizer titles for the four columns.
- Fix: social icons in the footer and drawer show only when a URL is set; demo setup adds the six demo placeholders.
- Fix: appearance/theme panel flash between pages (critical CSS now includes the rules of absolutely positioned popups; `bin/critical-css.mjs`).

## 3.2.4 - 2026-10-03

- Fix: WooCommerce pages use the static-page layout; shop buttons follow the theme colors.
- Fix: Custom HTML scripts that use the runtime (`PU`) run after it has loaded.
- Fix: local images without an attachment are lazy-loaded and sized (UI Components mobile Lighthouse 75 -> 89).
- Fix: demo setup removes WordPress' default sidebar widgets on a fresh install; a clean install now matches the visual baseline on all 11 pages.
- Fix: the child theme (1.1.0) copies the parent's Customizer settings on first activation.
- Fix: WhatsApp button position; editor script translations; refreshed `.pot`.
- Change: requires WordPress 6.3.

## 3.2.3 - 2026-10-03

- New: editable blocks for Tabs (default and code), Download box, Table of contents and YouTube embed (`wplusui/*`, category "WPlus UI").
- New: gallery styles (image grid, hidden grid with Show All, scrolling) and a related-links group style render the original component markup.
- New: code blocks can carry a source label and comment, and `<mark>` annotations are available as a rich-text format.
- New: WooCommerce support (theme declarations, `woocommerce.php` template, shop styles); loaded only when WooCommerce is active.
- New: Polylang/WPML support for the free-text Customizer strings (`wpml-config.xml`).
- New: JSON-LD structured data (WebSite, Article, BreadcrumbList, FAQPage from accordion groups); skipped when an SEO plugin is active.
- New: "WPlus UI: Engagement" in the Customizer: floating WhatsApp button, call-to-action popup and Coming Soon page, all off by default.
- Change: the demo content now uses these blocks (only a few oddities remain as Custom HTML).

## 3.2.2 - 2026-10-02

- New: demo content uses native blocks with new block styles (indent, reference, accordion group and alternate, data table, quote citations).
- New: critical CSS inlined per page type; the full stylesheet no longer blocks the first paint (`bin/critical-css.mjs`).
- New: WebP sub-sizes for new image uploads.
- Fix: block spacing for alerts, code blocks, buttons and tables matches the original components.
- Fix: the demo setup reuses images that already exist in the media library.

## 3.2.1 - 2026-10-02

- New: Appearance > WPlus UI Demo page to finish the demo setup from the dashboard (no WP-CLI needed).
- New: release zips and CI workflows, NOTICE about the origin of the fork.

## 3.2.0 - 2026-10-02

- New: first WordPress release, forked from Plus UI v3.2.0 by Fineshop Design.
- New: block styles and patterns for the UI components, with editor preview.
- New: Customizer options for ads, header/footer code, sharing, layout and posts, popular posts and comments (Disqus), colors and fonts.
- New: minified CSS/JS builds, SEO meta tags, accessibility fixes, child theme `wplus-ui-child` 1.0.0.
- Fix: related posts overwritten by the runtime script.
