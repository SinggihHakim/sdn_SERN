import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ManajemenPostingan = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ judul: "", deskripsi: "", kategori: "", tanggal_text: "" });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("Akses ditolak. Silakan login kembali.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/admin/postingan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (err) {
        console.error("Error saat mengambil data postingan:", err);
        if (err.response) {
          setError(`Gagal memuat data: ${err.response.data.message || "Silakan login ulang."}`);
        } else {
          setError("Gagal terhubung ke server. Pastikan server backend berjalan.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus postingan ini?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5001/api/admin/postingan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      alert("Gagal menghapus postingan.");
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setFormData({
      judul: post.judul,
      deskripsi: post.deskripsi,
      kategori: post.kategori || "",
      tanggal_text: post.tanggal_text || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingPost(null);
    setFormData({ judul: "", deskripsi: "", kategori: "", tanggal_text: "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const postData = new FormData();
    postData.append("judul", formData.judul);
    postData.append("deskripsi", formData.deskripsi);
    postData.append("kategori", formData.kategori);
    postData.append("tanggal_text", formData.tanggal_text);
    if (imageFile) {
      postData.append("image", imageFile);
    }

    const token = localStorage.getItem("adminToken");
    const headers = { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` };

    try {
      if (editingPost) {
        const response = await axios.put(`http://localhost:5001/api/admin/postingan/${editingPost.id}`, postData, { headers });
        setPosts(posts.map((p) => (p.id === editingPost.id ? response.data.data : p)));
      } else {
        const response = await axios.post("http://localhost:5001/api/admin/postingan", postData, { headers });
        setPosts([response.data.data, ...posts]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(editingPost ? "Gagal memperbarui postingan." : "Gagal membuat postingan baru.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat data postingan...</p>
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
                Manajemen <span className="text-primary">Berita & Postingan</span>
              </h1>
              <p className="text-gray-600">Kelola berita, artikel, dan informasi sekolah</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Postingan</p>
                  <p className="text-2xl font-bold text-primary">{posts.length}</p>
                </div>
                <Button onClick={handleAddNewClick} className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5">
                  <span className="mr-2">📝</span>
                  Buat Postingan Baru
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Daftar Postingan</CardTitle>
            <CardDescription>{posts.length} postingan berita dan informasi</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl overflow-hidden border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-900">Judul</TableHead>
                    <TableHead className="font-semibold text-gray-900">Kategori</TableHead>
                    <TableHead className="font-semibold text-gray-900">Tanggal</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <TableRow key={post.id} className={`group cursor-pointer transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-primary/5`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary text-sm">📰</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 line-clamp-1">{post.judul}</span>
                              <p className="text-xs text-gray-500 line-clamp-1">{post.deskripsi?.substring(0, 60)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {post.kategori ? (
                            <Badge variant="outline" className="text-primary border-primary/20">
                              {post.kategori}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              Umum
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-700 text-sm">{post.tanggal_text || new Date(post.created_at).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(post)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              ✏️ Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              🗑️ Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">📝</span>
                          </div>
                          <p className="text-lg font-medium">Belum ada postingan</p>
                          <p className="text-sm">Mulai dengan membuat postingan pertama</p>
                          <Button onClick={handleAddNewClick} className="mt-4 bg-primary hover:bg-primary/90">
                            📝 Buat Postingan Pertama
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">{editingPost ? "Edit Postingan" : "Buat Postingan Baru"}</DialogTitle>
              <DialogDescription className="text-gray-600">{editingPost ? "Perbarui informasi postingan" : "Isi data untuk membuat postingan baru"}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="judul" className="text-sm font-medium text-gray-700 mb-2 block">
                      Judul Postingan *
                    </Label>
                    <Input id="judul" value={formData.judul} onChange={handleFormChange} required className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" placeholder="Masukkan judul yang menarik" />
                  </div>

                  <div>
                    <Label htmlFor="kategori" className="text-sm font-medium text-gray-700 mb-2 block">
                      Kategori
                    </Label>
                    <Input
                      id="kategori"
                      value={formData.kategori}
                      onChange={handleFormChange}
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="Contoh: Berita, Pengumuman, Kegiatan"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tanggal_text" className="text-sm font-medium text-gray-700 mb-2 block">
                      Tanggal Tampil
                    </Label>
                    <Input id="tanggal_text" value={formData.tanggal_text} onChange={handleFormChange} className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" placeholder="Contoh: 15 Desember 2024" />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-sm font-medium text-gray-700 mb-2 block">
                      Gambar Unggulan (Opsional)
                    </Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleFileChange} className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors duration-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deskripsi" className="text-sm font-medium text-gray-700 mb-2 block">
                      Deskripsi / Isi Postingan *
                    </Label>
                    <Textarea
                      id="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleFormChange}
                      required
                      rows={12}
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                      placeholder="Tulis isi postingan di sini..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <Button type="submit" disabled={submitting} className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300">
                  {submitting ? (
                    <div className="flex items-center space-x-2 justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan...</span>
                    </div>
                  ) : editingPost ? (
                    "Perbarui Postingan"
                  ) : (
                    "Publikasikan Postingan"
                  )}
                </Button>

                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManajemenPostingan;
