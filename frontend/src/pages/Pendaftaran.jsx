import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Pendaftaran = () => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    jenis_kelamin: '',
    alamat: '',
    rt_rw: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
    nama_wali: '',
    no_hp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevState => ({ ...prevState, jenis_kelamin: value }));
  };
  
  const resetForm = () => {
    setFormData({
      nama_lengkap: '', jenis_kelamin: '', alamat: '', rt_rw: '',
      kecamatan: '', kota: '', provinsi: '', nama_wali: '', no_hp: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await axios.post('http://localhost:5001/api/pendaftaran', formData);
      setMessage({ type: 'success', text: 'Pendaftaran berhasil! Terima kasih telah mendaftar.' });
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim data pendaftaran:", error);
      setMessage({ type: 'error', text: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-2 text-primary">Formulir Pendaftaran Siswa Baru</h1>
          <p className="text-center text-gray-600 mb-8">Lengkapi data di bawah ini dengan benar.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Data Diri Siswa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="nama_lengkap">Nama Lengkap Siswa</Label>
                <Input id="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                <Select onValueChange={handleSelectChange} value={formData.jenis_kelamin}>
                  <SelectTrigger><SelectValue placeholder="Pilih Jenis Kelamin" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Alamat */}
            <div className="space-y-1.5">
              <Label htmlFor="alamat">Alamat Rumah</Label>
              <Textarea id="alamat" value={formData.alamat} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <Label htmlFor="rt_rw">RT/RW</Label>
                    <Input id="rt_rw" value={formData.rt_rw} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="kecamatan">Kecamatan</Label>
                    <Input id="kecamatan" value={formData.kecamatan} onChange={handleChange} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <Label htmlFor="kota">Kota/Kabupaten</Label>
                    <Input id="kota" value={formData.kota} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="provinsi">Provinsi</Label>
                    <Input id="provinsi" value={formData.provinsi} onChange={handleChange} />
                </div>
            </div>

            {/* Data Wali */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="nama_wali">Nama Orang Tua/Wali</Label>
                <Input id="nama_wali" value={formData.nama_wali} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="no_hp">No. HP Orang Tua/Wali</Label>
                <Input id="no_hp" type="tel" value={formData.no_hp} onChange={handleChange} required />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
            </Button>
          </form>
          {message.text && (
            <div className={`mt-6 text-center p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>{message.text}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pendaftaran;