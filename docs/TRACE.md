# Penelusuran klaim: kalimat FITUR.md ke uji

**Ringkasan: 387 klaim, 387 lulus, 0 gagal; 93 dari 93 fitur punya klaim.**

Setiap fitur di [FITUR.md](FITUR.md) dipecah menjadi klaim bernomor (`A01-1`, `A01-2`, ...) yang diuji mesin oleh skrip `tests/docs/trace-*.mjs`. Tabel ini dibuat otomatis dari hasil nyata (`node tests/docs/trace-report.mjs` setelah semua skrip trace dijalankan).

- ✔ lulus, ✘ gagal, kosong = tidak relevan untuk ukuran itu. Kolom **Umum** untuk klaim yang tidak bergantung ukuran layar (server, HTML, admin).
- Desktop = 1280x720, Mobile = 390 piksel (emulasi ponsel).
- Klaim yang butuh akun nyata (iklan AdSense yang terisi, Disqus) atau plugin berbayar (WPML) hanya diuji pada antarmuka yang bisa dijangkau; batasnya dinyatakan di kalimat klaim.

### A01 Mode terang / gelap / sistem (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A01-1 | pengaturan light (perangkat dark) → lgT untuk pengunjung baru | ✔ | ✔ |  |
| A01-2 | System mengikuti perangkat dark | ✔ | ✔ |  |
| A01-3 | ikon header membuka panel Light/Dark/System | ✔ | ✔ |  |
| A01-4 | pilihan Dark pengunjung disimpan dan menang atas pengaturan Light | ✔ | ✔ |  |

### A02 16 skema warna (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A02-1 | skema awal dari pengaturan (9 → cs9) | ✔ | ✔ |  |
| A02-2 | panel Theme berisi 16 lingkaran warna | ✔ | ✔ |  |
| A02-3 | pilihan skema pengunjung disimpan dan bertahan setelah muat ulang | ✔ | ✔ |  |

