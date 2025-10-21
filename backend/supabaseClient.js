// Mengimpor dan menginisialisasi Supabase client
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Membuat satu instance Supabase client untuk digunakan di seluruh aplikasi
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;