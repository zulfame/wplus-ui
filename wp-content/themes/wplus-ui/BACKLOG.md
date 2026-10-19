# BACKLOG.md

Status: `[x]` selesai · `[~]` sebagian · `[ ]` belum. Acuan: bandingkan ukuran piksel di 1280px terhadap `html-rebuild`.

## Blokir
- [x] Pemilik memperbaiki urutan CSS di html-rebuild; style.css sudah disalin ulang ke tema.

## Tahap 1 — Perbandingan berdampingan
- [x] Tabs Post (avatar `.im`, Related `itemRp`)
- [x] Split Post (pager PHP meniru JS asli)
- [x] 404 (tanpa under-header/mainC), footer di dalam `.mainR`
- [x] Popup share (template asli, selisih ≤3px)
- [x] Panel bookmark: terukur identik di 1280px (x877 y60 w375 h198 di kedua sisi)
- [x] Panel translate/profile: tidak ada sisa markup di header/footer/json-data
- [x] Komentar: kini tombol "Post a Comment" + popup `.cmBr` (x300 w680 di 1280px, sama dengan referensi; tinggi isi berbeda karena ada form)

## Tahap 2 — Kekurangan yang sudah diketahui
- [x] `wpautop()` dihapus dari `[pu_tabs]` (shortcode belum diuji di halaman)
- [x] Slot iklan "Below Posts Ad" (`LinkList85`) di index & archive (asli tidak ada di post); ukuran identik (x178 w667 h70)
- [x] Index: carousel/pinned/grid/sidebar/footer terukur sama di 1280px (sldW 369, blogP 669, Label 211, sideB). Sisa: `#sec_Main_Widgets` referensi 1497 vs WP 899 karena `aCat` referensi hanya 3x "nothing here" (feed Blogger gagal di statis); WP merender Documentation/Product sungguhan (opsi Customizer `wplusui_home_categories`)
- [x] Kartu grid/pinned: overlay bookmark+edit (`tfxM T`) dan byline (`tfxM B`) via `wplusui_card_overlay_top()`; bookmark tersimpan ke localStorage
- [x] Baris quick links: Documentation + Link 01..10 (item `#` dirender `<span class="l">`), posisi identik
- [x] Ikon item menu: kolom "WPlus UI icon" (40 ikon) di semua tingkat termasuk anak dan cucu, kelas `ico-<nama>`, "No icon"; diuji `tests/docs/trace-ef.mjs` (E02-1 sampai E02-6)
- [x] Carousel independen: 5 slot di Customizer (gambar/judul/link); kosong = post bertag featured. Dengan gambar referensi tinggi sldW dan gambar identik (369/443)

## Tahap 3 — Varian tampilan
- [x] Dark mode: 16 skema x light/dark, warna komputasi 14 elemen identik dengan referensi (kecuali elemen dari bookmark yang saya simpan sendiri)
- [x] 16 skema warna (`PU.ui.sC`) — termasuk di atas
- [x] Mobile 390px: header, under-header, carousel, pinned, grid, footer dan drawer terbuka (semua item, More…, footer drawer) identik; walker: grup `mr` tanpa ikon di label, anak ber-ikon. Referensi tidak punya bottom bar
- [x] Halaman search dan hasil kosong tampil benar (tanpa referensi statis; hasil kosong masih `<p>` polos)
- [x] Pagination index: markup asli `blogN#blog-pager` (nwLnk/hmLnk/olLnk), ukuran 40px identik di halaman 1; halaman >1 diberi body class home (onHm hsSb). Load more JS: `vw.iMi` true di home/kategori; diuji 6→12→18 kartu lalu status "No results found"

## Tahap 4 — Konten dummy
- [x] Kategori Documentation: 16 post, judul/snippet/urutan/tanggal/label sama dengan referensi; 12 post diperkaya (langkah, kode, note, alert, FAQ). Archive terukur identik (banner, grid, pager)
- [x] Thumbnail placeholder diganti (Tabs/Split/Safelink memakai eren-yeager.png seperti referensi, Product Post HP_Pavilion)
- [x] XML demo diekspor ulang (host placeholder, tanpa _thumbnail_id), gambar dibundel di `demo-content/images`, `import-demo.php` (idempoten) mengatur gambar, menu, widget, Customizer, sticky/featured, views. Diuji pada instalasi bersih (DB terpisah): impor sukses, 19 lampiran, tidak ada duplikat saat dijalankan 2x
- [x] Dokumentasi shortcode/fitur di `demo-content/README.md`

## Tahap 5 — Kemasan
- [x] `screenshot.png` (dari gambar pemilik, 1200x675) dan `readme.txt`
- [x] `php -l` semua file bersih; review escaping manual (grep echo tanpa escape, tanpa input $_GET/$_POST; satu-satunya $_SERVER disanitasi). phpcs WordPress-Extra + WordPress-Docs: 0 temuan setelah phpcbf (326 perbaikan format); HTML 8 halaman identik sebelum/sesudah
- [x] Ketergantungan Blogger di JS runtime tanpa mengubah script.js: `?view=x-content-lazy` dijawab kosong (functions.php), `vw.iAd=false` + quick-edit mati (`qe.ok/sc=false`), permintaan `blogger.com/dyn-css/authorization.css` dijawab lokal lewat inline script. Request eksternal tersisa hanya Gravatar, Google Fonts, thumbnail YouTube (konten)
- [x] `languages/wplus-ui.pot` dibuat. RTL tidak dipakai (permintaan pemilik)
- [x] `.distignore` mengecualikan *.md agen; wp-config.php di luar folder tema
- [x] Repo publik berisi tema, child, docs, tests dan skrip; inti WordPress di luar repo (`.gitignore`)
- [x] `.claude/launch.json` port 8123: tidak dipakai/diubah; pemilik sudah mematikan server di port itu