### A03 Warna aksen kustom (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A03-1 | aksen terang #e91e63 dipakai di mode terang (--linkB) | ✔ | ✔ |  |
| A03-2 | aksen gelap #ff9800 dipakai di mode gelap | ✔ | ✔ |  |
| A03-3 | skema pilihan pengunjung menang atas aksen kustom | ✔ | ✔ |  |
| A03-4 | tanpa aksen kustom memakai skema (cs0 = #1976d2) | ✔ | ✔ |  |
| A03-5 | warna aksen dipakai pada tombol/tautan nyata (rgb 233,30,99) | ✔ | ✔ |  |

### A04 Sudut tombol dan tautan (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A04-1 | radius 0 → 0px | ✔ | ✔ |  |
| A04-2 | radius 50 → 30px | ✔ | ✔ |  |
| A04-3 | kosong = radius bawaan tema (6px) | ✔ | ✔ |  |

### A05 Font Google (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A05-1 | Body font dipakai untuk teks isi | ✔ | ✔ |  |
| A05-2 | Heading font dipakai untuk judul pos dan nama situs | ✔ | ✔ |  |
| A05-2b | Heading font dipakai untuk judul kartu | ✔ | ✔ |  |
| A05-2c | Heading font dipakai untuk judul halaman | ✔ | ✔ |  |
| A05-3 | nama font tidak valid diabaikan (tidak masuk HTML, tidak memuat font) | ✔ | ✔ |  |
| A05-4 | font dimuat dari fonts.googleapis.com | ✔ | ✔ |  |

### A06 Box design (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A06-1 | kartu pos: berbeda antara desain biasa dan Box design | ✔ | ✔ |  |
| A06-2 | daftar populer: berbeda antara desain biasa dan Box design | ✔ | ✔ |  |
| A06-3 | tabel: berbeda antara desain biasa dan Box design | ✔ | ✔ |  |
| A06-4 | panel Appearance: berbeda antara desain biasa dan Box design | ✔ | ✔ |  |
| A06-5 | set CSS kritis sendiri untuk desain box (kelas bX dan gaya inline berbeda) | ✔ | ✔ |  |

### A07 Menu kiri desktop: tertutup atau terbuka (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A07-1 | collapsed → kelas co, lebar 75px | ✔ |  |  |
| A07-2 | tombol di samping nama situs membalik keadaan menu | ✔ |  |  |
| A07-3 | di ponsel menu selalu laci (tertutup di luar layar lalu terbuka walau pengaturan Expanded) |  | ✔ |  |

### A08 Bilah bawah mobile (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A08-1 | mati (bawaan): bar tidak tercetak | ✔ | ✔ |  |
| A08-2 | bar tersembunyi di layar lebar | ✔ | ✔ |  |
| A08-3 | isi bar di home: Home, Search, Menu, Mode, Top |  | ✔ |  |
| A08-4 | ikon Menu membuka laci dan ikon Comments membuka panel komentar |  | ✔ |  |
| A08-5 | ikon Appearance mengganti mode terang/gelap |  | ✔ |  |

### A09 Bar notifikasi (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A09-1 | tanpa teks: bar tidak tercetak | ✔ | ✔ |  |
| A09-2 | bar tampil di bawah tautan cepat dan teks boleh memuat tautan | ✔ | ✔ |  |
| A09-3a | teks saja: tanpa tombol | ✔ | ✔ |  |
| A09-3b | label tanpa URL: tanpa tombol | ✔ | ✔ |  |
| A09-3c | label dan URL: tombol menuju URL | ✔ | ✔ |  |
| A09-4 | ditutup pengunjung: tinggi 0 dan tetap tertutup setelah muat ulang | ✔ | ✔ |  |

### A10 Logo, judul, slogan, ikon situs (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A10-1 | judul situs tampil di header sebagai teks | ✔ | ✔ |  |
| A10-2 | tanpa logo: footer memakai gambar bawaan tema | ✔ | ✔ |  |
| A10-2b | dengan logo: footer memakai logo situs (custom-logo) | ✔ | ✔ |  |
| A10-3 | ikon situs dipakai sebagai favicon (tanpa ikon cadangan) | ✔ | ✔ |  |
| A10-4 | tanpa ikon situs: ikon cadangan | ✔ | ✔ |  |

### A11 Sapaan di halaman pos (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A11-1 | jam 0 → "Have sweet dreams!" | ✔ | ✔ |  |

### A12 Pencarian di header (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| A12-1 | kolom cari tampil di header | ✔ | ✔ |  |
| A12-2 | ikon membuka kolom cari (hanya ponsel) | ✔ | ✔ |  |
| A12-3 | dua huruf ditolak (tidak pindah halaman) | ✔ | ✔ |  |
| A12-3b | tiga huruf atau lebih menuju /?s= | ✔ | ✔ |  |
| A12-4 | hasil di halaman pencarian bertajuk "Search results for" | ✔ | ✔ |  |
| A12-5 | mengetik di kolom cari tidak membuka kotak "Loading…", tidak meminta umpan Blogger, dan tanpa galat JavaScript | ✔ | ✔ |  |

### B01 Carousel (8/8)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B01-1 | sampai 5 slide | ✔ | ✔ |  |
| B01-2 | slide bergeser otomatis tiap 4 detik | ✔ | ✔ |  |
| B01-3 | slide kustom: gambar wajib; judul dan tautan opsional; slide tanpa gambar diabaikan | ✔ | ✔ |  |
| B01-4 | tanpa slide kustom: pos berlabel featured | ✔ | ✔ |  |
| B01-5 | tanpa pos featured: 5 pos terbaru | ✔ | ✔ |  |
| B01-6 | pos tanpa gambar unggulan memakai placeholder | ✔ | ✔ |  |
| B01-7 | gambar slide pertama di-preload saat carousel tampil | ✔ | ✔ |  |
| B01-8 | dimatikan: carousel hilang dan preload tidak dicetak | ✔ | ✔ |  |

### B02 Pinned Post (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B02-1 | pos sticky tampil di kotak Pinned Post | ✔ | ✔ |  |
| B02-2 | beberapa sticky: satu yang tampil | ✔ | ✔ |  |
| B02-3 | tanpa pos sticky: kotak tidak tampil | ✔ | ✔ |  |
| B02-4 | dimatikan: kotak tidak tampil | ✔ | ✔ |  |
| B02-5 | desktop: gambar di kiri, teks di kanan | ✔ | ✔ |  |

### B03 Latest Posts dan paginasi (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B03-1 | grid 3 kolom | ✔ | ✔ |  |
| B03-2 | tombol Load more posts memuat pos berikutnya tanpa pindah halaman | ✔ | ✔ |  |
| B03-3 | tanpa JavaScript: tautan Newest/Home/Oldest | ✔ | ✔ |  |
| B03-4 | halaman di luar jangkauan menampilkan 404 | ✔ | ✔ |  |
| B03-5 | jumlah kartu mengikuti Pengaturan > Membaca (6) | ✔ | ✔ |  |

### B04 Seksi kategori di beranda (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B04-1 | slug dipisah koma, spasi diabaikan, slug tak dikenal dilewati | ✔ | ✔ |  |
| B04-2 | seksi berisi hingga 6 pos dan tautan View all ke arsip kategori | ✔ | ✔ |  |
| B04-3 | seksi kategori hanya di halaman 1 beranda | ✔ | ✔ |  |
| B04-4 | kosong: tidak ada seksi | ✔ | ✔ |  |

### B05 Sembunyikan kategori dari beranda (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B05-1 | kategori disembunyikan lewat slug | ✔ | ✔ |  |
| B05-2 | slug: pos kategori itu hilang dari grid Latest Posts | ✔ | ✔ |  |
| B05-3 | slug: carousel dan seksi kategori tidak terpengaruh | ✔ | ✔ |  |

### B06 Sidebar beranda (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B06-1 | nyala: sidebar 300px di samping | ✔ | ✔ |  |
| B06-2 | mati: sidebar tidak ada | ✔ | ✔ |  |

### B07 Popular Posts di sidebar (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| B07-1 | bawaan: kotak tampil dengan 5 pos berjudul Popular Posts | ✔ | ✔ |  |
| B07-2 | judul kustom dan jumlah 3 berlaku | ✔ | ✔ |  |
| B07-3 | dimatikan: kotak hilang | ✔ | ✔ |  |
| B07-4 | urutan views | ✔ | ✔ |  |
| B07-5 | di halaman pos, pos yang sedang dibaca tidak ikut terdaftar | ✔ | ✔ |  |
| B07-6 | bila pos yang dibaca satu-satunya, ia tetap ditampilkan | ✔ | ✔ |  |

### C01 Tata letak pos (9/9)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C01-1 | breadcrumb Home dan kategori pertama | ✔ | ✔ |  |
| C01-2 | judul pos (h1) | ✔ | ✔ |  |
| C01-3 | kutipan tampil dengan tag HTML dibuang | ✔ | ✔ |  |
| C01-3b | tanpa kutipan tidak ada deskripsi | ✔ | ✔ |  |
| C01-4 | avatar penulis tampil | ✔ | ✔ |  |
| C01-5 | hanya satu tanggal: pos yang diubah setelah terbit menampilkan Updated (Februari 2024), bukan Published | ✔ | ✔ |  |
| C01-6 | estimasi waktu baca ±200 kata/menit (450 kata → 3 menit) | ✔ | ✔ |  |
| C01-6b | pos pendek: waktu baca minimal 1 menit | ✔ | ✔ |  |
| C01-7 | label tag tampil dan tag featured disembunyikan | ✔ | ✔ |  |

### C02 Daftar isi (TOC) (7/7)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C02-1 | tab daftar isi selalu terlihat di tepi kanan | ✔ | ✔ |  |
| C02-2 | tab membuka panel | ✔ | ✔ |  |
| C02-3 | dibangun dari heading, bertingkat dan bernomor | ✔ | ✔ |  |
| C02-4 | dimatikan: tab dan panel tidak dicetak | ✔ | ✔ |  |
| C02-5 | pengaturan berlaku juga untuk halaman | ✔ | ✔ |  |
| C02-5b | halaman: tab tampil bila pengaturan nyala | ✔ | ✔ |  |
| C02-7 | memilih entri menggulir ke heading dan menutup panel | ✔ | ✔ |  |

### C03 Berbagi (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C03-1 | tiga tombol cepat plus ikon "+" | ✔ | ✔ |  |
| C03-2 | popup memuat 8 jaringan dan kolom salin tautan | ✔ | ✔ |  |
| C03-3 | bawaan: Facebook, WhatsApp, X | ✔ | ✔ |  |
| C03-4 | dimatikan: tombol dan popup hilang | ✔ | ✔ |  |

### C04 Related posts (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C04-1 | related dari kategori yang sama | ✔ | ✔ |  |
| C04-2 | bawaan: judul "Related Posts", 6 pos | ✔ | ✔ |  |
| C04-2b | judul dan jumlah kustom | ✔ | ✔ |  |
| C04-3 | jumlah dibatasi maksimal 12 | ✔ | ✔ |  |
| C04-4 | dimatikan: kotak hilang | ✔ | ✔ |  |

### C05 Author box (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C05-1 | bawaan mati | ✔ | ✔ |  |
| C05-2 | kotak penulis: avatar, nama, biografi dari profil | ✔ | ✔ |  |

### C06 Komentar (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C06-1 | komentar muncul di panel pop-up dari tombol "Post a Comment" | ✔ | ✔ |  |
| C06-2 | panel memuat formulir dan area daftar komentar | ✔ | ✔ |  |
| C06-3 | komentar baru membuka kembali pos pada komentar itu dan tampil di daftar | ✔ | ✔ |  |
| C06-4 | dengan Disqus shortname: utas Disqus menggantikan formulir dan embed dimuat saat panel dibuka (akun nyata belum diuji) | ✔ | ✔ |  |
| C06-5 | komentar ditutup dan kosong: tombol dan ikon tidak ada | ✔ | ✔ |  |

### C07 Bookmark (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C07-1 | tombol penanda ada di kartu dan di pos | ✔ | ✔ |  |
| C07-2 | daftar tersimpan di browser pengunjung | ✔ | ✔ |  |
| C07-3 | daftar terbuka dari ikon di header dan memuat pos tersimpan | ✔ | ✔ |  |

### C08 Penghitung tayangan (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C08-1 | kunjungan pengunjung biasa menambah 1 | ✔ | ✔ |  |
| C08-2 | pratinjau tidak dihitung | ✔ | ✔ |  |
| C08-3 | bot tidak dihitung | ✔ | ✔ |  |
| C08-4 | pengguna masuk tidak dihitung | ✔ | ✔ |  |

### C09 Pos beberapa halaman (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C09-1 | Page Break membagi pos: halaman 1 hanya "Halaman satu" dengan pager, halaman 2 berisi "Halaman dua" | ✔ | ✔ |  |

### C10 Iklan dalam artikel (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C10-1 | iklan setelah paragraf tingkat atas ke-2 (paragraf di grup/kutipan tidak dihitung) | ✔ | ✔ |  |
| C10-2 | bawaan setelah paragraf 3 | ✔ | ✔ |  |
| C10-2b | tanpa N: iklan setelah paragraf tingkat atas ke-3 | ✔ | ✔ |  |
| C10-3 | kosong: tidak ada iklan dalam artikel | ✔ | ✔ |  |
| C10-4 | paragraf kurang dari N: iklan tidak dicetak | ✔ | ✔ |  |

### C11 Sidebar pos (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| C11-1 | sidebar 300px di kanan | ✔ | ✔ |  |
| C11-2 | dimatikan: tanpa sidebar dan konten selebar 780px) | ✔ | ✔ |  |

