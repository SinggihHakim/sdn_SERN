import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, ZoomIn, MapPin, Calendar } from "lucide-react";

const ImageSlider = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderImages = [
    {
      src: "https://singgihhakim.github.io/sdn1pematangbaru/images/trophy.jpg",
      alt: "Foto kegiatan belajar mengajar di kelas",
      title: "Penghargaan Prestasi",
      description: "Siswa SDN 01 Pematang Baru meraih juara lomba akademik",
      date: "15 Jan 2024",
      location: "Aula Sekolah",
    },
    {
      src: "https://singgihhakim.github.io/sdn1pematangbaru/images/foto%206.jpg",
      alt: "Foto upacara bendera di lapangan sekolah",
      title: "Upacara Bendera",
      description: "Kegiatan upacara rutin setiap hari Senin",
      date: "8 Jan 2024",
      location: "Lapangan Sekolah",
    },
    {
      src: "https://singgihhakim.github.io/sdn1pematangbaru/images/berbagi.jpg",
      alt: "Foto lomba 17 Agustus",
      title: "Kegiatan Berbagi",
      description: "Program berbagi kepada masyarakat sekitar",
      date: "20 Des 2023",
      location: "Halaman Sekolah",
    },
    {
      src: "https://singgihhakim.github.io/sdn1pematangbaru/images/foto%203.jpg",
      alt: "Foto kegiatan ekstrakurikuler pramuka",
      title: "Kegiatan Pramuka",
      description: "Ekstrakurikuler pramuka setiap hari Jumat",
      date: "5 Jan 2024",
      location: "Lapangan Pramuka",
    },
  ];

  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
    })
  );

  const toggleAutoplay = () => {
    if (isPlaying) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSlideChange = (api) => {
    setCurrentIndex(api.selectedScrollSnap());
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galeri <span className="text-primary">Kegiatan Sekolah</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dokumentasi momen berharga dalam proses pembelajaran dan pengembangan karakter siswa</p>
        </div>

        <div className="relative group">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={() => isPlaying && plugin.current.play()}
            opts={{
              loop: true,
              onSelect: handleSlideChange,
            }}
          >
            {/* Navigation Controls */}
            <div className="absolute top-10 right-6 z-20 flex items-center space-x-2">
              <CarouselPrevious className="relative static bg-white/90 backdrop-blur-sm border-0 w-10 h-10 hover:bg-white hover:scale-105 transition-all duration-300" />
              <CarouselNext className="relative static bg-white/90 backdrop-blur-sm border-0 w-10 h-10 hover:bg-white hover:scale-105 transition-all duration-300" />
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary scale-125" : "bg-white/70 hover:bg-white"}`}
                  onClick={() => {
                    // Logic untuk pindah ke slide tertentu
                    const api = plugin.current;
                    if (api) api.scrollTo(index);
                  }}
                  aria-label={`Pergi ke slide ${index + 1}`}
                />
              ))}
            </div>

            <CarouselContent>
              {sliderImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="overflow-hidden rounded-2xl shadow-2xl border-0 group-hover:shadow-3xl transition-all duration-500">
                      <CardContent className="flex aspect-[16/8] items-center justify-center p-0 relative">
                        {/* Main Image */}
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 transition-transform duration-500 group-hover:translate-y-0">
                          <div className="max-w-2xl">
                            <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>
                            <p className="text-lg mb-4 opacity-90 drop-shadow-md">{image.description}</p>

                            {/* Meta Information */}
                            <div className="flex items-center space-x-6 text-sm opacity-80">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{image.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{image.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Zoom Indicator */}
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1">
                          <ZoomIn className="w-3 h-3" />
                          <span>Hover untuk zoom</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          {sliderImages.map((image, index) => (
            <button
              key={index}
              className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${index === currentIndex ? "border-primary scale-110 shadow-lg" : "border-gray-200 opacity-70 hover:opacity-100"}`}
              onClick={() => {
                const api = plugin.current;
                if (api) api.scrollTo(index);
              }}
              aria-label={`Lihat ${image.title}`}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ingin melihat lebih banyak kegiatan kami?</p>
          <button className="bg-gradient-to-r from-primary to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Lihat Galeri Lengkap
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