## Rebranding
- [x] Header tema (`style.css`), 5 blok "Template Information" di `assets/css/style.css`, `readme.txt`, kredit footer, dan komentar kode: platform WordPress, fork dari Plus UI (Fineshop Design) oleh Zulfadli Rizal. Kredit pengembang asli dipertahankan

## Peningkatan (Lighthouse + editor blok)
- [x] Baseline di WP asli (mobile 58/64, desktop 96) → setelah: mobile 82/83, desktop 99; best-practices 100, SEO 100. Penyebab utama: `style.css` 488 KB memblokir render. Kini `style.min.css` 183 KB (gzip ±38 KB), `script.min.js` 113 KB (dipakai kecuali SCRIPT_DEBUG; build: `npm run build`, esbuild). Kesetaraan CSS min diuji lewat computed style 1063 elemen
- [x] Gambar carousel: ukuran `large` + srcset, slide 1 `fetchpriority=high`, lainnya lazy
- [x] `inc/seo.php`: meta description, Open Graph, Twitter card, favicon cadangan (nonaktif bila plugin SEO aktif)
- [x] Aksesibilitas: aria-label tombol skema warna, `role=img` ikon sosial
- [x] `bgTyp` 2 (load more langsung) menghilangkan error `numP` konsol
- [x] Editor blok: block styles (Note, Alert x10, Steps, Quote, Accordion, Spoiler), kelas tombol .button/.ln, pola "WPlus UI" (10 pola), pratinjau di editor (style.min.css via add_editor_style + editor.js)
- [x] Sisa Lighthouse: tombol bookmark di kartu terkait kini 24 px (sebelumnya 22 px); kontras `mark` sudah diperbaiki di 1.7.0. Diukur: aksesibilitas 100 di beranda dan post komponen (Lighthouse mobile)

## Tahap A: perbandingan eiPro (selesai)
- [x] Hasil di `COMPARISON.md`
- [x] E1 Slot iklan bisa diisi dari Customizer "WPlus UI: Ads" (5 slot + iklan dalam artikel setelah paragraf N). Slot kosong tidak mencetak apa pun kecuali "Show ad placeholders" (demo mengaktifkannya); diuji: placeholder 5 slot di beranda, kode live, sisipan paragraf ke-2
- [x] E2 Skrip header/footer dari Customizer "WPlus UI: Header/footer code" (hanya pengguna dengan unfiltered_html yang bisa menyimpan script)
- [x] E3 "WPlus UI: Sharing" di Customizer: tombol bagikan on/off, 3 tombol cepat bebas pilih, 8 jaringan di popup bisa dinyalakan satu per satu; tautan sosial bertambah (YouTube, TikTok, Telegram, LinkedIn; tampil hanya bila URL diisi). Pada pengaturan bawaan, ukuran blok share dan popup identik dengan referensi (diukur 1280px)
- [x] E4 "WPlus UI: Layout and posts": sidebar home/single/search on-off (class hsSb ikut), tombol TOC on-off, related posts (on-off, judul, jumlah 1–12), kotak penulis (default mati). Perbaikan bug: related posts server-side dulu ditimpa JS (kelas aRps) dan macet "Loading…"; kini memakai kelas relPosts
- [x] E5 "WPlus UI: Colors and fonts": warna aksen terang/gelap, radius tombol, font Google untuk isi dan judul (variabel CSS di :root, skema pengunjung tetap berlaku). Diuji: aksen #e91e63, gelap #ff80ab, radius 14px, Inter termuat
- [x] E6 "WPlus UI: Popular posts and comments": Popular Posts (tampil, judul, jumlah 1–10, urut: views/komentar/terbaru), kategori disembunyikan dari beranda (slug atau ID), Disqus (shortname; embed dimuat saat popup komentar dibuka). Diuji: judul/jumlah/hide, pengecualian kategori "plugin", thread Disqus tercetak dan form WP tidak. Disqus sungguhan belum diuji (butuh akun)

## Penyesuaian dengan eiPro (informasi tema)
- [x] Header `style.css` mengikuti pola eiPro (`/*!`, Theme URI/Author URI, Requires at least, Tested up to, Requires PHP, License URI: LICENSE, Tags), file `LICENSE` (GPLv2) di tema
- [x] `readme.txt` dengan urutan eiPro: Tags, Requires/Tested/Stable, Description, Changelog berversi dan bertanggal ("New:"/"Fix:")
- [x] Tema anak `wplus-ui-child` 1.0.0 (Template: wplus-ui) untuk CSS/PHP kustom; diuji aktif, aset induk tetap dimuat

