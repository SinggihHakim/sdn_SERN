import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageSlider from "@/components/ImageSlider";

// Import foto dari assets
import fotoKepsek from "../assets/kepsek.jpg";
import berita1 from "../assets/kkn unila.jpg";
import berita2 from "../assets/pramuka sd.jpg";
import berita3 from "../assets/9.jpg";

const Beranda = () => {
  const [kepsek, setKepsek] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    siswa: 0,
    guru: 0,
    prestasi: 0,
    fasilitas: 0,
  });

  // berita dummy manual (fallback jika tidak ada API)
  const beritaDummy = [
    {
      foto: berita1,
      judul: "Kegiatan Upacara Bendera",
      deskripsi: "Upacara bendera rutin setiap hari Senin untuk menumbuhkan rasa nasionalisme siswa.",
      tanggal: "25 September 2025",
    },
    {
      foto: berita2,
      judul: "Prestasi Siswa dalam Olimpiade",
      deskripsi: "Siswa SDN 01 Pematang Baru berhasil meraih juara dalam Olimpiade Sains tingkat kabupaten.",
      tanggal: "26 September 2025",
    },
    {
      foto: berita3,
      judul: "Gotong Royong Bersama",
      deskripsi: "Seluruh warga sekolah melaksanakan kegiatan bersih-bersih lingkungan sekolah secara rutin.",
      tanggal: "27 September 2025",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const guruRes = await axios.get("http://localhost:5001/api/guru");
        setKepsek(guruRes.data.find((g) => g.is_kepala_sekolah));

        const postRes = await axios.get("http://localhost:5001/api/postingan");
        setPosts(postRes.data.slice(0, 3));

        // contoh data statistik
        setStats({
          siswa: 325,
          guru: 28,
          prestasi: 47,
          fasilitas: 12,
        });
      } catch (error) {
        console.error("Gagal mengambil data dari server:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"
          style={{
            backgroundImage: "url('https://singgihhakim.github.io/sdn1pematangbaru/images/foto%205.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="pt-10 text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-xl">
            Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">SDN 01 Pematang Baru</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">Menjadi sekolah unggulan yang mencetak generasi berkarakter, berprestasi, dan berwawasan lingkungan.</p>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/pendaftaran" className="px-8 py-4 bg-red-800 text-white font-bold rounded-full shadow-lg hover:bg-orange-950 transition duration-300">
              Daftar Sekarang
            </a>
            <a href="#sambutan" className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full shadow-lg hover:bg-white/30 transition duration-300">
              Jelajahi Sekolah
            </a>
          </div>
        </div>
      </section>
      {/* Statistik Sekolah */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">SDN 01 Pematang Baru dalam Angka</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Siswa", value: stats.siswa, icon: "👨‍🎓" },
              { label: "Guru & Staff", value: stats.guru, icon: "👩‍🏫" },
              { label: "Prestasi", value: stats.prestasi, icon: "🏆" },
              { label: "Fasilitas", value: stats.fasilitas, icon: "🏫" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{item.value}+</div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Visi dan Misi Section */}{" "}
      <section id="visi-misi" className="py-20 bg-white">
        {" "}
        <div className="container mx-auto px-4">
          {" "}
          <div className="text-center mb-16">
            {" "}
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visi dan Misi Sekolah</h2> <p className="text-xl text-gray-600 max-w-3xl mx-auto"> Pedoman dan arah pendidikan yang menjadi landasan dalam mencetak generasi unggul </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {" "}
            {/* Visi Card */}{" "}
            <div className="relative">
              {" "}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-50"></div>{" "}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-50"></div>{" "}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                {" "}
                <div className="flex items-center mb-6">
                  {" "}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                    {" "}
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {" "}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />{" "}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />{" "}
                    </svg>{" "}
                  </div>{" "}
                  <h3 className="text-2xl font-bold text-gray-800">Visi Sekolah</h3>{" "}
                </div>{" "}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                  {" "}
                  <p className="text-lg text-gray-700 leading-relaxed italic"> "Terwujudnya peserta didik Berakhlak, Berkwalitas, sehat Berprestasi yang Berlandaskan Iman dan Takwa." </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Misi Card */}{" "}
            <div className="relative">
              {" "}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-50"></div>{" "}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-50"></div>{" "}
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-100">
                {" "}
                <div className="flex items-center mb-6">
                  {" "}
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                    {" "}
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />{" "}
                    </svg>{" "}
                  </div>{" "}
                  <h3 className="text-2xl font-bold text-gray-800">Misi Sekolah</h3>{" "}
                </div>{" "}
                <div className="space-y-4">
                  {" "}
                  {[
                    "Menanamkan keimanan dan ketakwaan melalui pengamalan ajaran agama",
                    "Menanamkan budaya disiplin, sopan santun, literasi, dan cinta lingkungan hidup",
                    "Mengoptimalkan proses belajar dan bimbingan",
                    "Mengembangkan bidang ilmu pengetahuan dan teknologi berdasarkan minat, bakat dan potensi peserta didik",
                  ].map((misi, index) => (
                    <div key={index} className="flex items-start bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                      {" "}
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        {" "}
                        <span className="text-sm font-bold">{index + 1}</span>{" "}
                      </div>{" "}
                      <p className="text-gray-700 leading-relaxed">{misi}</p>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Nilai-nilai Tambahan */}{" "}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {" "}
            {[
              { icon: "⭐", title: "Berakhlak Mulia", description: "Pendidikan karakter yang mengedepankan nilai-nilai moral dan etika" },
              { icon: "🎯", title: "Berkualitas", description: "Proses pembelajaran yang bermutu dan berstandar nasional" },
              { icon: "🏆", title: "Berprestasi", description: "Mendorong siswa untuk meraih prestasi akademik dan non-akademik" },
            ].map((nilai, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                {" "}
                <div className="text-4xl mb-4">{nilai.icon}</div> <h4 className="text-xl font-bold text-gray-800 mb-2">{nilai.title}</h4> <p className="text-gray-600">{nilai.description}</p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* Sambutan Kepala Sekolah */}{" "}
      {kepsek && (
        <section id="sambutan" className="py-20 bg-gray-50">
          {" "}
          <div className="container mx-auto px-4">
            {" "}
            <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
              {" "}
              <div className="lg:w-2/5 mb-10 lg:mb-0 relative">
                {" "}
                <div className="relative z-10 w-[300px] mx-auto">
                  {" "}
                  <img src={fotoKepsek} alt={kepsek.nama} className="w-full max-w-md mx-auto rounded-2xl shadow-2xl" />{" "}
                </div>{" "}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-primary to-red-500 rounded-full opacity-10 z-0"></div>{" "}
              </div>{" "}
              <div className="lg:w-3/5 lg:pl-12">
                {" "}
                <h2 className="text-4xl font-bold mb-6 text-gray-800">Sambutan Kepala Sekolah</h2>{" "}
                <div className="relative mb-8">
                  {" "}
                  <div className="absolute -left-4 top-0 text-6xl text-primary opacity-30">"</div>{" "}
                  <p className="text-xl text-gray-700 leading-relaxed pl-8">
                    {" "}
                    "Selamat datang di website resmi SDN 01 Pematang Baru. Kami berkomitmen untuk memberikan pendidikan terbaik yang mengembangkan potensi akademik, karakter, dan kreativitas setiap siswa. Dengan pendekatan pembelajaran yang
                    menyenangkan dan berorientasi pada masa depan, kami siap membimbing putra-putri Anda menjadi generasi unggul yang siap menghadapi tantangan global."{" "}
                  </p>{" "}
                  <div className="absolute -right-4 bottom-0 text-6xl text-primary opacity-30">"</div>{" "}
                </div>{" "}
                <div className="border-l-4 border-primary pl-4">
                  {" "}
                  <h4 className="font-bold text-2xl text-gray-800">Sumarno, S.Pd. SD</h4> <p className="text-gray-600 text-lg">Kepala Sekolah</p> <p className="text-gray-500">SDN 01 Pematang Baru</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>
      )}
      {/* Galeri Sekolah */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <ImageSlider />
        </div>
      </section>
      {/* Berita & Artikel Terbaru */}
      <section id="berita-terbaru" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Berita & Informasi Terkini</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">Update terbaru seputar kegiatan, prestasi, dan informasi penting dari SDN 01 Pematang Baru.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(posts.length > 0 ? posts : beritaDummy).map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 overflow-hidden">
                  <img src={item.foto || item.foto_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-semibold">{item.kategori || "Berita"}</span>
                  <h3 className="text-xl font-bold my-2 text-gray-800">{item.judul}</h3>
                  <p className="text-gray-600 mb-4">{item.deskripsi}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{item.tanggal || item.tanggal_text}</span>
                    <a href="#" className="text-primary font-semibold hover:underline"></a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/postingan" className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              Lihat Semua Berita
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
