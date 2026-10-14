# WPlus UI untuk WordPress: daftar fitur

Dokumen ini mencatat **semua fitur tema** beserta tempat mengaturnya, perilaku bawaan, dan berkas kode yang menjalankannya.
Setiap fitur punya **ID** yang dipakai juga di [CEKLIS.md](CEKLIS.md). Daftar ini disusun dari kode dan dari WordPress yang berjalan
(Customizer, blok, pola, shortcode, lokasi menu), bukan dari ingatan.

- Nama menu dan opsi ditulis **persis seperti tampil di Customizer** (bahasa Inggris), karena itu yang akan dicari pengguna.
- "Customizer" berarti **Tampilan > Sesuaikan**. Path `WPlus UI: X` adalah bagian (section) di Customizer.
- **Urutan bagian WPlus UI di Customizer** mengikuti struktur tema dari atas ke bawah halaman, tepat di bawah "Identitas Situs":
  1. WPlus UI: Look and feel (mode, warna, bentuk, font)
  2. WPlus UI: Header and menus (bar notifikasi, menu kiri, bilah bawah mobile)
  3. WPlus UI: Homepage (carousel, pinned post, seksi kategori)
  4. WPlus UI: Posts and comments (daftar isi, author box, related, komentar)
  5. WPlus UI: Sidebar (di mana tampil, Popular Posts)
  6. WPlus UI: Sharing
  7. WPlus UI: Footer (about, tautan sosial, kolom, hak cipta)
  8. WPlus UI: Ads (urut dari atas halaman ke bawah)
  9. WPlus UI: Engagement (WhatsApp, pop-up, Coming Soon)
  10. WPlus UI: Advanced code
  Di dalam bagian yang panjang ada judul kelompok kecil (misalnya "Carousel", "Social links", "Call-to-action popup").
- Kolom **Bawaan** memuat nilai saat tema baru dipasang, sebelum ada pengaturan.
- Status pengujian tidak ada di sini; lihat [CEKLIS.md](CEKLIS.md).

Persyaratan: WordPress 6.3+, PHP 7.4+. Tidak ada dukungan RTL (disengaja).

---

## A. Tampilan umum

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| A01 | Mode terang / gelap / sistem | WPlus UI: Look and feel > Default light/dark mode | Light | Mode awal untuk pengunjung baru; "System" mengikuti pengaturan terang/gelap perangkat. Pengunjung bisa ganti lewat ikon matahari/bulan di header (Light, Dark, System). Pilihan pengunjung disimpan di browsernya dan **menang** atas pengaturan ini, jadi mengubah pengaturan tidak mengubah tampilan pengunjung lama. | `header.php` (`.aprW`), `assets/js/script.js`, `inc/json-data.php` |
| A02 | 16 skema warna | WPlus UI: Look and feel > Default accent color scheme (0 sampai 15) | 0 | Skema warna awal untuk pengunjung baru. Pengunjung memilih skema lain di panel Theme (16 lingkaran warna) dan pilihannya disimpan di browsernya. | `inc/customizer.php`, `header.php` (`.thmW`) |
| A03 | Warna aksen kustom | WPlus UI: Look and feel > Accent color (light mode) / (dark mode) | kosong (pakai skema) | Menimpa warna tautan, tombol, dan aksen (terang dan gelap terpisah). Pengunjung yang memilih skema lain tetap mendapat skema pilihannya. | `inc/appearance.php` |
| A04 | Sudut tombol dan tautan | WPlus UI: Look and feel > Button and link corner radius (px) | kosong (bawaan tema) | Angka 0 sampai 30 piksel. Nilai di luar 0 sampai 30 dibatasi juga saat dicetak. | `inc/appearance.php` |
| A05 | Font Google | WPlus UI: Look and feel > Body font / Heading font | kosong (font bawaan tema) | Isi nama font Google Fonts, misalnya `Inter`. **Body font** dipakai untuk teks dan isi; **Heading font** untuk judul (judul pos dan halaman, judul kartu, nama situs). Nama yang tidak valid diabaikan. Dimuat dari fonts.googleapis.com. | `inc/appearance.php` |
| A06 | Box design | WPlus UI: Look and feel > Box design | Mati | Kartu pos, daftar populer dan terkait, tabel, kutipan, accordion, dan pop-up digambar dalam kotak berborder dan bayangan. Set CSS kritis sendiri (`-box`). | `functions.php` (`wplusui_box_design`), `assets/css/style.css` (`.bX`), `inc/critical-css.php` |
| A07 | Menu kiri desktop: tertutup atau terbuka | WPlus UI: Header and menus > Left menu on desktop | Collapsed (hanya ikon) | Keadaan awal menu kiri di layar lebar. Pengunjung bisa membuka/menutup dengan tombol di samping nama situs. Di ponsel selalu berupa laci (drawer). | `header.php` (kelas `ex`/`co`) |
| A08 | Bilah bawah mobile | WPlus UI: Header and menus > Show the mobile bottom bar | Mati | Baris ikon di dasar layar ponsel/tablet (maksimal 897 piksel): Home, Search, Menu, Appearance, dan menurut halaman: Top, Share, Comments. Ikon Comments membuka panel komentar (pos); Search memfokuskan kolom cari; Menu membuka laci. | `inc/mobile-bar.php` |
| A09 | Bar notifikasi | WPlus UI: Header and menus > Dismissible notification bar text, Notification bar button label, Notification bar button URL | kosong (tidak tampil) | Bar biru di bawah tautan cepat. Pengunjung bisa menutupnya dan setelah itu bar tidak muncul lagi di browser itu. Tombol hanya tampil bila label **dan** URL diisi. | `header.php`, `inc/customizer.php` |
| A10 | Logo, judul, slogan, ikon situs | Identitas Situs (bawaan WordPress); WPlus UI: Header and menus > Site name in the header, Show a small label next to the site name in the header, Header label text | judul dan slogan situs; header: Site name only; label tampil | Header memakai judul situs sebagai teks (**Site name only**), **Logo and site name** (logo 40px dalam kotak bersudut bulat di kiri nama) atau **Logo only** (nama disembunyikan tetapi tetap ada untuk SEO dan pembaca layar); logo diambil dari Identitas Situs, tanpa logo tetap teks. Label kecil di bawah/samping nama situs memuat versi tema secara dinamis (`WPLUSUI_VERSION`), bisa diganti teks lain atau dimatikan. Logo juga tampil di blok "Made with tea by" di footer. Ikon situs dipakai sebagai favicon; bila kosong ada ikon cadangan. | `header.php`, `footer.php`, `inc/seo.php`, `inc/post-options.php` |
| A11 | Sapaan di halaman pos | (otomatis) | aktif | Label sapaan di atas breadcrumb pos menurut jam perangkat pengunjung: 00 sampai 03 "Have sweet dreams!", 04 sampai 11 "Good morning!", 12 sampai 16 "Good afternoon!", 17 sampai 18 "Good evening!", 19 sampai 21 "Good night!", 22 sampai 23 "Time to sleep!". | `single.php` (`#postGreeting`), `inc/json-data.php`, `assets/js/script.js` |
| A12 | Pencarian di header | (otomatis) | aktif | Kolom cari di header (di ponsel, ikon kaca pembesar membuka kolomnya). Pencarian minimal 3 huruf; yang lebih pendek ditolak oleh kolomnya. Hasil di halaman pencarian (D03). Tidak ada hasil langsung (live search) saat mengetik: fitur itu milik Blogger dan dimatikan karena umpan Blogger tidak ada di WordPress. | `header.php`, `search.php` |

