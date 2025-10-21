const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const multer = require('multer');

// Konfigurasi Multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware untuk melindungi rute admin
const protectedRoute = (req, res, next) => {
  // Di aplikasi nyata, gunakan verifikasi token yang lebih aman (misal: JWT)
  const token = req.headers['authorization'];
  if (token === 'Bearer secret-admin-token') {
    next();
  } else {
    res.status(403).json({ message: 'Akses ditolak: Token tidak valid.' });
  }
};

// Terapkan middleware ke semua rute di file ini
router.use(protectedRoute);

// --- ENDPOINT PENDAFTARAN  ---
router.get('/pendaftaran', async (req, res) => {
  const { data, error } = await supabase.from('pendaftaran').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

router.delete('/pendaftaran/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('pendaftaran').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: `Data pendaftar dengan ID ${id} berhasil dihapus.` });
});


// --- ENDPOINT MANAJEMEN GALERI (Lengkap) ---

// READ: Mengambil semua gambar dari galeri
router.get('/galeri', async (req, res) => {
  try {
    const { data, error } = await supabase.from('galeri').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch(error) {
    console.error("Error di GET /admin/galeri:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE: Mengunggah gambar baru
router.post('/galeri', upload.single('image'), async (req, res) => {
  const { file } = req;
  const { caption } = req.body;
  if (!file) {
    return res.status(400).json({ error: 'Tidak ada file yang diunggah.' });
  }
  const fileName = `${Date.now()}-${file.originalname}`;

  try {
    // 1. Unggah file ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('school-assets') // Pastikan nama bucket ini benar
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      throw uploadError;
    }

    // 2. Dapatkan URL publik
    const { data: publicUrlData } = supabase.storage
      .from('school-assets')
      .getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;

    // 3. Simpan URL ke tabel 'galeri'
    const { data: dbData, error: dbError } = await supabase
      .from('galeri')
      .insert({ foto_url: publicUrl, caption: caption })
      .select()
      .single();
      
    if (dbError) {
      console.error("Supabase Database Insert Error:", dbError);
      throw dbError;
    }

    res.status(201).json({ message: 'Gambar berhasil diunggah', data: dbData });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan di server saat mengunggah file.", details: error.message });
  }
});

// DELETE: Menghapus gambar
router.delete('/galeri/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Ambil data gambar dari DB untuk mendapatkan URL-nya
    const { data: imageData, error: selectError } = await supabase
      .from('galeri')
      .select('foto_url')
      .eq('id', id)
      .single();
    
    if (selectError || !imageData) {
      throw new Error('Gambar tidak ditemukan di database.');
    }

    // 2. Hapus file dari Supabase Storage
    const fileName = imageData.foto_url.split('/').pop();
    await supabase.storage.from('school-assets').remove([fileName]);
    
    // 3. Hapus record dari tabel 'galeri'
    await supabase.from('galeri').delete().eq('id', id);

    res.status(200).json({ message: `Gambar dengan ID ${id} berhasil dihapus.` });
  } catch (error) {
    console.error("Gagal menghapus gambar:", error);
    res.status(500).json({ error: error.message });
  }
});
router.put('/galeri/:id', async (req, res) => {
  const { id } = req.params;
  const { caption } = req.body; // Kita hanya butuh caption dari body

  // Validasi sederhana
  if (typeof caption === 'undefined') {
    return res.status(400).json({ message: 'Caption harus disertakan.' });
  }

  try {
    const { data, error } = await supabase
      .from('galeri')
      .update({ caption: caption })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    res.status(200).json({ message: 'Caption berhasil diperbarui', data });
  } catch (error) {
    console.error("Gagal memperbarui caption:", error);
    res.status(500).json({ error: error.message });
  }
});

// READ: Mengambil semua postingan
router.get('/postingan', async (req, res) => {
  try {
    const { data, error } = await supabase.from('postingan').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE: Membuat postingan baru dengan gambar
router.post('/postingan', upload.single('image'), async (req, res) => {
  const { judul, deskripsi, kategori, tanggal_text } = req.body;
  const { file } = req;

  // --- PERBAIKAN DI SINI: Tambahkan blok validasi ---
  if (!judul || judul.trim() === '') {
    return res.status(400).json({ message: "Judul postingan wajib diisi." });
  }
  // ------------------------------------------------

  let foto_url = null;

  try {
    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const { error: uploadError } = await supabase.storage.from('school-assets').upload(fileName, file.buffer, { contentType: file.mimetype });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('school-assets').getPublicUrl(fileName);
      foto_url = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('postingan')
      .insert({ judul, deskripsi, kategori, tanggal_text, foto_url })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json({ message: 'Postingan berhasil dibuat', data });
  } catch (error) {
    console.error("Supabase insert/upload error:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal saat menyimpan postingan.", details: error.message });
  }
});

// UPDATE: Memperbarui postingan yang ada
router.put('/postingan/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, kategori, tanggal_text } = req.body;
  const { file } = req;

  // --- PERBAIKAN DI SINI: Tambahkan blok validasi ---
  if (!judul || judul.trim() === '') {
    return res.status(400).json({ message: "Judul postingan wajib diisi." });
  }
  // ------------------------------------------------

  let updateData = { judul, deskripsi, kategori, tanggal_text };

  try {
    if (file) {
      const { data: oldPost } = await supabase.from('postingan').select('foto_url').eq('id', id).single();
      if (oldPost && oldPost.foto_url) {
        const oldFileName = oldPost.foto_url.split('/').pop();
        await supabase.storage.from('school-assets').remove([oldFileName]);
      }
      const newFileName = `${Date.now()}-${file.originalname}`;
      await supabase.storage.from('school-assets').upload(newFileName, file.buffer, { contentType: file.mimetype });
      const { data: publicUrlData } = supabase.storage.from('school-assets').getPublicUrl(newFileName);
      updateData.foto_url = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('postingan')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    res.status(200).json({ message: 'Postingan berhasil diperbarui', data });
  } catch (error) {
    console.error("Gagal memperbarui postingan:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal saat memperbarui.", details: error.message });
  }
});

// DELETE: Menghapus postingan
router.delete('/postingan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: postData } = await supabase.from('postingan').select('foto_url').eq('id', id).single();
    if (postData && postData.foto_url) {
      const fileName = postData.foto_url.split('/').pop();
      await supabase.storage.from('school-assets').remove([fileName]);
    }

    await supabase.from('postingan').delete().eq('id', id);
    res.status(200).json({ message: `Postingan berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus postingan.", details: error.message });
  }
});

// READ: Mengambil semua data guru
router.get('/guru', async (req, res) => {
  try {
    const { data, error } = await supabase.from('guru').select('*').order('is_kepala_sekolah', { ascending: false });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transaksi untuk memastikan hanya ada satu kepala sekolah
const setKepalaSekolah = async (newKepsekId) => {
  // 1. Hapus status kepala sekolah dari semua guru lain
  await supabase.from('guru').update({ is_kepala_sekolah: false }).neq('id', newKepsekId);
  // 2. Tetapkan guru baru sebagai kepala sekolah
  await supabase.from('guru').update({ is_kepala_sekolah: true }).eq('id', newKepsekId);
};

// CREATE: Menambah guru baru
router.post('/guru', upload.single('image'), async (req, res) => {
  const { nama, jabatan, is_kepala_sekolah } = req.body;
  const { file } = req;
  if (!nama || !jabatan) {
    return res.status(400).json({ message: "Nama dan Jabatan wajib diisi." });
  }
  try {
    let foto_url = null;
    if (file) {
      const fileName = `guru-${Date.now()}-${file.originalname}`;
      await supabase.storage.from('school-assets').upload(fileName, file.buffer, { contentType: file.mimetype });
      const { data: urlData } = supabase.storage.from('school-assets').getPublicUrl(fileName);
      foto_url = urlData.publicUrl;
    }
    const { data, error } = await supabase.from('guru').insert({ nama, jabatan, foto_url }).select().single();
    if (error) throw error;
    if (is_kepala_sekolah === 'true') {
      await setKepalaSekolah(data.id);
    }
    const { data: finalData } = await supabase.from('guru').select('*').eq('id', data.id).single();
    res.status(201).json({ message: 'Guru berhasil ditambahkan', data: finalData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Memperbarui data guru
router.put('/guru/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { nama, jabatan, is_kepala_sekolah } = req.body;
    const { file } = req;
    let updateData = { nama, jabatan };

    try {
        if (file) {
            const { data: oldData } = await supabase.from('guru').select('foto_url').eq('id', id).single();
            if (oldData && oldData.foto_url) {
                const oldFileName = oldData.foto_url.split('/').pop();
                await supabase.storage.from('school-assets').remove([oldFileName]);
            }
            const newFileName = `guru-${Date.now()}-${file.originalname}`;
            await supabase.storage.from('school-assets').upload(newFileName, file.buffer, { contentType: file.mimetype });
            const { data: urlData } = supabase.storage.from('school-assets').getPublicUrl(newFileName);
            updateData.foto_url = urlData.publicUrl;
        }

        // Terapkan update untuk data teks terlebih dahulu
        await supabase.from('guru').update(updateData).eq('id', id);

        // Jika user ingin menjadikan guru ini kepala sekolah, jalankan transaksi
        if (is_kepala_sekolah === 'true') {
            await setKepalaSekolah(id);
        }

        // Ambil kembali data terbaru untuk memastikan status kepsek akurat
        const { data: finalData, error: finalError } = await supabase.from('guru').select('*').eq('id', id).single();
        if (finalError) throw finalError;

        res.status(200).json({ message: 'Data guru berhasil diperbarui', data: finalData });
    } catch (error) {
        console.error("Gagal memperbarui data guru:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Menghapus data guru
router.delete('/guru/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: oldData } = await supabase.from('guru').select('foto_url').eq('id', id).single();
    if (oldData && oldData.foto_url) {
        const fileName = oldData.foto_url.split('/').pop();
        await supabase.storage.from('school-assets').remove([fileName]);
    }
    await supabase.from('guru').delete().eq('id', id);
    res.status(200).json({ message: `Guru berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Mengambil semua data saran
router.get('/saran', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('saran')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Menghapus data saran
router.delete('/saran/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('saran').delete().eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: `Saran berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;