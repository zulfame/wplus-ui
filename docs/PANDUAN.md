# Panduan memakai WPlus UI untuk WordPress

Panduan ini berisi langkah demi langkah untuk memakai semua fitur tema. Isinya disusun menurut **tugas** ("saya ingin ..."), bukan menurut berkas kode.
Untuk daftar lengkap fitur beserta bawaan dan berkas kodenya, lihat [FITUR.md](FITUR.md) (ID seperti `A01` merujuk ke sana). Saran pengaturan WordPress
agar hasilnya optimal ada di [KONFIGURASI.md](KONFIGURASI.md).

Semua langkah di sini sudah diuji di tampilan desktop (1280x720) dan ponsel (390 piksel); hasilnya di [CEKLIS.md](CEKLIS.md). Contact Form 7, WooCommerce, dan Polylang sudah diuji dengan plugin aslinya. Yang masih **diuji sebagian** karena butuh akun atau plugin berbayar
(AdSense yang disetujui, Disqus, WPML) ditandai di tempatnya.

Cara membaca:

- **Customizer** = **Tampilan > Sesuaikan**. Nama bagian dan opsi ditulis seperti tampil di layar (bahasa Inggris), misalnya `WPlus UI: Footer > Copyright text`.
- Setelah mengubah pengaturan di Customizer, tekan **Terbitkan** agar tersimpan.
- Kata **pengunjung** dipakai untuk orang yang membuka situs Anda. Beberapa pilihan pengunjung (mode gelap, skema warna, bookmark, bar yang ditutup) **disimpan di browser mereka**
  dan menang atas pengaturan Anda; lihat bagian [Yang diingat browser pengunjung](#yang-diingat-browser-pengunjung).

---

## Daftar isi

1. [Persyaratan dan pemasangan](#1-persyaratan-dan-pemasangan)
2. [Pengaturan awal (urutan yang disarankan)](#2-pengaturan-awal-urutan-yang-disarankan)
3. [Tampilan umum](#3-tampilan-umum)
4. [Menu](#4-menu)
5. [Beranda](#5-beranda)
6. [Menulis pos dan halaman](#6-menulis-pos-dan-halaman)
7. [Komponen konten (blok, pola, shortcode)](#7-komponen-konten-blok-pola-shortcode)
8. [Halaman pos: daftar isi, berbagi, komentar, related](#8-halaman-pos-daftar-isi-berbagi-komentar-related)
9. [Sidebar](#9-sidebar)
10. [Footer](#10-footer)
11. [Iklan dan AdSense](#11-iklan-dan-adsense)
12. [Engagement: WhatsApp, pop-up, Coming Soon](#12-engagement-whatsapp-pop-up-coming-soon)
13. [Halaman khusus: arsip, pencarian, 404, kontak](#13-halaman-khusus-arsip-pencarian-404-kontak)
14. [Kode kustom](#14-kode-kustom)
15. [Child theme, terjemahan, WooCommerce](#15-child-theme-terjemahan-woocommerce)
16. [Konten demo](#16-konten-demo)
17. [Yang diingat browser pengunjung](#yang-diingat-browser-pengunjung)
18. [Pemecahan masalah](#18-pemecahan-masalah)
19. [Referensi cepat: opsi dan ID fitur](#19-referensi-cepat-opsi-dan-id-fitur)
20. [Memperbarui tema](#20-memperbarui-tema)

---

## 1. Persyaratan dan pemasangan

**Persyaratan:** WordPress 6.3 atau lebih baru, PHP 7.4 atau lebih baru. Tema tidak mendukung bahasa yang ditulis dari kanan ke kiri (RTL).

**Memasang tema**

1. **Tampilan > Tema > Tambah Tema Baru > Unggah Tema**, pilih berkas `wplus-ui-<versi>.zip`, pasang, lalu **Aktifkan**.
2. Untuk membuat perubahan sendiri pada kode (CSS atau fungsi), pasang juga `wplus-ui-child-<versi>.zip` dan aktifkan **child theme** itu, bukan tema induk (lihat [bagian 15](#15-child-theme-terjemahan-woocommerce)).
3. Buka **Tampilan > Sesuaikan**. Bagian milik tema bernama **WPlus UI: ...** dan berurutan dari atas ke bawah halaman, tepat di bawah "Identitas Situs".

Tanpa pengaturan apa pun tema sudah tampil lengkap: header, menu kiri, daftar pos, footer, mode terang. Semua tambahan (iklan, WhatsApp, pop-up, Coming Soon) **mati** sampai Anda menyalakannya.

---

## 2. Pengaturan awal (urutan yang disarankan)

Kerjakan berurutan; tiap langkah kecil dan bisa dibatalkan.

| # | Langkah | Di mana |
|---|---|---|
| 1 | Isi **Judul Situs**, **Slogan**, **Ikon Situs**, dan **Logo** (logo tampil di footer, bukan di header). Slogan menjadi deskripsi beranda untuk mesin pencari dan teks About di footer. | Customizer > Identitas Situs |
| 2 | Tentukan jumlah pos per halaman (disarankan 6, sesuai grid 3 kolom). | Pengaturan > Membaca |
| 3 | Atur struktur tautan permanen ("Nama pos"). | Pengaturan > Tautan Permanen |
| 4 | Buat menu **Primary Menu** dan (opsional) **Quick Links**. | Tampilan > Menu ([bagian 4](#4-menu)) |
| 5 | Pilih mode awal, skema warna, dan font. | Customizer > WPlus UI: Look and feel |
| 6 | Tentukan carousel, Pinned Post, dan seksi kategori beranda. | Customizer > WPlus UI: Homepage |
| 7 | Isi teks About, tautan sosial, kolom, dan hak cipta footer. | Customizer > WPlus UI: Footer |
| 8 | Tulis pos pertama dengan gambar unggulan dan kutipan (excerpt). | Pos > Tambah Baru |
| 9 | Nyalakan hanya fitur tambahan yang Anda perlukan (iklan, WhatsApp, pop-up). | Customizer > WPlus UI: Ads / Engagement |
| 10 | Buka situs di ponsel dan di jendela lebar sebagai pengunjung (jendela pribadi) untuk memeriksa hasilnya. | Browser |

---

## 3. Tampilan umum

Semua di **Customizer > WPlus UI: Look and feel**.

**Mode terang, gelap, atau sistem (A01).** Opsi **Default light/dark mode** menentukan mode untuk pengunjung baru. "System" mengikuti pengaturan perangkat pengunjung.
Pengunjung bisa mengganti lewat ikon matahari/bulan di header; pilihan mereka tersimpan dan **menang**, jadi pengunjung lama tidak berubah setelah Anda mengganti pengaturan.

**Skema warna (A02, A03).**
- **Default accent color scheme** (angka 0 sampai 15): skema awal untuk pengunjung baru. Pengunjung memilih skema lain lewat panel Theme (16 lingkaran warna).
- **Accent color (light mode)** dan **(dark mode)**: warna sendiri untuk tautan, tombol, dan aksen. Terang dan gelap diatur terpisah; kosong berarti memakai skema.

**Sudut dan font (A04, A05).**
- **Button and link corner radius (px)**: 0 sampai 30.
- **Body font** dan **Heading font**: ketik nama font Google Fonts persis, misalnya `Inter` atau `Poppins`. Body untuk isi dan teks; Heading untuk judul pos, judul halaman, judul kartu, dan nama situs. Nama yang salah diabaikan. Font dimuat dari Google (pertimbangkan privasi dan kecepatan; lihat [KONFIGURASI.md](KONFIGURASI.md)).

**Box design (A06).** Menggambar kartu, daftar, tabel, kutipan, accordion, dan pop-up dalam kotak berborder dan bayangan. Nyalakan bila ingin tampilan yang lebih "berkotak".

**Bar notifikasi (A09).** Di **WPlus UI: Header and menus**: isi **Dismissible notification bar text**; tombol hanya tampil bila **label dan URL** keduanya diisi. Teks boleh memuat tautan HTML sederhana. Pengunjung yang menutup bar tidak melihatnya lagi di browser itu (lihat [Yang diingat browser pengunjung](#yang-diingat-browser-pengunjung)).

**Menu kiri dan bilah bawah mobile (A07, A08).** Di **WPlus UI: Header and menus**:
- **Left menu on desktop**: Collapsed (hanya ikon) atau Expanded (terbuka). Pengunjung bisa membuka atau menutup sendiri. Di ponsel menu selalu berupa laci.
- **Show the mobile bottom bar**: baris ikon di dasar layar ponsel/tablet (Home, Search, Menu, Appearance; di halaman pos tambahan Share dan Comments; di beranda tambahan Top). Mati secara bawaan.

**Yang otomatis:** sapaan di halaman pos menurut jam perangkat pengunjung (A11), kolom pencarian di header yang meminta minimal 3 huruf (A12), tombol bookmark di kartu dan pos (C07).

---

## 4. Menu

Tema punya enam lokasi menu (**Tampilan > Menu > Lokasi Menu**):

| Lokasi | Tampil di | Catatan |
|---|---|---|
| **Primary Menu (desktop + mobile drawer)** | Menu kiri (desktop) dan laci (ponsel) | Tanpa menu terpasang, daftar halaman dipakai. |
| **Under-header Quick Links** | Baris tautan geser di bawah header | Kosong berarti baris tidak tampil. Tautan halaman yang sedang dibuka diberi garis bawah. |
| **Footer Column: Product / Resources / Support / Company** | Empat kolom footer | Lihat [bagian 10](#10-footer). |

**Membuat menu utama**

1. **Tampilan > Menu > Buat menu baru**, beri nama, tambahkan halaman, kategori, atau tautan khusus, centang lokasi **Primary Menu**, simpan.
2. Menu bisa bertingkat (seret item sedikit ke kanan). Sub-menu membuka dan menutup dengan klik dan tetap bekerja tanpa JavaScript.
3. Item halaman yang sedang dibuka tampil berwarna aksen; induknya ikut aktif dan terbuka.

**Ikon item (E02).** Buka item (panah kecil) lalu pilih **WPlus UI icon**: 45 ikon, **Automatic** (ikon folder bawaan tema), atau **No icon**. Di Customizer (editor menu bawaan) tambahkan kelas CSS `ico-nama` (misalnya `ico-home`, `ico-mail`, `ico-none`).

**Opsi item (E03).** Di **WPlus UI menu options** pada item:

| Opsi | Hasil | Kelas CSS di Customizer |
|---|---|---|
| Divider line after this item | Garis pemisah setelah item | `br` |
| Notification dot | Titik notifikasi di ikon | `nt` |
| Sub-menu starts open | Sub-menu terbuka sejak awal | `open` |
| Flat "More..." group | Judul kecil, tanpa indentasi, selalu terbuka | `mr` |
| Badge: New atau Free | Lencana di sebelah judul | `new`, `free` |

**Pemisah cepat (E04).** Tambahkan **Tautan Khusus** berjudul `---` (tiga strip); hasilnya garis pemisah tanpa membuka opsi item.

**Menu panjang di rel ikon (E07).** Pada menu kiri yang menciut, sub-menu muncul di sisi dan tidak pernah keluar jendela; yang sangat panjang bisa digulir.

---

## 5. Beranda

Semua di **Customizer > WPlus UI: Homepage** (urut dari atas ke bawah halaman).

**Carousel (B01).**
- Nyalakan atau matikan dengan **Show the homepage carousel**.
- Tanpa slide kustom, carousel memakai 5 pos berlabel `featured`; bila tidak ada, 5 pos terbaru. Beri label `featured` pada pos yang ingin Anda tonjolkan (label ini tidak tampil di halaman pos).
- Slide kustom: pada **Carousel slide 1 sampai 5** isi **gambar** (wajib; slide tanpa gambar diabaikan), judul, dan tautan. Slide bergeser otomatis tiap 4 detik.

**Pinned Post (B02).** Jadikan satu pos **Sticky** (di editor pos: Ringkasan > Tempel di blog). Kotak Pinned Post tampil di desktop dengan gambar di kiri dan teks di kanan. **Tanpa pos sticky kotak tidak tampil.**

**Latest Posts (B03).** Grid kartu 3 kolom (desktop) dan 1 kolom (ponsel), dengan tombol **Load more posts**. Jumlah pos per halaman diatur di **Pengaturan > Membaca**.

**Seksi kategori (B04).** Isi **Homepage category sections** dengan slug kategori dipisah koma, misalnya `berita,tutorial`. Tiap kategori yang punya pos tampil sebagai seksi 6 pos dengan tautan "View all". Kosong berarti tidak ada seksi.

**Menyembunyikan kategori (B05).** **Hide categories from the home page**: slug atau ID dipisah koma. Hanya menyembunyikan dari grid Latest Posts; carousel, Pinned Post, dan seksi kategori tidak terpengaruh.

**Pos tanpa gambar unggulan (N01)** tetap tampil rapi: kartu, carousel, Pinned Post, dan Popular Posts memakai gambar pengganti berwarna aksen. Tetap disarankan memberi gambar unggulan.

---

## 6. Menulis pos dan halaman

**Pos baru.** Isi judul, konten, **gambar unggulan** (dipakai di kartu, carousel, Popular Posts, dan kartu berbagi media sosial), **kategori** (pos pertama dalam kategori menjadi breadcrumb), **tag**, dan **kutipan** (excerpt).
- Kutipan tampil di bawah judul dan dipakai sebagai deskripsi untuk mesin pencari. Tag HTML di dalamnya dibuang.
- Waktu baca dihitung otomatis (200 kata per menit).
- Pos dibagi beberapa halaman dengan blok **Page Break** (C09); pager muncul di bawah isi.

**Halaman statis (D01).** Memakai tata letak sederhana: breadcrumb, judul, isi; tanpa info penulis, sidebar, komentar, atau related posts. Tab daftar isi mengikuti pengaturan TOC.

**Gambar.** Gunakan blok Gambar dari Pustaka Media. JPEG dan PNG baru dibuatkan versi WebP otomatis (berkas aslinya tetap ada). Gambar yang ditempel sebagai alamat lokal otomatis diberi lazy-load dan ukuran.

---

## 7. Komponen konten (blok, pola, shortcode)

Tema menambah gaya pada blok bawaan dan lima blok sendiri. Gaya dipilih di panel **Gaya** (kanan editor) setelah memilih blok. Tampilan di editor sama dengan di situs.

| Yang diinginkan | Cara |
|---|---|
| Kotak catatan | Blok **Paragraph** > Gaya **Note** atau **Note: warning** (G01) |
| Paragraf menjorok atau rujukan | Paragraph > **First line indent** atau **Reference** |
| Kotak peringatan (info, sukses, peringatan, galat) | Blok **Group** > Gaya **Alert**, **Alert: info/success/warning/error** (dan versi (outline)) (G02). Baris pertama dalam kotak (cetak tebal) menjadi judulnya. |
| Daftar langkah bernomor | Blok **List** (berurut) > Gaya **Steps** (G03) |
| Tabel data | Blok **Table** > Gaya **Data table** |
| Kutipan | Blok **Quote** > **Highlighted** atau **With quote icon** (G04) |
| Accordion atau spoiler | Blok **Details** > **Accordion**, **Accordion (alternate)**, **Spoiler** (G05). Accordion juga menghasilkan data FAQ untuk mesin pencari (J02). |
| Kelompok accordion | Group > **Accordion group**, lalu taruh beberapa blok Details di dalamnya; tampil menyatu dalam satu kotak dengan garis pemisah (G02) |
| Tautan terkait | Group > **Related links** (judul tebal di baris pertama, lalu daftar tautan) |
| Galeri | Blok **Gallery** > **Image grid**, **Image grid with Show All**, **Scrolling images** (G06) |
| Tombol | Blok **Buttons** (isi dan **Outline**) (G13) |
| Tab | Blok **Tabs** (kategori **WPlus UI**) lalu tambah blok **Tab** di dalamnya; pilih Style **Tabs** atau **Code tabs** (isi dengan blok Code), dan opsi *sticky* (G07) |
| Kotak unduhan | Blok **Download box**: isi tipe (zip, pdf), nama berkas, ukuran, dan tautan (G08) |
| Daftar isi dalam konten | Blok **Table of contents**: judul dan "terbuka sejak awal" (G09) |
| Video YouTube ringan | Blok **Lazy YouTube**: isi ID video (bagian setelah `v=`); hanya gambar sampul dimuat sampai diklik (G10) |
| Contoh kode | Blok **Code**: isi **Code source label** (nama berkas) dan **Comment** di panel kanan; tandai bagian dengan format teks **Code mark** (kelas warna dan label). Pengunjung mendapat penyorotan sintaks dan tombol **Copy** (G11) |
| Konten bertab di editor klasik | Shortcode `[pu_tabs][pu_tab title="Satu"]Isi[/pu_tab][pu_tab title="Dua"]Isi[/pu_tab][/pu_tabs]`; maksimal 5 tab; bilah tab lengket kecuali `[pu_tabs sticky="false"]` (G14) |

**Pola siap pakai (G12).** Di editor, tombol **+** > tab **Pola** > kategori **WPlus UI**: Note, Warning note, Alerts, Steps, Accordion, Spoiler, Buttons, Quotes, Download box, Tabs, dan Contact page. Sisipkan lalu ganti teksnya.

Skrip di blok Custom HTML yang berbentuk `(function(PU, window, document){ ... })(PU, window, document)` otomatis menunggu runtime tema (K05).

---

## 8. Halaman pos: daftar isi, berbagi, komentar, related

Di **Customizer > WPlus UI: Posts and comments** dan **WPlus UI: Sharing**.

**Daftar isi (C02).** **Show the table of contents button on posts and pages**: tab kecil di tepi kanan layar yang membuka daftar isi dari semua heading di isi artikel (bertingkat sesuai levelnya). Mati berarti tab tidak dicetak.

**Berbagi (C03).** Di **WPlus UI: Sharing**:
- **Show share buttons on posts**: nyalakan atau matikan.
- **Quick button 1 sampai 3**: tiga tombol yang tampil langsung (bawaan Facebook, WhatsApp, X).
- **Popup: (jaringan)**: centang jaringan yang muncul di popup (8 pilihan: Facebook, WhatsApp, X / Twitter, Telegram, Pinterest, LinkedIn, Line, Email). Popup juga punya kolom salin tautan.

**Related posts (C04).** **Show related posts**, **Related posts title**, **Number of related posts** (1 sampai 12). Isinya pos dari kategori yang sama.

**Author box (C05).** **Show an author box under posts**: tampil avatar, nama, dan biografi. Biografi diisi di **Pengguna > Profil**.

**Komentar (C06).** Komentar bawaan WordPress tampil di panel yang dibuka tombol **Post a Comment**. Atur moderasi di **Pengaturan > Diskusi**. Untuk memakai Disqus, isi **Disqus shortname**; formulir bawaan digantikan utas Disqus yang dimuat saat panel dibuka **(diuji sebagian: dengan akun Disqus nyata belum diuji)**.

**Sidebar di pos (C11).** Diatur di bagian Sidebar ([bagian 9](#9-sidebar)).

**Tayangan (C08).** Setiap kunjungan pengunjung biasa menambah hitungan tayangan pos (bot, pratinjau, dan pengguna yang masuk tidak dihitung). Hitungan ini dipakai Popular Posts.

---

## 9. Sidebar

Di **Customizer > WPlus UI: Sidebar**:

- **Show sidebar on the home page**, **on single posts**, **on search results**: nyalakan sesuai kebutuhan. Arsip kategori dan halaman statis tidak punya sidebar. Di ponsel sidebar turun di bawah konten.
- **Show Popular Posts in the sidebar**, judulnya, jumlahnya, dan **Rank popular posts by**: Views (tayangan), Comments, atau Recent. Di halaman pos, pos yang sedang dibaca tidak ikut terdaftar.
- Widget tambahan: **Tampilan > Widget > Blog Sidebar** (tampil di bawah Popular Posts dan Labels).

---

## 10. Footer

Di **Customizer > WPlus UI: Footer**:

| Opsi | Fungsi |
|---|---|
| **About text under the site name** | Teks di bawah nama situs (bawaan: slogan situs). |
| **Column 1 sampai 4: menu** dan **title** | Pilih menu untuk tiap kolom dan ubah judulnya (bawaan Product, Resources, Support, Company). |
| **Copyright text** | Mengganti baris hak cipta; tulis `{year}` untuk tahun berjalan. Baris atribusi tema tetap ada. |
| URL tiap jaringan sosial (13 jaringan) | Hanya yang diisi yang tampil: di footer, laci menu, dan halaman Coming Soon. |

Kolom kosong tidak dicetak; di desktop kolom yang ada terisi dari kanan. Alternatif tanpa menu: taruh widget di **Tampilan > Widget > Footer Column 1 sampai 4** (dipakai bila kolom tidak diberi menu). Prioritas tiap kolom: menu pilihan di Customizer, lalu menu di lokasi **Footer Column**, lalu widget.

---

## 11. Iklan dan AdSense

Di **Customizer > WPlus UI: Ads** (semua kosong secara bawaan; slot kosong tidak mencetak apa pun).

**Langkah memasang AdSense (H04, H05)**

1. Isi **Google AdSense publisher ID** sekali: `pub-1234567890123456`, `ca-pub-...`, atau angkanya saja.
2. Biarkan **Load AdSense after the visitor scrolls or taps** menyala agar halaman tetap cepat (skrip dimuat setelah pengunjung menggulir, menyentuh, menggerakkan mouse, menekan tombol, atau setelah 5 detik). Matikan bila ingin dimuat langsung.
3. Isi slot yang diinginkan. Tiap slot menerima:
   - **Nomor unit saja** (misalnya `1234567890`): tema membuat unit AdSense responsif dengan ID penerbit di atas.
   - **Alamat gambar** (jpg, png, gif, webp, avif, svg): tampil sebagai iklan sendiri. Taruh **tautan di baris kedua** agar gambar bisa diklik (dibuka di tab baru, `rel="sponsored"`).
   - **Kode apa pun** (kode unit dari Google, jaringan lain, atau HTML): dicetak apa adanya. Bila kode itu sudah memuat `adsbygoogle.js`, tema tidak memuatnya dua kali.
4. Simpan dan periksa di jendela pribadi.

**Tempat slot (H01)**

| Slot | Muncul di |
|---|---|
| Under header | Semua halaman kecuali 404 |
| Above pinned post (home) | Beranda |
| Above posts (desktop only) | Beranda dan halaman pos, hanya desktop |
| Below posts (home and archives) | Beranda dan arsip |
| Sticky sidebar (desktop only) | Halaman bersidebar, hanya desktop |
| In-article ad | Di dalam pos, setelah paragraf ke-N (**Insert in-article ad after paragraph**, bawaan 3). Hanya paragraf tingkat atas yang dihitung; bila paragraf kurang dari N, iklan tidak dicetak. |

**Ukuran gambar dan slot kosong (H02).** Slot yang tidak diisi tidak tampil sama sekali, jadi isi hanya slot yang Anda mau. Di bawah kolom tiap slot tertulis ukuran gambar yang disarankan (bawah header 970 x 90; atas pinned post, atas dan bawah daftar pos 728 x 90; sidebar sticky 300 x 250). Untuk promosi sendiri cukup tempel tag gambar, mis. `<img src="https://alamat-gambar-anda/promo.jpg" width="728" height="90" alt="Promo">`, dibungkus `<a href="...">` bila perlu tautan; untuk mencoba tata letak pakai gambar contoh `https://placehold.co/728x90?text=728x90`. Gambar otomatis mengecil mengikuti lebar kolom. Mengosongkan kolom langsung menyembunyikan slot itu.

**Catatan:** iklan AdSense nyata baru tampil setelah akun Anda disetujui oleh Google **(diuji sebagian: pemuat dan markup sudah diuji, pengisian iklan oleh Google belum)**.

---

## 12. Engagement: WhatsApp, pop-up, Coming Soon

Di **Customizer > WPlus UI: Engagement**. Semuanya mati secara bawaan.

**Tombol WhatsApp melayang (I01).** Nyalakan **Show floating WhatsApp button**, isi **nomor** dengan kode negara (angka saja, simbol dibersihkan otomatis, mis. `6281234567890`), **pesan pembuka** (opsional), dan **sisi** (kanan atau kiri). Tanpa nomor tombol tidak tampil. Bila bilah bawah mobile menyala, tombol naik di atas bar.

**Pop-up ajakan (I02).** Nyalakan **Show call-to-action popup** dan isi **Popup title** (wajib), teks, label tombol dan tautan (tombol tampil bila keduanya diisi), **jeda (detik)**, serta gambar dan posisinya (di atas atau di samping teks). Pop-up ditutup dengan tanda silang, klik di luar kotak, atau Esc dan **tidak muncul lagi di browser itu**. Untuk menguji ulang, hapus data situs di browser atau pakai jendela pribadi.

**Pemberitahuan cookie (I04).**
1. Nyalakan **Show a cookie notice**. Teks, label tombol OK dan label tombol kebijakan bisa diganti (kosong memakai bawaan).
2. Tombol **Cookie Policy** mengarah ke **Cookie policy link**; bila kosong, ke halaman terbit dengan alamat `/cookie-policy`. Konten demo membawa halaman **Cookie Policy** contoh (ikut diimpor); ganti isinya dengan kebijakan yang sesuai situs Anda. Tanpa tautan dan tanpa halaman itu, tombolnya tidak tampil.
3. **Load ads and scripts only after OK** (bawaan nyala): pemuat AdSense dan tag `<script>` di **Advanced code** dan slot iklan menunggu pengunjung menekan OK. Tag meta (misalnya kode verifikasi) dan JSON-LD tetap tercetak langsung. Matikan saklar ini bila kode harus selalu jalan.
4. Pilihan pengunjung disimpan di browser mereka (tidak dikirim ke server). Halaman contoh punya tombol **Forget my choice** untuk menghapus pilihan.
5. Catatan hukum: ini pemberitahuan sederhana, bukan CMP bersertifikat. Untuk iklan Google bagi pengunjung EEA/UK/Swiss Google mewajibkan CMP bersertifikat; pakai plugin CMP bila situs Anda melayani wilayah itu.

**Coming Soon / Maintenance (I03).**
1. Pilih mode **Coming Soon** (situs belum dibuka) atau **Maintenance** (sedang diperbarui) di **Coming Soon / Maintenance page for visitors**.
2. Isi judul, teks, label, tanggal peluncuran, dan satuan hitung mundur (kosong memakai bawaan). Atur gambar latar, tombol, ikon sosial, dan **auto-open** (situs terbuka sendiri saat hitungan habis).
3. Pengunjung mendapat satu halaman dengan status HTTP 503 (mesin pencari paham bahwa ini sementara); **pengguna yang bisa mengedit pos tetap melihat situs biasa**. REST API dan feed tidak diblokir.
4. Untuk melihat halamannya sebagai admin, buka `alamat-situs/?wplusui-preview=1`.
5. **Matikan** (Off) saat situs siap dibuka.

---

## 13. Halaman khusus: arsip, pencarian, 404, kontak

**Arsip kategori dan tag (D02).** Banner kartu buram berisi nama, jumlah pos, dan deskripsi (isi deskripsi di **Pos > Kategori > ubah**). Untuk gambar banner: di layar ubah kategori atau tag, pada **Archive banner image (WPlus UI)** klik **Choose image** dan pilih dari Pustaka Media. Tanpa gambar dipakai gambar unggulan pos terbaru di kategori itu.

**Pencarian (D03).** Hasil tampil sebagai grid; sidebar mengikuti pengaturan Sidebar. Pencarian tanpa hasil menampilkan "No results found" dan Popular Posts.

**Halaman 404 (D04).** Otomatis, dengan tombol "Take me back" ke beranda.

**Halaman Contact (D05).**
1. Pasang dan aktifkan plugin **Contact Form 7**.
2. Buat halaman baru, sisipkan pola **Contact page (Contact Form 7)** (Pola > WPlus UI), atau tulis shortcode `[wplusui_contact_form]` (memakai formulir pertama) atau `[wplusui_contact_form id="123"]`.
3. Bentuk formulir yang disarankan: nama dan email berdampingan (`<div class="cf-grid">`), lalu subjek, pesan, tombol. Tema menata semua field, tombol, dan pesan galat. Formulir contoh bawaan Contact Form 7 yang belum Anda ubah otomatis diganti dengan bentuk ini saat halaman Contact dibuat lewat **WPlus UI Demo**; formulir yang sudah Anda ubah tidak disentuh.
4. Tanpa plugin pengunjung tidak melihat formulir; admin melihat petunjuk untuk memasang plugin.

---

## 14. Kode kustom

**Customizer > WPlus UI: Advanced code**: **Code before </head>** dan **Code before </body>** untuk kode analitik, verifikasi situs, dan sejenisnya. Hanya untuk pengguna yang boleh memakai HTML mentah; kode tidak dicetak di pratinjau Customizer. Bagian ini bukan tempat CSS biasa; untuk CSS tambahan pakai child theme atau **Tampilan > Sesuaikan > CSS Tambahan**.

---

## 15. Child theme, terjemahan, WooCommerce

**Child theme (L04).** Aktifkan **WPlus UI Child**. Pada aktivasi pertama, semua pengaturan Customizer induk disalin (menu dan widget ikut), jadi situs terlihat sama. Tulis CSS atau fungsi sendiri di child theme agar tidak hilang saat tema induk diperbarui.

**Terjemahan (L05, L02).** Teks tema siap diterjemahkan (domain `wplus-ui`, berkas `languages/wplus-ui.pot`). Empat teks bebas dari Customizer (teks dan tombol notifikasi, judul Popular Posts, judul Related posts) bisa diterjemahkan dengan Polylang (**Languages > Translations**, grup "WPlus UI") atau WPML **(Polylang sudah diuji dengan plugin asli; WPML belum, karena berbayar)**. Dengan Polylang, tetapkan menu untuk **tiap bahasa** di **Tampilan > Menu**; tanpa itu menu kiri memuat daftar halaman cadangan.

**WooCommerce (L01).** Bila WooCommerce aktif, toko, produk, keranjang, checkout, dan akun memakai tata letak, kartu, tombol, field, dan warna tema (terang dan gelap). Saat toko baru dibuat WooCommerce memakai mode "Coming soon" bawaannya; ubah di **WooCommerce > Pengaturan > Situs** agar toko tampil untuk pengunjung.

---

## 16. Konten demo

Konten demo berisi 19 pos, 2 halaman, menu, dan gambar, untuk melihat semua komponen bekerja. Konten ini **tidak ikut di zip tema** (supaya unduhan tema kecil); diunduh sekali dari panel.

0. **Tampilan > WPlus UI Demo > Download demo content**. Tema mengunduh paket demo dari rilis terbaru, memeriksa checksum, dan membukanya ke `wp-content/uploads/wplus-ui-demo/`.
1. **Perkakas > Impor > WordPress** (pasang WordPress Importer bila diminta); pilih berkas `wplus-ui-demo-content.xml` (tautan unduhnya ada di halaman WPlus UI Demo). **Jangan** centang "Unduh dan impor lampiran berkas".
2. Buka **Tampilan > WPlus UI Demo** dan tekan **Finish demo setup**.

**Peringatan:** langkah 2 **menimpa pengaturan Customizer** dengan nilai demo (menu, widget, carousel, dan lain-lain). Jalankan hanya di situs baru atau situs uji, jangan di situs yang sudah Anda atur. Menjalankannya berulang kali aman (tidak menggandakan konten).

---

## Yang diingat browser pengunjung

Pilihan berikut disimpan di browser pengunjung (bukan di server) dan menang atas pengaturan Anda untuk orang itu:

| Pilihan | Efeknya bagi Anda |
|---|---|
| Mode terang/gelap/sistem dan skema warna | Mengubah "Default light/dark mode" atau skema bawaan hanya memengaruhi pengunjung baru. |
| Bookmark | Daftar bacaan tersimpan per browser; tidak ada di server. |
| Bar notifikasi yang ditutup | Tidak muncul lagi di browser itu walau teksnya Anda ganti. |
| Pop-up ajakan yang ditutup | Tidak muncul lagi di browser itu (`puCtaSeen`). |

Saat menguji, pakai **jendela pribadi** agar selalu seperti pengunjung baru.

---

## 18. Pemecahan masalah

| Gejala | Penyebab biasa | Yang dilakukan |
|---|---|---|
| Perubahan mode atau warna tidak terlihat di browser saya | Pilihan pengunjung (tersimpan di browser) menang atas pengaturan | Buka di jendela pribadi atau ubah pilihan lewat ikon matahari/bulan dan panel Theme. |
| Bar notifikasi atau pop-up tidak muncul | Sudah pernah ditutup di browser itu; pop-up butuh judul; tombol butuh label **dan** URL | Jendela pribadi; periksa isian. |
| Kotak Pinned Post tidak tampil | Belum ada pos Sticky | Jadikan satu pos Sticky. |
| Carousel menampilkan pos yang tidak saya inginkan | Tanpa slide kustom dipakai pos berlabel `featured`, lalu pos terbaru | Beri label `featured` atau isi slide kustom. |
| Popular Posts kosong atau hanya satu | Pos baru belum punya tayangan, atau hanya ada satu pos | Biarkan pengunjung membuka pos; pilih urutan Recent. |
| Seksi kategori tidak muncul | Slug salah atau kategori tanpa pos; hanya di halaman 1 beranda | Periksa slug di **Pos > Kategori**. |
| Tombol WhatsApp tidak tampil | Nomor kosong | Isi nomor. |
| Iklan AdSense tidak tampil | ID penerbit kosong atau akun belum disetujui; slot hanya angka butuh ID penerbit; pemuatan malas menunggu gulir | Isi ID, gulir halaman, periksa persetujuan di akun AdSense. |
| Iklan dalam artikel tidak tampil | Pos kurang dari N paragraf tingkat atas | Perkecil N. |
| Daftar isi kosong | Artikel tidak punya heading | Tambahkan heading (H2, H3, dan seterusnya) di isi artikel. |
| Formulir kontak tidak tampil | Contact Form 7 belum aktif atau belum ada formulir | Aktifkan plugin dan buat formulir. |
| Halaman pos menampilkan 404 setelah mengganti tautan permanen | Aturan tautan belum diperbarui | **Pengaturan > Tautan Permanen > Simpan**. |
| Situs menampilkan "Coming Soon" padahal saya sudah masuk | Akun tanpa hak mengedit pos, atau mode masih menyala | Matikan mode; admin dan editor selalu melihat situs. |
| Gambar banner arsip tidak berubah | Belum menyimpan kategori | Simpan kategori setelah memilih gambar. |

---

## 19. Referensi cepat: opsi dan ID fitur

| Bagian Customizer | Isi | ID fitur |
|---|---|---|
| WPlus UI: Look and feel | Mode, skema, warna aksen, sudut, box design, font | A01 sampai A06 |
| WPlus UI: Header and menus | Bar notifikasi, menu kiri, bilah bawah mobile | A07 sampai A09 |
| WPlus UI: Homepage | Carousel, Pinned Post, seksi dan penyembunyian kategori | B01 sampai B05 |
| WPlus UI: Posts and comments | Daftar isi, author box, related, Disqus | C02, C04 sampai C06 |
| WPlus UI: Sidebar | Sidebar per halaman, Popular Posts | B06, B07, C11, D03 |
| WPlus UI: Sharing | Tombol cepat dan popup | C03 |
| WPlus UI: Footer | About, kolom, hak cipta, sosial | F01 sampai F06 |
| WPlus UI: Ads | AdSense, slot, placeholder | H01, H02, H04, H05, C10 |
| WPlus UI: Engagement | WhatsApp, pop-up, Coming Soon | I01 sampai I03 |
| WPlus UI: Advanced code | Kode head dan footer | H03 |
| Di luar Customizer | Menu (E01 sampai E08), widget (F07), blok dan pola (G01 sampai G15), banner arsip (D02), halaman kontak (D05), demo (M01, M02) | lihat [FITUR.md](FITUR.md) |

---

## 20. Memperbarui tema

**Dari panel WordPress (O01).** Mulai versi 1.7.1 tema memeriksa rilis terbaru di GitHub. Bila ada versi baru, muncul pemberitahuan di **Tampilan > Tema** dan **Dasbor > Pembaruan**, lengkap dengan tombol perbarui; pembaruan otomatis tema juga bisa dinyalakan di sana. Tautan **View version details** membuka catatan rilis.
1. Buka **Tampilan > WPlus UI Update** untuk melihat versi terpasang dan terbaru, catatan rilis, dan tombol **Check now** (tanpa menunggu pengecekan berikutnya dari WordPress).
2. Tekan **Update now**. WordPress mengunduh zip dari rilis resmi repositori, mencocokkannya dengan checksum yang dipublikasikan GitHub (dibatalkan bila tidak cocok), lalu mengganti folder tema. Pengaturan Customizer, menu, dan widget tetap utuh.
3. Tema anak tidak diperbarui lewat cara ini; bila ada versi baru tema anak, pasang zip-nya dari halaman rilis.
4. Privasi: hanya alamat IP situs dan versi tema yang terlihat oleh GitHub; tidak ada data pengunjung. Untuk mematikan, tambahkan `define( 'WPLUSUI_DISABLE_UPDATES', true );` di `wp-config.php` (atau pakai filter `wplusui_updates_enabled`).

**Situs yang masih memakai 1.7.0** tidak punya pemeriksa ini: unggah zip 1.7.1 sekali lewat **Tampilan > Tema > Tambah Baru > Unggah Tema** dan pilih "Ganti tema aktif dengan yang diunggah". Setelah itu semua pembaruan lewat panel.