## B. Beranda

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| B01 | Carousel | WPlus UI: Homepage > Show the homepage carousel; Carousel slide 1 sampai 5 (image, title, caption, link) | Tampil | Sampai 5 slide yang bergeser otomatis tiap 4 detik. Slide kustom: isi **gambar** (wajib; slide tanpa gambar diabaikan), judul, keterangan (caption) dan tautan (opsional). Tanpa slide kustom, memakai 5 pos berlabel `featured`; bila tidak ada, 5 pos terbaru. Slide dari pos memakai judul pos dan cuplikan sebagai keterangan. Rasio carousel 5:2 di semua lebar layar. Pos tanpa gambar unggulan memakai placeholder. Gambar slide pertama di-preload (hanya bila carousel tampil). | `index.php`, `inc/template-tags.php`, `inc/seo.php` |
| B02 | Pinned Post | WPlus UI: Homepage > Show the Pinned Post box on the homepage | Tampil | Satu pos yang disematkan (sticky). Bila ada beberapa pos sticky, hanya satu yang tampil (yang terbaru). **Tanpa pos sticky, kotak Pinned Post tidak tampil.** Di desktop gambar di kiri dan teks di kanan; di ponsel satu kolom dengan kartu teks menimpa bagian bawah gambar. | `index.php`, `functions.php` (`wplusui_get_pinned_post`) |
| B03 | Latest Posts dan paginasi | Pengaturan > Membaca (jumlah pos per halaman) | 6 (diatur demo setup) | Grid kartu: 3 kolom di desktop, 1 kolom (satu kartu per baris) di ponsel. Tombol **Load more posts** memuat pos berikutnya ke bawah tanpa pindah halaman. Tanpa JavaScript tersedia tautan Newest / Home / Oldest. Halaman di luar jangkauan menampilkan 404. | `index.php`, `inc/template-tags.php` |
| B04 | Seksi kategori di beranda | WPlus UI: Homepage > Homepage category sections | `documentation,product` | Slug kategori dipisah koma (spasi diabaikan; slug yang tidak ada dilewati); tiap kategori yang punya pos tampil sebagai seksi berisi 6 pos dan tautan "View all". Hanya di halaman 1 beranda. Kosong berarti tidak ada seksi. | `inc/template-tags.php` |
| B05 | Sembunyikan kategori dari beranda | WPlus UI: Homepage > Hide categories from the home page | kosong | Slug atau ID kategori dipisah koma; pos di kategori itu tidak muncul di grid **Latest Posts**. Tidak memengaruhi carousel, Pinned Post, atau seksi kategori (B04). | `inc/content-options.php` |
| B06 | Sidebar beranda | WPlus UI: Sidebar > Show sidebar on the home page | Tampil | Menampilkan atau menyembunyikan sidebar di beranda. | `inc/post-options.php`, `sidebar.php` |
| B07 | Popular Posts di sidebar | WPlus UI: Sidebar > Show Popular Posts in the sidebar, title, number, Rank popular posts by | Tampil, 5 pos, urut Views | Daftar pos terpopuler. Urutan: tayangan lalu komentar, komentar, atau terbaru. Di halaman pos, pos yang sedang dibaca tidak ikut terdaftar; bila itu satu-satunya pos, ia tetap ditampilkan. | `sidebar.php`, `functions.php`, `inc/content-options.php` |

