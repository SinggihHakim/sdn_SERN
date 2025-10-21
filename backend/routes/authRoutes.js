const express = require('express');
const router = express.Router();
require('dotenv').config();

// Endpoint untuk login admin
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // Di aplikasi nyata, gunakan JWT (JSON Web Token) untuk keamanan yang lebih baik
    // Untuk saat ini, kita kirim token sederhana
    res.status(200).json({ 
      message: 'Login berhasil', 
      token: 'secret-admin-token' // Token statis sederhana
    });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
});

module.exports = router;