## Tahap B (selesai)
- [x] phpcs WordPress-Extra + WordPress-Docs: 0 temuan (74 sebelumnya): @package, docblock fungsi/kelas/param, `$pg_typ`, variabel yang menimpa global WP (`$post_id`/`$tag`/`$cat` → `$wplusui_*`), nav walker dipisah jadi `class-wplusui-nav-walker.php` + `nav-icons.php`
- [x] Lighthouse mobile (di balik proxy gzip + cache): beranda 76–83, post 88–90, desktop 98; aksesibilitas 93–100, best-practices 100, SEO 100 (pencarian sengaja noindex)
- [x] Build CSS digabung: `style.min.css` = style.css + wp-extras.css (1 permintaan); preload gambar LCP carousel (`inc/seo.php`)
- [x] Label kategori dan kontras `mark` diperbaiki di 1.7.0 (area ketuk lebih besar, warna lebih gelap)
- [x] Critical CSS inline dikerjakan di 3.2.2 (beranda mobile 89 sampai 99 pada ukuran berulang)
- [x] Typo `transition-prperty` dari template asli dibiarkan: memperbaikinya mengubah animasi panel (semua properti ikut beranimasi sekarang), jadi bukan cacat yang perlu diubah
- [x] Uji editor blok: 10 pola "WPlus UI" dari editor (14 blok) valid semua, kanvas editor menampilkan gaya komponen (Note 39,46,181/232,240,254; Alert error padding 50px; Steps 45px), disimpan lalu tampil di front-end dengan kelas komponen benar (note/alert/steps/ac/sp/quote/button/dlBox/tabs). Belum diuji: dark mode editor dan layar sempit

## Tahap C (rilis dan pemasangan)
- [x] `bin/build-zip.sh` membuat `dist/wplus-ui-3.2.0.zip` (5,8 MB) dan `dist/wplus-ui-child-1.0.0.zip` tanpa berkas dev (sesuai `.distignore`); `CHANGELOG.md`, `README.md` root
- [x] `.github/workflows/ci.yml` (php -l, phpcs, build zip) dan `release.yml` (tag `v*` melampirkan zip). Belum dijalankan di GitHub
- [x] Uji pemasangan di WordPress bersih (DB terpisah, WP_DEBUG): pasang zip lewat wp-cli, aktifkan, impor demo XML + `import-demo.php` (idempoten), 19 lampiran, sticky, 5 slide carousel, menu, 7 bagian Customizer terdaftar (132 setelan), tema anak aktif dan memuat aset induk, pasang ulang di atas versi lama (200)
- [x] Sandi dev dihapus dari seluruh riwayat (filter-branch + force push; 0 kemunculan di lokal dan remote). Sandi lokal sebaiknya tetap diganti
- [x] Lisensi: redistribusi Plus UI asli belum terverifikasi; `NOTICE.md` menjelaskan apa yang berlisensi bagaimana dan menyatakan bahwa tidak ada izin dari penulis asli yang diklaim. Pemilik memutuskan menerbitkan di repo publik `zulfame/wplus-ui` atas tanggung jawabnya sendiri (2026-10-14).
- [x] Tag `v3.2.0` + rilis GitHub (workflow Release sukses, 2 zip terlampir)

## Uji lanjutan pemasangan (dashboard)
- [x] Upload zip lewat Appearance > Themes > Upload (alur HTTP admin dengan nonce) dan aktivasi: berhasil di WordPress bersih
- [x] Impor XML lewat Tools > Import (WordPress Importer): 20 post (19 demo + Hello world), 3 halaman, 24 item menu
- [x] Halaman baru Appearance > WPlus UI Demo (`inc/demo-setup.php`): tombol "Finish demo setup" menjalankan `import-demo.php` tanpa WP-CLI. Diuji: 19 lampiran, sticky, menu, logo, Hello world terhapus, 5 slide + Pinned + 13 kartu; POST tanpa nonce ditolak, pengguna subscriber 403
- [x] Catatan: peringatan `Undefined array key "rewrite_urls"` berasal dari plugin WordPress Importer, bukan tema
- [x] Versi 3.2.1: bump di style.css, functions.php, package.json, readme.txt, CHANGELOG.md, blok Template Information; tag `v3.2.1` dan rilis GitHub

## Uji pasang ulang 3.2.1 (zip dari rilis GitHub, WordPress bersih)
- [x] Pasang baru lewat upload admin: tema 3.2.1 aktif, tema anak terpasang; impor XML lewat Tools > Import (20 post, 3 halaman); halaman WPlus UI Demo menyelesaikan penyiapan (19 lampiran, sticky, menu, Hello world terhapus)
- [x] Front-end: beranda, post, Tabs, Split, About, kategori, pencarian, halaman 2 semuanya 200, 404 benar; aset `?ver=3.2.1`, label versi 3.2.1, carousel 5 slide, 13 kartu, Pinned, Popular, meta description
- [x] Upgrade 3.2.0 -> 3.2.1 lewat alur "Replace current with uploaded" admin: versi 3.2.1, setelan Customizer (aksen, slot iklan, kategori disembunyikan) tetap, halaman demo tersedia
- [x] debug.log: tidak ada galat dari tema; hanya peringatan inti/plugin (`wp_maybe_inline_styles`, `rewrite_urls` dari Importer, `wp_update_themes` karena tanpa internet)