## C. Halaman pos

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| C01 | Tata letak pos | (otomatis) | aktif | Breadcrumb (Home / kategori), judul, kutipan (excerpt) bila ada (tag HTML dibuang), avatar penulis, satu tanggal (**Published** bila pos tidak berubah; **Updated** bila diubah di hari setelah terbit), estimasi waktu baca di ujung kanan baris tanggal sejajar dengan ikon di atasnya, label tag. Estimasi baca minimal 1 menit (pos sangat pendek tidak lagi tertulis 0 menit). Waktu baca bisa dimatikan di WPlus UI: Posts and comments > Show the estimated read time under the post title. | `single.php` |
| C02 | Daftar isi (TOC) | WPlus UI: Posts and comments > Show the table of contents button on posts and pages; blok Table of contents | Tampil | Tab kecil di tepi kanan layar (selalu terlihat) membuka panel daftar isi yang dibangun dari heading isi artikel (bertingkat, bernomor). Pengaturan berlaku untuk pos dan halaman; dimatikan: tab dan panel tidak dicetak. Blok **Table of contents** menaruh daftar isi di dalam konten (konten demo tidak memakainya, supaya tidak dobel dengan panel di tepi kanan). Memilih entri menggulir ke heading dan menutup panel. | `template-tags.php` (`wplusui_render_toc_shell`), `single.php`, `page.php`, `inc/custom-blocks.php`, `script.js` |
| C03 | Berbagi | WPlus UI: Sharing > Show share buttons on posts; Quick button 1 sampai 3; Popup: (8 jaringan) | Tampil; Facebook, WhatsApp, X; semua 8 di popup | Tiga tombol cepat plus ikon "+" yang membuka popup berisi jaringan terpilih dan kolom salin tautan. | `inc/share.php`, `inc/share-networks.php`, `template-parts/share.php` |
| C04 | Related posts | WPlus UI: Posts and comments > Show related posts, Related posts title, Number of related posts | Tampil, 6 pos | Pos dari kategori yang sama di bawah artikel. | `single.php`, `inc/post-options.php` |
| C05 | Author box | WPlus UI: Posts and comments > Show an author box under posts | Mati | Kotak penulis: avatar bulat 64px di kiri (52px di ponsel), di kanannya "Written by", nama, dan biografi dari profil pengguna bila ada; tanpa biografi kotaknya ringkas. | `inc/post-options.php` |
| C06 | Komentar | Pengaturan > Diskusi; WPlus UI: Posts and comments > Disqus shortname | komentar bawaan WordPress | Komentar muncul di panel pop-up dari tombol "Post a Comment" (daftar komentar dan formulir; komentar baru membuka kembali pos pada komentar itu). Bila Disqus shortname diisi, formulir bawaan diganti utas Disqus yang dimuat saat panel pertama dibuka. | `inc/comments.php`, `comments.php`, `inc/content-options.php` |
| C07 | Bookmark | (otomatis) | aktif | Tombol penanda di kartu dan pos; daftar bookmark pengunjung tersimpan di browsernya dan terbuka dari ikon di header. | `template-tags.php` (`data-bm-*`), `script.js` |
| C08 | Penghitung tayangan | (otomatis) | aktif | Setiap kunjungan pos (bukan pratinjau, bukan bot, bukan pengguna masuk) menambah meta `wplusui_views`, dipakai Popular Posts. | `functions.php` (`wplusui_count_post_view`) |
| C09 | Pos beberapa halaman | blok Page Break (`<!--nextpage-->`) | tersedia | Pos dibagi halaman dengan pager di bawahnya. | `template-tags.php` (`wplusui_split_pager`) |
| C10 | Iklan dalam artikel | WPlus UI: Ads > In-article ad, Insert in-article ad after paragraph | kosong, setelah paragraf 3 | Iklan disisipkan setelah paragraf ke-N **di tingkat teratas** isi pos (paragraf di dalam grup, kutipan, daftar atau akordeon tidak dihitung, sehingga iklan tidak pernah masuk ke dalam blok lain). Bila paragraf kurang dari N, iklan tidak dicetak. Isi iklan: lihat H05. | `inc/ads.php` |
| C11 | Sidebar pos | WPlus UI: Sidebar > Show sidebar on single posts | Tampil | Menampilkan atau menyembunyikan sidebar di halaman pos. Desktop: kolom 300px di kanan; mobile: sidebar turun di bawah artikel. Mati: konten tetap selebar 780px (desktop). | `inc/post-options.php` |

