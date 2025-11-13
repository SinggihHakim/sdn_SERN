const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Mengimpor semua file rute
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
// 1. Mengaktifkan CORS agar frontend bisa mengakses backend
app.use(cors()); 

// 2. Mengizinkan server untuk membaca data JSON dari request
app.use(express.json()); 

// Menggunakan Rute
// Semua rute di authRoutes akan diawali dengan /api/auth
app.use('/api/auth', authRoutes); 

// Semua rute di publicRoutes akan diawali dengan /api
app.use('/api', publicRoutes); 

// Semua rute di adminRoutes akan diawali dengan /api/admin
app.use('/api/admin', adminRoutes);

// Rute dasar untuk mengecek apakah server berjalan
app.get("/", (req, res) => {
  res.send("Server backend sekolah berjalan dengan baik.");
});

app.listen(port, () => {
  console.log(`Server backend berjalan di http://localhost:${port}`);
});