## Konten demo berbasis blok
- [x] Temuan pemilik: semua Pos di editor tampil sebagai blok Klasik/HTML dengan tombol "Konversi ke blok", karena konten demo berupa HTML mentah tanpa komentar blok
- [x] Konversi 20 pos/halaman demo ke blok asli lewat API editor (serialisasi `wp.blocks`): paragraf/Note/Alert/Steps/Accordion/Spoiler/Quote/Tombol memakai block styles tema, daftar, judul (dengan anchor), blok kode sederhana, pemisah, `core/nextpage` (Split Post). Komponen kompleks (kode ber-highlight, tabel, gambar, TOC, grid) tetap blok HTML Kustom (74 pada UI Components)
- [x] Verifikasi: 22/22 konten memakai blok, 0 blok tidak valid, 0 blok klasik di editor; teks front-end 20 halaman identik sebelum/sesudah (setelah dekode entitas); `wplus-ui-demo-content.xml` diekspor ulang, impor di WordPress bersih: 20 BLOCKS, 0 RAW, teks identik dengan situs dev
- Cadangan sebelum konversi: scratchpad sesi (`content-before-blocks.json`, `db-before-blocks.sql`)

## Konversi blok lanjutan (3.2.2)
- [x] Perbaikan bug konversi pertama: spasi/baris baru di dalam konten rich-text berubah jadi `<br>` (menambah tinggi). Konten dipulihkan dari cadangan dan dikonversi ulang dengan normalisasi spasi
- [x] Block styles baru: paragraf Indent/Reference, grup Accordion group, details Accordion (alternate), tabel Data table; kutipan memakai sitasi (`<cite>` dirender sebagai `<span>` sesuai CSS tema)
- [x] Konversi tambahan: Quote x3 (dengan sitasi), tabel data, accordion alt + grup showH, indent/ref. Blok HTML Kustom pada UI Components turun 74 -> 66 (sisanya blok kode ber-highlight, gambar/caption Blogger, tabs, TOC, grid, dll.)
- [x] Paritas tata letak diukur: 17 dari 19 pos identik dengan baseline HTML mentah; UI Components 32051 vs 32052 px (selisih 1px dari tabel); Split Post -5px (margin alert); Product Post sengaja berubah (tabel jadi Data table). CSS penyesuaian di wp-extras (alert, kode, tabel, tombol)
- [x] Editor: UI Components 204 blok, 0 tidak valid, 0 klasik

## Performa lanjutan (3.2.2)
- [x] Critical CSS: `bin/critical-css.mjs` mengekstrak aturan yang cocok dengan elemen di layar pertama (390x844 dan 1280x900) dari `style.min.css`, urutan aturan dipertahankan; 3 berkas (home 49 KB / single 55 KB / archive 40 KB; ±9–11 KB gzip) dicetak inline, stylesheet penuh dimuat async (`inc/critical-css.php`). Hasil ulang identik (reprodusibel). Tata letak beranda tetap sama (sldW 369, blogP 669, Label 211, footer 304)
- [x] Sub-ukuran gambar WebP (`inc/media.php`; `wp media regenerate` memperkecil uploads demo 5,4 MB -> 4,0 MB)
- [x] Lighthouse mobile (proxy gzip/cache, 3 run): beranda 89–91 (sebelumnya 76–83), post komponen 88; desktop 99; aksesibilitas 93–96, best-practices 100, SEO 100. Render-blocking: 0

## Uji lanjutan dan rilis 3.2.2
- [x] Mode gelap dan terang: 32 perbandingan warna komponen (Note, Alert, tombol, Accordion, Quote, tabel, Steps, indent, showH, h2, pre) di post blok vs referensi statis: identik
- [x] Editor pada lebar 600px: 204 blok valid, tanpa overflow horizontal, komponen menyesuaikan
- [x] Halaman Appearance > WPlus UI Demo diklik lewat UI browser: notifikasi "demo content is ready"; `import-demo.php` kini memakai ulang gambar yang sudah ada (tidak lagi menggandakan setelah konversi WebP mengubah nama file)
- Catatan batas uji: Disqus dan AdSense sungguhan butuh akun dan domain publik; dialog pilih file XML/zip di browser tidak bisa dijalankan alat uji (alurnya diuji lewat HTTP admin)
- [x] Versi 3.2.2: bump di semua berkas, changelog, tag dan rilis
- [x] Uji pasang rilis 3.2.2 (zip dari GitHub) di WordPress bersih lewat alur admin: aktif 3.2.2; impor XML + tombol demo (dijalankan 2x): 20 BLOCKS / 0 RAW, 19 lampiran tanpa duplikat, sub-ukuran WebP, critical CSS inline + stylesheet async, semua halaman 200

## Rencana bertahap (prioritas ulang)
- [x] Tahap 1 — Regresi visual otomatis: `tests/visual/run.mjs` (11 halaman x desktop/mobile x terang/gelap), baseline `tests/visual/baseline.json`; terbukti stabil (2x lulus) dan mendeteksi perubahan (sidebar dimatikan -> 41 selisih)
- [x] Tahap 2 — Komponen kompleks jadi blok yang bisa diedit
- [x] Tahap 3 — WooCommerce
- [x] Tahap 4 — Multibahasa (WPML/Polylang)
- [x] Tahap 5 — Schema JSON-LD
- [x] Tahap 6 — CTA, popup, WhatsApp melayang, Coming Soon
- [x] Tahap 7 — Skor mobile beranda lanjutan