## D. Halaman, arsip, pencarian, 404, kontak

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| D01 | Halaman statis | (templat `page.php`) | aktif | Breadcrumb, judul, konten; tanpa info penulis, sidebar, komentar, atau related posts. Tab daftar isi mengikuti pengaturan TOC (C02). | `page.php` |
| D02 | Arsip kategori/tag | Pos > Kategori / Tag > ubah > Archive banner image (WPlus UI) | otomatis | Banner kartu buram dengan nama, jumlah pos, deskripsi term; grid pos tanpa sidebar. Gambar banner dipilih dari Pustaka Media di layar ubah kategori dan tag (disimpan di meta term `wplusui_banner_image_id`); tanpa gambar, dipakai gambar unggulan pos terbaru di term itu. Arsip memuat 16 pos per halaman (filter `wplusui_archive_posts_per_page`) dengan tombol **Load more posts** untuk sisanya; di ujung daftar tertulis "No results found". Tata letak yang sama dipakai arsip tag, penulis, dan tanggal. | `archive.php`, `inc/term-banner.php` |
| D03 | Hasil pencarian | WPlus UI: Sidebar > Show sidebar on search results | sidebar tampil | Grid hasil dengan judul "Search results for". | `search.php` |
| D04 | Halaman 404 | (otomatis) | aktif | Bagian galat dengan efek glitch dan tombol "Take me back". | `404.php` |
| D05 | Halaman Contact (Contact Form 7) | shortcode `[wplusui_contact_form]`, pola "Contact page (Contact Form 7)" | tersedia | Formulir CF7 bergaya tema (field, tombol, pesan galat, dua kolom dengan `cf-grid`). Tanpa plugin, pengunjung tidak melihat apa pun dan admin melihat petunjuk. Fungsi pembuat halaman tidak membuat dua halaman bila dijalankan dua kali. Saat helper pembuat halaman dijalankan, formulir contoh bawaan CF7 yang belum diubah diganti dengan formulir tema; formulir yang sudah diubah tidak disentuh. Pesan galat per field tidak menggeser tata letak. | `inc/contact-form.php`, `assets/css/wp-extras.css` |

## E. Menu

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| E01 | Menu utama (sidebar kiri / laci) | Tampilan > Menu, lokasi **Primary Menu** | menu halaman bila kosong (E08) | Menu bertingkat dengan ikon di sisi kiri. Desktop: rel ikon yang bisa dibuka; mobile: laci. Sub-menu membuka dan menutup lewat kotak centang CSS, jadi tetap bekerja tanpa JavaScript. | `header.php`, `inc/class-wplusui-nav-walker.php` |
| E02 | Ikon item menu | Tampilan > Menu > item > WPlus UI icon (45 ikon, "Automatic" atau "No icon"); di Customizer: kelas CSS `ico-nama` | ikon folder (tingkat atas) | Ikon per item di semua tingkat; pilihan pada item mengalahkan kelas CSS; "No icon" menghilangkan ikon. Bawaan: item tingkat atas memakai ikon folder; sub-item tidak berikon kecuali dipilih (atau berada dalam grup "More..."). | `inc/nav-icon-library.php`, `inc/nav-icons.php` |
| E03 | Opsi item menu | Tampilan > Menu > item > WPlus UI menu options (Divider, Notification dot, Sub-menu starts open, Flat "More..." group, Badge New/Free); di Customizer: kelas CSS `br`, `nt`, `open`, `mr`, `new`, `free` | tidak ada | Garis pemisah setelah item, titik notifikasi, sub-menu terbuka sejak awal, grup datar "More..." (selalu terbuka), lencana New/Free. Opsi yang dicentang dua kali tersimpan sekali. | `inc/nav-icon-library.php`, walker |
| E04 | Pemisah `---` | Custom Link berjudul `---` | tersedia | Menjadi garis pemisah tanpa membuka opsi item. | walker |
| E05 | Item menu aktif | (otomatis) | aktif | Item halaman yang sedang dibuka berwarna aksen; induknya ikut aktif dan terbuka. | walker, `inc/template-tags.php` |
| E06 | Tautan cepat | Tampilan > Menu, lokasi **Under-header Quick Links** | tidak tampil bila kosong | Baris tautan geser di bawah header; yang aktif diberi garis bawah. | `header.php` |
| E07 | Flyout menu kiri | (otomatis) | aktif | Pada menu kiri yang menciut, sub-menu muncul di sisi dan tidak keluar jendela; yang panjang bisa digulir. | `assets/js/nav-flyout.js` |
| E08 | Menu cadangan | (otomatis) | aktif | Tanpa menu terpasang, daftar halaman dipakai. | `inc/template-tags.php` |

