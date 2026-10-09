import React from 'react';
import { Instagram, Youtube, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24150C] text-[#FBF3E7] border-t border-[#B08968]/30 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#B08968]/20 items-start">
          
          {/* Brand & Author lockup */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-display-title text-2xl font-bold tracking-[0.1em] text-[#FAF3E7]">
              OSÉIAS REIS
            </h3>
            <p className="font-serif italic text-sm text-[#C9A88B]">
              Autor independente
            </p>
            <p className="font-serif text-sm text-[#EBE0D2] max-w-sm leading-relaxed pt-2">
              “Livros para despertar, refletir e transformar.”
            </p>
            <p className="text-xs text-[#A68A72] leading-relaxed pt-1">
              Catálogo editorial dedicado à edificação bíblica, maturidade espiritual e adoração sincera através da Palavra de Deus.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display-title text-xs tracking-widest uppercase text-[#B08968] font-semibold">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#EBE0D2]">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-[#B08968] transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('livretos')}
                  className="hover:text-[#B08968] transition-colors cursor-pointer"
                >
                  Catálogo de Livretos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('colecoes')}
                  className="hover:text-[#B08968] transition-colors cursor-pointer"
                >
                  Coleções Temáticas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre-autor')}
                  className="hover:text-[#B08968] transition-colors cursor-pointer"
                >
                  Sobre o Autor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('adote-livro')}
                  className="hover:text-[#B08968] transition-colors cursor-pointer"
                >
                  Projeto Adote um Livro
                </button>
              </li>
            </ul>
          </div>

          {/* Channels & Social Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display-title text-xs tracking-widest uppercase text-[#B08968] font-semibold">
              Canais & Redes
            </h4>
            <div className="space-y-2.5 text-xs text-[#EBE0D2]">
              <a
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B08968] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#B08968]" />
                <span>WhatsApp Oficial</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B08968] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#B08968]" />
                <span>Instagram: @oseiasreis</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B08968] transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#B08968]" />
                <span>YouTube</span>
              </a>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 hover:text-[#B08968] transition-colors text-left cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#B08968]" />
                <span>Contato: oseiascristao21@gmail.com</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A68A72]">
          <p className="font-serif text-center sm:text-left">
            © Oséias Reis — Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#FAF3E7] transition-colors cursor-pointer text-[11px] font-sans uppercase tracking-wider"
          >
            <span>Voltar ao Início</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
