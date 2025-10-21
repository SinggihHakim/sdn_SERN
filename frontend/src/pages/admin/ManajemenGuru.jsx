import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ManajemenGuru = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  
  const [formData, setFormData] = useState({ nama: '', jabatan: '' });
  const [isKepsek, setIsKepsek] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5001/api/admin/guru', {
        headers: { Authorization: `Bearer ${token}` },
        params: { _: new Date().getTime() }
      });
      setTeachers(response.data);
    } catch (err) {
      setError('Gagal memuat data guru.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({ nama: teacher.nama, jabatan: teacher.jabatan });
    setIsKepsek(teacher.is_kepala_sekolah);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingTeacher(null);
    setFormData({ nama: '', jabatan: '' });
    setIsKepsek(false);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data guru ini?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5001/api/admin/guru/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (err) {
      alert('Gagal menghapus data guru.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const teacherData = new FormData();
    teacherData.append('nama', formData.nama);
    teacherData.append('jabatan', formData.jabatan);
    teacherData.append('is_kepala_sekolah', isKepsek);
    if (imageFile) {
      teacherData.append('image', imageFile);
    }
    const token = localStorage.getItem('adminToken');
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };

    try {
      if (editingTeacher) {
        await axios.put(`http://localhost:5001/api/admin/guru/${editingTeacher.id}`, teacherData, { headers });
        await fetchTeachers();
      } else {
        await axios.post('http://localhost:5001/api/admin/guru', teacherData, { headers });
        await fetchTeachers();
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(editingTeacher ? 'Gagal memperbarui data.' : 'Gagal menambah data.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Manajemen <span className="text-primary">Guru & Staff</span>
              </h1>
              <p className="text-gray-600">
                Kelola data guru dan tenaga pendidik sekolah
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Guru & Staff</p>
                  <p className="text-2xl font-bold text-primary">{teachers.length}</p>
                </div>
                <Button 
                  onClick={handleAddNewClick}
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="mr-2">➕</span>
                  Tambah Guru Baru
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Daftar Guru & Staff</CardTitle>
            <CardDescription>
              {teachers.length} data guru dan tenaga pendidik
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl overflow-hidden border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-900">Nama</TableHead>
                    <TableHead className="font-semibold text-gray-900">Jabatan</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher, index) => (
                    <TableRow 
                      key={teacher.id}
                      className={`group cursor-pointer transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } hover:bg-primary/5`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary text-sm font-bold">
                              {teacher.nama?.charAt(0) || "?"}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {teacher.nama}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{teacher.jabatan}</TableCell>
                      <TableCell>
                        {teacher.is_kepala_sekolah ? (
                          <Badge variant="default" className="bg-primary text-white">
                            👑 Kepala Sekolah
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-600">
                            Guru / Staff
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(teacher)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(teacher.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            🗑️ Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {teachers.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👨‍🏫</span>
            </div>
            <p className="text-gray-500 text-lg mb-2">Belum ada data guru</p>
            <p className="text-gray-400 text-sm">Mulai dengan menambahkan data guru pertama</p>
            <Button 
              onClick={handleAddNewClick}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              ➕ Tambah Guru Pertama
            </Button>
          </div>
        )}

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingTeacher ? 'Edit Data Guru' : 'Tambah Guru Baru'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingTeacher ? 'Perbarui informasi guru' : 'Isi data guru baru yang akan ditambahkan'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nama" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nama Lengkap
                  </Label>
                  <Input 
                    id="nama" 
                    value={formData.nama} 
                    onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                    required 
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <Label htmlFor="jabatan" className="text-sm font-medium text-gray-700 mb-2 block">
                    Jabatan
                  </Label>
                  <Input 
                    id="jabatan" 
                    value={formData.jabatan} 
                    onChange={(e) => setFormData({...formData, jabatan: e.target.value})} 
                    required 
                    className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    placeholder="Contoh: Guru Matematika, Staff TU"
                  />
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Switch 
                    id="is_kepala_sekolah" 
                    checked={isKepsek} 
                    onCheckedChange={setIsKepsek} 
                  />
                  <Label htmlFor="is_kepala_sekolah" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Jadikan Kepala Sekolah
                  </Label>
                </div>
                
                <div>
                  <Label htmlFor="image" className="text-sm font-medium text-gray-700 mb-2 block">
                    Foto (Opsional)
                  </Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2 justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    editingTeacher ? 'Perbarui Data' : 'Simpan Data'
                  )}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
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

export default ManajemenGuru;