## F. Footer

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| F01 | Teks about | WPlus UI: Footer > About text under the site name | tagline situs (Pengaturan > Umum) | Teks di bawah nama situs di footer; logo situs (atau logo bawaan tema) tampil di atas nama. | `footer.php`, `inc/footer-options.php` |
| F02 | Empat kolom tautan | WPlus UI: Footer > Column 1 sampai 4: menu | widget | Tiap kolom memakai menu pilihan, atau menu lokasi Footer Column, atau widget. | `footer.php`, `inc/template-tags.php` |
| F03 | Judul kolom | WPlus UI: Footer > Column 1 sampai 4: title | Product, Resources, Support, Company | Berlaku untuk kolom bermenu; kolom widget memakai judul widgetnya. | `inc/template-tags.php` |
| F04 | Kolom terisi dari kanan | (otomatis) | aktif | Desktop: kurang dari empat kolom terisi dari slot paling kanan (kolom kosong tidak dicetak). Mobile: kolom tersusun dua per baris dari kiri. | `assets/css/wp-extras.css` |
| F05 | Teks hak cipta | WPlus UI: Footer > Copyright text | "© tahun Nama situs All rights reserved." | Mengganti baris hak cipta; `{year}` menjadi tahun berjalan. Baris atribusi tema tetap ada. | `footer.php` |
| F06 | Tautan sosial | WPlus UI: Footer > (13 jaringan) URL | kosong (tidak tampil) | Hanya jaringan yang diisi yang tampil, dengan ikon dan label sendiri: di footer, laci menu, dan halaman Coming Soon (bila opsinya aktif). Jaringan: Facebook, Instagram, X, Threads, Bluesky, WhatsApp, Pinterest, Snapchat, Discord, YouTube, TikTok, Telegram, LinkedIn. | `footer.php`, `header.php`, `inc/customizer.php` |
| F07 | Area widget footer dan sidebar | Tampilan > Widget: Footer Column 1 sampai 4, Blog Sidebar | kosong | Widget untuk kolom footer dan untuk sidebar di bawah Popular Posts dan Labels. | `functions.php` |

## G. Editor blok dan komponen konten

| ID | Fitur | Di mana diatur | Perilaku | Kode |
|---|---|---|---|---|
| G01 | Gaya blok paragraf | blok Paragraph > Styles | Note, Note: warning, First line indent, Reference. | `inc/blocks.php` |
| G02 | Gaya blok grup (Alert) | blok Group > Styles | 10 jenis alert: Alert (netral), info, success, warning, error, masing-masing juga versi (outline); plus Accordion group dan Related links. Ikon jenis alert muncul otomatis. | `inc/blocks.php`, `inc/custom-blocks.php` |
| G03 | Gaya daftar dan tabel | blok List dan Table > Styles | List "Steps" (langkah bernomor lingkaran); Table "Data table" (header lengket, garis, belang, sorot saat disentuh). Header tabel (`thead`) bersifat lengket di dalam kotak tabel; agar terlihat berfungsi, batasi tinggi tabel dengan kelas CSS tambahan `mh200`, `mh300`, atau `mhvh`. | `inc/blocks.php` |
| G04 | Gaya kutipan | blok Quote > Styles | Highlighted dan With quote icon, dengan sitasi (ditulis sebagai teks setelah kutipan). | `inc/blocks.php` |
| G05 | Gaya Details | blok Details > Styles | Accordion, Accordion (alternate), Spoiler. | `inc/blocks.php` |
| G06 | Gaya galeri | blok Gallery > Styles | Image grid (dua kolom), Image grid with Show All (empat gambar tampil, tombol Show All membuka sisanya), Scrolling images (baris yang bisa digeser). | `inc/custom-blocks.php` |
| G07 | Blok Tabs dan Tab | WPlus UI (kategori blok) | Tab biasa atau tab kode (isi Code blocks), opsi sticky (bilah tab tetap terlihat). Sampai 8 tab; berpindah tab tanpa JavaScript (tombol radio). | `inc/custom-blocks.php` |
| G08 | Blok Download box | WPlus UI | Kotak unduhan dengan tipe, nama, ukuran, dan tautan. | `inc/custom-blocks.php` |
| G09 | Blok Table of contents | WPlus UI | Daftar isi di dalam konten dari heading artikel; opsi judul dan terbuka sejak awal. | `inc/custom-blocks.php` |
| G10 | Blok Lazy YouTube | WPlus UI | Gambar sampul dan tombol putar saja saat halaman dibuka; pemutar YouTube baru dimuat saat diklik. Rasio bisa diubah. | `inc/custom-blocks.php` |
| G11 | Blok kode | blok Code (Code source label, Comment); format teks Code mark (kelas warna dan label) | Header contoh kode dengan nama berkas dan komentar; baris bernomor; `<mark>` berlabel; penyorotan sintaks dan tombol Copy di sisi pengunjung. | `assets/js/editor.js`, `script.js` |
| G12 | Pola blok | Pola > kategori WPlus UI | 11 pola: Note, Warning note, Alerts, Steps, Accordion, Spoiler, Buttons, Quotes, Download box, Tabs, Contact page. | `inc/blocks.php`, `inc/contact-form.php` |
| G13 | Tombol | blok Buttons | Gaya tombol tema (isi) dan Outline (garis). | `inc/blocks.php` |
| G14 | Shortcode tab | `[pu_tabs]` `[pu_tab title="..."]` | Tab di konten klasik atau blok Shortcode; sampai 5 tab; bilah lengket secara bawaan, `sticky="false"` mematikannya. | `inc/meta-boxes.php` |
| G15 | Pratinjau di editor | (otomatis) | Gaya tema dimuat di editor agar komponen tampil sama. | `inc/blocks.php`, `assets/js/editor.js` |