### D01 Halaman statis (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| D01-1 | breadcrumb Home dan judul halaman | ✔ | ✔ |  |
| D01-2 | judul halaman (h1) | ✔ | ✔ |  |
| D01-3 | isi halaman tampil | ✔ | ✔ |  |
| D01-4 | tanpa info penulis, sidebar, komentar, related | ✔ | ✔ |  |
| D01-5 | tab daftar isi tampil mengikuti pengaturan | ✔ | ✔ |  |

### D02 Arsip kategori/tag (7/7)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| D02-1 | banner: nama kategori, jumlah pos, deskripsi term | ✔ | ✔ |  |
| D02-2 | gambar banner dari meta term (wplus-ui-logo-square) | ✔ | ✔ |  |
| D02-2b | tanpa gambar banner: memakai gambar unggulan pos terbaru di term itu | ✔ | ✔ |  |
| D02-3 | grid pos tanpa sidebar | ✔ | ✔ |  |
| D02-4 | arsip memuat 16 pos lalu Load more posts memuat sisanya | ✔ | ✔ |  |
| D02-5 | arsip tag memakai tata letak yang sama (banner + kartu, tanpa sidebar) | ✔ | ✔ |  |
| D02-6 | kolom "Archive banner image (WPlus UI)" ada di layar ubah category |  |  | ✔ |

### D03 Hasil pencarian (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| D03-1 | judul "Search results for: …" dan grid hasil | ✔ | ✔ |  |
| D03-2 | sidebar tampil (bawaan) | ✔ | ✔ |  |
| D03-2b | sidebar dimatikan lewat pengaturan | ✔ | ✔ |  |
| D03-3 | tanpa hasil: "No results found" | ✔ | ✔ |  |

### D04 Halaman 404 (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| D04-1 | bagian galat "404 Something Wrong!" dengan efek glitch | ✔ | ✔ |  |
| D04-2 | tombol "Take me back" menuju beranda | ✔ | ✔ |  |
| D04-3 | status HTTP 404 | ✔ | ✔ |  |

### D05 Halaman Contact (Contact Form 7) (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| D05-1 | halaman Contact memuat formulir CF7 lewat shortcode/pola | ✔ | ✔ |  |
| D05-2 | nama dan email berdampingan (dua kolom cf-grid) | ✔ | ✔ |  |
| D05-3 | tanpa plugin Contact Form 7 pengunjung tidak melihat formulir |  |  | ✔ |
| D05-3b | tanpa plugin admin melihat petunjuk memasang plugin |  |  | ✔ |
| D05-4 | pola "Contact page (Contact Form 7)" terdaftar |  |  | ✔ |