## Tahap 2 - komponen kompleks jadi blok
- [x] Blok `wplusui/tabs`, `wplusui/tab`, `wplusui/download`, `wplusui/toc`, `wplusui/youtube`; gaya galeri (grid, tersembunyi + Show All, scroll) dan grup tautan terkait; atribut sumber/komentar pada blok kode dan format `<mark>`. Demo content dikonversi (20 item, 0 blok tidak valid), diekspor ulang. Regresi visual: selisih hanya 1px per gambar bertakarir (tabel `tr-caption` → blok gambar), baseline diperbarui. phpcs 0 temuan

## Tahap 3-6
- [x] 3 WooCommerce: `inc/woocommerce.php`, `woocommerce.php`, `assets/css/woocommerce.css`. Diuji dengan WooCommerce 11.1.2: toko, produk, tambah ke keranjang, keranjang, checkout, akun; tanpa overflow di 390px
- [x] 4 Multibahasa: `inc/multilingual.php` (Polylang `pll_register_string`/`pll__`, WPML `wpml_translate_single_string`) + `wpml-config.xml`. Diuji dengan Polylang 3.8.10: string diterjemahkan (notifikasi, judul terkait) pada bahasa id
- [x] 5 JSON-LD: `inc/schema.php`; diuji di beranda, pos (Organization, BreadcrumbList, Article, FAQPage dari grup accordion)
- [x] 6 Engagement: `inc/engagement.php` + `assets/css/engagement.css`; diuji WhatsApp, popup, Coming Soon (503 untuk pengunjung, admin tetap melihat situs), semua mati secara bawaan; regresi visual tetap sama
- [x] 7 Skor mobile beranda diukur ulang 3x: 91/89/90 (FCP 2.0-2.6s, LCP 3.2-3.3s, TBT 0-20ms, CLS 0-0.005); tidak ada blok render atau JS berat tersisa, sisa selisih ke 100 ada di LCP gambar pada throttling simulasi. Tidak dikerjakan lebih lanjut

## Rilis 3.2.3
- [x] Bump versi di semua berkas; regresi visual lolos dengan WooCommerce aktif; phpcs 0 temuan
- Batasan yang tercatat: Disqus/AdSense asli tidak bisa diuji tanpa akun dan domain publik; lisensi Plus UI asli belum diverifikasi (lihat NOTICE.md)

## Persiapan rilis 3.2.4 (semua diuji)
- [x] Editor asli: UI Components 203 blok, 0 tidak valid, 0 klasik; blok tabs (default dan kode), download, toc, youtube, galeri Show All, grup tautan, kode dengan sumber dan `<mark>` disisipkan, disimpan, dan dirender di front-end (tab dan Show All diklik, berfungsi)
- [x] Instal bersih dari zip lewat admin (unggah, aktifkan, impor XML, tombol demo): 20 blok / 0 mentah, 20 gambar unggulan, 19 lampiran, 2 menu; regresi visual 11 halaman x 2 viewport identik dengan baseline setelah widget bawaan WordPress dibersihkan oleh demo setup
- [x] Child theme di instal bersih: gaya induk dimuat, setelan Customizer disalin pada aktivasi pertama, identik dengan baseline
- [x] Customizer: 8 bagian termasuk Engagement (13 kontrol) tanpa galat; simpan WhatsApp/popup, tampil di front-end; popup tertutup tetap tertutup setelah muat ulang
- [x] Perbaikan temuan Lighthouse: galat konsol "PU is not defined" (About), LCP UI Components 6,8 s -> 3,5 s (75 -> 89), gambar lokal kini lazy dan berukuran
- Batasan: target-size (tombol bookmark, label kategori) dan kontras `<mark>` demo berasal dari desain asli; CLS 0,098 di About berasal dari TOC yang diisi JS

## Rilis 3.2.5 (laporan uji pemilik)
- [x] Menu footer: lokasi "Footer Column 1-4" terdaftar tetapi tidak pernah dicetak -> kini dicetak (menu lebih dulu, widget sebagai cadangan), judul kolom dari Customizer; diuji dengan 2 menu + 2 widget campur, markup/ukuran li identik dengan kolom widget
- [x] Ikon sosial: 6 ikon dasar selalu tampil walau kosong -> kini hanya yang berURL (footer dan drawer); diuji 0, 2 URL, dan 6 URL "#" (demo) identik baseline
- [x] Panel Theme/Appearance berkedip saat pindah halaman: akar masalah critical CSS tidak memuat aturan popup display:none (`.thmW` terlihat statis sebelum CSS penuh tiba). Diukur tanpa stylesheet penuh: elemen yang terlihat sebelum CSS penuh turun 127 -> 24 (sisanya SVG/elemen di bawah layar)

## Rilis 3.2.6 (laporan uji pemilik, bagian 2)
- [x] Carousel opsional: saklar "Show the homepage carousel" (dan Pinned Post) di Customizer, bawaan nyala; preload gambar LCP ikut mati
- [x] Menu aktif: sidebar (`li.active`, `aria-current`, induk terbuka otomatis) dan quick links di bawah header (`.l.active`); diuji pada item anak
- [x] Ikon menu: kolom "WPlus UI icon" (40 ikon) di Appearance > Menus, kelas `ico-<nama>` untuk editor menu Customizer; bekerja di semua tingkat
- [x] Pemisah/dot/grup "More..."/badge: kolom opsi per item, plus item `---` sebagai pemisah (juga di Customizer). Penyimpanan diuji (sanitasi, kosongkan, tidak menimpa saat disimpan dari tempat lain). Formulir Appearance > Menus belum diklik lewat browser (sesi admin berakhir), diuji lewat fungsi simpan dan tampilan kolom
- [x] Flyout sidebar tidak keluar jendela: 18 sub-menu muat (top 170, bottom 892 pada 900px), lebih panjang akan bergulir di bawah header

