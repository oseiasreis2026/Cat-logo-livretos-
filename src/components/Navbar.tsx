import React, { useState } from 'react';
import { Menu, X, BookOpen, MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'livretos', label: 'Livretos' },
    { id: 'colecoes', label: 'Coleções' },
    { id: 'sobre-autor', label: 'Sobre o Autor' },
    { id: 'adote-livro', label: 'Adote um Livro' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF3E7]/95 backdrop-blur-md border-b border-[#B08968]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="font-display-title text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#2B1810] hover:text-[#7A4B2A] transition-colors"
        >
          OSÉIAS REIS
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-[0.08em] uppercase text-[#5C381E]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeSection === link.id
                  ? 'text-[#7A4B2A] font-semibold border-[#7A4B2A]'
                  : 'border-transparent hover:text-[#2B1810] hover:border-[#B08968]/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={getWhatsAppGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] rounded-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Fale Comigo</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2B1810] hover:text-[#7A4B2A] focus:outline-none cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8EFE2] border-b border-[#B08968]/30 px-6 py-6 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm uppercase tracking-wider py-2 transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-[#7A4B2A] font-bold border-l-2 border-[#7A4B2A] pl-3'
                    : 'text-[#5C381E] hover:text-[#2B1810] pl-1'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#B08968]/20 flex flex-col gap-2">
            <a
              href={getWhatsAppGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] rounded-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fale Comigo no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