### E01 Menu utama (sidebar kiri / laci) (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E01-1 | menu bertingkat dengan ikon di sisi kiri | ✔ | ✔ |  |
| E01-2 | dropdown menutup dan membuka lagi tanpa JavaScript (tinggi: terbuka, tertutup 0, terbuka) | ✔ | ✔ |  |
| E01-3 | desktop: menu berupa rel ikon (75px) | ✔ | ✔ |  |

### E02 Ikon item menu (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E02-1 | ikon pilihan tampil di semua tingkat (anak dan cucu) | ✔ | ✔ |  |
| E02-2 | tingkat atas tanpa pilihan memakai ikon folder bawaan | ✔ | ✔ |  |
| E02-3 | "No icon" menghilangkan ikon | ✔ | ✔ |  |
| E02-4 | kelas CSS ico-nama memilih ikon (Customizer) | ✔ | ✔ |  |
| E02-5 | pilihan pada item mengalahkan kelas CSS | ✔ | ✔ |  |
| E02-6 | sub-item tanpa pilihan tidak berikon | ✔ | ✔ |  |

### E03 Opsi item menu (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E03-1 | opsi Divider menambah garis setelah item (kelas br) | ✔ | ✔ |  |
| E03-2 | opsi Notification dot (kelas nt) | ✔ | ✔ |  |
| E03-3 | opsi Sub-menu starts open: sub-menu terbuka sejak awal | ✔ | ✔ |  |
| E03-4 | opsi Flat "More..." group (kelas mr) selalu terbuka | ✔ | ✔ |  |
| E03-5 | lencana Free | ✔ | ✔ |  |
| E03-6 | kelas CSS Customizer (new, nt, br) setara opsi | ✔ | ✔ |  |

### E04 Pemisah `---` (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E04-1 | Tautan Khusus "---" menjadi garis pemisah tanpa tautan | ✔ | ✔ |  |

### E05 Item menu aktif (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E05-1 | item halaman yang dibuka diberi aria-current dan induknya aktif dan terbuka | ✔ | ✔ |  |

### E06 Tautan cepat (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E06-1 | baris tautan di bawah header, memuat item menu Quick Links | ✔ | ✔ |  |
| E06-2 | tautan halaman aktif diberi penanda (kelas active) | ✔ | ✔ |  |
| E06-3 | baris bisa digeser mendatar bila tidak muat |  | ✔ |  |
| E06-4 | lokasi dikosongkan: baris tidak tampil |  |  | ✔ |

### E07 Flyout menu kiri (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E07-1 | rel menciut, jendela penuh: sub-menu muncul di sisi dan tidak keluar jendela |  |  | ✔ |
| E07-2 | sub-menu yang lebih tinggi dari jendela bisa digulir |  |  | ✔ |

### E08 Menu cadangan (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| E08-1 | tanpa menu terpasang: daftar halaman dipakai | ✔ | ✔ |  |

### F01 Teks about (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F01-1 | tanpa pengaturan: teks about = slogan situs | ✔ | ✔ |  |
| F01-2 | nama situs di footer | ✔ | ✔ |  |
| F01-3 | teks about kustom | ✔ | ✔ |  |

### F02 Empat kolom tautan (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F02-1 | kolom bermenu memakai menu pilihan (Quick Links 10 tautan, Primary 7) | ✔ | ✔ |  |
| F02-2 | tanpa menu: kolom memakai widget | ✔ | ✔ |  |
| F02-3 | menu lokasi Footer Column mengalahkan widget | ✔ | ✔ |  |
| F02-4 | tanpa menu atau widget kolom tidak dicetak | ✔ | ✔ |  |

### F03 Judul kolom (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F03-1 | judul kolom kustom dan bawaan ("Tautan", "Support") | ✔ | ✔ |  |
| F03-2 | kolom widget memakai judul widget | ✔ | ✔ |  |

### F04 Kolom terisi dari kanan (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F04-1 | dua kolom terisi dari slot paling kanan | ✔ |  |  |
| F04-2 | ponsel: kolom dua per baris dari kiri |  | ✔ |  |
| F04-3 | empat kolom bermenu dengan judul bawaan Resources dan Company | ✔ | ✔ |  |

### F05 Teks hak cipta (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F05-1 | hak cipta bawaan memuat tahun, nama situs, All rights reserved. | ✔ | ✔ |  |
| F05-2 | {year} menjadi tahun berjalan dan baris hak cipta diganti | ✔ | ✔ |  |
| F05-3 | baris atribusi tema selalu ada | ✔ | ✔ |  |

### F06 Tautan sosial (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F06-1 | tanpa URL tidak ada ikon sosial | ✔ | ✔ |  |
| F06-2 | 13 jaringan: 13 ikon di footer dan 13 di laci menu dengan label sendiri | ✔ | ✔ |  |
| F06-3 | hanya jaringan yang diisi yang tampil | ✔ | ✔ |  |
| F06-4 | ikon sosial juga tampil di halaman Coming Soon | ✔ | ✔ |  |

### F07 Area widget footer dan sidebar (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| F07-1 | lima area widget terdaftar (Footer Column 1-4, Blog Sidebar) | ✔ | ✔ |  |
| F07-2 | widget Blog Sidebar tampil di bawah Popular Posts dan Labels | ✔ | ✔ |  |

### G01 Gaya blok paragraf (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G01-1 | gaya paragraf terdaftar: Note, Note: warning, First line indent, Reference |  |  | ✔ |
| G01-2 | paragraf Note, Note: warning, indent, Reference menerima kelas komponen | ✔ | ✔ |  |

### G02 Gaya blok grup (Alert) (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G02-1 | 10 gaya alert terdaftar plus Accordion group dan Related links |  |  | ✔ |
| G02-2 | 10 alert menerima kelas jenisnya (info, success, warning, error, masing-masing outline) dan kelas netral | ✔ | ✔ |  |
| G02-3 | Accordion group dan Related links menerima kelasnya | ✔ | ✔ |  |
| G02-4 | ikon jenis alert muncul otomatis | ✔ | ✔ |  |

