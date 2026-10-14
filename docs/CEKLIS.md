# Ceklis pengujian silang

Setiap fitur di [FITUR.md](FITUR.md) baru boleh dicentang bila **empat bukti terpenuhi**:

1. **Dokumen**: yang tertulis di FITUR.md cocok dengan kenyataan (nama opsi, bawaan, perilaku).
2. **Kode**: berkas dan fungsi yang disebut benar ada dan melakukan yang didokumentasikan.
3. **Desktop**: diuji di tampilan **1280x720**.
4. **Mobile**: diuji di tampilan **390 px** (ponsel).

Satu kolom kosong berarti belum terbukti, jadi baris itu **tidak boleh dicentang**. Kolom **Bukti** mencatat apa yang diukur atau dilihat, dan bug yang ditemukan beserta perbaikannya.

Legenda: `☐` belum, `☑` terpenuhi, `✖` gagal (lihat bukti).

Jumlah fitur: **91**. Status per batch ada di bagian bawah.


## A. Tampilan umum

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| A01 | Mode terang / gelap / sistem | ☑ | ☑ | ☑ | ☑ | ☑ | Mode bawaan light/dark/system diuji dengan profil baru: light=lgT bg (253,252,255), dark=drK bg (30,30,30), system mengikuti OS ke dua arah. Pilihan pengunjung (Dark lalu System) tersimpan setelah muat ulang. `batch2-a1.mjs` |
| A02 | 16 skema warna | ☑ | ☑ | ☑ | ☑ | ☑ | Skema 0/5/15 menghasilkan kelas cs0/cs5/cs15 dan warna #1976d2/#d21b59/#ac494c; 16 tombol di panel; pilihan skema 7 bertahan setelah muat ulang. `batch2-a2.mjs` |
| A03 | Warna aksen kustom | ☑ | ☑ | ☑ | ☑ | ☑ | Aksen terang #e91e63 dan gelap #ff9800 terpakai pada `--linkB` dan pada `.button` asli (rgb 233,30,99); skema pilihan pengunjung menang. `batch2-a2/a3.mjs` |
| A04 | Sudut tombol dan tautan | ☑ | ☑ | ☑ | ☑ | ☑ | Radius 0, 20, kosong menghasilkan `--linkR` 0px, 20px, 6px dan `.button` 20px, 6px. `batch2-a2/a3.mjs` |
| A05 | Font Google | ☑ | ☑ | ☑ | ☑ | ☑ | **Bug:** font judul tidak berlaku pada judul pos/halaman (`.pTtl.itm` memakai font isi). **Diperbaiki** di `inc/appearance.php`. Sesudahnya h1, h2, judul kartu, dan nama situs = Merriweather, isi = Lora di 4 jenis halaman, desktop dan mobile; nama tidak valid tidak memuat font dan tidak masuk HTML. |
| A06 | Box design | ☑ | ☑ | ☑ | ☑ | ☑ | bD ke bX; kartu border 0 ke 1px, radius 0 ke 5px; tanpa overflow. `batch2-a4.mjs` |
| A07 | Menu kiri desktop: tertutup atau terbuka | ☑ | ☑ | ☑ | ☑ | ☑ | Collapsed 75 px dan Expanded 230 px di desktop, tombol membalik keduanya; di mobile laci di x=-390 lalu 0 saat dibuka. `batch2-a4.mjs` |
| A08 | Bilah bawah mobile | ☑ | ☑ | ☑ | ☑ | ☑ | Mati: tidak tercetak. Nyala: display none di desktop, block di mobile menempel dasar layar (jarak 0) dengan 5 ikon (Home, Search, Menu, Share, Comments pada pos). `batch2-a4.mjs` **Audit ulang:** ikon Comments pada bar menunjuk `#comments` yang tidak ada, jadi ketukan tidak membuka komentar (bug, diperbaiki ke `#comment`); item per halaman diverifikasi (beranda: Mode+Top; pos: Share+Comments; halaman, arsip, pencarian: Mode; 404 tanpa bar), Search memfokuskan kolom, Menu membuka laci, Top menggulir ke atas, Appearance mengganti mode. `audit-g1.mjs`, `audit-a8.mjs` |
| A09 | Bar notifikasi | ☑ | ☑ | ☑ | ☑ | ☑ | Teks saja: tanpa tombol; label tanpa URL: tanpa tombol; label dan URL: tombol; ditutup: tinggi 0 dan tetap tertutup setelah muat ulang; teks kosong: tidak tercetak. `batch2-a5.mjs` **Audit ulang:** tombol menuju URL yang diisi. `audit-b1.mjs` |
| A10 | Logo, judul, slogan, ikon situs | ☑ | ☑ | ☑ | ☑ | ☑ | Judul, slogan, dan judul tab benar; header hanya teks; footer memakai logo (kelas `custom-logo`) atau gambar bawaan tema; ikon situs menghasilkan 3 tautan ikon, tanpa ikon ada ikon cadangan. `batch2-a6.mjs` |
| A11 | Sapaan di halaman pos | ☑ | ☑ | ☑ | ☑ | ☑ | Enam rentang jam diuji (2, 8, 14, 18, 20, 23) dan teks sesuai kode; terlihat di desktop dan mobile. `batch2-a7.mjs` |
| A12 | Pencarian di header | ☑ | ☑ | ☑ | ☑ | ☑ | Kolom min 3 huruf ("ge" ditolak); "getting" menuju `/?s=getting`, judul "Search results for: getting", 1 hasil; di mobile ikon membuka kolom; tanpa overflow. `batch2-a7.mjs` |

