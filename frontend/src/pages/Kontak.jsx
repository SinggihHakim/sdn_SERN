import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Kontak = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", subjek: "", pesan: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const faqItems = [
    { q: "Kapan pendaftaran siswa baru dibuka?", a: "Pendaftaran siswa baru biasanya dibuka setiap bulan Juni hingga Juli. Informasi detail akan diumumkan di halaman Berita." },
    { q: "Apa saja syarat pendaftarannya?", a: "Syarat umum meliputi fotokopi Akta Kelahiran, Kartu Keluarga, dan KTP orang tua. Syarat lebih lengkap akan tersedia saat periode pendaftaran dibuka." },
    { q: "Apa saja kegiatan ekstrakurikuler yang tersedia?", a: "Kami memiliki berbagai ekstrakurikuler seperti Pramuka, Olahraga (Sepak Bola, Voli), dan Kesenian (Tari, Musik)." },
  ];

  const contactInfo = [
    { icon: "📍", title: "Alamat", content: "Jalan pematang binjai, Pematang Baru, Kec. Palas, Kabupaten Lampung Selatan, Lampung 35594" },
    { icon: "📞", title: "Telepon", content: "082373774331" },
    { icon: "✉️", title: "Email", content: "sdn1pematangbarupalas@gmail.com" },
    { icon: "🕒", title: "Jam Operasional", content: "Senin - Jumat: 07:00 - 16:00" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      await axios.post("http://localhost:5001/api/saran", formData);
      setMessage({ type: "success", text: "Pesan Anda berhasil terkirim. Terima kasih!" });
      setFormData({ nama: "", email: "", subjek: "", pesan: "" });
    } catch (error) {
      setMessage({ type: "error", text: "Gagal mengirim pesan. Silakan coba lagi." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
              Hubungi Kami
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Mari <span className="text-primary">Berbincang</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami siap membantu menjawab pertanyaan Anda dan menerima masukan yang membangun 
            untuk kemajuan sekolah kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info, Map & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader id="info-kontak">
                <CardTitle className="text-2xl font-bold text-gray-900">Informasi Kontak</CardTitle>
                <CardDescription className="text-md">Hubungi kami melalui berbagai saluran yang tersedia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-xl">{info.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle id="peta-sekolah" className="text-2xl font-bold text-gray-900">Lokasi Sekolah</CardTitle>
                <CardDescription className="text-md" >Kunjungi kami di lokasi berikut</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-xl overflow-hidden">

                  {/* --- PERBAIKAN DI SINI --- */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4864.6781113629595!2d105.69959051140661!3d-5.666526456079513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e410611bb2a6435%3A0x7335ab509eeb1c30!2sSDN%2001%20PEMATANG%20BARU!5e1!3m2!1sid!2sid!4v1759062408167!5m2!1sid!2sid"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                  {/* --- AKHIR PERBAIKAN --- */}

                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Pertanyaan Umum</CardTitle>
                <CardDescription className="text-md">Beberapa pertanyaan yang sering diajukan</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-gray-200 rounded-lg px-4 hover:border-primary/30 transition-colors duration-200"
                    >
                      <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Contact Form */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Kirim Pesan</CardTitle>
                <CardDescription className="text-md">
                  Isi formulir di bawah ini untuk hubungi, saran, atau kritik Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama" className="text-sm font-medium text-gray-700">
                        Nama Lengkap 
                      </Label>
                      <Input 
                        id="nama" 
                        value={formData.nama} 
                        onChange={handleChange} 
                        required 
                        className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Alamat Email 
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subjek" className="text-sm font-medium text-gray-700">
                      Subjek 
                    </Label>
                    <Input 
                      id="subjek" 
                      value={formData.subjek} 
                      onChange={handleChange} 
                      required 
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="Masukkan subjek pesan"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pesan" className="text-sm font-medium text-gray-700">
                      Pesan 
                    </Label>
                    <Textarea 
                      id="pesan" 
                      value={formData.pesan} 
                      onChange={handleChange} 
                      required 
                      rows={6}
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 text-lg py-6"
                  >
                    {submitting ? (
                      <div className="flex items-center space-x-2 justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengirim Pesan...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 justify-center">
                        <span>Kirim Pesan</span>
                      </div>
                    )}
                  </Button>
                </form>
                
                {message.text && (
                  <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                    message.type === "success" 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {message.text}
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

export default Kontak;