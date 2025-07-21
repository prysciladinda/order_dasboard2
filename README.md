# Order Dashboard

Order Dashboard adalah aplikasi web untuk memantau, mencari, dan memfilter daftar pesanan logistik secara real-time. Aplikasi ini dirancang untuk memudahkan pengguna dalam mengelola dan melacak pengiriman barang dari berbagai kota asal ke kota tujuan di seluruh Indonesia.

## Fitur Unggulan

- **Pencarian Cepat:**
  Cari pesanan berdasarkan nama barang dengan fitur search yang responsif dan real-time.

- **Filter Dinamis:**
  Filter pesanan berdasarkan kota asal (Origin) dan kota tujuan (Destination) menggunakan popover filter yang responsif, mudah digunakan di desktop maupun mobile.

- **Pagination:**
  Navigasi antar halaman pesanan dengan pagination yang intuitif.

- **Detail Pesanan:**
  Lihat detail setiap pesanan dengan informasi lengkap seperti ID, nama barang, kota asal, dan kota tujuan.

- **Responsif:**
  Tampilan web menyesuaikan dengan perangkat (mobile, tablet, desktop) untuk pengalaman pengguna terbaik.

- **Aksesibilitas:**
  Komponen UI didesain dengan memperhatikan kemudahan akses dan penggunaan keyboard.

## Teknologi yang Digunakan

- **React** (TypeScript) — Library utama untuk membangun UI.
- **Vite** — Build tool modern untuk pengembangan dan produksi.
- **Tailwind CSS** — Utility-first CSS framework untuk styling responsif.
- **Vercel** — Platform hosting dan deployment.

## Cara Menjalankan Project

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/prysciladinda/order-dashboard.git
   cd order-dashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan aplikasi secara lokal:**

   ```bash
   npm run dev
   ```

   Akses di [http://localhost:5173](http://localhost:5173)

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   Hasil build ada di folder `dist/`.

## Cara Deploy ke Vercel

1. Pastikan sudah login ke Vercel dan repo sudah di-push ke GitHub.
2. Import project di dashboard Vercel, pilih framework **Vite**.
3. Atur build command: `npm run build` dan output: `dist`.
4. Klik **Deploy**.

## Alur Penggunaan

1. **Cari pesanan** dengan mengetik nama barang di kolom pencarian.
2. **Gunakan filter** untuk memilih kota asal/tujuan, klik tombol "Filter".
3. **Navigasi halaman** dengan pagination di bawah daftar pesanan.
4. **Klik "Lihat Detail"** untuk melihat informasi lengkap pesanan.

## Keunggulan

- UI modern, ringan, dan mudah digunakan.
- Proses filter dan pencarian sangat cepat.
- Cocok untuk operasional logistik, admin, dan customer service.

## Kontribusi

Pull request dan issue sangat terbuka untuk pengembangan lebih lanjut.

---

**Order Dashboard** — Solusi modern untuk monitoring pesanan logistik Anda.