### G03 Gaya daftar dan tabel (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G03-1 | gaya Steps (list) dan Data table terdaftar |  |  | ✔ |
| G03-2 | List Steps menjadi ol.steps; Data table menerima kelas table sticky bordered | ✔ | ✔ |  |
| G03-3 | header Data table lengket di dalam kotak bertinggi terbatas (mh300) | ✔ | ✔ |  |

### G04 Gaya kutipan (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G04-1 | gaya kutipan Highlighted dan With quote icon |  |  | ✔ |
| G04-2 | kutipan Highlighted (s1) dan icon (s2); sitasi menjadi span (bukan cite) | ✔ | ✔ |  |

### G05 Gaya Details (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G05-1 | gaya Details: Accordion, Accordion (alternate), Spoiler |  |  | ✔ |
| G05-2 | Details menerima kelas ac, ac alt, sp | ✔ | ✔ |  |
| G05-3 | accordion, alternate, dan spoiler membuka saat diklik | ✔ | ✔ |  |
| G05-4 | spoiler memakai label "Show all"/"Hide all" | ✔ | ✔ |  |

### G06 Gaya galeri (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G06-1 | gaya galeri: Image grid, Image grid with Show All, Scrolling images |  |  | ✔ |
| G06-2 | galeri menghasilkan grid, grid dengan Show All, dan scroll | ✔ | ✔ |  |
| G06-3 | Show All menampilkan semua gambar (4 → semua) | ✔ | ✔ |  |
| G06-4 | grid dua kolom (dua gambar per baris; sisa ganjil di tengah) | ✔ | ✔ |  |
| G06-5 | galeri Scrolling images bisa digeser mendatar | ✔ | ✔ |  |

### G07 Blok Tabs dan Tab (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G07-1 | blok Tabs: tab biasa sticky 3, tab kode 2, maksimal 8 tab (9 dipotong), shortcode maksimal 5 dengan sticky bawaan dan sticky="false" tanpa sticky | ✔ | ✔ |  |
| G07-2 | berpindah tab menampilkan panel yang benar (tanpa JavaScript, tombol radio) dan bilah sticky | ✔ | ✔ |  |
| G07-3 | tab kode: berpindah antara dua blok Code | ✔ | ✔ |  |

### G08 Blok Download box (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G08-1 | blok Download box tercetak | ✔ | ✔ |  |
| G08-2 | kotak unduhan: tipe, nama, ukuran, tautan, tab baru, nofollow noopener | ✔ | ✔ |  |

### G09 Blok Table of contents (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G09-1 | blok daftar isi dari heading, bisa dibuka/ditutup, opsi awal tertutup | ✔ | ✔ |  |

### G10 Blok Lazy YouTube (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G10-1 | blok Lazy YouTube tercetak | ✔ | ✔ |  |
| G10-2 | sebelum diklik hanya sampul dimuat (tanpa iframe) dan rasio 4 / 3 dipakai | ✔ | ✔ |  |
| G10-3 | klik memuat pemutar YouTube (iframe) | ✔ | ✔ |  |

### G11 Blok kode (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G11-1 | blok kode: label sumber, komentar, mark berlabel dan berwarna, tombol Copy | ✔ | ✔ |  |
| G11-2 | tombol Copy menyalin isi kode ke clipboard |  |  | ✔ |
| G11-3 | penyorotan sintaks di sisi pengunjung (token berwarna) dan nomor baris |  |  | ✔ |

### G12 Pola blok (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G12-1 | 11 pola di kategori WPlus UI: Note, Warning note, Alerts, Steps, Accordion, Spoiler, Buttons, Quotes, Download box, Tabs, Contact page |  |  | ✔ |
| G12-2 | semua pola dirender mesin blok tanpa peringatan dan berisi teks |  |  | ✔ |

### G13 Tombol (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G13-1 | tombol Buttons: gaya isi (button) dan Outline (button ln) | ✔ | ✔ |  |

### G14 Shortcode tab (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G14-1 | shortcode [pu_tabs]: tujuh tab dipotong menjadi lima | ✔ | ✔ |  |
| G14-2 | bilah tab lengket secara bawaan | ✔ | ✔ |  |
| G14-3 | sticky="false" mematikan bilah lengket | ✔ | ✔ |  |
| G14-4 | shortcode bekerja di blok Shortcode (konten klasik setara) | ✔ | ✔ |  |

### G15 Pratinjau di editor (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| G15-1 | editor: kategori WPlus UI dengan 5 blok dan semua gaya grup tersedia | ✔ | ✔ |  |
| G15-2 | kanvas editor memuat gaya tema: alert, catatan, dan spoiler tampil seperti di situs | ✔ | ✔ |  |

### H01 Slot iklan (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| H01-1 | slot yang tampil di home: under_header, above_pinned, above_posts, below_posts, sidebar_sticky | ✔ | ✔ |  |
| H01-2 | slot kosong tidak mencetak apa pun | ✔ | ✔ |  |

### H02 Ukuran gambar slot iklan (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| H02-1 | slot kosong tidak tampil sama sekali, juga bila pengaturan lama "Show ad placeholders" masih tersimpan | ✔ | ✔ |  |
| H02-2 | hanya slot sticky yang diisi gambar yang tampil (tanpa bingkai putus-putus), gambar 300x250 |  |  | ✔ |
| H02-3 | di ponsel slot sticky (khusus desktop) tidak tampil dan tidak menyisakan ruang |  |  | ✔ |
| H02-4 | tiap slot di Customizer menyebut ukuran gambar yang disarankan, "Leave empty to hide this slot" dan contoh tag <img>; kotak centang placeholder lama sudah tidak ada |  |  | ✔ |

### H03 Kode header dan footer (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| H03-1 | kode sebelum </head> dan sebelum </body> tercetak dan skripnya berjalan | ✔ | ✔ |  |
| H03-2 | kode tidak dicetak di pratinjau Customizer |  |  | ✔ |
| H03-3 | pengguna tanpa hak HTML mentah: kode disaring (skrip dibuang), admin tidak |  |  | ✔ |