## B. Beranda

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| B01 | Carousel | ☑ | ☑ | ☑ | ☑ | ☑ | 5 slide dari pos `featured`; bergeser otomatis (slide 0 ke 1 setelah ±5,6 detik); slide kustom (gambar wajib, judul/tautan opsional, tanpa gambar diabaikan); off menghilangkan; preload hanya saat tampil; tanpa `featured` memakai 5 pos terbaru. `batch2-b1/b2.mjs` **Audit ulang:** tombol Next, Previous, dan titik bekerja serta berputar (4 ke 0 dan 0 ke 4); klik pointer pada area Next berpindah slide; hover menghentikan geser otomatis. `audit-b2.mjs` |
| B02 | Pinned Post | ☑ | ☑ | ☑ | ☑ | ☑ | Sticky [26] tampil (desktop berdampingan 830 px, mobile bertumpuk 350 px); off dan tanpa sticky: tidak tampil (**dokumen dikoreksi**, sebelumnya menyebut cadangan); dua sticky: satu yang tampil. `batch2-b3.mjs` |
| B03 | Latest Posts dan paginasi | ☑ | ☑ | ☑ | ☑ | ☑ | 6 kartu, 3 kolom desktop dan 1 kolom mobile; Load more 6 ke 12; 3 pos per halaman: 3 kartu; `?paged=99`: 404; tanpa JavaScript: Newest/Home/Oldest dan halaman 2 berisi 6 kartu (**dokumen dikoreksi**). `batch2-b4/b7.mjs` |
| B04 | Seksi kategori di beranda | ☑ | ☑ | ☑ | ☑ | ☑ | `documentation,product`: 2 seksi (6 dan 1 kartu) dengan "View all"; spasi dan slug tak dikenal dilewati; kosong: tidak ada; halaman 2: tidak ada. `batch2-b5.mjs` |
| B05 | Sembunyikan kategori dari beranda | ☑ | ☑ | ☑ | ☑ | ☑ | Slug dan ID sama-sama berfungsi; kartu kategori itu hilang dari grid (tersisa 4) tetapi seksi kategori tetap tampil (**dokumen diperjelas**). `batch2-b5.mjs` |
| B06 | Sidebar beranda | ☑ | ☑ | ☑ | ☑ | ☑ | Nyala: sidebar 300 px di samping (main 830); mati: tidak ada sidebar dan main 780; mobile: sidebar di bawah, mati: hilang; tanpa overflow. `batch2-b6.mjs` |
| B07 | Popular Posts di sidebar | ☑ | ☑ | ☑ | ☑ | ☑ | Bawaan 5 pos; judul kustom dan jumlah 3 berlaku; mati: kotak hilang; urutan views (30,29,33 lalu pos terbanyak dilihat), comments (34,35), recent (terbaru dulu) terbukti; di halaman pos tidak memuat pos yang dibaca dan kembali menampilkannya bila itu satu-satunya (Batch sebelumnya). `batch2-b6.mjs` |

## C. Halaman pos

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| C01 | Tata letak pos | ☑ | ☑ | ☑ | ☑ | ☑ | Pos demo: breadcrumb Home/Documentation, judul, kutipan (HTML dibuang), avatar+penulis, terbit/diperbarui, estimasi baca (200 kata/menit), tag (tag `featured` disembunyikan); tanpa scroll horizontal di 1280 dan 390. `batch3-c1.mjs`, `batch3-c4.mjs` |
| C02 | Daftar isi (TOC) | ☑ | ☑ | ☑ | ☑ | ☑ | Tab di tepi kanan (x=1235 desktop, x=345 mobile) membuka panel dengan 36 tautan bertingkat; dimatikan: panel dan tab hilang; label Customizer dikoreksi "posts and pages". Halaman statis sebelumnya selalu mencetak TOC: diperbaiki. `batch3-c2/c3/probe4` **Audit ulang:** memilih entri menggulir ke heading tetapi panel tetap terbuka menutupi heading; kini panel menutup setelah memilih entri. `audit-b1.mjs` |
| C03 | Berbagi | ☑ | ☑ | ☑ | ☑ | ☑ | 3 tombol cepat + popup 8 jaringan (Facebook, WhatsApp, X, Telegram, Pinterest, LinkedIn, Line, Email) di desktop dan mobile. `batch3-c2.mjs` **Audit ulang:** URL tiap tombol memuat alamat pos terkode (dan judul untuk X); popup tertutup oleh tanda silang dan klik luar; tombol salin mengisi clipboard dengan alamat pos; Quick button diganti dan satu diset None tampil sesuai; popup subset 5 jaringan; berbagi dimatikan menghilangkan semua (termasuk ikon di bar mobile). `audit-c1.mjs` |
| C04 | Related posts | ☑ | ☑ | ☑ | ☑ | ☑ | Judul kustom dan jumlah 3 berlaku; semua related berbagi kategori dengan pos aktif dan bukan pos itu sendiri. `batch3-c2.mjs`, `batch3-c4.mjs` **Audit ulang:** dimatikan menghilangkan kotak; tautan kartu terkait membuka pos tujuan. `audit-c1.mjs`, `audit-b1.mjs` |
| C05 | Author box | ☑ | ☑ | ☑ | ☑ | ☑ | Kotak penulis dengan nama, bio, label "Written by"; lebar 780 desktop / 350 mobile. `batch3-c2.mjs` |
| C06 | Komentar | ☑ | ☑ | ☑ | ☑ | ☐ | **Diuji sebagian.** Bawaan: panel terbuka, 5 field, komentar uji terkirim dan tampil di desktop dan mobile. Disqus: shortname memuat `embed.js` dan utas dari server Disqus saat panel dibuka; akun Disqus nyata tidak ada, jadi tampil di utas belum teruji. Catatan: `id="comment"` ganda (pembungkus warisan template asli dan textarea) dicatat di BACKLOG. `batch3-c6.mjs` |
| C07 | Bookmark | ☑ | ☑ | ☑ | ☑ | ☑ | Tombol menyimpan pos; badge 1 di header; di halaman lain panel Bookmark Posts memuat pos tersimpan (gambar, judul, kategori, tombol hapus); tersimpan di `WPLUS_UI_STORAGE`. `batch3-c5.mjs` **Audit ulang:** menekan tombol lagi menghapus bookmark (badge dan penyimpanan turun); tombol hapus di panel menghapus item dan memperbarui badge. `audit-c1.mjs`, `audit-c2.mjs` |
| C08 | Penghitung tayangan | ☑ | ☑ | ☑ | ☑ | ☑ | Pengunjung biasa +1; user agent bot (Googlebot) tidak menambah. `batch3-c4.mjs` **Audit ulang:** pengguna masuk dan pratinjau tidak dihitung, pengunjung biasa +1. `audit-c1.mjs` |
| C09 | Pos beberapa halaman | ☑ | ☑ | ☑ | ☑ | ☑ | Pos 3 halaman: halaman 1 hanya "Satu" dengan pager "Page 1 of N" dan tautan ke halaman berikutnya (`?page=2`). `batch3-c2.mjs`, probe **Audit ulang:** tautan halaman berikutnya membuka halaman 2 berisi "Halaman dua", pager "Page 2 of 3". `audit-c1.mjs` |
| C10 | Iklan dalam artikel | ☑ | ☑ | ☑ | ☑ | ☑ | Bug diperbaiki: sebelumnya menghitung `</p>` di dalam grup/kutipan sehingga iklan bisa terselip di dalam blok. Kini hanya paragraf tingkat atas: setelah paragraf 2 (hasil `DIV,P,BLOCKQUOTE,P,AD,P`), N terlalu besar: tidak dicetak. `batch3-c4.mjs` |
| C11 | Sidebar pos | ☑ | ☑ | ☑ | ☑ | ☑ | Hidup: sidebar 300px desktop, 350px di bawah artikel di mobile, kelas body `hsSb`; mati: tak ada sidebar, kelas hilang. `batch3-c4.mjs` |