## H. Iklan dan kode kustom

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| H01 | Slot iklan | WPlus UI: Ads > Under header, Above pinned post (home), Above posts (desktop only), Below posts (home and archives), Sticky sidebar (desktop only), In-article ad | kosong | Slot kosong tidak mencetak apa pun. Tempatnya: **Under header** semua halaman kecuali 404; **Above pinned post** beranda; **Above posts** beranda dan pos (hanya desktop); **Below posts** beranda dan arsip; **Sticky sidebar** halaman bersidebar (beranda, pos, pencarian; hanya desktop); **In-article** di dalam pos (C10). Halaman statis hanya mendapat Under header. Isi slot: lihat H05. | `inc/ads.php`, `index.php`, `single.php`, `archive.php`, `header.php`, `sidebar.php` |
| H02 | Placeholder iklan | WPlus UI: Ads > Show ad placeholders on empty slots | Mati | Kotak putus-putus "Ads go here (nama slot)" di slot kosong untuk membantu penempatan; hanya di tempat slot itu tampil (mobile: tiga slot). | `inc/ads.php` |
| H03 | Kode header dan footer | WPlus UI: Advanced code > Code before </head>, Code before </body> | kosong | Kode sebelum penutup head dan penutup body (hanya untuk yang boleh memakai HTML mentah). Tidak dicetak di pratinjau Customizer. | `inc/ads.php` |
| H04 | ID penerbit AdSense | WPlus UI: Ads > Google AdSense publisher ID, Load AdSense after the visitor scrolls or taps | kosong; pemuatan malas aktif | ID diisi **sekali** (format `pub-1234567890123456`, `ca-pub-...`, atau angkanya saja). Tema memuat skrip AdSense satu kali dengan ID itu (sehingga Auto ads juga bisa jalan bila diaktifkan di akun AdSense). Pemuatan malas: setelah pengunjung menggulir, menyentuh, menggerakkan mouse atau menekan tombol, atau setelah 5 detik. Dimatikan: dimuat langsung. Bila kode yang ditempel pengguna sudah memuat `adsbygoogle.js`, tema tidak memuatnya lagi. ID yang tidak valid diabaikan. | `inc/ads.php` |
| H05 | Isi slot fleksibel | WPlus UI: Ads > Under header, Above pinned post, Above posts, Below posts, Sticky sidebar, In-article ad (semua slot) | kosong | **Angka saja** (nomor unit, mis. `1234567890`): tema membuat unit AdSense responsif dengan ID penerbit (tanpa ID penerbit, tidak tampil). **Alamat gambar** (jpg, png, gif, webp, avif, svg), dengan **tautan di baris kedua** agar gambar bisa diklik (`rel="sponsored noopener"`, tab baru). **Selain itu**: dicetak apa adanya (kode AdSense dari Google, jaringan lain, atau HTML sendiri). | `inc/ads.php` |