### H04 ID penerbit AdSense (7/7)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| H04-1 | ID "pub-1234567890123456" dinormalkan menjadi ca-pub-1234567890123456 |  |  | ✔ |
| H04-2 | ID tidak valid diabaikan (tanpa pemuat, tanpa XSS) |  |  | ✔ |
| H04-3 | pemuatan malas: 0 permintaan sebelum interaksi, permintaan ke adsbygoogle.js dengan ID sesudah gulir | ✔ | ✔ |  |
| H04-4 | pemuatan malas dimatikan: skrip dimuat langsung | ✔ | ✔ |  |
| H04-5 | kode AdSense yang ditempel tidak membuat skrip dimuat dua kali | ✔ | ✔ |  |
| H04-6 | skrip AdSense dimuat satu kali dengan ID (satu pemuat di halaman) |  |  | ✔ |
| H04-7 | pemuatan malas: tekan tombol memicu pemuatan skrip (sebelum: 0, sesudah: 1) |  |  | ✔ |

### H05 Isi slot fleksibel (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| H05-1 | angka saja: unit AdSense responsif dengan ID penerbit dan nomor unit | ✔ | ✔ |  |
| H05-2 | angka tanpa ID penerbit tidak tampil | ✔ | ✔ |  |
| H05-3 | alamat gambar + tautan di baris kedua: gambar bertautan sponsored noopener tab baru | ✔ | ✔ |  |
| H05-4 | selain itu dicetak apa adanya | ✔ | ✔ |  |
| H05-5 | alamat gambar .jpg dikenali sebagai gambar |  |  | ✔ |
| H05-6 | iklan dalam artikel menerima jenis isi yang sama (nomor unit → unit AdSense) | ✔ | ✔ |  |

### I01 Tombol WhatsApp melayang (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| I01-1 | bawaan mati |  |  | ✔ |
| I01-2 | tanpa nomor tombol tidak tampil |  |  | ✔ |
| I01-3 | tombol di sisi right | ✔ | ✔ |  |
| I01-4 | membuka wa.me dengan nomor (hanya angka) dan pesan awal ter-encode | ✔ | ✔ |  |
| I01-5 | tidak menimpa tombol gulir tema | ✔ | ✔ |  |
| I01-6 | bila bar bawah mobile aktif, tombol berada di atas bar |  | ✔ |  |

### I02 Pop-up ajakan (CTA) (8/8)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| I02-1 | bawaan mati |  |  | ✔ |
| I02-2 | tanpa judul tidak tampil |  |  | ✔ |
| I02-3 | muncul setelah jeda detik | ✔ | ✔ |  |
| I02-4 | ditutup dengan tombol silang dan tidak muncul lagi setelah muat ulang | ✔ | ✔ |  |
| I02-5 | ditutup dengan klik di luar kotak | ✔ | ✔ |  |
| I02-6 | tanpa teks/tautan tombol: tidak ada tombol | ✔ | ✔ |  |
| I02-6b | teks dan tautan terisi: tombol tampil |  |  | ✔ |
| I02-7 | gambar posisi top | ✔ | ✔ |  |

### I03 Halaman Coming Soon / Maintenance (13/13)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| I03-1 | bawaan Off: situs tampil normal 200 |  |  | ✔ |
| I03-2 | pengunjung mendapat HTTP 503 dengan Retry-After |  |  | ✔ |
| I03-3 | yang bisa mengedit pos tetap melihat situs biasa |  |  | ✔ |
| I03-4 | admin melihat halaman dengan ?wplusui-preview=1 |  |  | ✔ |
| I03-5 | hitung mundur sesuai selisih ke tanggal target (hari, jam, menit) dan berdetak | ✔ | ✔ |  |
| I03-6 | REST API dan feed tidak diblokir |  |  | ✔ |
| I03-7 | judul, teks, label, satuan, tombol dapat diganti | ✔ | ✔ |  |
| I03-7b | kosong memakai teks bawaan; sosial dimatikan; tanpa teks tombol: tanpa tombol |  |  | ✔ |
| I03-7c | mode Maintenance: teks bawaan khusus |  |  | ✔ |
| I03-8 | tanggal lewat + auto-open: situs terbuka otomatis (200) |  |  | ✔ |
| I03-8b | tanggal lewat tanpa auto-open: pesan "live" tampil dan hitung mundur 0 |  |  | ✔ |
| I03-9 | ikon sosial tampil dan halaman tanpa luapan, noindex | ✔ | ✔ |  |
| I03-10 | gambar latar dipakai | ✔ | ✔ |  |

### I04 Pemberitahuan cookie (18/18)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| I04-1 | mati secara default: tidak ada banner cookie |  |  | ✔ |
| I04-2 | banner tampil pada kunjungan pertama dengan teks bawaan, tombol Cookie Policy dan OK, got it. | ✔ | ✔ |  |
| I04-3 | tombol kebijakan mengarah ke halaman /cookie-policy dari demo | ✔ | ✔ |  |
| I04-4 | banner di dalam layar dan tidak lebih lebar dari 440px | ✔ | ✔ |  |
| I04-5 | menekan OK menutup banner dan menyimpan pilihan (localStorage dan cookie) | ✔ | ✔ |  |
| I04-6 | setelah dimuat ulang banner tidak muncul lagi | ✔ | ✔ |  |
| I04-7 | teks, tombol, dan tautan kebijakan bisa diganti di Customizer |  |  | ✔ |
| I04-8 | tanpa tautan dan tanpa halaman /cookie-policy (terbit), tombol kebijakan disembunyikan |  |  | ✔ |
| I04-9 | sebelum OK: meta tampil, skrip kode (head, footer, loader AdSense) belum jalan, JSON-LD tidak ditahan |  |  | ✔ |
| I04-10 | setelah OK: skrip kode jalan tepat sekali dan loader AdSense dimuat |  |  | ✔ |
| I04-11 | kunjungan berikutnya (sudah setuju): skrip langsung jalan tanpa banner |  |  | ✔ |
| I04-12 | pemuat AdSense malas juga menunggu OK (tidak dimuat walau pengunjung menggulir) |  |  | ✔ |
| I04-13 | setelah OK pemuat AdSense malas bekerja seperti biasa (dimuat saat pengunjung bergerak, menggulir, atau setelah 5 detik) |  |  | ✔ |
| I04-14 | saklar "Load ads and scripts only after OK" dimatikan: kode langsung jalan |  |  | ✔ |
| I04-15 | halaman Cookie Policy demo tampil dengan tombol "Forget my choice" |  |  | ✔ |
| I04-16 | tombol reset menghapus pilihan dan banner tampil lagi |  |  | ✔ |
| I04-17 | di ponsel kartu berada di atas bilah bawah dan selebar layar dikurangi margin |  |  | ✔ |
| I04-18 | gambar promosi di slot iklan tampil sebelum OK (hanya skrip dan pemuat AdSense yang menunggu) |  |  | ✔ |