## D. Halaman, arsip, pencarian, 404, kontak

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| D01 | Halaman statis | ☑ | ☑ | ☑ | ☑ | ☑ | Halaman About: breadcrumb "Home / judul", tanpa byline/komentar/related/sidebar; TOC ikut pengaturan. `batch3-d1.mjs` |
| D02 | Arsip kategori/tag | ☑ | ☑ | ☑ | ☑ | ☑ | Bug diperbaiki: (1) gambar banner tidak punya antarmuka, kini ada di layar ubah kategori dan tag (Pustaka Media, tersimpan, tampil di arsip; diuji lewat browser di 1280 dan 390); (2) cadangan gambar untuk tag memakai kueri kategori yang salah, kini memakai taksonomi term. `batch3-d2.mjs` |
| D03 | Hasil pencarian | ☑ | ☑ | ☑ | ☑ | ☑ | Judul "Search results for: …", grid kartu; sidebar mengikuti pengaturan (hidup/mati); hasil kosong menampilkan "No results found" dan Popular Posts. `batch3-d1.mjs`, `batch3-d3.mjs` |
| D04 | Halaman 404 | ☑ | ☑ | ☑ | ☑ | ☑ | Kelas `error404`, "404 Something Wrong!", tombol ke beranda; tanpa scroll horizontal. Catatan: alamat jelek `/nama-tak-ada/` di server uji PHP bawaan memuat beranda (bukan galat tema); dipakai `/?p=999999`. `batch3-d3.mjs` |
| D05 | Halaman Contact (Contact Form 7) | ☑ | ☑ | ☑ | ☑ | ☑ | Diuji ulang dengan **Contact Form 7 6.1.4 asli** (CF7 terbaru butuh WordPress 7.1, dipakai versi 6.1.4): formulir dua kolom di 1280 (nama 382px + email 382px) dan satu kolom di 390; validasi menampilkan pesan galat; pengiriman valid menghasilkan "Thank you for your message" (surel dilewati dengan plugin uji sementara). **Dua bug nyata ditemukan dan diperbaiki**: (1) pesan galat per field menggeser tombol saat field kehilangan fokus sehingga klik pertama pada tombol gagal; kini pesan melayang di luar alur tata letak; (2) formulir contoh bawaan CF7 (dibuat saat plugin diaktifkan) tidak pernah memakai tata letak tema; kini diganti selama belum diubah pemilik. `audit-cf7.mjs` |

## E. Menu

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| E01 | Menu utama (sidebar kiri / laci) | ☑ | ☑ | ☑ | ☑ | ☑ | Menu uji (Primary): ikon, anak menu, kotak centang dropdown bisa dibuka/ditutup; tanpa JavaScript tetap membuka (tinggi sub-menu 0 lalu 120px); laci mobile dan menu desktop terbuka tidak berantakan. `batch4-e1.mjs`, `batch4-e1b.mjs` |
| E02 | Ikon item menu | ☑ | ☑ | ☑ | ☑ | ☑ | Perpustakaan 45 ikon (47 opsi dengan Automatic dan No icon); ikon dari pilihan item (home) dan "none" (tanpa svg); simpan lewat Tampilan > Menu: ikon `mail` dan `none` tersimpan di desktop dan mobile. `batch4-e1.mjs`, `batch4-e4.mjs` |
| E03 | Opsi item menu | ☑ | ☑ | ☑ | ☑ | ☑ | Divider(`br`), dot(`nt`), open (kotak centang terbuka), group (`mr`, terbuka), badge New dan kelas `open` dari Customizer; dari formulir admin: flags dan badge tersimpan. Bug kecil: opsi tersimpan ganda ("dot,dot"), diperbaiki dengan `array_unique`. `batch4-e1.mjs`, `batch4-e2.mjs`, `batch4-e4.mjs` |
| E04 | Pemisah `---` | ☑ | ☑ | ☑ | ☑ | ☑ | Custom Link `---` menjadi `<li class="br" role="separator">` tanpa tautan. `batch4-e1.mjs` |
| E05 | Item menu aktif | ☑ | ☑ | ☑ | ☑ | ☑ | Item halaman terbuka diberi `active`, induknya `active` dan terbuka (checked). `batch4-e1.mjs` |
| E06 | Tautan cepat | ☑ | ☑ | ☑ | ☑ | ☑ | Menu Quick Links tampil di bawah header dengan item aktif berwarna dan bergaris bawah (desktop dan mobile, geser horizontal); lokasi dikosongkan: baris hilang. `batch4-e2.mjs` |
| E07 | Flyout menu kiri | ☑ | ☑ | ☑ | ☑ | ☑ | Rel menciut 1280x720: flyout item dengan 16 anak berada di y 70-712 (dalam jendela); jendela 1280x420: dibatasi 68-412 dan bisa digulir. `batch4-e2.mjs`, `batch4-e3.mjs` |
| E08 | Menu cadangan | ☑ | ☑ | ☑ | ☑ | ☑ | Primary tanpa menu: daftar halaman (About, Contact, Laman Contoh) di desktop dan mobile. `batch4-e1.mjs` |