## I. Engagement

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| I01 | Tombol WhatsApp melayang | WPlus UI: Engagement > Show floating WhatsApp button, number, opening message, side | Mati | Tombol bulat hijau di pojok bawah (kanan atau kiri); wajib ada nomor, kalau kosong tidak tampil. Membuka wa.me dengan nomor (hanya angka) dan pesan awal. Tidak menimpa tombol gulir tema; bila bar bawah mobile aktif, tombol naik di atas bar (layar hingga 896px). | `inc/engagement.php`, `assets/css/engagement.css` |
| I02 | Pop-up ajakan (CTA) | WPlus UI: Engagement > Show call-to-action popup, title, text, button, link, delay, picture, picture position | Mati | Wajib ada judul. Muncul setelah jeda detik; ditutup dengan tombol silang, klik di luar kotak, atau Esc; setelah ditutup tidak muncul lagi di browser itu (disimpan di localStorage `puCtaSeen`). Tombol hanya tampil bila teks dan tautan diisi. Gambar opsional di atas (bawaan) atau di samping teks (sisi hanya di layar lebar; mobile selalu di atas). | `inc/engagement.php` |
| I03 | Halaman Coming Soon / Maintenance | WPlus UI: Engagement > Coming Soon / Maintenance page for visitors (mode, title, text, label, date, countdown labels, end message, auto-open, social icons, picture, button) | Off | Pengunjung mendapat satu halaman (HTTP 503) dengan hitung mundur; yang bisa mengedit pos tetap melihat situs; admin melihat halaman dengan `?wplusui-preview=1`; situs bisa terbuka otomatis saat hitungan habis. Semua teks bisa diganti, kosong memakai bawaan. | `inc/coming-soon.php` |
| I04 | Pemberitahuan cookie | WPlus UI: Engagement > Show a cookie notice, Cookie notice text, Cookie notice OK button text, Cookie policy button text, Cookie policy link, Load ads and scripts only after OK | Mati | Kartu kecil di pojok kiri bawah (di ponsel selebar layar, di atas bilah bawah) dengan teks, tombol **Cookie Policy** dan **OK, got it.** Tombol kebijakan mengarah ke tautan Customizer atau, bila kosong, ke halaman terbit `/cookie-policy` (halaman contoh ikut konten demo); tanpa keduanya tombol disembunyikan. Pilihan pengunjung disimpan di browser (localStorage dan cookie `wplusui_cookie_ok`), tanpa dikirim ke server. Saklar **Load ads and scripts only after OK** (bawaan nyala saat pemberitahuan nyala) menahan pemuat AdSense dan tag `<script>` di Advanced code dan slot iklan sampai OK; tag meta (kode verifikasi) dan JSON-LD tetap tercetak. Halaman demo punya tombol **Forget my choice**. Ini bukan CMP bersertifikat Google untuk EEA/UK/Swiss. | `inc/cookie-notice.php`, `inc/ads.php`, `assets/css/engagement.css` |

## J. SEO dan data terstruktur

| ID | Fitur | Di mana diatur | Perilaku | Kode |
|---|---|---|---|---|
| J01 | Meta, Open Graph, Twitter card | (otomatis) | Deskripsi (excerpt tanpa tag atau awal konten, 30 kata; beranda memakai tagline; arsip memakai deskripsi term), OG (type, site name, title, description, url, image) dan `twitter:card`; gambar dari gambar unggulan (pos/halaman) atau logo situs, tanpa keduanya tanpa og:image (kartu "summary"). Alamat og:url mengikuti halaman (pencarian, penulis, tanggal juga). Tidak dicetak di 404 dan bila plugin SEO (Yoast, Rank Math, AIOSEO, SEOPress, SEO Framework) aktif. | `inc/seo.php` |
| J02 | JSON-LD | (otomatis) | Organization di beranda, pos, dan halaman; WebSite (dengan SearchAction) di beranda; BreadcrumbList dan Article (hanya pos) di pos dan halaman; FAQPage dari grup accordion. Tidak ada di arsip, pencarian, 404. Tidak aktif bila plugin SEO aktif. | `inc/schema.php` |
| J03 | Ikon cadangan | (otomatis) | Favicon cadangan bila ikon situs kosong. | `inc/seo.php` |
| J04 | Preload gambar LCP | (otomatis) | Gambar slide pertama di beranda di-preload. | `inc/seo.php` |

## K. Kinerja

| ID | Fitur | Perilaku | Kode |
|---|---|---|---|
| K01 | CSS kritis inline | CSS layar pertama (set beranda, pos/halaman, arsip/pencarian; masing-masing punya set untuk desain box) dicetak di dalam halaman; stylesheet penuh dimuat tanpa memblokir (`preload` lalu jadi stylesheet, dengan cadangan `<noscript>`). Dimatikan di Customizer, admin, dan bila `SCRIPT_DEBUG` aktif. | `inc/critical-css.php`, `assets/css/critical/` |
| K02 | CSS dan JS terkompres | `style.min.css` dan `script.min.js` dipakai kecuali `SCRIPT_DEBUG` aktif. | `functions.php` |
| K03 | WebP | Unggahan JPEG/PNG baru dibuat versi WebP untuk ukuran penuh dan semua sub-ukuran dan dipakai di situs; berkas JPEG/PNG asli tetap tersimpan di folder unggahan. Tanpa dukungan WebP di server: tidak berubah. Dimatikan dengan filter `wplusui_webp_subsizes`. | `inc/media.php` |
| K04 | Gambar lazy dan berukuran | Gambar di blok yang menunjuk berkas lokal tetapi bukan entri Pustaka Media (konten demo, tautan yang ditempel) dimuat lazy dan diberi lebar/tinggi nyata. | `inc/custom-blocks.php` |
| K05 | Skrip konten menunggu runtime | Skrip di blok Custom HTML yang berbentuk `(function(PU, window, document){…})(PU, window, document)` baru berjalan setelah runtime tema dimuat (`document.currentScript` tetap tersedia). Skrip lain tidak diubah. | `inc/custom-blocks.php` |

## L. Kompatibilitas

