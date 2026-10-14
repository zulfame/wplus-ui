# Dokumentasi WPlus UI untuk WordPress

| Dokumen | Isi | Status |
|---|---|---|
| [FITUR.md](FITUR.md) | Semua fitur tema: tempat mengatur, bawaan, perilaku, berkas kode | batch 1 selesai, dikoreksi di batch 2 sampai 7 |
| [CEKLIS.md](CEKLIS.md) | Ceklis pengujian silang dokumen, kode, desktop 1280x720, dan mobile 390 per fitur | grup A sampai O |
| [TRACE.md](TRACE.md) | Penelusuran kalimat FITUR.md ke uji mesin: 382 klaim, hasil per ukuran layar (dibuat otomatis) | selesai |
| [PANDUAN.md](PANDUAN.md) | Panduan memakai semua fitur menurut tugas, langkah demi langkah, plus pemecahan masalah | batch 8 selesai |
| [KONFIGURASI.md](KONFIGURASI.md) | Saran konfigurasi WordPress, server, plugin, privasi, dan ceklis sebelum tayang; tiap saran berlabel Diukur / Dari kode / Aturan WordPress | batch 9 selesai |

Bahasa: Indonesia. Nama menu dan opsi tema ditulis seperti tampil di Customizer (bahasa Inggris).
Dokumen ini ada di folder `docs/` repo dan **tidak ikut** zip tema.

Skrip pengujian: `tests/docs/` (dijalankan dengan `node tests/docs/<berkas>.mjs`). Skrip `claims-*.mjs` memeriksa klaim FITUR.md satu per satu (LULUS/GAGAL).

Catatan: kunjungan oleh skrip uji menambah hitungan tayangan pos (`wplusui_views`), yang memengaruhi urutan Popular Posts. Situs uji mengunci tayangan 5 pos demo pada nilai besar agar urutannya stabil.