## F. Footer

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| F01 | Teks about | ☑ | ☑ | ☑ | ☑ | ☑ | Teks kustom tampil; tanpa pengaturan memakai tagline situs. `batch4-f1.mjs` |
| F02 | Empat kolom tautan | ☑ | ☑ | ☑ | ☑ | ☑ | Menu 1 (Quick Links) dan 3 (Primary) tampil sebagai kolom bertautan (10 dan 7 tautan); empat kolom bermenu; kolom widget saat tanpa menu; mobile tanpa scroll horizontal. `batch4-f1.mjs` **Audit ulang:** kolom tanpa menu pilihan memakai menu lokasi Footer Column. `audit-g1.mjs` |
| F03 | Judul kolom | ☑ | ☑ | ☑ | ☑ | ☑ | Judul kustom "Tautan" untuk kolom 1; bawaan Resources/Support/Company; kolom widget memakai judul widget. `batch4-f1.mjs` |
| F04 | Kolom terisi dari kanan | ☑ | ☑ | ☑ | ☑ | ☑ | Dua kolom: x=905 dan 1092 (kanan); satu kolom: x=1092; empat kolom: 529-1255; mobile dua per baris dari kiri. `batch4-f1.mjs` |
| F05 | Teks hak cipta | ☑ | ☑ | ☑ | ☑ | ☑ | `{year}` menjadi tahun berjalan ("© 2026 Uji Bersama"); kosong: © tahun, nama situs, All rights reserved; baris atribusi tetap. `batch4-f1.mjs` |
| F06 | Tautan sosial | ☑ | ☑ | ☑ | ☑ | ☑ | 13 jaringan: 13 tautan footer dengan 13 ikon berbeda, 13 di laci menu; hanya yang diisi tampil; Coming Soon menampilkan yang diisi; tanpa scroll horizontal di 390. `batch4-f1.mjs`, `batch4-f2.mjs`, `batch4-f3.mjs` |
| F07 | Area widget footer dan sidebar | ☑ | ☑ | ☑ | ☑ | ☑ | Lima area terdaftar (Footer Column 1-4, Blog Sidebar); widget sidebar muncul di bawah Popular Posts dan Labels. `batch4-f1.mjs`, `batch4-f2.mjs` |

## G. Editor blok dan komponen konten

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| G01 | Gaya blok paragraf | ☑ | ☑ | ☑ | ☑ | ☑ | 4 gaya terdaftar dan terpasang (kelas `note`, `note wr`, `pIndent`, `pRef`) di front end; di editor kelas yang sama. `batch5-g1.mjs`, `batch5-g3.mjs` |
| G02 | Gaya blok grup (Alert) | ☑ | ☑ | ☑ | ☑ | ☑ | 10 alert + Accordion group + Related links terdaftar; kelas `alert [jenis] [outline]` benar dan tampil dengan warna/ikon sesuai di 1280 dan 390 (tangkapan layar diperiksa). `batch5-g1.mjs` |
| G03 | Gaya daftar dan tabel | ☑ | ☑ | ☑ | ☑ | ☑ | Steps (bulat bernomor) dan Data table tampil rapi, tidak melebihi lebar di 390. `batch5-g1.mjs` |
| G04 | Gaya kutipan | ☑ | ☑ | ☑ | ☑ | ☑ | Highlighted (garis biru) dan With quote icon (tanda kutip) dengan sitasi. `batch5-g1.mjs` |
| G05 | Gaya Details | ☑ | ☑ | ☑ | ☑ | ☑ | Accordion, Accordion alternate (ikon plus), Spoiler (Show all) terbuka saat diklik. `batch5-g1.mjs`, `batch5-g2.mjs` **Audit ulang:** Spoiler terbuka dan label berganti "Show all"/"Hide all". `audit-g1.mjs` |
| G06 | Gaya galeri | ☑ | ☑ | ☑ | ☑ | ☑ | Gambar besar: grid dua kolom (384px desktop, 169px mobile), grid Show All (3 gambar + tombol, sisa tersembunyi), scroll mendatar. Gambar sangat kecil tidak memenuhi kolom (bukan bug tema). `batch5-g1.mjs` **Audit ulang:** tombol Show All menampilkan semua gambar (4 menjadi 7). `audit-g1.mjs` |
| G07 | Blok Tabs dan Tab | ☑ | ☑ | ☑ | ☑ | ☑ | Tabs bawaan dan code: berpindah tab menampilkan panel yang benar (desktop dan mobile); sticky memberi kelas `stick`. `batch5-g1.mjs`, `batch5-g2.mjs`, `batch5-g4.mjs` **Audit ulang:** bilah tab sticky benar-benar `position: sticky` (top 60px desktop, 55px mobile). `audit-g1.mjs` |
| G08 | Blok Download box | ☑ | ☑ | ☑ | ☑ | ☑ | Kotak: tipe pdf, nama laporan.pdf, ukuran 1MB, tautan dan tombol unduh; tampil rapi di 390. `batch5-g1.mjs` |
| G09 | Blok Table of contents | ☑ | ☑ | ☑ | ☑ | ☑ | Blok menghasilkan `details.toc` yang diisi dari heading (1 tautan pada uji). `batch5-g1.mjs` **Audit ulang:** blok daftar isi bisa dibuka/ditutup dan memuat entri heading. `audit-g1.mjs` |
| G10 | Blok Lazy YouTube | ☑ | ☑ | ☑ | ☑ | ☑ | Hanya sampul dimuat saat dibuka; klik memuat iframe dan permintaan ke YouTube. `batch5-g2.mjs` |
| G11 | Blok kode | ☑ | ☑ | ☑ | ☑ | ☑ | Label sumber (app.js) dan komentar di header, `<mark class="block purple" data-before>` berlabel dan berwarna, tombol Copy, nomor baris; tanpa luapan di 390. `batch5-g2.mjs`, `batch5-g4.mjs` **Audit ulang:** tombol Copy mengisi clipboard dengan isi kode. `audit-b1.mjs` |
| G12 | Pola blok | ☑ | ☑ | ☑ | ☑ | ☑ | 11 pola terdaftar dalam kategori WPlus UI dan semuanya menghasilkan blok. `batch5-g2.mjs` **Audit ulang:** semua 11 pola lolos dirender oleh mesin blok tanpa peringatan dan berisi teks. `audit-g1.mjs` |
| G13 | Tombol | ☑ | ☑ | ☑ | ☑ | ☑ | Tombol isi (`button`) dan Outline (`button ln`). `batch5-g1.mjs` |
| G14 | Shortcode tab | ☑ | ☑ | ☑ | ☑ | ☑ | Shortcode: 7 tab dipotong jadi 5; `sticky="false"` tanpa kelas `stick`; bawaan lengket. `batch5-g1.mjs`, `batch5-g4.mjs` |
| G15 | Pratinjau di editor | ☑ | ☑ | ☑ | ☑ | ☑ | Editor blok (admin): kategori WPlus UI dengan 5 blok; semua gaya tampil di panel Gaya; di kanvas editor grup alert diberi kelas `alert info` dan latar biru, catatan bergaya, spoiler; dicek 1280 dan 390. `batch5-g3.mjs` |

