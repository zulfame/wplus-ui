# Konfigurasi WordPress yang optimal untuk WPlus UI

Dokumen ini berisi saran pengaturan WordPress, server, plugin, dan konten agar WPlus UI berjalan cepat, aman, dan rapi. Cara memakai setiap fitur tema ada di [PANDUAN.md](PANDUAN.md); daftar fiturnya di [FITUR.md](FITUR.md).

**Setiap saran diberi label supaya Anda tahu seberapa kuat dasarnya:**

| Label | Artinya |
|---|---|
| **[Diukur]** | Saya ukur sendiri di situs uji (WordPress 7.0.4, PHP 8.3, tema versi 3.2.8, desktop 1280x720 dan mobile 390). Angkanya bisa berbeda di hosting Anda. |
| **[Dari kode]** | Berasal dari cara kerja kode tema yang saya baca; perilakunya sudah diuji bila disebut. |
| **[Aturan WordPress]** | Pengetahuan umum tentang WordPress yang **tidak** saya uji di situs ini. Periksa di lingkungan Anda. |

Pengukuran bisa dijalankan ulang dengan `node tests/docs/claims-config.mjs` (20 pemeriksaan, semua lulus pada penulisan dokumen ini).

Bagian yang butuh akun nyata atau layanan pihak ketiga (iklan AdSense yang terisi, Disqus, WPML, layanan cache tertentu) tidak saya uji; batasnya ditulis di tempatnya.

---

## Daftar isi

