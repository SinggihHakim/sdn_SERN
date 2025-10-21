const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Endpoint untuk mengambil semua data guru
router.get('/guru', async (req, res) => {
  try {
    const { data, error } = await supabase.from('guru').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk mengambil semua data postingan, diurutkan dari yang terbaru
router.get('/postingan', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('postingan')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk mengambil semua foto dari galeri
router.get('/galeri', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error di GET /api/galeri (publik):", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk menerima data pendaftaran yang sudah diperbarui
router.post('/pendaftaran', async (req, res) => {
  const { 
    nama_lengkap, 
    jenis_kelamin, 
    alamat, 
    rt_rw, 
    kecamatan, 
    kota, 
    provinsi, 
    nama_wali, 
    no_hp 
  } = req.body;

  // Validasi sederhana untuk field-field utama
  if (!nama_lengkap || !nama_wali || !no_hp) {
    return res.status(400).json({ error: 'Nama Lengkap, Nama Wali, dan No. HP wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .insert([{ 
        nama_lengkap, 
        jenis_kelamin, 
        alamat, 
        rt_rw, 
        kecamatan, 
        kota, 
        provinsi, 
        nama_wali, 
        no_hp 
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Pendaftaran berhasil diterima', data: data });
  } catch (error) {
    console.error('Supabase error saat pendaftaran:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk menerima data dari form kritik dan saran
router.post('/saran', async (req, res) => {
  const { nama, email, subjek, pesan } = req.body;

  if (!nama || !email || !pesan || !subjek) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('saran')
      .insert([{ nama, email, subjek, pesan }]);
    
    if (error) throw error;

    res.status(201).json({ message: 'Saran Anda berhasil dikirim. Terima kasih!' });
  } catch (error) {
    console.error('Supabase error saat mengirim saran:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;