# WPlus UI demo content

Contents: 19 posts (16 in *Documentation*), the About and Cookie Policy pages, the Primary and Quick Links menus, and the pictures in `images/`.

The demo content is **not inside the installable theme zip** (it keeps the theme small). It is its own zip, `wplus-ui-demo-<version>.zip`, in the same release. In the dashboard, **Appearance → WPlus UI Demo → Download demo content** fetches it once and unpacks it into `wp-content/uploads/wplus-ui-demo/`. A copy of the repository has this folder in the theme and needs no download. Importing the demo again is safe: existing posts, pages, pictures and categories are skipped and the demo menus are not added a second time.

## Import from the dashboard (no WP-CLI)

1. Press **Download demo content** (first time only), then download `wplus-ui-demo-content.xml` from the same page and import it in **Tools → Import → WordPress Importer** (leave "Download and import file attachments" unticked).
2. Open **Appearance → WPlus UI Demo** and press **Finish demo setup**.

## Import with WP-CLI

1. Install and activate the **WordPress Importer** plugin (Tools → Import → WordPress), or use WP-CLI.
2. Import `wplus-ui-demo-content.xml` (assign posts to an existing user when asked). Do **not** tick "Download and import file attachments"; the pictures are in the demo pack.
3. Finish the setup (featured images, menus, widgets, Customizer, sticky/featured posts, Popular Posts ranking). With WP-CLI:

```bash
# with the unpacked demo pack (use wp-content/themes/wplus-ui/demo-content/ in a copy of the repository):
wp import wp-content/uploads/wplus-ui-demo/wplus-ui-demo-content.xml --authors=create
wp eval-file wp-content/uploads/wplus-ui-demo/import-demo.php
```

Without WP-CLI, run `import-demo.php` once from a small mu-plugin or the Code Snippets plugin; it is safe to run more than once.

`import-demo.php` also sets *Blog pages show at most* to 6 and deletes WordPress' default "Hello world!" post and "Sample Page".

## Shortcodes and post features used by the demo

- `[pu_tabs]` / `[pu_tab title="…"]` divide a post into tabs (see the Tabs Post).
- `<!--nextpage-->` (Page Break block) splits a post into pages (see the Split Post).
- Tag posts with `featured` for the homepage carousel; make one post sticky for the Pinned Post box.
- Components such as `p.note`, `div.alert`, `ol.steps`, `details.ac`, `a.button` come from the UI Components and Typography post; paste them in the Code editor.