### J01 Meta, Open Graph, Twitter card (9/9)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| J01-1 | tanpa kutipan: deskripsi dari awal isi tanpa shortcode, 30 kata, berakhir … |  |  | ✔ |
| J01-1b | dengan kutipan: kutipan tanpa tag HTML |  |  | ✔ |
| J01-1c | beranda: slogan situs; kategori: deskripsi term |  |  | ✔ |
| J01-2 | Open Graph (type, site_name, title, description, url) dan twitter:card |  |  | ✔ |
| J01-3 | gambar dari gambar unggulan (pos 26) atau logo situs; tanpa keduanya tanpa og:image |  |  | ✔ |
| J01-3b | logo situs dipakai bila tanpa gambar unggulan |  |  | ✔ |
| J01-4 | og:url pencarian dan penulis berisi alamatnya sendiri; 404 tanpa tag |  |  | ✔ |
| J01-5 | plugin SEO aktif (Yoast): tema tidak mencetak meta, OG, JSON-LD |  |  | ✔ |
| J01-5b | tanpa plugin SEO tag dicetak |  |  | ✔ |

### J02 JSON-LD (6/6)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| J02-1 | beranda: Organization+WebSite; pos: Organization+BreadcrumbList+Article; halaman: Breadcrumb; arsip/pencarian/404: tidak ada |  |  | ✔ |
| J02-2 | Article: headline, tanggal, penulis Person, publisher, bahasa |  |  | ✔ |
| J02-3 | BreadcrumbList: Home, kategori, judul |  |  | ✔ |
| J02-3b | WebSite dengan SearchAction |  |  | ✔ |
| J02-4 | FAQPage dari grup accordion: pertanyaan dan jawabannya |  |  | ✔ |
| J02-5 | plugin SEO aktif: JSON-LD tidak dicetak |  |  | ✔ |

### J03 Ikon cadangan (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| J03-1 | tanpa ikon situs: ikon cadangan dicetak |  |  | ✔ |
| J03-2 | dengan ikon situs: ikon cadangan tidak dicetak |  |  | ✔ |

### J04 Preload gambar LCP (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| J04-1 | gambar slide pertama di-preload di beranda halaman 1, tidak di pos dan halaman 2 |  |  | ✔ |

### K01 CSS kritis inline (5/5)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| K01-1 | CSS kritis inline di beranda |  |  | ✔ |
| K01-2 | stylesheet penuh dimuat tanpa memblokir (preload) dengan <noscript> di beranda |  |  | ✔ |
| K01-3 | CSS kritis tidak dipakai bila SCRIPT_DEBUG aktif |  |  | ✔ |
| K01-4 | dengan stylesheet penuh diblokir, layar pertama tetap bergaya (header dan latar benar) | ✔ | ✔ |  |
| K01-5 | setelah dimuat stylesheet penuh menjadi stylesheet biasa | ✔ | ✔ |  |

### K02 CSS dan JS terkompres (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| K02-1 | `style.min.css` dan `script.min.js` dipakai bila SCRIPT_DEBUG mati |  |  | ✔ |
| K02-2 | SCRIPT_DEBUG aktif memakai berkas yang terbaca (style.css, script.js) |  |  | ✔ |
| K02-3 | berkas min lebih kecil dari sumber |  |  | ✔ |

### K03 WebP (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| K03-1 | sub-ukuran dan ukuran penuh JPEG dibuat versi WebP |  |  | ✔ |
| K03-2 | berkas JPEG asli tetap tersimpan |  |  | ✔ |
| K03-3 | srcset memakai WebP |  |  | ✔ |

### K04 Gambar lazy dan berukuran (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| K04-1 | gambar lokal tanpa entri media dimuat lazy dan diberi lebar/tinggi nyata | ✔ | ✔ |  |

### K05 Skrip konten menunggu runtime (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| K05-1 | skrip berbentuk (PU, window, document) berjalan setelah runtime dengan document.currentScript | ✔ | ✔ |  |
| K05-2 | skrip lain tidak diubah dan tetap berjalan langsung | ✔ | ✔ |  |

### L01 WooCommerce (8/8)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| L01-0 | WooCommerce aktif untuk pengujian |  |  | ✔ |
| L01-1 | toko memakai tata letak halaman tema dengan kartu produk bergaya kartu pos | ✔ | ✔ |  |
| L01-2 | tombol dan kolom urutan memakai gaya tema | ✔ | ✔ |  |
| L01-3 | halaman produk: judul, harga beraksen, label diskon, tab, produk terkait; dua kolom di desktop | ✔ | ✔ |  |
| L01-4 | keranjang (blok) memakai tata letak dan warna tema tanpa luapan | ✔ | ✔ |  |
| L01-5 | checkout memakai field bergaya tema tanpa luapan | ✔ | ✔ |  |
| L01-6 | akun: formulir masuk bergaya kartu dan tombol tema tanpa luapan | ✔ | ✔ |  |
| L01-7 | mode gelap: toko mengikuti warna tema (latar kartu gelap) | ✔ | ✔ |  |

