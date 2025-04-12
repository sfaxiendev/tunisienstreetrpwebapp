
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import LoginButton from "../auth/LoginButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rules", path: "/rules" },
    { name: "Patch Notes", path: "/patch-notes" },
  ];

  const dropdownLinks = [
    { name: "Whitelist Application", path: "/applications/whitelist" },
    { name: "Admin Application", path: "/applications/admin" },
    { name: "Gang Application", path: "/applications/gang" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm py-3 shadow-md shadow-tunisien-red/10" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl font-bold text-white">
            <span className="text-tunisien-red">TUNISIEN</span> STREET RP
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="nav-link flex items-center gap-1"
            >
              Applications <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 right-0 w-60 bg-secondary rounded-md shadow-lg overflow-hidden z-20 animate-fade-in border border-tunisien-red/20">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-tunisien-red/10 hover:text-tunisien-red transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <LoginButton />
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="text-tunisien-red" size={24} /> : <Menu className="text-tunisien-red" size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-tunisien-red/20 animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 text-foreground hover:text-tunisien-red transition-colors ${
                  location.pathname === link.path ? "text-tunisien-red" : ""
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleDropdown}
              className="py-3 text-foreground hover:text-tunisien-red transition-colors flex items-center justify-between"
            >
              Applications <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="pl-4 border-l border-tunisien-red/30 animate-fade-in">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-2 text-sm text-foreground hover:text-tunisien-red transition-colors"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="py-4">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
