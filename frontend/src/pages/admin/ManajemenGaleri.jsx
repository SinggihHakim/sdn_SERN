import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ManajemenGaleri = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newImageFile, setNewImageFile] = useState(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [submittingEdit, setSubmittingEdit] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:5001/api/admin/galeri", {
          headers: { Authorization: `Bearer ${token}` },
          params: { _: new Date().getTime() },
        });
        setImages(response.data);
      } catch (err) {
        setError("Gagal memuat data galeri.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newImageFile) return alert("Silakan pilih file gambar.");
    setUploading(true);
    const formData = new FormData();
    formData.append("image", newImageFile);
    formData.append("caption", uploadCaption);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post("http://localhost:5001/api/admin/galeri", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setImages([response.data.data, ...images]);
      setNewImageFile(null);
      setUploadCaption("");
      document.getElementById("file-input").value = "";
    } catch (err) {
      alert("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus gambar ini?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5001/api/admin/galeri/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      alert("Gagal menghapus gambar.");
    }
  };

  const handleEditClick = (image) => {
    setEditingImage(image);
    setEditCaption(image.caption || "");
    setIsEditModalOpen(true);
  };

  const handleUpdateCaption = async (e) => {
    e.preventDefault();
    if (!editingImage) return;
    setSubmittingEdit(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`http://localhost:5001/api/admin/galeri/${editingImage.id}`, { caption: editCaption }, { headers: { Authorization: `Bearer ${token}` } });
      setImages(images.map((img) => (img.id === editingImage.id ? response.data.data : img)));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Gagal memperbarui caption.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
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
          <p className="text-red-500 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Manajemen <span className="text-primary">Galeri</span>
              </h1>
              <p className="text-gray-600">Kelola foto dan gambar yang ditampilkan di galeri publik</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Gambar</p>
                  <p className="text-2xl font-bold text-primary">{images.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Unggah Gambar Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file-input" className="text-sm font-medium text-gray-700 mb-2 block">
                      Pilih Gambar
                    </Label>
                    <Input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImageFile(e.target.files[0])}
                      required
                      className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="caption" className="text-sm font-medium text-gray-700 mb-2 block">
                      Caption (Opsional)
                    </Label>
                    <Input
                      id="caption"
                      type="text"
                      placeholder="Deskripsi singkat gambar..."
                      value={uploadCaption}
                      onChange={(e) => setUploadCaption(e.target.value)}
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5">
                    {uploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengunggah...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>📤</span>
                        <span>Unggah Gambar</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Card key={image.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <img src={image.foto_url} alt={image.caption || "Gambar Galeri"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEditClick(image)} className="bg-white/90 hover:bg-white transition-all duration-300">
                    ✏️ Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)} className="bg-red-500/90 hover:bg-red-500 text-white transition-all duration-300">
                    🗑️ Hapus
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50">
                <p className="text-sm text-gray-600 line-clamp-2 flex-1">{image.caption || "Tanpa caption"}</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📷</span>
            </div>
            <p className="text-gray-500 text-lg mb-2">Belum ada gambar di galeri</p>
            <p className="text-gray-400 text-sm">Unggah gambar pertama Anda menggunakan form di atas</p>
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Edit Caption Gambar</DialogTitle>
              <DialogDescription className="text-gray-600">Ubah deskripsi gambar yang akan ditampilkan di galeri publik</DialogDescription>
            </DialogHeader>

            {editingImage && (
              <div className="space-y-6 pt-4">
                {/* Image Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={editingImage.foto_url} alt={editingImage.caption || "Gambar Galeri"} className="w-full h-full object-cover" />
                  </div>
                </div>

                <form onSubmit={handleUpdateCaption} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-caption" className="text-sm font-medium text-gray-700 mb-2 block">
                      Caption
                    </Label>
                    <Input
                      id="edit-caption"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder="Masukkan caption untuk gambar..."
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" disabled={submittingEdit} className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300">
                      {submittingEdit ? (
                        <div className="flex items-center space-x-2 justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Menyimpan...</span>
                        </div>
                      ) : (
                        "Simpan Perubahan"
                      )}
                    </Button>

                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1">
                      Batal
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManajemenGaleri;