## H. Iklan dan kode kustom

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| H01 | Slot iklan | ☑ | ☑ | ☑ | ☑ | ☑ | Enam slot diuji di beranda, pos, arsip, halaman, pencarian, 404 pada 1280 dan 390: tempat sesuai tabel di FITUR.md; "desktop only" tersembunyi di mobile. `batch6-h1.mjs` |
| H02 | Placeholder iklan | ☑ | ☑ | ☑ | ☑ | ☑ | Aktif: 5 placeholder di desktop, 3 di mobile; mati: 0. `batch6-h1.mjs` |
| H03 | Kode header dan footer | ☑ | ☑ | ☑ | ☑ | ☑ | Kode head dan footer tercetak (meta di head, elemen dan skrip sebelum penutup body). `batch6-h1.mjs` |
| H04 | ID penerbit AdSense | ☑ | ☑ | ☑ | ☑ | ☐ | **Diuji sebagian.** Teruji: pemuat dan pemuatan malas, mode langsung, tanpa duplikasi, ID tidak valid (`ads-adsense.mjs`). Belum teruji: iklan nyata tampil dari akun AdSense yang disetujui. |
| H05 | Isi slot fleksibel | ☑ | ☑ | ☑ | ☑ | ☐ | **Diuji sebagian.** Teruji: nomor unit menjadi `ins.adsbygoogle`, gambar, gambar bertautan, HTML, iklan dalam artikel (`ads-adsense.mjs`). Belum teruji: pengisian iklan oleh Google. |

## I. Engagement

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| I01 | Tombol WhatsApp melayang | ☑ | ☑ | ☑ | ☑ | ☑ | Tanpa nomor: tidak tampil; nomor dengan simbol dibersihkan (628123456789) dan pesan di-URL-encode; kanan x=1212 dan kiri x=16 di 1280, tidak menimpa tombol gulir; bug diperbaiki: tertutup bar bawah mobile, kini naik ke y=668. `batch6-i1.mjs`, `batch6-i1b.mjs` |
| I02 | Pop-up ajakan (CTA) | ☑ | ☑ | ☑ | ☑ | ☑ | Tanpa judul: tidak ada; jeda 2 detik; ditutup X, klik luar, Esc; tidak muncul lagi setelah muat ulang; gambar atas dan samping (760px di desktop; 350px di mobile) tanpa luapan. `batch6-i1.mjs` |
| I03 | Halaman Coming Soon / Maintenance | ☑ | ☑ | ☑ | ☑ | ☑ | Off 200; Coming Soon dan Maintenance 503 dengan Retry-After; REST dan feed tidak diblokir; staf melihat situs, `?wplusui-preview=1` menampilkan halaman; hitung mundur benar dan berdetak; teks, satuan, tombol, sosial bisa diganti; tanggal lewat: situs terbuka otomatis atau pesan "live". `batch6-i3.mjs` |
| I04 | Pemberitahuan cookie | ☑ | ☑ | ☑ | ☑ | ☑ | Mati bawaan; kartu tampil sekali, OK menyimpan pilihan; skrip dan AdSense menunggu OK; halaman demo dan tombol reset; ponsel di atas bilah bawah. `trace-cookie.mjs` |

## J. SEO dan data terstruktur

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| J01 | Meta, Open Graph, Twitter card | ☑ | ☑ | ☑ | ☑ | ☑ | Beranda, pos, halaman, kategori, pencarian, 404 diperiksa; plugin SEO aktif (simulasi konstanta WPSEO_VERSION): 0 tag; bug diperbaiki: og:url pencarian/penulis/tanggal berisi alamat beranda. `batch6-j1.mjs` |
| J02 | JSON-LD | ☑ | ☑ | ☑ | ☑ | ☑ | Beranda Organization+WebSite; pos Organization+BreadcrumbList+Article(+FAQPage bila ada accordion); halaman Breadcrumb; tidak ada di arsip; plugin SEO aktif: 0. `batch6-j1.mjs` |
| J03 | Ikon cadangan | ☑ | ☑ | ☑ | ☑ | ☑ | Tanpa ikon situs: ikon cadangan di semua halaman; dengan ikon situs tidak dicetak. `batch6-j1.mjs` |
| J04 | Preload gambar LCP | ☑ | ☑ | ☑ | ☑ | ☑ | Preload gambar slide pertama hanya di beranda halaman 1 (tidak di pos, halaman 2). `batch6-j1.mjs` |

## K. Kinerja

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| K01 | CSS kritis inline | ☑ | ☑ | ☑ | ☑ | ☑ | Set beranda/pos/halaman/arsip/pencarian, desain biasa dan box: gaya inline 42-58 KB, stylesheet penuh `preload` + onload + `<noscript>`; dengan stylesheet penuh diblokir, layar pertama tetap bergaya (header 60px/55px, latar benar); setelah dimuat jadi `stylesheet`. `batch7-k1.mjs` |
| K02 | CSS dan JS terkompres | ☑ | ☑ | ☑ | ☑ | ☑ | Normal: `style.min.css` dan `script.min.js`; `SCRIPT_DEBUG` aktif: `style.css` dan `script.js`. `batch7-k1.mjs` |
| K03 | Sub-ukuran WebP | ☑ | ☑ | ☑ | ☑ | ☑ | JPEG 1600x900 diunggah: berkas utama dan semua sub-ukuran berformat WebP, JPEG asli tetap ada, `srcset` memakai `.webp`. Koreksi dokumen: ukuran penuh juga WebP. `batch7-k1.mjs` |
| K04 | Gambar lazy dan berukuran | ☑ | ☑ | ☑ | ☑ | ☑ | Gambar lokal dalam blok HTML dan blok Gambar: `loading=lazy`, lebar dan tinggi nyata (1600x900) di desktop dan mobile. `batch7-k1.mjs` |
| K05 | Skrip konten menunggu runtime | ☑ | ☑ | ☑ | ☑ | ☑ | Skrip berbentuk `(function(PU, window, document){…})(PU, window, document)` berjalan setelah runtime (`PU` objek, `currentScript` ada). Dokumen dikoreksi: berlaku untuk bentuk ini saja. `batch7-k1.mjs` |

