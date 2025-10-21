import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Galeri = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/galeri', {
          params: {
            _: new Date().getTime(),
          }
        });
        setGalleryImages(response.data);
      } catch (err) {
        console.error("Gagal mengambil data galeri:", err);
        setError('Tidak dapat memuat gambar dari server. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const categories = ['all', ...new Set(galleryImages.map(img => img.kategori).filter(Boolean))];
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.kategori === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat galeri...</p>
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
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
              Koleksi Visual
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Galeri <span className="text-primary">Sekolah</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dokumentasi momen-momen berharga dari berbagai kegiatan, prestasi, 
            dan kehidupan sehari-hari di SDN 01 Pematang Baru.
          </p>
        </div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeFilter === category
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'Semua' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Masonry Grid - TANPA CLICK HANDLER */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="group break-inside-avoid"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={image.foto_url}
                    alt={image.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {image.judul || image.caption}
                      </h3>
                      
                      {image.kategori && (
                        <span className="inline-block mt-3 text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {image.kategori}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📷</span>
            </div>
            <p className="text-gray-500 text-lg">Saat ini belum ada foto di galeri.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Galeri;