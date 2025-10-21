# Website Sekolah Dasar Negeri 01 Pematang Baru

## Deskripsi 📖

Proyek ini adalah website full-stack modern untuk SDN 01 Pematang Baru. Tujuannya adalah untuk menyediakan pusat informasi yang mudah diakses bagi siswa, orang tua, dan masyarakat umum, serta mempermudah proses pendaftaran siswa baru dan pengumpulan kritik/saran. Website ini dilengkapi dengan panel admin untuk pengelolaan konten yang dinamis.

---

## Fitur Utama ✨

### Halaman Publik:
* **Beranda:** Tampilan utama dengan *hero section*, sambutan kepala sekolah, visi & misi, pratinjau berita terbaru, dan slider galeri kegiatan.
* **Galeri:** Menampilkan semua foto kegiatan sekolah dalam layout *masonry* yang menarik. Gambar dapat diperbesar saat diklik.
* **Berita:** Menampilkan daftar semua postingan berita atau informasi dalam bentuk kartu. Detail berita dapat dilihat dalam modal/pop-up.
* **Guru & Staff:** Menampilkan profil kepala sekolah secara menonjol, diikuti oleh daftar guru dan staff lainnya.
* **E-Book:** Fitur pencarian buku digital menggunakan Google Books API.
* **Kontak:** Berisi informasi kontak sekolah, peta lokasi (iframe), bagian FAQ (Frequently Asked Questions), dan formulir "Kritik dan Saran".
* **Pendaftaran:** Formulir online untuk pendaftaran siswa baru.

### Panel Admin:
* **Login Aman:** Halaman login khusus untuk admin.
* **Dashboard:** Tampilan ringkasan setelah login.
* **Manajemen Pendaftar:** Menampilkan data semua calon siswa yang mendaftar melalui formulir publik, dengan detail yang bisa dilihat dalam modal. Admin dapat menghapus data pendaftar.
* **Manajemen Galeri:** Antarmuka untuk mengunggah gambar baru (dengan caption opsional) dan menghapus gambar dari galeri publik.
* **Manajemen Berita:** Antarmuka CRUD (Create, Read, Update, Delete) penuh untuk mengelola postingan berita, termasuk unggah gambar unggulan.
* **Manajemen Guru:** Antarmuka CRUD penuh untuk mengelola data guru dan staff, termasuk foto dan penetapan kepala sekolah.
* **Lihat Saran:** Menampilkan semua pesan kritik dan saran yang masuk dari formulir kontak. Admin dapat menghapus saran.

---

## Teknologi yang Digunakan 🛠️

* **Database:** Supabase (PostgreSQL + Storage)
* **Backend:** Node.js, Express.js
* **Frontend:** React.js (dibuat dengan Vite)
* **Styling:** Tailwind CSS
* **Komponen UI:** ShadCN UI
* **HTTP Client:** Axios
* **File Upload Handling (Backend):** Multer

---

## Cara Menjalankan Proyek Secara Lokal 🚀

**Prasyarat:**
* Node.js (v18 atau lebih baru) & npm
* Akun Supabase

**Langkah-langkah:**

1.  **Clone Repository:**
    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```
2.  **Setup Supabase:**
    * Buat proyek baru di Supabase.
    * Jalankan skrip SQL (yang telah disediakan sebelumnya) di **SQL Editor** untuk membuat tabel (`guru`, `postingan`, `galeri`, `pendaftaran`, `saran`).
    * Buat **Storage Bucket** publik bernama `school-assets`.
    * Atur **Policies** untuk Storage Bucket agar mengizinkan SELECT publik (`anon`) serta INSERT dan DELETE untuk pengguna terotentikasi (`authenticated`).
    * Salin **Project URL**, **anon key**, dan **service_role key** dari **Project Settings > API**.
3.  **Konfigurasi Backend:**
    * Masuk ke folder `backend`.
    * Buat file `.env` dan isi sesuai contoh, gunakan **service_role key** untuk `SUPABASE_KEY`.
    ```.env
    SUPABASE_URL=URL_PROYEK_SUPABASE_ANDA
    SUPABASE_KEY=SERVICE_ROLE_KEY_ANDA
    PORT=5001
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=admin123
    ```
    * Jalankan `npm install`.
4.  **Konfigurasi Frontend:**
    * Masuk ke folder `frontend`.
    * Buat file `.env` (jika diperlukan, meskipun saat ini tidak ada variabel khusus frontend).
    * Jalankan `npm install`.
5.  **Jalankan Server:**
    * Di terminal pertama (dalam folder `backend`), jalankan `npm run dev`.
    * Di terminal kedua (dalam folder `frontend`), jalankan `npm run dev`.
6.  **Akses Aplikasi:** Buka `http://localhost:5173` di browser Anda.

---


Akses halaman `/login` untuk masuk ke panel admin.

---

Selamat menjelajahi dan mengembangkan proyek ini! 🎉
