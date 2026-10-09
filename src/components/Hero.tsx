import React from 'react';
import { BookCoverArt } from './BookCoverArt';
import { BOOKS_DATA } from '../data/booksData';
import { ArrowDown, MessageCircle, BookOpen } from 'lucide-react';
import { Book } from '../types/book';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';

interface HeroProps {
  onExploreBooks: () => void;
  onOpenContact: () => void;
  onSelectBook: (book: Book) => void;
  customCovers: Record<string, string>;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreBooks,
  onOpenContact,
  onSelectBook,
  customCovers,
}) => {
  // Books featured in hero showcase
  const heroBooks = [
    BOOKS_DATA.find((b) => b.id === 'quarto-de-guerra')!,
    BOOKS_DATA.find((b) => b.id === 'vitimismo-espiritual')!,
    BOOKS_DATA.find((b) => b.id === 'proposito-da-vida')!,
    BOOKS_DATA.find((b) => b.id === 'fleumatico')!,
  ].filter(Boolean);

  return (
    <section id="inicio" className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-[#B08968]/20">
      {/* Warm ambient glow & subtle paper texture backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#B08968]/15 rounded-full blur-3xl" />
        <div className="absolute -top-12 right-10 w-96 h-96 bg-[#7A4B2A]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Editorial Copy Zone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Curatorial Header Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A]">
              <span>Catálogo Editorial</span>
              <span aria-hidden="true" className="text-[#B08968]">·</span>
              <span>Oséias Reis</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[0.03em] text-[#2B1810] leading-[1.12] text-balance">
              PALAVRAS QUE DESPERTAM. <br className="hidden sm:inline" />
              <span className="text-[#7A4B2A] font-normal italic font-serif">
                VERDADES QUE TRANSFORMAM.
              </span>
            </h1>

            {/* Complementary Text */}
            <p className="font-serif text-lg sm:text-xl text-[#4A2D19] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              “Livretos cristãos para reflexão, despertamento e transformação através da Palavra de Deus.”
            </p>

            {/* Value Proposition Micro-Pillar */}
            <div className="pt-2 pb-2 text-xs sm:text-sm text-[#6E472A] flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A4B2A]" />
                Edições Devocionais de Bolso
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A4B2A]" />
                Fundamentação Bíblica Sólida
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A4B2A]" />
                Exame Prático do Coração
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreBooks}
                className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-[0.14em] uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Conheça os Livretos</span>
              </button>

              <a
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-[0.14em] uppercase text-[#2B1810] bg-[#F2E5D3] hover:bg-[#EADBCA] border border-[#B08968]/50 transition-all rounded-sm flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#7A4B2A]" />
                <span>Fale Comigo</span>
              </a>
            </div>

            {/* Scripture Anchor Epigraph */}
            <div className="pt-6 border-t border-[#B08968]/20 max-w-lg mx-auto lg:mx-0">
              <p className="font-serif italic text-xs text-[#7A5A41] leading-relaxed">
                "Porque a palavra de Deus é viva, e eficaz, e mais penetrante do que qualquer espada de dois gumes..."
                <span className="block not-italic text-[10px] tracking-wider font-sans uppercase mt-1 text-[#8C6B52]">
                  Hebreus 4:12
                </span>
              </p>
            </div>
          </div>

          {/* Right / Book Covers Atmospheric Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-md sm:max-w-lg mx-auto h-[420px] sm:h-[460px] flex items-center justify-center">
              
              {/* Decorative warm aura pedestal */}
              <div className="absolute bottom-6 w-3/4 h-16 bg-[#2B1810]/15 rounded-full blur-xl transform -rotate-1" />

              {/* Book 1 - Left Angle (Fleumático) */}
              <div
                onClick={() => onSelectBook(heroBooks[3])}
                className="absolute left-0 sm:left-4 bottom-8 w-36 sm:w-44 transform -rotate-6 hover:-rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer z-10 group"
              >
                <BookCoverArt
                  book={heroBooks[3]}
                  customImageUrl={customCovers[heroBooks[3].id]}
                />
                <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-display-title tracking-wider text-[#7A4B2A]">
                    Ver Detalhes
                  </span>
                </div>
              </div>

              {/* Book 2 - Right Angle (Vitimismo Espiritual) */}
              <div
                onClick={() => onSelectBook(heroBooks[1])}
                className="absolute right-0 sm:right-4 bottom-8 w-36 sm:w-44 transform rotate-6 hover:rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer z-20 group"
              >
                <BookCoverArt
                  book={heroBooks[1]}
                  customImageUrl={customCovers[heroBooks[1].id]}
                />
                <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-display-title tracking-wider text-[#7A4B2A]">
                    Ver Detalhes
                  </span>
                </div>
              </div>

              {/* Book 3 - Central Anchor (Quarto de Guerra contra a Carne) */}
              <div
                onClick={() => onSelectBook(heroBooks[0])}
                className="relative w-48 sm:w-56 transform -translate-y-4 hover:-translate-y-6 hover:scale-105 transition-all duration-300 cursor-pointer z-30 group shadow-2xl"
              >
                <div className="relative">
                  <BookCoverArt
                    book={heroBooks[0]}
                    customImageUrl={customCovers[heroBooks[0].id]}
                  />
                  {/* Subtle highlight tag */}
                  <div className="absolute -top-3 -right-2 bg-[#7A4B2A] text-[#FBF3E7] font-display-title text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-[2px] shadow-sm">
                    Lançamento
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="inline-block text-[11px] font-semibold tracking-wider text-[#2B1810] group-hover:text-[#7A4B2A] transition-colors">
                    {heroBooks[0].title}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
