import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Pendaftaran from './pages/Pendaftaran.jsx';
import DataPendaftar from './pages/admin/DataPendaftar.jsx';
import ManajemenGaleri from './pages/admin/ManajemenGaleri.jsx';
import ManajemenPostingan from './pages/admin/ManajemenPostingan.jsx';
import ManajemenGuru from './pages/admin/ManajemenGuru.jsx';
import LihatSaran from './pages/admin/LihatSaran.jsx';
import Galeri from './pages/Galeri.jsx'; 
import Postingan from './pages/Postingan.jsx';
import Guru from './pages/Guru.jsx';
import Ebook from './pages/Ebook.jsx';
import Kontak from './pages/Kontak.jsx';




function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {!isAdminPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<Beranda />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/postingan" element={<Postingan />} />
          <Route path="/guru" element={<Guru />} />
          <Route path="/ebook" element={<Ebook />} />
          
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/login" element={<Login />} />
          {/* Rute duplikat untuk /kontak sudah dihapus */}

          {/* Rute Admin yang Diproteksi */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/pendaftaran" element={<ProtectedRoute><DataPendaftar /></ProtectedRoute>} />
          <Route path="/admin/galeri" element={<ProtectedRoute><ManajemenGaleri /></ProtectedRoute>} />
          <Route path="/admin/postingan" element={<ProtectedRoute><ManajemenPostingan /></ProtectedRoute>} />
          <Route path="/admin/guru" element={<ProtectedRoute><ManajemenGuru /></ProtectedRoute>} />
          <Route path="/admin/saran" element={<ProtectedRoute><LihatSaran /></ProtectedRoute>} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;