1. [Sepuluh langkah dengan dampak terbesar](#1-sepuluh-langkah-dengan-dampak-terbesar)
2. [Server dan PHP](#2-server-dan-php)
3. [Pengaturan inti WordPress](#3-pengaturan-inti-wordpress)
4. [Gambar dan media](#4-gambar-dan-media)
5. [Kinerja](#5-kinerja)
6. [Privasi, cookie, dan layanan luar](#6-privasi-cookie-dan-layanan-luar)
7. [SEO](#7-seo)
8. [Keamanan dan pemeliharaan](#8-keamanan-dan-pemeliharaan)
9. [Plugin](#9-plugin)
10. [Bahasa dan terjemahan](#10-bahasa-dan-terjemahan)
11. [Resep per jenis situs](#11-resep-per-jenis-situs)
12. [Ceklis sebelum situs dibuka untuk umum](#12-ceklis-sebelum-situs-dibuka-untuk-umum)
13. [Yang belum teruji](#13-yang-belum-teruji)

---

## 1. Sepuluh langkah dengan dampak terbesar

1. **Pakai PHP 8.1 atau lebih baru** dengan OPcache dan HTTPS. Tema berjalan di PHP 7.4, tetapi versi baru lebih cepat dan didukung lebih lama. [Aturan WordPress]
2. **Beri setiap pos gambar unggulan 16:9, minimal 1280x720.** Gambar itu dipakai di kartu, carousel, Popular Posts, dan kartu berbagi media sosial. [Dari kode]
3. **Pakai server dengan dukungan WebP (GD atau Imagick)** agar gambar baru otomatis dibuatkan versi WebP. [Dari kode, diukur]
4. **Isi kutipan (excerpt) tiap pos.** Kutipan menjadi deskripsi di bawah judul dan deskripsi untuk mesin pencari. [Dari kode, diukur]
5. **Pilih struktur tautan "Nama pos"**, lalu simpan ulang di Pengaturan > Tautan Permanen. [Aturan WordPress]
6. **Jangan matikan pemuatan malas AdSense** (WPlus UI: Ads) bila Anda memasang iklan. [Dari kode, diukur]
7. **Hati-hati dengan plugin cache** yang mengoptimalkan CSS atau menunda JavaScript: tema sudah melakukannya sendiri. Lihat [bagian 5](#5-kinerja).
8. **Putuskan soal privasi sejak awal**: tema memuat font dan avatar dari layanan luar secara bawaan. Lihat [bagian 6](#6-privasi-cookie-dan-layanan-luar).
9. **Gunakan child theme** untuk CSS atau fungsi sendiri, dan aktifkan pembaruan otomatis keamanan. [Diukur]
10. **Jalankan ceklis akhir** di [bagian 12](#12-ceklis-sebelum-situs-dibuka-untuk-umum): matikan placeholder iklan, matikan mode Coming Soon, hapus konten demo.

---

## 2. Server dan PHP

| Hal | Saran | Label |
|---|---|---|
| WordPress | 6.3 atau lebih baru (diuji pada 7.0.4). | Diukur |
| PHP | Minimum 7.4; disarankan 8.1 sampai 8.3 (diuji pada 8.3). | Diukur |
| Ekstensi | `gd` atau `imagick` **dengan dukungan WebP**, `mbstring`, `xml`. Tanpa WebP, gambar tetap tampil tetapi tidak dibuatkan versi WebP. | Dari kode |
| Memori | 256 MB atau lebih (WooCommerce dan editor blok lebih boros). | Aturan WordPress |
| Unggahan | `upload_max_filesize` dan `post_max_size` minimal 16 MB agar gambar foto bisa diunggah. | Aturan WordPress |
| OPcache | Aktifkan. | Aturan WordPress |
| HTTPS | Wajib: AdSense, popup salin tautan, dan beberapa fitur browser (clipboard) membutuhkannya. Uji lokal memakai `127.0.0.1`, yang dianggap aman oleh browser. | Dari kode |
| Kompresi | Aktifkan gzip atau Brotli di server. Tanpa kompresi, `style.min.css` 193 KB dan `script.min.js` 113 KB; dengan gzip sekitar 40 KB dan 48 KB. | Diukur |
| Cache berkas statis | Beri `Cache-Control` panjang (misalnya 1 tahun) untuk CSS, JS, gambar, dan font. Aman, karena tema menambahkan waktu ubah berkas ke alamat CSS/JS (`?ver=<versi tema>.<angka>`, misalnya `?ver=1.7.0.1791916244`) sehingga berkas baru langsung dimuat. | Diukur |

---

## 3. Pengaturan inti WordPress

### Umum

- **Judul Situs** dan **Slogan**: dipakai di header, footer, judul tab, deskripsi beranda, dan teks About (bawaan) di footer. Slogan yang jelas sekali kalimat lebih baik daripada slogan bawaan WordPress. [Diukur]
- **Zona Waktu**: pilih kota (misalnya `Asia/Jakarta`), bukan selisih UTC. Tanggal hitung mundur Coming Soon dibaca dalam zona waktu situs. [Dari kode]
- **Format Tanggal**: dipakai di info pos dan kartu terbit. Tanggal "Updated" pada kartu memakai bentuk singkat tetap (contoh "Okt 27, 2024"). [Diukur]
- **Ikon Situs**: unggah gambar persegi minimal 512x512 (aturan WordPress); tanpa ikon, tema memakai ikon cadangan bawaan. [Aturan WordPress, Diukur]

### Membaca

- **Halaman depan menampilkan: Pos terbaru** (bawaan WordPress) adalah susunan yang dirancang untuk tema ini: carousel, Pinned Post, Latest Posts, dan seksi kategori. [Diukur]
- Bila memilih **halaman statis** sebagai halaman depan, beranda menampilkan isi halaman itu dengan tata letak halaman biasa (tanpa carousel). Bila Anda juga menentukan **Halaman pos**, halaman itu memakai tata letak beranda penuh (carousel, Pinned Post, Latest Posts). [Diukur]
- **Pos blog per halaman: 6.** Grid memakai 3 kolom di desktop dan 2 di ponsel, sehingga kelipatan 6 mengisi baris dengan rapi (angka 10 menyisakan baris dengan satu kartu). Arsip kategori, tag, penulis, dan tanggal memakai 16 pos per halaman dari filter `wplusui_archive_posts_per_page`, bukan dari pengaturan ini. [Diukur]
- **Teks yang ditampilkan di feed: Ringkasan** mengurangi beban dan menjaga isi tetap diakses lewat situs. [Aturan WordPress]
- **Visibilitas mesin pencari**: jangan centang "Cegah mesin pencari mengindeks situs ini" saat situs sudah tayang. Mode Coming Soon dan Maintenance menambahkan sendiri `noindex`. [Dari kode, diukur]

### Diskusi

- **Komentar**: tema menampilkan komentar bawaan di panel pop-up. Aktifkan moderasi untuk komentar pertama dari seseorang dan pasang **Akismet** atau pelindung spam lain. [Aturan WordPress]
- **Tampilkan avatar**: bila dicentang (bawaan), avatar penulis dan komentator dimuat dari `secure.gravatar.com`. Matikan bila ingin tanpa layanan luar. [Diukur]
- Komentar berutas (threaded) dan penomoran halaman komentar mengikuti pengaturan WordPress. Disqus menggantikan formulir bawaan bila **Disqus shortname** diisi. [Dari kode]

### Media

- Biarkan **Ukuran Besar** (Large) sebesar 1024 piksel atau lebih. Carousel dan kartu berbagi memakai ukuran itu; ukuran yang terlalu kecil membuat gambar buram. [Dari kode]
- Tema menambah dua ukuran sendiri: kartu **600x337** (dipotong 16:9) dan **150x150**. Ukuran lain dibuat WordPress seperti biasa (300x169, 768x432, 1024x576, 1536x864 pada gambar uji 1600x900). [Diukur]

### Tautan Permanen

- Pilih **Nama pos**. Setelah mengubah, simpan sekali lagi agar aturan tautan diperbarui. Tema tidak bergantung pada bentuk tautan (diuji dengan tautan polos `?p=`; bentuk "Nama pos" mengikuti aturan WordPress dan tidak diuji di sini). [Aturan WordPress]

### Privasi

- Tetapkan **Halaman Kebijakan Privasi** (WordPress menyediakan templat). Tema tidak membuat halaman itu. [Aturan WordPress]

---

## 4. Gambar dan media

| Hal | Saran | Label |
|---|---|---|
| Gambar unggulan | 16:9, minimal 1280x720; JPEG atau PNG (otomatis dibuatkan WebP) atau langsung WebP/AVIF. | Dari kode |
| Gambar OG/berbagi | Dipakai gambar unggulan ukuran Large (1024 px). Untuk kartu yang tajam, gambar unggulan 1200x630 atau lebih besar dengan objek di tengah. | Dari kode, Aturan WordPress |
| Pos tanpa gambar unggulan | Tetap tampil rapi dengan gambar pengganti beraksen (empat variasi), tetapi kartu berbagi media sosial memakai logo situs bila ada, atau tanpa gambar. | Diukur |
| WebP | Unggahan JPEG/PNG baru menghasilkan WebP untuk ukuran penuh dan semua sub-ukuran; berkas JPEG/PNG asli tetap tersimpan. Gambar lama (diunggah sebelum tema dipasang) tidak diubah; regenerasi dengan plugin pembuat ulang thumbnail bila perlu. | Diukur |
| Lazy-load | Gambar di blok dan konten lokal otomatis diberi `loading="lazy"` serta lebar/tinggi nyata agar tata letak tidak melompat. Gambar slide pertama carousel dimuat segera dan di-preload. | Diukur |
| Berat gambar | Kompres foto sebelum unggah (misalnya 80% kualitas); batasi lebar maksimal 2000 piksel. | Aturan WordPress |
| Logo situs | Tampil di footer (bukan di header). Gunakan PNG/SVG transparan, tinggi sekitar 150 px. | Diukur |
| Teks alternatif | Isi untuk gambar penting (aksesibilitas dan SEO). | Aturan WordPress |

---

## 5. Kinerja

### Yang sudah dilakukan tema (tidak perlu diulang plugin)

- **CSS kritis inline**: gaya layar pertama dicetak di dalam halaman (42 sampai 58 KB sesuai jenis halaman), dan stylesheet penuh dimuat tanpa memblokir tampilan (dengan cadangan `<noscript>`). Saat stylesheet penuh diblokir, layar pertama tetap bergaya. [Diukur]
- **CSS dan JS terkompres** (`style.min.css`, `script.min.js`) dan **JavaScript tema dimulai setelah ada interaksi pengunjung** (gerak mouse, sentuhan, gulir, tombol) untuk menjaga muat awal ringan. [Dari kode, diukur]
- **Gambar WebP, lazy-load, dan ukuran tetap** (bagian 4). [Diukur]
- **Versi berkas dari waktu ubah**: perubahan CSS/JS langsung terbaca browser tanpa menghapus cache. [Diukur]
- **AdSense dimuat malas** (setelah gulir, sentuh, gerak mouse, tombol, atau 5 detik). [Diukur]

### Angka di situs uji (tanpa kompresi, lokal)

| Halaman | Permintaan | Dokumen | CSS | JS | Gambar | Font |
|---|---|---|---|---|---|---|
| Beranda (desktop) | 46 | 188 KB | 335 KB | 313 KB | 69 KB | 30 KB |
| Beranda (mobile) | 44 | 188 KB | 335 KB | 313 KB | 81 KB | 30 KB |
| Pos (desktop) | 42 | 180 KB | 335 KB | 320 KB | 25 KB | 38 KB |

Dokumen HTML sudah memuat CSS kritis inline, sehingga angkanya tinggi tanpa kompresi; dengan gzip ukuran transfer jauh lebih kecil. Angka JS/CSS juga mencakup berkas yang dimuat plugin aktif di situs uji (WooCommerce, Contact Form 7). [Diukur]

### Plugin cache dan optimasi: pakai dengan hati-hati

- **Cache halaman penuh** (misalnya plugin cache atau cache di server) sangat dianjurkan untuk situs tanpa komentar real-time. Pilihan pengunjung (mode gelap, skema warna, bookmark, bar yang ditutup, pop-up) disimpan di browser, jadi aman di-cache. [Dari kode]
- **Penghitung tayangan berjalan di PHP saat halaman dibuat.** Dengan cache halaman penuh, kunjungan yang dilayani dari cache **tidak dihitung**, sehingga urutan "Rank popular posts by: Views" tidak mencerminkan lalu lintas sebenarnya. Pilihan: ubah urutan menjadi **Comments** atau **Recent**, atau gunakan layanan statistik lain. [Dari kode; tidak diuji dengan plugin cache]
- **Mode Coming Soon/Maintenance** mengirim status 503. Pastikan plugin cache **tidak menyimpan** halaman itu, dan kosongkan cache saat mematikan mode tersebut. [Dari kode; tidak diuji dengan plugin cache]
- **Matikan fitur "optimasi/minify/gabung CSS", "CSS kritis otomatis", dan "tunda JavaScript"** di plugin cache atau optimasi. Tema sudah mengatur CSS dan JS-nya sendiri; menimpa urutan pemuatan dapat membuat layar pertama berkedip atau fitur interaktif terlambat. Bagian "minify HTML" dan kompresi aman. [Dari kode; tidak diuji dengan plugin tertentu]
- **Cache objek** (Redis/Memcached) membantu situs dengan WooCommerce atau banyak komentar. [Aturan WordPress]
- Setelah mengubah **Customizer**, kosongkan cache halaman. [Aturan WordPress]

### Font

- Bawaan tema memuat **Google Sans Text** (reguler dan tebal) dan **Google Sans Mono** dari `fonts.gstatic.com` (Google), dengan `font-display: swap`. Bila Anda mengisi **Body font** atau **Heading font** di Customizer, ditambah font dari `fonts.googleapis.com`. [Diukur]
- Untuk kinerja dan privasi terbaik: pakai satu atau dua keluarga font saja, atau unggah font ke server sendiri lewat child theme (tema tidak menyediakan opsi unggah font). [Dari kode]

---

## 6. Privasi, cookie, dan layanan luar

Ringkasan hasil pengukuran pada pengaturan bawaan:

| Hal | Hasil | Label |
|---|---|---|
| Cookie dari tema | **Tidak ada.** Tema hanya memakai penyimpanan lokal browser (`WPLUS_UI_STORAGE`, `WPLUS_UI_LAZY`) untuk pilihan mode/warna, bookmark, dan penanda "sudah ditutup". Pop-up CTA memakai `puCtaSeen`. | Diukur |
| Layanan luar saat halaman dibuka | `fonts.gstatic.com` (font bawaan tema), `secure.gravatar.com` (avatar). | Diukur |
| Layanan luar bersyarat | `cdnjs.cloudflare.com` (highlight.js) hanya pada pos yang memuat blok kode; `fonts.googleapis.com` bila Body/Heading font diisi; `googlesyndication.com` bila AdSense dipasang; `youtube.com`/`img.youtube.com` setelah blok Lazy YouTube dimuat atau diklik; `disqus.com` bila Disqus dipakai; `wa.me` hanya saat tombol WhatsApp diklik. | Diukur / Dari kode |
| Banner persetujuan cookie | **Tema tidak menyediakan.** | Diukur |
| WooCommerce | Menambahkan cookie atribusi pesanan (`sbjs_*`) pada semua halaman bila aktif. Dapat dimatikan di WooCommerce > Pengaturan > Lanjutan > Fitur ("Order attribution"). | Diukur (cookie), Aturan WordPress (lokasi pengaturan) |
| Formulir komentar | WordPress menyimpan cookie nama/surel pengomentar bila mereka mencentang kotak persetujuan. | Aturan WordPress |

**Saran untuk situs yang melayani pengunjung di Indonesia atau Uni Eropa:**

1. Nilai apakah pemakaian Google Fonts dan Gravatar perlu persetujuan atau pengungkapan di kebijakan privasi Anda (UU PDP, GDPR). Alternatifnya matikan avatar dan sajikan font dari server sendiri melalui child theme. [Aturan hukum umum; bukan nasihat hukum]
2. Bila memasang AdSense atau Disqus, pasang **platform persetujuan (CMP)** dari penyedia tersebut; keduanya menyetel cookie pihak ketiga. Tema tidak mengatur persetujuan untuk Anda. [Aturan WordPress; tidak diuji dengan akun nyata]
3. Cantumkan layanan luar yang Anda pakai di halaman Kebijakan Privasi.
4. Konten yang Anda tempel sendiri (blok Custom HTML, embed, skrip) dapat memuat layanan luar tambahan di luar kendali tema; periksa dengan tab Network di browser sebelum tayang. [Diukur: halaman contoh yang berisi skrip HTML memanggil cdn.jsdelivr.net]


---

## 7. SEO

- **Tema mencetak sendiri** deskripsi meta, Open Graph, `twitter:card`, dan data terstruktur (Organization, WebSite dengan SearchAction, BreadcrumbList, Article, dan FAQPage dari grup accordion). Bila Anda memasang plugin SEO (Yoast, Rank Math, AIOSEO, SEOPress, The SEO Framework), tema berhenti mencetaknya agar tidak dobel. [Diukur]
- **Pilih satu**: pakai bawaan tema (cukup untuk blog sederhana) atau plugin SEO (untuk judul/deskripsi kustom per pos, sitemap tambahan, pengalihan). [Dari kode]
- **Deskripsi pos**: isi **Kutipan** (excerpt). Tanpa kutipan, deskripsi diambil dari 30 kata pertama isi (tanpa shortcode). Beranda memakai slogan; kategori memakai deskripsi kategori (isi deskripsi kategori Anda). [Diukur]
- **Gambar berbagi**: gambar unggulan pos; bila tidak ada, logo situs; bila tidak ada, tanpa gambar. [Diukur]
- **Sitemap**: WordPress menyediakan sitemap bawaan. Pada tautan polos alamatnya `/?sitemap=index` (diuji); pada tautan "Nama pos" alamatnya `/wp-sitemap.xml` (aturan WordPress, tidak diuji di sini). Daftarkan di Google Search Console. [Diukur / Aturan WordPress]
- **Struktur judul**: satu H1 per halaman (tema memakai judul pos); gunakan H2 dan H3 secara berurutan di isi, karena daftar isi otomatis dan FAQ bergantung pada heading dan blok accordion. [Dari kode]
- **Halaman 404, pencarian, dan arsip tanggal/penulis** tidak mendapat data terstruktur; itu disengaja. [Diukur]
- Kategori punya banner dan deskripsi: isi deskripsi dan gambar banner untuk kategori penting. [Diukur]

---

## 8. Keamanan dan pemeliharaan

- **Perbarui** inti WordPress, tema, dan plugin; aktifkan pembaruan otomatis untuk rilis keamanan. [Aturan WordPress]
- **Child theme** untuk semua perubahan sendiri: pengaturan Customizer induk disalin ke child saat aktivasi pertama (nilai yang sudah ada di child tetap), sehingga pembaruan tema induk tidak menghapus perubahan Anda. [Diukur]
- **Kode head/footer** (WPlus UI: Advanced code) hanya disimpan utuh bila penggunanya berhak memakai HTML mentah (`unfiltered_html`); pengguna lain disaring. Jangan beri peran Administrator ke orang yang tidak perlu. [Diukur]
- **Konten demo** menimpa pengaturan Customizer saat "Selesaikan demo" dijalankan. Jangan jalankan di situs yang sudah diatur; hapus pos, halaman, dan menu demo sebelum tayang. [Diukur]
- **Cadangan**: cadangan harian database dan folder `wp-content/uploads`, simpan di tempat terpisah, dan uji pemulihan sesekali. [Aturan WordPress]
- **Login**: kata sandi kuat, batasi percobaan masuk, aktifkan autentikasi dua langkah untuk administrator. [Aturan WordPress]
- **Matikan penyuntingan berkas** dari dashboard (`DISALLOW_FILE_EDIT`) dan jangan menyalakan `WP_DEBUG` di situs produksi. [Aturan WordPress]
- **Plugin**: pasang seperlunya, dari sumber tepercaya, dan hapus yang tidak dipakai. [Aturan WordPress]
- **Komentar spam**: Akismet atau setara; moderasi komentar pertama. [Aturan WordPress]
- **Staging**: uji pembaruan tema/plugin di salinan situs dulu bila situs penting. [Aturan WordPress]

---

## 9. Plugin

| Plugin | Status dengan WPlus UI | Catatan |
|---|---|---|
| **Contact Form 7** | **Diuji** (6.1.4): formulir dua kolom, pesan galat, pengiriman. | Gunakan pola "Contact page" atau `[wplusui_contact_form]`. CF7 terbaru butuh WordPress 7.1; pada WordPress 7.0.x pakai versi 6.1.x. Pengiriman surel butuh pengaturan SMTP di server Anda. |
| **WooCommerce** | **Diuji** (11.2.1): toko, produk, keranjang, checkout, akun; terang dan gelap. | Saat toko baru dibuat, WooCommerce memakai mode "Coming soon" bawaannya (ubah di WooCommerce > Pengaturan > Situs). Bila tidak butuh cookie atribusi, matikan "Order attribution". |
| **Polylang** | **Diuji** (3.8.11) untuk empat teks Customizer. | Tetapkan menu **untuk tiap bahasa**; tanpa itu menu kiri memuat daftar halaman cadangan. |
| **WPML** | **Tidak diuji** (berbayar); hanya filter terjemahannya yang diperiksa. | `wpml-config.xml` mencakup tema induk dan child. |
| **Akismet** | Tidak diuji khusus; mengikuti komentar bawaan WordPress. | Disarankan. |
| **Yoast / Rank Math / AIOSEO / SEOPress / SEO Framework** | Terdeteksi lewat konstanta plugin; tema berhenti mencetak meta dan skema (diuji lewat simulasi konstanta Yoast). | Pilih salah satu. |
| **Plugin cache dan optimasi** | **Tidak diuji.** | Lihat peringatan di bagian 5. |
| **Pembuat halaman (page builder)** | **Tidak diuji.** | Tema memakai blok bawaan WordPress dan gaya sendiri; konten page builder mungkin tidak mengikuti gaya komponen tema. |
| **Plugin tema lain / dan banyak plugin tampilan** | Tidak diuji. | Hindari dua plugin yang mengatur hal yang sama (dua plugin SEO, dua plugin cache). |

---

## 10. Bahasa dan terjemahan

- Tema menyertakan berkas `languages/wplus-ui.pot` (499 teks) tetapi **tidak menyertakan terjemahan siap pakai**. Bila bahasa situs diatur ke Bahasa Indonesia, teks milik WordPress (tanggal, formulir komentar) berbahasa Indonesia, sedangkan teks tema seperti "Popular Posts", "Related Posts", "Post a Comment", dan "Load more posts" **tetap berbahasa Inggris**. [Diukur]
- Untuk menerjemahkan teks tema: buat berkas `.po/.mo` bahasa Indonesia dari `.pot` (misalnya dengan editor terjemahan seperti Poedit atau plugin terjemahan) dan letakkan di `languages/` tema atau `wp-content/languages/themes/`. Untuk child theme, nama berkas mengikuti domain `wplus-ui`. [Aturan WordPress; tidak diuji]
- **Teks yang Anda tulis sendiri di Customizer** (teks notifikasi, judul Popular Posts dan Related posts, label tombol, teks Coming Soon) cukup diketik dalam bahasa Anda; tidak perlu berkas terjemahan. [Diukur]
- Situs multibahasa: Polylang (teruji, lihat bagian 9) atau WPML. Tema **tidak mendukung bahasa kanan-ke-kiri (RTL)**. [Dari kode]

---

## 11. Resep per jenis situs

### Blog atau majalah

- Pengaturan > Membaca: halaman depan = pos terbaru, 6 pos per halaman.
- WPlus UI: Homepage: carousel dari pos berlabel `featured`, Pinned Post untuk satu pos andalan, seksi kategori untuk 2 sampai 3 kategori utama.
- WPlus UI: Posts and comments: nyalakan daftar isi, related posts (6), author box bila banyak penulis.
- WPlus UI: Sidebar: Popular Posts urut **Comments** atau **Recent** bila memakai cache halaman penuh.
- Berbagi: tiga tombol cepat sesuai audiens (WhatsApp, Facebook, X atau Telegram).

### Situs dokumentasi atau panduan

- Gunakan komponen bawaan tema: Alert, Steps, Accordion, Tabs, Code (dengan label berkas), dan blok daftar isi.
- Tambahkan FAQ dengan grup Accordion untuk mendapatkan data terstruktur FAQPage.
- Matikan carousel bila tidak perlu; tampilkan kategori utama sebagai seksi di beranda dan Quick Links di bawah header.
- Pakai tab kode untuk contoh dalam beberapa bahasa pemrograman.

### Toko kecil

- Pasang WooCommerce; periksa tampilan toko, produk, keranjang, checkout, dan akun di ponsel.
- Nyalakan tombol WhatsApp dan bar bawah mobile; letakkan tautan penting di Quick Links.
- Gunakan pop-up CTA untuk promosi, dengan jeda 5 detik atau lebih agar tidak mengganggu.
- Pastikan kebijakan privasi mencakup cookie WooCommerce dan penyedia pembayaran.

### Situs promosi sebelum peluncuran

- WPlus UI: Engagement: mode **Coming Soon**, isi judul, teks, tanggal peluncuran, tautan sosial, dan tombol kontak.
- Atur zona waktu situs; aktifkan **auto-open** agar situs terbuka sendiri saat hitungan habis.
- Pastikan plugin cache tidak menyimpan halaman 503 itu.

---

## 12. Ceklis sebelum situs dibuka untuk umum

Kerjakan berurutan; setiap butir bisa diperiksa dari browser di jendela pribadi.

- [ ] WPlus UI: Ads: **Show ad placeholders** dimatikan (kotak putus-putus "Ads go here" tidak boleh terlihat).
- [ ] WPlus UI: Engagement: **Coming Soon / Maintenance** dimatikan (situs tidak lagi menampilkan satu halaman 503).
- [ ] Konten demo dihapus (pos, halaman, menu, dan gambar demo), dan **Tampilan > WPlus UI Demo** tidak dijalankan lagi.
- [ ] Pengaturan > Membaca: **Cegah mesin pencari** tidak dicentang.
- [ ] Tautan Permanen "Nama pos" tersimpan; buka satu pos, satu kategori, satu halaman, dan halaman 404.
- [ ] Judul, slogan, ikon situs, logo, tautan sosial, teks About, dan hak cipta footer sudah diisi (bukan teks bawaan).
- [ ] Menu utama dan Quick Links berisi tautan nyata (bukan "#"). Footer: empat kolom atau widget terisi.
- [ ] Setiap pos penting punya gambar unggulan 16:9 dan kutipan.
- [ ] Halaman Kebijakan Privasi ada dan menyebut layanan luar yang dipakai.
- [ ] Halaman Contact berfungsi: kirim satu pesan uji dan pastikan surel diterima.
- [ ] Iklan AdSense (bila ada): ID penerbit benar, `ads.txt` ada di akar situs, pemuatan malas menyala, dan persetujuan cookie tersedia.
- [ ] Kode analitik atau verifikasi ditempel di **WPlus UI: Advanced code** (bukan di berkas tema).
- [ ] Buka di ponsel dan desktop: mode terang dan gelap, menu, pencarian, komentar, bookmark, berbagi, daftar isi.
- [ ] Cadangan pertama sudah dibuat; pembaruan otomatis keamanan aktif; plugin yang tidak dipakai dihapus.
- [ ] Cache dikosongkan setelah semua pengaturan terakhir.

---

## 13. Yang belum teruji

Supaya Anda tahu batasnya:

- Iklan AdSense yang **benar-benar terisi** (butuh akun yang disetujui) dan utas **Disqus** nyata.
- **WPML** (berbayar).
- **Plugin cache dan optimasi** tertentu, serta **page builder**: saran di dokumen ini berasal dari cara kerja kode tema, bukan dari uji dengan plugin itu.
- **Tautan permanen "Nama pos"** dan **berkas `robots.txt`/`/wp-sitemap.xml`**: server uji tidak memproses penulisan ulang alamat, sehingga hanya tautan polos yang diuji.
- Kinerja di **jaringan nyata dan server produksi**: angka di bagian 5 diukur secara lokal tanpa kompresi.
- Terjemahan Bahasa Indonesia untuk teks tema (belum ada berkas terjemahan).