## Rilis 3.2.7
- [x] Tag `<p>` terlihat di bawah judul pos: excerpt tersimpan dengan tag HTML dan dicetak dengan esc_html. Kini tag dibuang di judul-bawah (`single.php`) dan deskripsi meta/OG (`inc/seo.php`); kartu sudah aman (wp_trim_words). Diuji dengan excerpt `<p>..&amp;..<b>..</b></p>`: teks bersih, entitas tetap

## Rilis 3.2.8
- [x] Menu kiri (desktop) bisa diatur bawaan tertutup (ikon) atau terbuka (ikon + label) lewat Customizer; kelas `ex`/`co` pada `#root`. Diuji 1280px: terbuka = lebar 230px, toggle -> 75px; 390px: drawer tetap membuka; bawaan (tertutup) identik baseline
- [x] Placeholder thumbnail: pos tanpa gambar unggulan memakai blok bawaan tema `.pThmb.nul` + `span.imgThm.plcH` (bentuk lembut berwarna aksen, 4 varian, ikut skema warna dan mode gelap); kartu grid/pinned, Popular pertama, dan slide carousel. Ukuran identik gambar asli (273x154 pada 1280px); diuji terang dan gelap

## Rilis 3.2.9 (temuan pengujian pemilik, dokumentasi dan audit)
- [x] Submenu aktif: hanya warna teks (tanpa blok latar), diukur: anak aktif bg transparan, warna aksen
- [x] Ikon sosial salah: set ikon asli = Threads/Bluesky/WhatsApp tetapi diberi kunci Pinterest/Snapchat/Discord, sehingga URL Discord menampilkan ikon WhatsApp. Kini 13 jaringan dengan ikon sesuai nama; demo setup mengisi enam ikon asli (Facebook, Instagram, X, Threads, Bluesky, WhatsApp); Pinterest/Snapchat/Discord digambar baru
- [x] Situs dev dibuat ulang (database `wplusui_wp` hilang dari MySQL saat ini): instal bersih + impor demo + demo setup, identik baseline
- [x] Audit nama dan ikon: 13 ikon sosial (kunci = ikon = label, diperiksa program), 8 ikon berbagi, 40 ikon menu dirender diperbesar dan dicocokkan dengan namanya; "X / Twitter" disamakan, ejaan WhatsApp/LinkedIn di tombol berbagi, ikon Tools diganti kunci inggris
- [x] Author box: avatar gepeng saat bio panjang (flex-shrink); kini 72x72 di 1280px dan 390px
- [x] Coming Soon/Maintenance diperkaya (`inc/coming-soon.php`): mode, tanggal + hitung mundur (zona waktu situs), buka otomatis, gambar latar, tombol, ikon sosial, semua teks bisa diganti dengan nilai bawaan bila kosong. Diuji: bawaan, teks kustom, tanggal depan/lewat, buka-otomatis nyala (situs terbuka sendiri) dan mati (pesan live), mode mati, saklar lama, terang/gelap, 390px (4 kotak satu baris)
- [x] Placeholder iklan: pratinjau Customizer selalu menampilkannya walau opsi tidak dicentang (`|| is_customize_preview()`); kini mengikuti opsi. Diuji: tidak diset / tidak dicentang = 0 kotak di beranda, pos, kategori; dicentang = 5/3/2; satu slot berkode tetap tampil tanpa kotak lain. Catatan: demo setup menyalakan opsi ini, jadi situs hasil impor demo perlu menghapus centangnya
- [x] Menu "Collapsible" terbuka sejak awal: opsi memakai gaya grup "More..." yang datar. Dipisah: "Sub-menu starts open" (dropdown biasa, indentasi 58px, garis cabang, item 40px, identik dropdown tertutup yang dibuka) dan "Flat More... group"; kelas `open` untuk editor menu Customizer
- [x] Popular Posts hilang di halaman pos: daftar mengecualikan pos yang dibaca, dan situs pemilik hanya punya 1 pos terbit (diperiksa di DB `wp-wplusui`), sehingga kotaknya kosong lalu disembunyikan. Kini cadangan: bila kosong, pos itu ditampilkan. Diuji: sebelum 0, sesudah 1; dua pos menampilkan pos lain saja
- [x] Contact Form 7: tampilan formulir tidak rapi (field tanpa gaya). Ditambah CSS tema (`.wpcf7`), shortcode `[wplusui_contact_form]`, pola Contact, template form 2 kolom (`cf-grid`), pembuatan halaman Contact lewat demo setup. Diuji dengan CF7 6.1.4: gaya field/tombol, validasi kosong (3 tip + kotak pesan), 2 kolom di 1280px, 1 kolom di 390px tanpa overflow, mode gelap, shortcode idempoten, tanpa CF7 pengunjung tidak melihat apa pun. CF7 7.x membutuhkan WordPress 7.1, jadi diuji dengan 6.1.4
- [x] Pengaturan footer dipindah ke bagian baru "WPlus UI: Footer" (23 kontrol): teks about, 4 kolom (pilih menu langsung + judul), teks hak cipta ({year}), 13 tautan sosial. Kolom: menu terpilih > lokasi footer-N > widget. Diuji: bawaan, menu dipilih, menu dihapus (kembali ke widget), hak cipta; tidak ada kontrol footer/sosial tersisa di Options
- [x] Kolom footer terisi dari kanan: 1 kolom = slot 4, 2 = slot 3-4, 3 = slot 2-4 (CSS `:nth-last-child` pada `.fotW`, hanya di atas 640px). Diukur pada 1280px; 390px tidak berubah (grid 2 kolom, tanpa overflow)
- [x] Popup CTA: gambar opsional (atas/samping) dan jarak bawah tombol: sebelumnya margin tombol tema (10px) + padding 24px = ±34px di bawah vs 28px di atas judul. Kini 28/28 (diukur), judul-teks 10px, teks-tombol 22px. Diuji: tanpa gambar, gambar atas (420x441), gambar samping (760, dua kolom 380 dan tinggi sama), 390px (menumpuk, muat, tanpa overflow)
- [x] Mobile bottom bar: lokasi menu `mobile` terdaftar tapi tidak pernah dicetak. Dibuat `inc/mobile-bar.php`; atas masukan pemilik disederhanakan menjadi satu saklar tampil/tidak (bawaan mati), ikon tetap (Home/Search/Menu/Mode + Top/Share/Comments sesuai halaman), lokasi menu `mobile` dihapus. Diuji: mati = tidak ada bilah (baseline utuh), nyala = beranda/pos/kategori sesuai, 404 tanpa bilah, tersembunyi >=897px, mode gelap
- [x] Box Design (opsi template Blogger): CSS `.bX` sudah ada di style.css (124 aturan) tetapi tema hanya mencetak kelas `.bD`. Kini saklar Customizer memilih `bX`/`bD`; critical CSS punya set `-box` (home/single/archive) agar render pertama benar. Diuji: kartu berborder 1px radius 5px bayangan, daftar populer berpemisah, 5 jenis halaman memakai critical box, 390px tanpa overflow; bawaan (mati) identik baseline
- [x] Uji box design per komponen (1280px dan 390px, terang dan gelap): blockquote/quote icon, details, TOC, accordion + grup showH, tabel, alert, kartu grid, popular, related, author box, panel Theme: semua berbingkai sesuai aturan `.bX`, tanpa overflow; warna gelap (kartu rgb(37,37,38), garis rgb(68,68,68)). Temuan: tanggal kartu memakai format panjang situs ("27 Oktober 2024") sehingga terpotong; kini `M j, Y`. Catatan: di ponsel 2 kolom tanggal "Updated" tetap terpotong (label 56px + tanggal 73px > 83px tersedia), sama pada mode datar, bawaan desain asli
- [x] Screenshot tema (1200x900, ukuran optimal menurut pemilik) dibuat dari tema WordPress ini sendiri: desktop 1280px (menu kiri terbuka, carousel, pinned, popular) + ponsel 390px (bilah bawah), disusun di kanvas 1200x900; 263 KB; induk dan child
- [x] Urutan Customizer disusun ulang mengikuti struktur tema (inc/customizer-order.php): Look and feel > Header and menus > Homepage > Posts and comments > Sidebar > Sharing > Footer > Ads > Engagement > Advanced code, dengan judul kelompok di bagian panjang. 114 kontrol tetap utuh dan ID pengaturan tidak berubah. Diperiksa di Customizer sungguhan (prioritas 20, 30-39, lalu Menu/Widget)
- [x] Dokumentasi batch 2 (grup A dan B): 19 fitur diuji silang dokumen/kode/desktop 1280x720/mobile 390 dan dicentang; bug font judul pos/halaman diperbaiki; 4 koreksi dokumen (docs/CEKLIS.md, tests/docs/)
- [x] Ads: ID penerbit AdSense sekali isi (pola eipro), pemuatan malas, nomor unit membuat unit responsif, alamat gambar (+ tautan baris kedua), kode tempelan tidak memuat skrip dua kali; urutan Ads: akun AdSense lalu slot dari atas. Diuji desktop dan mobile (tests/docs/ads-adsense.mjs): skrip dimuat hanya setelah gulir (0 sebelum, permintaan sesudah), langsung bila malas dimatikan, kode tempelan 1 pemuat, iklan dalam artikel setelah paragraf 2, ID tidak valid/XSS diabaikan
- [x] Batch 3 (docs): iklan dalam artikel hanya menghitung paragraf tingkat atas; kolom gambar banner di Kategori/Tag; cadangan banner arsip tag; halaman mengikuti pengaturan TOC. Diuji desktop 1280 dan mobile 390 (tests/docs/batch3-*.mjs)
- Catatan: `id="comment"` muncul dua kali di halaman pos (pembungkus warisan template asli dan textarea WordPress). Dibiarkan: formulir dan skrip berfungsi, dan mengubahnya menyentuh skrip asli dan CSS sekaligus tanpa manfaat bagi pengunjung
- [x] Batch 4 (docs): menu (E01-E08) dan footer (F01-F07) diuji desktop 1280 dan mobile 390 (tests/docs/batch4-*.mjs); opsi menu tersimpan ganda diperbaiki
- [x] Batch 5 (docs): grup G (gaya blok, blok kustom, pola, shortcode tab, editor) diuji desktop 1280 dan mobile 390 (tests/docs/batch5-*.mjs); tanpa perubahan kode
- [x] Batch 6 (docs): iklan, engagement, SEO diuji desktop 1280 dan mobile 390 (tests/docs/batch6-*.mjs); WhatsApp di atas bar mobile; og:url halaman pencarian/penulis/tanggal
- [x] Batch 7 (docs): kinerja, kompatibilitas, demo, placeholder diuji desktop 1280 dan mobile 390 (tests/docs/batch7-*.mjs); wpml-config untuk child theme; .pot diperbarui. WooCommerce, Polylang/WPML dan Contact Form 7 asli belum teruji (plugin tidak terpasang)
- [x] Audit setelah batch 8: plugin CF7, WooCommerce, Polylang dipasang di situs uji dan diuji nyata; uji interaksi tambahan (tests/docs/audit-*.mjs); bug: bar mobile Comments, TOC tidak menutup, CF7 tombol bergeser, WooCommerce berantakan, versi aset. Masih sebagian: Disqus, AdSense (akun), WPML (berbayar)
- [x] Audit klaim FITUR.md: 229 klaim diuji mesin (tests/docs/claims-*.mjs), semua lulus setelah perbaikan waktu baca minimal 1 menit dan batas radius; dokumen dikoreksi (arsip 16 pos + Load more, ikon menu bawaan, header tabel lengket)
- [x] Penelusuran kalimat FITUR.md ke uji (tests/docs/trace-*.mjs, docs/TRACE.md): 353 klaim, semua lulus; bug: Pinned Post menampilkan semua sticky
- [x] Batch 9 (docs): KONFIGURASI.md selesai; 20 klaim terukur (tests/docs/claims-config.mjs). Catatan produk untuk dipertimbangkan: font bawaan dimuat dari fonts.gstatic.com (opsi font lokal belum ada), teks tema belum punya terjemahan Indonesia siap pakai