### L02 Polylang dan WPML (4/4)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| L02-1 | tiga teks bebas (notifikasi, judul populer, judul terkait) terdaftar di Polylang grup "WPlus UI" |  |  | ✔ |
| L02-2 | terjemahan Indonesia tampil di ?lang=id dan teks asli di ?lang=en |  |  | ✔ |
| L02-3 | WPML: teks diterjemahkan lewat filter wpml_translate_single_string (API saja; plugin berbayar tidak diuji) |  |  | ✔ |
| L02-4 | wpml-config.xml mencakup tema induk dan child untuk empat teks |  |  | ✔ |

### L03 Contact Form 7 (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| L03-1 | Contact Form 7 aktif dan diuji pada D05 (trace-d.mjs) |  |  | ✔ |

### L04 Child theme (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| L04-1 | aktivasi pertama (pada permintaan berikutnya) menyalin pengaturan induk; nilai yang sudah ada di child menang |  |  | ✔ |
| L04-2 | lokasi menu ikut |  |  | ✔ |
| L04-3 | stylesheet induk lalu child dimuat dan widget ikut | ✔ | ✔ |  |

### L05 Siap terjemahan (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| L05-1 | domain teks wplus-ui dan berkas .pot memuat semua teks tema |  |  | ✔ |
| L05-2 | skrip editor memakai terjemahan (wp_set_script_translations dengan domain wplus-ui) |  |  | ✔ |

### M01 Konten demo (2/2)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| M01-1 | XML dibaca WordPress Importer: 19 pos, 2 halaman (About, Cookie Policy), 25 item menu, 10 kategori, 1 tag |  |  | ✔ |
| M01-2 | 30 gambar demo ikut paket demo (folder demo-content), tidak ikut zip tema (.distignore) |  |  | ✔ |

### M02 Selesaikan demo (3/3)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| M02-1 | Selesaikan demo dijalankan dua kali: jumlah pos, halaman, lampiran, menu, item menu, sticky, gambar unggulan tidak berubah |  |  | ✔ |
| M02-2 | hasil: pos sticky ada, 19 gambar unggulan, 3 menu |  |  | ✔ |
| M02-3 | menimpa pengaturan Customizer dengan nilai demo (teks notifikasi buatan pemilik diganti teks demo) |  |  | ✔ |

### M03 Paket demo terpisah (13/13)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| M03-1 | zip tema tanpa konten demo dan kecil (1.24 MB < 2 MB), hanya berisi logo dan 7 gambar galeri di assets/images (dirujuk teks pos demo lama); paket demo terpisah berisi XML, skrip impor, README dan 30 gambar |  |  | ✔ |
| M03-2 | tema terpasang dari zip tidak punya folder demo-content dan tidak menemukan konten demo |  |  | ✔ |
| M03-3 | halaman WPlus UI Demo tanpa paket: menawarkan "Download demo content" dan belum menampilkan langkah impor |  |  | ✔ |
| M03-4 | rilis tanpa paket demo: pesan "tidak ditemukan"; checksum salah: dibatalkan; keduanya tidak meninggalkan berkas |  |  | ✔ |
| M03-5 | unduh paket demo (checksum cocok): dibuka ke uploads/wplus-ui-demo dengan XML, skrip impor, 30 gambar; tautan XML menunjuk ke sana |  |  | ✔ |
| M03-6 | halaman WPlus UI Demo sesudah unduh: langkah impor dan "Finish demo setup" tampil, tombol unduh hilang |  |  | ✔ |
| M03-7 | impor XML dan "Finish demo setup" dari paket yang diunduh: 19 gambar unggulan, 3 menu (utama, tautan cepat, tautan bawah sidebar), 1 pos sticky, tidak ada lagi alamat gambar di folder tema, 7 gambar galeri masuk media library |  |  | ✔ |
| M03-8 | menjalankan "Finish demo setup" lagi tidak menggandakan lampiran |  |  | ✔ |
| M03-9 | gambar di pos demo (galeri) dimuat dari media library: semua alamat menjawab 200 |  |  | ✔ |
| M03-10 | situs hasil instal bersih + paket demo: 17 jenis halaman, desktop dan mobile, tanpa galat JavaScript |  |  | ✔ |
| M03-11 | log debug PHP kosong sepanjang pemasangan, unduh, impor, dan penelusuran halaman |  |  | ✔ |
| M03-12 | tujuh gambar galeri ada di folder tema (alamat lama di pos demo yang sudah diimpor sebelum pembaruan tetap berfungsi) |  |  | ✔ |
| M03-13 | impor demo kedua kali (impor sungguhan): pos, halaman, lampiran dan item menu tetap satu salinan; menu yang sudah terlanjur dobel oleh impor lama dibersihkan otomatis |  |  | ✔ |

### N01 Placeholder thumbnail (9/9)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| N01-1 dark desktop | gambar pengganti tampil di kartu, carousel, pinned, dan popular |  |  | ✔ |
| N01-1 dark mobile | gambar pengganti tampil di kartu, carousel, pinned, dan popular |  |  | ✔ |
| N01-1 light desktop | gambar pengganti tampil di kartu, carousel, pinned, dan popular |  |  | ✔ |
| N01-1 light mobile | gambar pengganti tampil di kartu, carousel, pinned, dan popular |  |  | ✔ |
| N01-2 | empat variasi gambar pengganti | ✔ | ✔ |  |
| N01-3 dark desktop | pengganti berupa gradasi warna aksen (radial-gradient) |  |  | ✔ |
| N01-3 dark mobile | pengganti berupa gradasi warna aksen (radial-gradient) |  |  | ✔ |
| N01-3 light desktop | pengganti berupa gradasi warna aksen (radial-gradient) |  |  | ✔ |
| N01-3 light mobile | pengganti berupa gradasi warna aksen (radial-gradient) |  |  | ✔ |

### N02 Tanggal singkat di kartu (1/1)

| Klaim | Pernyataan | Desktop | Mobile | Umum |
|---|---|---|---|---|
| N02-1 | tanggal diperbarui di kartu memakai format singkat (mis. "Okt 13, 2026") | ✔ | ✔ |  |

