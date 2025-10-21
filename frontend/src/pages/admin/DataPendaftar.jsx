import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DataPendaftar = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPendaftar, setSelectedPendaftar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPendaftar = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:5001/api/admin/pendaftaran", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendaftar(Array.isArray(response.data) ? response.data : response.data?.data ?? []);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data pendaftar.");
      } finally {
        setLoading(false);
      }
    };
    fetchPendaftar();
  }, []);

  // Filter data berdasarkan pencarian
  const filteredPendaftar = pendaftar.filter(item =>
    item.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nama_wali?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.no_hp?.includes(searchTerm)
  );

  const handleViewDetails = (pendaftarData) => {
    setSelectedPendaftar(pendaftarData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Tidak ada data yang dipilih untuk dihapus.");
      return;
    }

    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?");
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5001/api/admin/pendaftaran/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendaftar((prev) => prev.filter((item) => item.id !== id));
      setIsModalOpen(false);
      setSelectedPendaftar(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data pendaftar.");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      diterima: { variant: "default", label: "Diterima" },
      ditolak: { variant: "destructive", label: "Ditolak" },
      pending: { variant: "secondary", label: "Pending" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 font-light">Memuat data pendaftar...</p>
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
                Data <span className="text-primary">Pendaftar</span>
              </h1>
              <p className="text-gray-600">
                Kelola semua data calon siswa baru yang mendaftar
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari pendaftar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
                <Badge variant="outline" className="text-sm">
                  Total: {pendaftar.length}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Daftar Pendaftar</CardTitle>
            <CardDescription>
              {filteredPendaftar.length} dari {pendaftar.length} data pendaftar
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl overflow-hidden border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-900">Nama Siswa</TableHead>
                    <TableHead className="font-semibold text-gray-900">Nama Wali</TableHead>
                    <TableHead className="font-semibold text-gray-900">No. HP</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendaftar.length > 0 ? (
                    filteredPendaftar.map((item, index) => (
                      <TableRow 
                        key={item.id}
                        className={`group cursor-pointer transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        } hover:bg-primary/5`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary text-sm font-bold">
                                {item.nama_lengkap?.charAt(0) || "?"}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {item.nama_lengkap ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">{item.nama_wali ?? "-"}</TableCell>
                        <TableCell className="text-gray-700">{item.no_hp ?? "-"}</TableCell>
                        <TableCell>
                          {getStatusBadge(item.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">📝</span>
                          </div>
                          <p className="text-lg font-medium">Tidak ada data pendaftar</p>
                          <p className="text-sm">
                            {searchTerm ? "Coba gunakan kata kunci lain" : "Belum ada yang mendaftar"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal Detail */}
        <Dialog open={isModalOpen} onOpenChange={(open) => { 
          if (!open) { 
            setSelectedPendaftar(null); 
          } 
          setIsModalOpen(open); 
        }}>
          <DialogContent className="sm:max-w-[700px] bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Detail Pendaftar
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Informasi lengkap calon siswa yang telah diinput melalui formulir pendaftaran.
              </DialogDescription>
            </DialogHeader>

            {selectedPendaftar ? (
              <>
                {/* Header Info */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary text-xl font-bold">
                          {selectedPendaftar.nama_lengkap?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {selectedPendaftar.nama_lengkap ?? "-"}
                        </h3>
                        <p className="text-gray-600">Calon Siswa Baru</p>
                      </div>
                    </div>
                    {getStatusBadge(selectedPendaftar.status)}
                  </div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Data Siswa */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold">Data Siswa</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-500">Jenis Kelamin</Label>
                        <p className="font-medium">{selectedPendaftar.jenis_kelamin ?? "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Alamat</Label>
                        <p className="font-medium">{selectedPendaftar.alamat ?? "-"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500">RT/RW</Label>
                          <p className="font-medium">{selectedPendaftar.rt_rw ?? "-"}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Kecamatan</Label>
                          <p className="font-medium">{selectedPendaftar.kecamatan ?? "-"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Data Wali & Lokasi */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold">Data Wali & Lokasi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-500">Nama Wali</Label>
                        <p className="font-medium">{selectedPendaftar.nama_wali ?? "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">No. HP</Label>
                        <p className="font-medium">{selectedPendaftar.no_hp ?? "-"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500">Kota/Kab</Label>
                          <p className="font-medium">{selectedPendaftar.kota ?? "-"}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Provinsi</Label>
                          <p className="font-medium">{selectedPendaftar.provinsi ?? "-"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter className="sm:justify-between mt-6">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedPendaftar?.id)}
                    className="flex items-center space-x-2"
                  >
                    <span>🗑️</span>
                    <span>Hapus Data</span>
                  </Button>

                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Tutup
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">⏳</span>
                </div>
                Memuat data pendaftar...
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DataPendaftar;