## L. Kompatibilitas

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| L01 | WooCommerce | ☑ | ☑ | ☑ | ☑ | ☑ | Diuji dengan **WooCommerce 11.2.1 asli**: toko, produk (diskon, gambar, tab, produk terkait), keranjang, checkout, akun di 1280 dan 390, mode terang dan gelap. **Bug nyata**: tampilan awal berantakan (kartu produk menyempit jadi 81px di mobile, tombol, kolom jumlah, urutan, tab, dan field tanpa gaya tema). CSS ditulis ulang total (kartu seperti grid pos, tombol dan field tema, notifikasi, tab, paginasi, akun, blok keranjang dan checkout) dan diperiksa lewat tangkapan layar. `audit-woo.mjs` |
| L02 | Polylang dan WPML | ☑ | ☑ | ☑ | ☑ | ☐ | **Polylang 3.8.11 asli teruji**: empat teks muncul di Languages > Translations (grup "WPlus UI"), terjemahan disimpan dan halaman `?lang=id` menampilkan teks Indonesia sedangkan `?lang=en` teks asli. Catatan pengamatan: dengan Polylang aktif, lokasi menu harus ditetapkan per bahasa (tanpa itu menu kiri hanya memuat daftar halaman cadangan). **WPML belum teruji** (plugin berbayar, tidak tersedia); API-nya hanya diuji dengan fungsi tiruan. `audit-polylang.mjs`, `batch7-l1.mjs` |
| L03 | Contact Form 7 | ☑ | ☑ | ☑ | ☑ | ☑ | Lihat D05 (diuji dengan plugin asli). |
| L04 | Child theme | ☑ | ☑ | ☑ | ☑ | ☑ | Aktivasi child lalu satu permintaan halaman: 14 pengaturan tersalin (tidak ada yang hilang), lokasi menu primary/quicklinks ikut, widget 3 di sidebar, stylesheet induk + child dimuat; dikembalikan ke induk tanpa jejak. `batch7-l1.mjs` |
| L05 | Siap terjemahan | ☑ | ☑ | ☑ | ☑ | ☑ | 499 entri di `.pot`, tidak ada teks tema yang belum terdaftar (4 teks banner kategori ditambahkan). `batch7-l1.mjs` |

## M. Demo

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| M01 | Konten demo | ☑ | ☑ | ☑ | ☑ | ☑ | XML dibaca parser WordPress Importer: 19 pos, 1 halaman, 25 item menu, 10 kategori, 1 tag; 23 gambar. `batch7-m1.mjs` |
| M02 | Selesaikan demo | ☑ | ☑ | ☑ | ☑ | ☑ | Dijalankan dua kali: jumlah pos (20), halaman, lampiran (19), menu (2, 25 item), sticky, dan gambar unggulan (19) tidak berubah; hasil kedua sama dengan pertama; uji visual 11 halaman sama dengan baseline. Dokumen diberi peringatan: menimpa pengaturan Customizer. `batch7-m1.mjs` |

## N. Placeholder dan media

| ID | Fitur | Dokumen | Kode | Desktop 1280x720 | Mobile 390 | Dicentang | Bukti |
|---|---|---|---|---|---|---|---|
| N01 | Placeholder thumbnail | ☑ | ☑ | ☑ | ☑ | ☑ | Kartu beranda/arsip, carousel, kotak pinned dan Popular Posts: gambar pengganti dengan empat variasi, ikon gambar, mode terang dan gelap sesuai warna aksen (1280 dan 390). `batch7-n1.mjs`, `batch7-n2.mjs`, `batch7-n3.mjs` |
| N02 | Tanggal singkat di kartu | ☑ | ☑ | ☑ | ☑ | ☑ | Kartu menampilkan "Okt 13, 2026" (bentuk singkat). `batch7-n1.mjs` |
| O01 | Pembaruan tema dari panel WordPress | ☑ | ☑ | ☑ | ☑ | ☑ | Server GitHub palsu: versi baru/sama/lama, draft, rilis tak layak, cache 12 jam, kegagalan, dimatikan, checksum benar/salah, catatan aman, jendela catatan, halaman pembaruan, pemberitahuan di Tema; pembaruan sungguhan (Theme_Upgrader) di WordPress terpisah, pengaturan utuh; checksum salah menghentikan pembaruan. `trace-update.mjs` |

## Status batch

| Batch | Cakupan | Status |
|---|---|---|
| 1 | Inventaris fitur dan FITUR.md | selesai |
| 2 | Grup A dan B (tampilan umum, beranda) | **selesai**: 19 fitur dicentang; 1 bug diperbaiki, 4 koreksi dokumen |
| 3 | Grup C dan D (pos, halaman, arsip, pencarian, 404, kontak) | **selesai**: 14 fitur dicentang, 2 diuji sebagian (C06 Disqus, D05 Contact Form 7 asli); 4 bug diperbaiki |
| 4 | Grup E dan F (menu, footer) | **selesai**: 15 fitur dicentang; 1 bug diperbaiki, 4 koreksi dokumen |
| 5 | Grup G (editor blok dan komponen) | **selesai**: 15 fitur dicentang; tidak ada bug kode, 4 koreksi dokumen |
| 6 | Grup H, I, J (iklan, engagement, SEO) | **selesai**: 12 fitur dicentang, 2 diuji sebagian (H04, H05: iklan AdSense nyata); 2 bug diperbaiki |
| 7 | Grup K, L, M, N (kinerja, kompatibilitas, demo, placeholder) | **selesai**: 12 fitur dicentang, 3 diuji sebagian (L01 WooCommerce, L02 Polylang/WPML, L03 Contact Form 7: plugin tidak terpasang); 1 bug diperbaiki |
| 8 | PANDUAN.md (panduan memakai) | **selesai**: 19 bagian disusun dari FITUR.md; dua klaim baru diuji (level heading daftar isi: semua level; Accordion group: menyatukan beberapa Details) dan salah satunya dikoreksi; Disqus, AdSense, Contact Form 7, WooCommerce, Polylang/WPML ditandai diuji sebagian |
| 9 | KONFIGURASI.md (saran konfigurasi WordPress yang optimal) | **selesai**: 13 bagian; setiap saran berlabel Diukur / Dari kode / Aturan WordPress; 20 klaim yang diukur diperiksa mesin (`claims-config.mjs`); temuan: layanan luar bawaan (fonts.gstatic.com, Gravatar), tema tanpa cookie, cookie WooCommerce, penghitung tayangan vs cache halaman, teks tema berbahasa Inggris |

