import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Postingan = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMoreClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/postingan', {
          params: { _: new Date().getTime() }
        });
        setPosts(response.data);
      } catch (err) {
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat semua berita...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
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
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                Informasi Terkini
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Berita & <span className="text-primary">Informasi</span> Sekolah
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ikuti perkembangan, kegiatan, dan prestasi terbaru dari sekolah kami dengan informasi yang selalu update.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-primary/20 flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.foto_url || 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Berita'} 
                      alt={post.judul} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-semibold text-white bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        {post.kategori || "Berita"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.judul}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 flex-grow">
                      {post.deskripsi}
                    </p>
                    
                    <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-gray-500 font-medium">
                          {post.tanggal_text || new Date(post.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleReadMoreClick(post)}
                        className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors duration-300 flex items-center space-x-1 group/btn"
                      >
                        <span>Baca Selengkapnya</span>
                        <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📰</span>
              </div>
              <p className="text-gray-500 text-lg">Saat ini belum ada berita untuk ditampilkan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 max-h-[95vh] overflow-hidden bg-white rounded-2xl">
          {selectedPost && (
            <div className="flex flex-col h-full">
              {/* Modal Image */}
              <div className="relative h-72 bg-gradient-to-r from-primary/10 to-primary/5">
                <img 
                  src={selectedPost.foto_url || 'https://placehold.co/1200x600/e2e8f0/94a3b8?text=Berita'} 
                  alt={selectedPost.judul} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                  <DialogHeader className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {selectedPost.kategori || "Berita"}
                      </span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500 font-medium">
                        {selectedPost.tanggal_text || new Date(selectedPost.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <DialogTitle className="text-3xl font-bold text-gray-900 leading-tight">
                      {selectedPost.judul}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                      {selectedPost.deskripsi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Postingan;