## Rilis 3.2.10
- [x] Pencarian langsung di header (warisan Blogger) menampilkan "Loading…" tanpa akhir dan menimbulkan galat JS di halaman pencarian; dimatikan (`inc/json-data.php`, 'ls' ok=false). Ide fitur nanti: pencarian langsung lewat REST WordPress

## Rencana peningkatan (setelah rilis awal v1.7.0)
- [x] **Pembaruan tema dari panel WordPress** (v1.7.1, dirapikan di v1.7.2): memakai rilis di repo publik `zulfame/wplus-ui` (tidak perlu `update.json` atau subdomain), checksum diperiksa, jendela catatan rilis mandiri, halaman Tampilan > WPlus UI Update, tanpa menyebut GitHub di layar pengguna. Terbukti dengan pembaruan nyata 1.7.1 ke 1.7.2 di situs uji lokal. Konstanta/filter untuk mematikan: `WPLUSUI_DISABLE_UPDATES`, `wplusui_updates_enabled`.
- Ide (belum dijadwalkan): plugin pendamping `wplus-ui-addons` (penghitung tayangan tanpa data pribadi, widget dasbor admin, generator thumbnail). Analytics buatan sendiri tidak ditaruh di tema.
- Ide (belum dijadwalkan): banner cookie dengan CMP bersertifikat (Google mewajibkan untuk EEA/UK/Swiss) dan penahan kode analytics berdasarkan persetujuan; saat ini hanya gerbang AdSense dan tag script di Advanced code.
- [x] Repo publik `zulfame/wplus-ui` (cabang `main`, rilis v1.7.0); repo privat lama `zulfame/plus-ui` jadi arsip (remote lokal `private`). Domain demo WordPress `wplus-ui.zulfame.com` (Template Information).
- Aturan: setelah v1.7.0 hanya naik v1.7.X.
- [x] Konten demo dikeluarkan dari zip tema (6 MB jadi 0,7 MB): paket demo `wplus-ui-demo-<versi>.zip` di rilis yang sama, diunduh dari Tampilan > WPlus UI Demo saat diminta (checksum diperiksa). Gambar `about.png` 1,2 MB sudah diganti `about.webp` 7 KB.
- [x] Perbaikan cache pembaruan (jawaban dari tema lama dianggap kosong) sudah ikut rilis 1.7.3
- [x] Label di catatan rilis ("New:", "Fix:") kini tebal dengan titik dua


## Belum dirilis (di main setelah 1.7.4, menunggu perintah rilis)
- Kartu post: penulis di kiri bawah, lencana tanggal di kanan bawah, tanpa "Keep reading"
- Blok kode: label pojok kanan atas hanya tampil bila diisi (kosong = `</>`), tidak lagi dari deteksi bahasa otomatis; kolom di editor terbuka sejak awal
- Gambar di slot iklan: sudut membulat sama dengan kartu
- Menu bawah sidebar: lokasi menu sendiri (URL bisa diubah); tengah dan seimbang saat tanpa ikon sosial
- Tag artikel: tampil sebagai blok seperti widget Labels
- Catatan rilis: label "New:" dengan titik dua, label "Changed" dikenali
- Paket demo: about.png diganti WebP; tombol bookmark kartu terkait 24 px
- Pembaruan tema: jawaban GitHub yang tersimpan tidak lagi menyembunyikan rilis baru dari pengecekan WordPress sendiri (pembaruan muncul di Tema/Dasbor tanpa menekan Check now)