## Audit klaim per fitur (setelah batch 8)

Setiap klaim terukur di FITUR.md (kolom Bawaan, Di mana diatur, Perilaku) diubah menjadi pernyataan yang diuji mesin dan dijalankan di desktop 1280x720 dan mobile 390 bila relevan. Hasil terakhir: **265 klaim lulus, 0 gagal** (putaran awal; digantikan oleh penelusuran lengkap di bawah). Klaim yang gagal pada putaran pertama (6) sudah diperbaiki lalu lulus; daftarnya ada di tabel Temuan.

| Skrip (`tests/docs/`) | Cakupan | Klaim lulus |
|---|---|---|
| `claims-defaults.mjs` | Kolom Bawaan: semua pengaturan WPlus UI dikosongkan lalu diukur (mode, skema, menu kiri, carousel, pinned, sidebar, popular, TOC, berbagi, related, author, komentar, footer, iklan, WhatsApp, pop-up, Coming Soon) | 45 |
| `claims-customizer.mjs` | Kolom Di mana diatur: setiap jalur "WPlus UI: Bagian > Opsi" ada di Customizer asli dan urutan 10 bagian sama dengan dokumen | 104 |
| `claims-ab.mjs` | Per kalimat A01 sampai A07: System mengikuti perangkat dua arah, pilihan pengunjung menang atas pengaturan bawaan, aksen terang dan gelap, skema pengunjung mengalahkan aksen kustom, lingkup font, tombol buka menu kiri | 16 |
| `claims-box.mjs` | A06: tiap komponen yang disebut (kartu, populer, terkait, kutipan, tabel, accordion, spoiler, tiga panel pop-up) benar-benar berubah tampilannya antara desain biasa dan Box design | 20 |
| `claims-a.mjs` | Panel Appearance, 16 skema dan pilihan bertahan, skema bawaan, batas radius, posisi bar notifikasi, selang carousel 4 detik | 13 |
| `claims-cd.mjs` | Pos (breadcrumb, byline, tanggal, tag, komentar tertutup), arsip tag/penulis/tanggal/kategori, animasi 404, pencarian kosong | 26 |
| `claims-eg.mjs` | Ikon menu per tingkat, tautan cepat, header tabel, rasio YouTube, tautan unduh, sitasi, ikon alert | 14 |
| `claims-hij.mjs` | Jenis gambar iklan, kode head/footer di pratinjau Customizer, deskripsi SEO, JSON-LD (Article, breadcrumb, FAQ), Coming Soon Maintenance | 14 |
| `claims-klm.mjs` | CSS kritis mati di pratinjau Customizer, child theme (nilai child menang, menu dan widget ikut) | 4 |
| `claims-misc.mjs` | Tombol pop-up butuh teks dan tautan, batas jumlah, shortcode Contact Form 7 (id, petunjuk, helper) | 9 |

**Penelusuran kalimat ke uji (lengkap):** setiap kalimat di setiap baris FITUR.md (91 fitur) dipecah menjadi klaim bernomor dan diuji mesin oleh `tests/docs/trace-*.mjs` di desktop 1280x720 dan mobile 390. Hasil terakhir: **353 klaim (708 pemeriksaan), semua lulus, 91 dari 91 fitur punya klaim**. Daftar lengkap per fitur ada di [TRACE.md](TRACE.md), dibuat otomatis dari hasil nyata (`node tests/docs/trace-report.mjs`).

**Batas yang tetap ada (jujur):** iklan AdSense yang benar-benar terisi (butuh akun yang disetujui), utas Disqus nyata (butuh akun), dan WPML (plugin berbayar) hanya diuji pada bagian yang bisa dijangkau; hal itu tertulis di kalimat klaimnya. Penilaian rupa seperti "rapi" diperiksa lewat tangkapan layar, bukan angka. Uji berjalan di situs dev dengan data demo; situs lain dengan data berbeda bisa menampilkan hal berbeda.

Selain itu uji fitur per batch (`batch2-*` sampai `batch7-*`) dan uji audit interaksi (`audit-*.mjs`) tetap berlaku.

## Temuan dan perbaikan