| ID | Fitur | Perilaku | Kode |
|---|---|---|---|
| L01 | WooCommerce | Toko, produk, keranjang, checkout, dan akun memakai tata letak halaman tema dan warna tema. Stylesheet toko milik tema hanya dimuat di halaman toko, produk, keranjang, checkout, dan akun (filter `wplusui_load_woocommerce_css`). Kartu produk bergaya kartu pos (2 kolom di ponsel, hingga 3 di desktop), label diskon, harga beraksen, tombol dan field bergaya tema; halaman produk dua kolom dengan tab dan produk terkait; keranjang dan checkout (blok) serta akun dengan gaya yang sama; terang dan gelap mengikuti tema. | `inc/woocommerce.php`, `woocommerce.php` |
| L02 | Polylang dan WPML | Empat teks bebas Customizer (teks dan tombol notifikasi, judul populer, judul terkait) didaftarkan ke Polylang dan diterjemahkan lewat Polylang atau WPML; `wpml-config.xml` mencakup tema induk dan child. Dengan Polylang, tetapkan menu per bahasa (lokasi menu dibuat per bahasa). | `inc/multilingual.php`, `wpml-config.xml` |
| L03 | Contact Form 7 | Lihat D05. | `inc/contact-form.php` |
| L04 | Child theme | Pada aktivasi pertama (dijalankan WordPress di permintaan berikutnya) menyalin semua pengaturan Customizer induk; pengaturan yang sudah ada di child menang; lokasi menu dan widget ikut. Memuat stylesheet child setelah induk. | `wp-content/themes/wplus-ui-child` |
| L05 | Siap terjemahan | Domain teks `wplus-ui`, berkas `.pot`; teks editor ikut diterjemahkan. | `languages/wplus-ui.pot` |

## M. Demo

| ID | Fitur | Perilaku | Kode |
|---|---|---|---|
| M01 | Konten demo | Berkas XML: 19 pos, 2 halaman (About dan Cookie Policy), 25 item menu, 10 kategori, 1 tag, plus 23 gambar yang ikut tema. Diimpor lewat WordPress Importer (jangan centang unduh lampiran). | `demo-content/` |
| M02 | Selesaikan demo | **Tampilan > WPlus UI Demo**: menetapkan gambar unggulan, menu, widget, pengaturan Customizer, pos sticky/featured, dan halaman Contact. Aman dijalankan ulang (jumlah pos, menu, gambar tidak bertambah). **Menimpa pengaturan Customizer dengan nilai demo, jadi jangan dijalankan di situs yang sudah diatur.** | `inc/demo-setup.php`, `demo-content/import-demo.php` |

## N. Placeholder dan media

| ID | Fitur | Perilaku | Kode |
|---|---|---|---|
| N01 | Placeholder thumbnail | Pos tanpa gambar unggulan mendapat gambar pengganti berwarna aksen (4 variasi, terang dan gelap) di kartu, pinned, popular, dan carousel. | `inc/template-tags.php`, `assets/css/wp-extras.css` |
| N02 | Tanggal singkat di kartu | Tanggal diperbarui di kartu memakai format singkat `M j, Y` (contoh "Okt 27, 2024"). | `inc/template-tags.php` |

---

## O. Pembaruan

| ID | Fitur | Di mana diatur | Bawaan | Perilaku | Kode |
|---|---|---|---|---|---|
| O01 | Pembaruan tema dari panel WordPress | Tampilan > WPlus UI updates; `define( 'WPLUSUI_DISABLE_UPDATES', true );` atau filter `wplusui_updates_enabled` untuk mematikan | Nyala | Tema menanyakan rilis terbaru di GitHub (`zulfame/wplus-ui`, paling sering tiap 12 jam, hasil dicache; kegagalan diingat 1 jam). Bila versinya lebih baru WordPress menampilkan pembaruan di Tampilan > Tema dan Dasbor > Pembaruan, dengan tombol perbarui dan opsi pembaruan otomatis. "View version details" membuka jendela catatan rilis (teks dari CHANGELOG, format dasar saja, HTML dari rilis tidak pernah menjadi markup). Hanya zip dari rilis repositori itu yang ditawarkan; zip yang diunduh dicocokkan dengan checksum yang dipublikasikan GitHub dan dibatalkan bila tidak cocok. Halaman Tampilan > WPlus UI updates menampilkan versi terpasang dan terbaru, tombol Update now dan Check now, catatan rilis, dan riwayat versi terpasang. Draft, pra-rilis, tag bukan angka versi, paket tanpa nama yang benar, dan paket di luar repositori diabaikan. Hanya alamat IP situs dan user agent dengan versi tema yang terlihat oleh GitHub. Tema anak tidak ikut diperbarui lewat ini. | `inc/updater.php`, `bin/release-notes.sh`, `.github/workflows/release.yml` |

## Hal yang belum punya antarmuka (catatan batch 1)

- **Gambar banner kategori** (D02): sudah punya kolom di layar edit Kategori dan Tag (diperbaiki di batch 3).
- **id="comment" ganda** di halaman pos (C06): dicatat di BACKLOG, belum diubah.
