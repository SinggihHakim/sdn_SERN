
<div align="center">

# 🏫 Website SDN 01 Pematang Baru

**Platform Informasi Digital Terintegrasi & Manajemen Sekolah**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

[Demo (Coming Soon)] • [Laporkan Bug] • [Request Fitur]

</div>

---

## 📖 Tentang Proyek

**Website SDN 01 Pematang Baru** adalah solusi *full-stack* modern yang dirancang untuk menjembatani komunikasi antara sekolah, wali murid, dan masyarakat. Website ini tidak hanya berfungsi sebagai papan informasi digital, tetapi juga memfasilitasi proses pendaftaran siswa baru secara online dan menampung aspirasi masyarakat.

Dilengkapi dengan **Panel Admin** yang intuitif, pengelolaan konten sekolah menjadi lebih mudah, cepat, dan aman tanpa memerlukan keahlian koding.

---

## ✨ Fitur Unggulan

### 🌍 Halaman Publik (Frontend)
Halaman yang dapat diakses oleh siapa saja dengan antarmuka yang responsif.

| Fitur | Deskripsi |
| :--- | :--- |
| 🏠 **Beranda Interaktif** | Hero section, sambutan kepala sekolah, visi-misi, dan highlight berita terbaru. |
| 🖼️ **Galeri Masonry** | Tampilan foto kegiatan sekolah yang estetis dengan fitur *lightbox* (zoom). |
| 📰 **Portal Berita** | Daftar pengumuman dan artikel sekolah dengan detail *pop-up* yang cepat. |
| 👥 **Direktori Staff** | Profil lengkap Kepala Sekolah, Guru, dan Staff Tata Usaha. |
| 📚 **E-Library** | Pencarian buku digital terintegrasi langsung dengan **Google Books API**. |
| 📝 **PPDB Online** | Formulir pendaftaran siswa baru yang mudah digunakan. |
| 🗺️ **Pusat Kontak** | Integrasi Google Maps, FAQ, dan formulir "Kritik & Saran". |

### 🛡️ Panel Admin (Dashboard)
Area terbatas untuk pengelolaan data sekolah.

* 🔐 **Otentikasi Aman:** Login khusus administrator.
* 📊 **Dashboard Ringkasan:** Statistik cepat data sekolah.
* 📝 **Manajemen Pendaftar:** Lihat, kelola, dan hapus data calon siswa baru.
* 📸 **Manajemen Galeri:** Upload foto kegiatan dan atur caption dengan mudah.
* 📰 **CMS Berita:** Buat, edit, dan hapus berita (mendukung upload gambar).
* 👨‍🏫 **Manajemen Guru:** Tambah dan update data pengajar serta struktur organisasi.
* 📩 **Kotak Saran:** Pantau masukan dari masyarakat.

---

## 📸 Tangkapan Layar (Screenshots)

<div align="center">
  <img width="2471" height="1402" alt="image" src="https://github.com/user-attachments/assets/53f3da24-87af-476c-8f06-a977c99772af" />
  <img width="2473" height="1406" alt="image" src="https://github.com/user-attachments/assets/9540f482-ecb6-4939-b46c-9bd18869450a" />
  <img width="2464" height="1401" alt="image" src="https://github.com/user-attachments/assets/4918f709-b98d-4d5c-bb62-4d46554cdaa5" />
  <img width="2493" height="1406" alt="image" src="https://github.com/user-attachments/assets/c30aee0c-f825-4dcb-a192-236a7c0e4b5f" />
  <img width="2467" height="1402" alt="image" src="https://github.com/user-attachments/assets/9233c61f-761c-485e-bcbe-826e8f2c6222" />
  <img width="2474" height="1402" alt="image" src="https://github.com/user-attachments/assets/c8e5f434-ab45-4242-860e-24425601593d" />
  <img width="2470" height="1396" alt="image" src="https://github.com/user-attachments/assets/2b20be95-b5fa-46ef-9360-f9ca073d2232" />





</div>

---

## 🛠️ Teknologi (Tech Stack)

Proyek ini dibangun menggunakan arsitektur **Monorepo** (Frontend & Backend terpisah folder):

* **Frontend:** React.js (Vite), Tailwind CSS, ShadCN UI, Axios.
* **Backend:** Node.js, Express.js, Multer (File Handling).
* **Database & Storage:** Supabase (PostgreSQL).

---

## 📂 Struktur Folder

```text
sdn-01-pematang-baru/
├── backend/            # Server-side logic (Express)
│   ├── index.js        # Entry point
│   ├── .env            # Config backend (Supabase keys)
│   └── ...
├── frontend/           # Client-side UI (React + Vite)
│   ├── src/
│   ├── .env            # Config frontend
│   └── ...
└── README.md           # Dokumentasi ini

```

---

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer Anda.

### 1. Prasyarat

Pastikan Anda telah menginstal:

* [Node.js](https://nodejs.org/) (v18+)
* Git

### 2. Persiapan Database (Supabase)

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com/).
2. Buka **SQL Editor** dan jalankan query pembuatan tabel (`guru`, `postingan`, `galeri`, `pendaftaran`, `saran`).
3. Buat **Storage Bucket** baru bernama `school-assets` (Public).
4. Atur **Policies** bucket: `SELECT` untuk public, `INSERT/DELETE` untuk authenticated.
5. Salin **URL**, **Anon Key**, dan **Service Role Key** dari menu *Project Settings > API*.

### 3. Instalasi & Konfigurasi

#### A. Setup Backend

```bash
cd backend
npm install

```

Buat file `.env` di dalam folder `backend` dan isi:

```env
SUPABASE_URL=[https://project-id.supabase.co](https://project-id.supabase.co)
SUPABASE_KEY=service-role-key-anda
PORT=5001
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

```

#### B. Setup Frontend

```bash
cd ../frontend
npm install

```

### 4. Menjalankan Server

Buka dua terminal terpisah:

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev

```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev

```

Buka browser dan akses: `http://localhost:5173`

> **Catatan Login Admin:**
> Gunakan kredensial default yang Anda atur di `.env` backend (Contoh: `admin` / `admin123`) di halaman `/login`.

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat *Pull Request* atau buka *Issue* jika menemukan bug.

1. Fork repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur-keren`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4. Push ke branch (`git push origin fitur-keren`).
5. Buat Pull Request.

---

<div align="center">

Dibuat dengan ❤️ untuk kemajuan pendidikan SDN 01 Pematang Baru.

</div>

```