| Batch | Fitur | Temuan | Tindakan |
|---|---|---|---|
| 2 | A05 | Font judul tidak berlaku pada judul pos dan halaman (stylesheet memakai font isi alternatif untuk `.pTtl.itm`). | Diperbaiki di `inc/appearance.php`. |
| 2 | B02 | Dokumen menyebut ada cadangan bila tidak ada pos sticky; nyatanya kotak tidak tampil. | Dokumen dikoreksi. |
| 2 | B03 | Dokumen menyebut tombol halaman lama/baru; nyatanya tombol "Load more posts" (JS) dengan Newest/Home/Oldest sebagai cadangan tanpa JS. | Dokumen dikoreksi. |
| 2 | B05 | Cakupan tidak jelas. | Diperjelas: hanya grid Latest Posts. |
| 2 | (alat uji) | Chrome headless dianggap bot oleh runtime tema sehingga bagian interaktif tidak jalan. | Alat uji memakai user agent browser biasa dan profil baru per skenario. |
| 3 | C10 | Iklan dalam artikel menghitung semua `</p>`, termasuk paragraf di dalam grup, kutipan dan akordeon, sehingga iklan bisa masuk ke dalam blok. | Diperbaiki: hanya paragraf tingkat atas dihitung (`inc/ads.php`). |
| 3 | D02 | Gambar banner kategori tidak punya antarmuka (hanya bisa lewat kode). | Ditambah kolom "Archive banner image" di Kategori dan Tag (`inc/term-banner.php`). |
| 3 | D02 | Cadangan gambar banner untuk arsip tag memakai kueri `category` dengan ID tag. | Diperbaiki: kueri taksonomi (`archive.php`). |
| 3 | C02/D01 | Halaman statis selalu mencetak daftar isi walau pengaturan dimatikan; dokumen menyebut tombol di info pos padahal berupa tab di tepi kanan. | Halaman mengikuti pengaturan; label Customizer jadi "posts and pages"; dokumen dikoreksi. |
| 3 | C06 | `id="comment"` dipakai dua kali (pembungkus warisan template asli, dipakai skrip dan CSS, dan textarea). Formulir tetap berfungsi. | Dicatat di BACKLOG, belum diubah (menyentuh skrip dan CSS). |
| 4 | E03 | Opsi menu dari formulir admin tersimpan ganda ("dot,dot"). | Diperbaiki: `array_unique` di `inc/nav-icon-library.php`. |
| 4 | E02 | Dokumen menyebut 40 ikon; nyatanya 45. | Dokumen dikoreksi. |
| 4 | F01 | Dokumen menyebut teks bawaan tetap; nyatanya tagline situs. | Dokumen dikoreksi. |
| 4 | F04/F07 | Isi dari kanan hanya desktop (mobile: dua per baris dari kiri); sidebar di bawah Popular Posts dan Labels. | Dokumen dikoreksi. |
| 5 | G01/G02/G04 | Nama gaya di dokumen tidak sama dengan label di editor (mis. "Warning note", "Highlight", "Icon", "Indent"). | Dokumen dikoreksi memakai label asli. |
| 5 | G06 | Perilaku galeri tidak dijelaskan. | Dokumen diperjelas (dua kolom, Show All, scroll). |
| 5 | G14 | Batas 5 tab dan perilaku sticky tidak tercatat. | Dokumen dikoreksi. |
| 5 | G07 | Batas 8 tab (blok) dan tab berbasis radio tidak tercatat. | Dokumen dikoreksi. |
| 6 | I01 | Tombol WhatsApp menutupi ikon bar bawah mobile. | Diperbaiki: naik di atas bar (`assets/css/engagement.css`). |
| 6 | J01 | og:url di pencarian, penulis dan arsip tanggal berisi alamat beranda. | Diperbaiki: alamat halaman itu sendiri (`inc/seo.php`). |
| 6 | H01/I02/J01/J02 | Letak slot, penutupan pop-up, isi tag dan skema belum rinci. | Dokumen dikoreksi. |
| 7 | L02 | `wpml-config.xml` hanya mencakup `theme_mods_wplus-ui`, jadi pengguna child theme tidak mendapat teks yang bisa diterjemahkan. | Diperbaiki: ditambah `theme_mods_wplus-ui-child`. |
| 7 | L05 | Empat teks kolom banner kategori belum ada di `.pot`. | `.pot` diperbarui. |
| 7 | K03/K05/M01/M02 | Perilaku WebP ukuran penuh, bentuk skrip K05, jumlah isi demo, dan efek menimpa pengaturan belum tercatat. | Dokumen dikoreksi. |
| Audit | A08 | Ikon Comments di bar bawah mobile menunjuk `#comments` (tidak ada); ketukan tidak membuka komentar. | Diperbaiki ke `#comment` (`inc/mobile-bar.php`). |
| Audit | C02 | Panel daftar isi tetap terbuka menutupi heading setelah entri dipilih. | Panel menutup setelah memilih entri (`inc/template-tags.php`). |
| Audit | D05 | Pesan galat CF7 menggeser tombol sehingga klik pertama gagal; formulir contoh CF7 tidak pakai tata letak tema. | Pesan melayang di luar alur; formulir contoh diganti selama belum diubah (`assets/css/wp-extras.css`, `inc/contact-form.php`). |
| Audit | L01 | Tampilan WooCommerce berantakan (tidak seperti tema). | CSS ditulis ulang total (`assets/css/woocommerce.css`). |
| Audit | (umum) | Versi berkas CSS/JS tetap sama sepanjang versi tema sehingga browser menyimpan berkas lama setelah perubahan. | Versi memakai waktu ubah berkas (`wplusui_asset_version()`). |
| Penelusuran | B02 | Dengan beberapa pos sticky, kotak Pinned Post menampilkan semuanya (WordPress menaruh semua sticky di depan kueri), bukan satu seperti yang didokumentasikan. | Diperbaiki: `ignore_sticky_posts` pada kueri pinned (`functions.php`); dokumen: pos terbaru yang tampil; ponsel: kartu teks menimpa bagian bawah gambar. |
| Penelusuran | (uji) | Beberapa pemeriksaan awal terlalu lemah (hanya memeriksa keberadaan elemen) dan lolos padahal klaimnya salah; ditemukan saat setiap kalimat diuji ulang. | Diganti klaim bernomor dengan pengukuran nyata. |
| Audit klaim | C01 | Estimasi baca pos pendek tertulis "0 min" (runtime membulatkan ke bawah). | Dibatasi minimal 1 (`assets/js/script.js`). |
| Audit klaim | A04 | Radius di luar 0 sampai 30 (nilai tersimpan langsung) lolos ke CSS tanpa dibatasi. | Dibatasi 30 saat dicetak (`inc/appearance.php`). |
| Audit klaim | D02 | Dokumen tidak menyebut 16 pos per halaman dan tombol Load more di arsip. | Dokumen dikoreksi. |
| Audit klaim | E02 | Dokumen menyebut ikon di semua tingkat; bawaan hanya tingkat atas. | Dokumen dikoreksi. |
| Audit klaim | G03 | Header lengket tidak terlihat tanpa batas tinggi tabel. | Dokumen diperjelas (kelas `mh300`). |
| Audit | (proses) | Beberapa batch dinyatakan selesai padahal pengujian dilewati karena plugin tidak terpasang dan sebagian hanya memeriksa keberadaan elemen, bukan fungsinya. | Plugin dipasang di situs uji; uji interaksi ditambahkan (`audit-*.mjs`). |

Skrip pengujian ada di `tests/docs/` (`node tests/docs/<berkas>.mjs`, butuh situs di `http://127.0.0.1:8091` dengan demo).
