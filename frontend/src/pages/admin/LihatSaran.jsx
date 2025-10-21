import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LihatSaran = () => {
  const [saranList, setSaranList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSaran, setSelectedSaran] = useState(null);

  useEffect(() => {
    const fetchSaran = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5001/api/admin/saran', {
          headers: { Authorization: `Bearer ${token}` },
          params: { _: new Date().getTime() }
        });
        setSaranList(response.data);
      } catch (err) {
        setError('Gagal memuat data saran.');
      } finally {
        setLoading(false);
      }
    };
    fetchSaran();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus saran ini?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5001/api/admin/saran/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaranList(saranList.filter(s => s.id !== id));
      if (selectedSaran?.id === id) {
        setSelectedSaran(null);
      }
    } catch (err) {
      alert('Gagal menghapus saran.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleString('id-ID'),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
    return date.toLocaleDateString('id-ID');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat data saran...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Kotak <span className="text-primary">Masuk Saran</span>
              </h1>
              <p className="text-gray-600">
                Kelola semua masukan dan saran dari pengunjung website
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Saran</p>
                  <p className="text-2xl font-bold text-primary">{saranList.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saran List */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Daftar Saran</CardTitle>
                <CardDescription>
                  {saranList.length} saran dan masukan dari pengunjung
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 max-h-[600px] overflow-y-auto p-4">
                  {saranList.length > 0 ? (
                    saranList.map((saran, index) => {
                      const dateInfo = formatDate(saran.created_at);
                      return (
                        <Card 
                          key={saran.id}
                          className={`cursor-pointer transition-all duration-300 border-0 shadow-sm hover:shadow-md ${
                            selectedSaran?.id === saran.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'bg-white/50 hover:bg-white'
                          }`}
                          onClick={() => setSelectedSaran(saran)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary text-sm font-bold">
                                    {saran.nama?.charAt(0) || '?'}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                                    {saran.nama}
                                  </h3>
                                  <p className="text-sm text-gray-500">{saran.email}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {dateInfo.relative}
                              </Badge>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">Subjek:</h4>
                              <p className="text-gray-700 line-clamp-2">{saran.subjek}</p>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">Pesan:</h4>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {saran.pesan}
                              </p>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>{dateInfo.full}</span>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(saran.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                🗑️ Hapus
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">💬</span>
                      </div>
                      <p className="text-gray-500 text-lg mb-2">Belum ada saran</p>
                      <p className="text-gray-400 text-sm">Saran dari pengunjung akan muncul di sini</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Saran Detail */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Detail Saran</CardTitle>
                <CardDescription>
                  {selectedSaran ? 'Informasi lengkap saran terpilih' : 'Pilih saran untuk melihat detail'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSaran ? (
                  <div className="space-y-6">
                    {/* Sender Info */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary text-lg font-bold">
                            {selectedSaran.nama?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{selectedSaran.nama}</h3>
                          <p className="text-sm text-gray-600">{selectedSaran.email}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Dikirim: {formatDate(selectedSaran.created_at).full}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Subjek</h4>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                        {selectedSaran.subjek}
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Pesan</h4>
                      <div className="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {selectedSaran.pesan}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(selectedSaran.id)}
                        className="flex-1"
                      >
                        🗑️ Hapus Saran
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📨</span>
                    </div>
                    <p>Pilih saran dari daftar untuk melihat detail lengkap</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LihatSaran;