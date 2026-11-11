# Website Ruang Seduh Coffee

Website landing page coffee shop responsif (desktop, tablet, dan smartphone), menggunakan HTML, CSS, dan JavaScript murni. Tidak memerlukan instalasi aplikasi atau framework.

## Cara menjalankan
1. Ekstrak folder `ruang-seduh-coffee`.
2. Buka file `index.html` menggunakan browser (Chrome, Firefox, Edge, atau Safari).
3. Koneksi internet diperlukan untuk memuat foto dari Unsplash dan font Google Fonts.

## WAJIB disesuaikan sebelum dipublikasikan
Buka file `script.js`, lalu ubah bagian `SHOP_CONFIG` di baris paling atas:

- `name`: nama coffee shop.
- `whatsapp`: nomor WhatsApp bisnis format internasional tanpa tanda `+` dan tanpa angka `0` di depan. Contoh format: `6281234567890` (gunakan nomor milik usaha Anda).
- `address`: alamat lengkap usaha.
- `hours`: jam operasional.
- `phoneDisplay`: nomor yang ditampilkan pada halaman.
- `mapsUrl`: tautan lokasi Google Maps usaha.
- `instagramUrl`: tautan akun Instagram usaha.

Nomor WhatsApp contoh pada file sengaja belum dianggap sebagai nomor aktif. Tombol checkout akan memberi peringatan sampai Anda menggantinya dengan nomor bisnis yang benar.

## Mengubah menu dan harga
Setiap produk berada di dalam elemen `<article class="product-card">` pada `index.html`. Ubah:
- `data-id`: ID unik produk.
- `data-category`: `coffee`, `noncoffee`, atau `food`.
- `data-name`: nama produk.
- `data-price`: harga angka tanpa titik/koma.
- Judul, deskripsi, dan harga yang terlihat pada kartu produk.

Foto produk menggunakan URL gambar Unsplash di `style.css`. Anda dapat mengganti URL pada kelas `.img-aren`, `.img-latte`, dan seterusnya dengan URL foto produk sendiri.

## Cara publikasi online
Unggah seluruh isi folder ini ke layanan hosting statis seperti Netlify, GitHub Pages, atau cPanel hosting. Pastikan `index.html`, `style.css`, dan `script.js` tetap berada di folder yang sama.

## Fitur
- Tampilan responsif.
- Navigasi mobile.
- Filter kategori menu.
- Keranjang belanja dengan tambah/kurang jumlah.
- Perhitungan total otomatis.
- Checkout yang menyusun pesan pesanan ke WhatsApp.
- Informasi alamat, jam operasional, Google Maps, dan Instagram yang dapat diedit.
