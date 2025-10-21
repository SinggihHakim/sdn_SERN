import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, School, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { 
      href: '/profil', 
      label: 'Profil',
      dropdown: [
        { href: '/', label: 'Beranda' },
        { href: '/#visi-misi', label: 'Visi & Misi' },
        { href: '/#sambutan', label: 'Sambutan' },
        { href: '/#berita-terbaru', label: 'Berita Terbaru' },
      ]
    },
    { href: '/galeri', label: 'Galeri' },
    { href: '/postingan', label: 'Berita' },
    { href: '/guru', label: 'Guru & Staff' },
    { href: '/ebook', label: 'E-Book' },
    { href: '/kontak', label: 'Kontak' },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `relative px-4 py-2.5 rounded-lg transition-all duration-300 group ${
      isActive 
        ? 'text-primary bg-primary/10 font-semibold' 
        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
    }`;

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.split('#')[1];
    
    if (isMenuOpen) setIsMenuOpen(false);
    
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

    if (location.pathname !== '/') {
      navigate('/');
      scrollToElement();
    } else {
      scrollToElement();
    }
    setActiveDropdown(null);
  };

  return (
    // Gunakan React Fragment <> ... </> untuk membungkus semuanya
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2' 
          : 'bg-white/90 backdrop-blur-lg shadow-sm py-4'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section  */}
                  <NavLink to="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <School className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col">
                    <span className={`font-bold tracking-tight transition-all duration-300 ${
                      isScrolled ? 'text-lg lg:text-xl text-primary' : 'text-xl lg:text-2xl text-gray-900'
                    }`}>
                      SDN 01 Pematang Baru
                    </span>
                    <p className="italic text-xs lg:text-sm text-gray-500">
                      Berakhlak, Berprestasi dan Unggul
                    </p>
                    </div>
                  </NavLink>

                  {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.dropdown ? (
                    <div>
                      <button onClick={() => handleDropdownToggle(link.label)} className="flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 group text-gray-600 hover:text-primary hover:bg-gray-50">
                        <span className="font-medium">{link.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
                        activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        <div className="p-2">
                          {link.dropdown.map((item) => (
                            <a key={item.href} href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-all duration-200">
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink to={link.href} className={getNavLinkClass}>
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <NavLink to="/login" className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-primary transition-all duration-300 group">
                <UserCircle className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </NavLink>
              <NavLink to="/pendaftaran" className="relative bg-gradient-to-r from-primary to-red-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden">
                <span className="relative z-10">Pendaftaran</span>
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle Menu">
                {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>
      </header> {/* <-- TAG HEADER DITUTUP DI SINI */}

      {/* --- MENU MOBILE SEKARANG BERADA DI LUAR HEADER --- */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white/40 backdrop-blur-md transition-transform duration-300 ease-in-out z-[60] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-primary">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu"><X size={24}/></button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navLinks.map(link => (
            <div key={link.label}>
              {link.dropdown ? (
                <div>
                  <button onClick={() => handleDropdownToggle(link.label)} className="w-full flex justify-between items-center py-2 font-medium text-primary">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${activeDropdown === link.label ? 'max-h-96' : 'max-h-0'}`}>
                    {link.dropdown.map(item => (
                      <a key={item.href} href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block py-2 text-primary hover:text-primary">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink to={link.href} className={({isActive}) => `block py-2 font-medium ${isActive ? 'text-primary' : 'text-primary'}`}>
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
          <div className="pt-4 mt-4 border-t">
            <NavLink to="/login" className="flex items-center gap-2 py-2 text-primary font-bold">
              <UserCircle size={20}/> Login Admin
            </NavLink>
            <NavLink to="/pendaftaran" className="mt-2 block w-full text-center bg-primary text-white py-2.5 rounded-lg font-semibold">
              Pendaftaran
            </NavLink>
          </div>
        </nav>
      </div>
      
      {/* Background Overlay for Mobile */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-blacl/10 backdrop-blur-xl z-50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;