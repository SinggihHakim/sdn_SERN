import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Guru = () => {
  const [kepalaSekolah, setKepalaSekolah] = useState(null);
  const [guruStaff, setGuruStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/guru', {
          params: { _: new Date().getTime() }
        });
        const allTeachers = response.data;
        setKepalaSekolah(allTeachers.find(t => t.is_kepala_sekolah));
        setGuruStaff(allTeachers.filter(t => !t.is_kepala_sekolah));
      } catch (err) {
        setError('Gagal memuat data guru.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat data guru...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <p className="text-red-500 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
              Tim Pendidik
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Guru & <span className="text-primary">Tenaga Pendidik</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tim profesional yang berdedikasi untuk mendidik, membimbing, dan menginspirasi 
            putra-putri Anda menuju masa depan yang gemilang.
          </p>
        </div>

        {/* Kepala Sekolah - Featured Card */}
        {kepalaSekolah && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kepala Sekolah</h2>
              <div className="w-24 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                  {/* Photo Section */}
                  <div className="lg:w-2/5 p-8 lg:p-12">
                    <div className="relative">
                      <img 
                        src={kepalaSekolah.foto_url || 'https://placehold.co/400x400/e2e8f0/94a3b8?text=Foto'} 
                        alt={kepalaSekolah.nama}
                        className="w-64 h-64 rounded-2xl object-cover shadow-2xl mx-auto lg:mx-0"
                      />
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">👑</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="lg:w-3/5 p-8 lg:p-12 lg:pl-0">
                    <div className="text-center lg:text-left">
                      <div className="inline-block mb-4">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                          Kepala Sekolah
                        </span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {kepalaSekolah.nama}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {kepalaSekolah.deskripsi || "Memimpin dengan integritas dan dedikasi untuk menciptakan lingkungan belajar yang inspiratif."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guru & Staff Section */}
        <div id="dewan-guru">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Dewan Guru & Staff</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim pendidik profesional yang siap membimbing siswa menuju kesuksesan
            </p>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {guruStaff.map((guru, index) => (
              <div 
                key={guru.id}
                className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 text-center">
                  {/* Photo */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img 
                        src={guru.foto_url || 'https://placehold.co/200x200/e2e8f0/94a3b8?text=Guru'}
                        alt={guru.nama}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {guru.nama}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium line-clamp-2">
                    {guru.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {guruStaff.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍🏫</span>
              </div>
              <p className="text-gray-500 text-lg">Belum ada data guru</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guru;