import React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const [path, targetId] = href.split('#');
    
    const scrollToElement = () => {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    };

    if (location.pathname !== path) {
      navigate(path);
      scrollToElement();
    } else {
      scrollToElement();
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-left">
            <h3 className="text-xl font-bold text-white mb-4">SDN 01 Pematang Baru</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Membangun generasi penerus bangsa yang berkarakter, cerdas, dan berakhlak mulia.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Kontak Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-300">
                <span className="mt-0.5">📍</span>
                <span className="flex-1">
                  Jalan pematang binjai, Pematang Baru, Kec. Palas, Kabupaten Lampung Selatan, Lampung 35594
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span>📞</span>
                <span>0823-7377-4331</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span>✉️</span>
                <span>sdn1pematangbarupalas@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Tautan Cepat</h4>
            <div className="space-y-3 text-sm">
              <a 
                href="/guru#dewan-guru" 
                onClick={(e) => handleSmoothScroll(e, '/guru#dewan-guru')} 
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Guru & Staff
              </a>
              <a 
                href="/#berita-terbaru" 
                onClick={(e) => handleSmoothScroll(e, '/#berita-terbaru')} 
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Berita & Informasi
              </a>
              <a 
                href="/kontak#info-kontak" 
                onClick={(e) => handleSmoothScroll(e, '/kontak#info-kontak')} 
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Hubungi Kami
              </a>
              <a 
                href="/kontak#info-kontak" 
                onClick={(e) => handleSmoothScroll(e, '/kontak#info-kontak')} 
                className="block text-gray-300 hover:text-primary transition-colors duration-300"
              >
                Saran dan Kritik
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 <span className="text-primary font-semibold">SDN 01 Pematang Baru</span>. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-400 text-sm">
              <span className="hover:text-primary transition-colors duration-300 cursor-pointer">
                Kebijakan Privasi
              </span>
              <span className="hover:text-primary transition-colors duration-300 cursor-pointer">
                Syarat & Ketentuan
              </span>
              <a 
                href="/kontak#peta-sekolah" 
                onClick={(e) => handleSmoothScroll(e, '/kontak#peta-sekolah')} 
                className="hover:text-primary transition-colors duration-300"
              >
                Peta Situs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;