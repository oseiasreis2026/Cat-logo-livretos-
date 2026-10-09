import React from 'react';
import { Book } from '../types/book';

interface BookCoverArtProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBackCover?: boolean;
  className?: string;
  customImageUrl?: string;
}

export const BookCoverArt: React.FC<BookCoverArtProps> = ({
  book,
  size = 'md',
  showBackCover = false,
  className = '',
  customImageUrl,
}) => {
  // If the user has uploaded or specified a custom image for this book
  if (customImageUrl) {
    return (
      <div
        className={`book-spine book-shadow relative overflow-hidden rounded-[3px] bg-[#1C120C] select-none ${className}`}
        style={{ aspectRatio: '3/4.2' }}
      >
        <img
          src={customImageUrl}
          alt={`Capa do livro ${book.title}`}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
      </div>
    );
  }

  // Back cover presentation
  if (showBackCover) {
    return (
      <div
        className={`book-spine book-shadow relative overflow-hidden rounded-[3px] bg-[#1F140D] text-[#FBF3E7] p-6 sm:p-8 flex flex-col justify-between select-none ${className}`}
        style={{
          aspectRatio: '3/4.2',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #301E13 0%, #170E08 100%)',
        }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9A88B_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Back cover top */}
        <div className="relative z-10 text-center border-b border-[#B08968]/30 pb-4">
          <p className="font-display-title text-[10px] tracking-[0.25em] text-[#B08968] uppercase mb-1">
            Contra-Capa Editorial
          </p>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-[#FBF3E7] leading-tight">
            {book.title}
          </h4>
          {book.subtitle && (
            <p className="font-serif text-xs text-[#C9A88B] italic mt-1">{book.subtitle}</p>
          )}
        </div>

        {/* Back cover body excerpt */}
        <div className="relative z-10 my-auto py-3 overflow-y-auto max-h-[60%]">
          <p className="font-serif text-xs sm:text-sm text-[#EBE0D2] leading-relaxed text-justify italic opacity-95">
            "{book.backCoverText || book.fullDescription}"
          </p>
        </div>

        {/* Back cover footer */}
        <div className="relative z-10 pt-3 border-t border-[#B08968]/30 flex items-center justify-between text-[11px] text-[#C9A88B]">
          <div className="flex flex-col">
            <span className="font-medium text-[#FBF3E7]">{book.author}</span>
            <span className="text-[9px] opacity-75">{book.collectionName}</span>
          </div>
          <div className="text-right">
            <span className="block text-[9px] tracking-widest text-[#B08968]">
              {book.details.seal || 'PALAVRA QUE TRANSFORMA'}
            </span>
            <span className="text-[8px] opacity-60">Edição Autor</span>
          </div>
        </div>
      </div>
    );
  }

  // Thematic Front Cover Rendering
  const getThemeBackground = () => {
    switch (book.coverTheme) {
      case 'water':
        return {
          bg: 'linear-gradient(180deg, #FBF3E7 0%, #E8D3B7 25%, #CFA97E 55%, #7A4B2A 80%, #3D2213 100%)',
          accent: '#7A4B2A',
          symbol: (
            <svg viewBox="0 0 100 60" className="w-full h-24 opacity-75 mx-auto text-[#7A4B2A]" fill="none" stroke="currentColor">
              <path d="M5 45 C 25 35, 45 55, 65 40 C 85 25, 95 38, 98 42" strokeWidth="1.5" />
              <path d="M2 30 C 20 20, 50 35, 75 25 C 90 20, 95 24, 98 25" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="18" r="7" fill="#F4DFC3" stroke="#B08968" strokeWidth="1" />
            </svg>
          ),
        };
      case 'fire':
        return {
          bg: 'linear-gradient(180deg, #FBF3E7 0%, #ECC592 20%, #B45309 60%, #5B1C04 90%, #2B0C02 100%)',
          accent: '#B45309',
          symbol: (
            <svg viewBox="0 0 80 80" className="w-full h-24 opacity-80 mx-auto text-[#FBF3E7]" fill="none">
              <path d="M40 10 Q 55 35 48 50 Q 55 45 58 60 Q 40 75 35 60 Q 30 65 25 55 Q 35 40 40 10 Z" fill="#F97316" />
              <path d="M40 25 Q 48 42 44 55 Q 38 65 34 55 Q 38 45 40 25 Z" fill="#FDE047" opacity="0.9" />
              <ellipse cx="40" cy="70" rx="22" ry="5" fill="#3D1A0A" />
            </svg>
          ),
        };
      case 'wind':
        return {
          bg: 'linear-gradient(180deg, #FDF7EE 0%, #EBD5A9 30%, #D8A958 65%, #8A571B 90%, #382006 100%)',
          accent: '#92400E',
          symbol: (
            <svg viewBox="0 0 100 70" className="w-full h-24 opacity-80 mx-auto text-[#8A571B]" fill="none" stroke="currentColor">
              <path d="M10 50 Q 30 20 50 30 T 90 15" strokeWidth="1.5" />
              <path d="M20 55 Q 40 35 65 40 T 95 30" strokeWidth="1.2" />
              <path d="M40 15 C 45 10, 52 12, 48 20" strokeWidth="1.5" fill="#C9A88B" />
              <path d="M70 25 C 75 20, 82 22, 78 30" strokeWidth="1.5" fill="#C9A88B" />
            </svg>
          ),
        };
      case 'earth':
        return {
          bg: 'linear-gradient(180deg, #FBF3E7 0%, #D8BE9E 25%, #8B5A33 60%, #452410 85%, #1F0D04 100%)',
          accent: '#78350F',
          symbol: (
            <svg viewBox="0 0 80 80" className="w-full h-24 opacity-85 mx-auto" fill="none">
              <path d="M40 38 Q 45 25 55 20 Q 50 32 40 38 Z" fill="#65A30D" />
              <path d="M40 38 Q 35 28 28 24 Q 32 34 40 38 Z" fill="#4D7C0F" />
              <path d="M40 38 L 40 68" stroke="#451A03" strokeWidth="2.5" />
              <path d="M40 50 Q 25 58 18 70" stroke="#78350F" strokeWidth="1.5" />
              <path d="M40 54 Q 55 60 64 68" stroke="#78350F" strokeWidth="1.5" />
            </svg>
          ),
        };
      case 'sanctuary':
        return {
          bg: 'linear-gradient(180deg, #24150B 0%, #1C1008 30%, #3D2210 65%, #180D06 100%)',
          accent: '#D97706',
          isDark: true,
          symbol: (
            <svg viewBox="0 0 90 90" className="w-full h-28 opacity-90 mx-auto" fill="none">
              <ellipse cx="45" cy="52" rx="30" ry="12" fill="#D97706" opacity="0.3" filter="blur(6px)" />
              <path d="M35 55 L 55 55 L 50 35 L 40 35 Z" fill="#FBF3E7" opacity="0.9" />
              <circle cx="45" cy="28" r="6" fill="#FDE047" />
              <path d="M45 15 L 45 4" stroke="#D97706" strokeWidth="1.5" />
              <path d="M38 8 L 52 8" stroke="#D97706" strokeWidth="1.5" />
            </svg>
          ),
        };
      case 'judgment':
        return {
          bg: 'linear-gradient(180deg, #1C120C 0%, #2A1A10 35%, #160D07 70%, #0D0704 100%)',
          accent: '#B45309',
          isDark: true,
          symbol: (
            <svg viewBox="0 0 90 90" className="w-full h-28 opacity-85 mx-auto" fill="none">
              <path d="M30 65 L 60 65 L 55 45 L 35 45 Z" fill="#B08968" opacity="0.7" />
              <path d="M45 5 L 45 45" stroke="#FDE047" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 2" />
              <ellipse cx="45" cy="45" rx="16" ry="4" fill="#FDE047" opacity="0.3" />
            </svg>
          ),
        };
      case 'dawn':
        return {
          bg: 'linear-gradient(180deg, #FBF3E7 0%, #F5DFBF 25%, #D49B55 60%, #683815 88%, #2B1607 100%)',
          accent: '#9A3412',
          symbol: (
            <svg viewBox="0 0 90 80" className="w-full h-24 opacity-80 mx-auto" fill="none">
              <circle cx="45" cy="30" r="14" fill="#FDE047" opacity="0.8" />
              <path d="M10 65 Q 45 45 80 65" stroke="#431407" strokeWidth="2" fill="none" />
              <path d="M45 65 L 45 50" stroke="#FDE047" strokeWidth="1.5" />
            </svg>
          ),
        };
      case 'grace':
      default:
        return {
          bg: 'linear-gradient(180deg, #1A120B 0%, #2C1B10 30%, #4D321D 65%, #180D06 100%)',
          accent: '#EAB308',
          isDark: true,
          symbol: (
            <svg viewBox="0 0 90 90" className="w-full h-28 opacity-90 mx-auto" fill="none">
              <path d="M45 10 L 45 70" stroke="#EAB308" strokeWidth="2" />
              <path d="M30 28 L 60 28" stroke="#EAB308" strokeWidth="2" />
              <circle cx="45" cy="28" r="18" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </svg>
          ),
        };
    }
  };

  const theme = getThemeBackground();
  const isDark = theme.isDark || false;

  return (
    <div
      className={`book-spine book-shadow relative overflow-hidden rounded-[3px] flex flex-col justify-between p-5 sm:p-7 select-none transition-transform duration-300 ${className}`}
      style={{
        aspectRatio: '3/4.2',
        background: theme.bg,
        color: isDark ? '#FBF3E7' : '#2B1810',
      }}
    >
      {/* Delicate outer framing rule */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[1px] border"
        style={{ borderColor: isDark ? 'rgba(217, 180, 142, 0.28)' : 'rgba(122, 75, 42, 0.25)' }}
      />
      <div
        className="absolute inset-[11px] sm:inset-[15px] pointer-events-none rounded-[1px] border"
        style={{ borderColor: isDark ? 'rgba(217, 180, 142, 0.12)' : 'rgba(122, 75, 42, 0.12)' }}
      />

      {/* Top Header / Kicker */}
      <div className="relative z-10 text-center pt-1">
        {book.volume && (
          <span
            className="block text-[9px] sm:text-[10px] uppercase font-display-title tracking-[0.25em] mb-1 font-semibold"
            style={{ color: isDark ? '#E5C49F' : '#7A4B2A' }}
          >
            {book.volume}
          </span>
        )}
        <h3
          className="font-display-title text-xl sm:text-2xl font-bold uppercase tracking-wider leading-none text-balance"
          style={{ color: isDark ? '#FAF3E7' : '#2B1810' }}
        >
          {book.title}
        </h3>
        {book.subtitle && (
          <p
            className="font-serif italic text-xs sm:text-sm mt-1.5 leading-snug"
            style={{ color: isDark ? '#DFCFBA' : '#5C381E' }}
          >
            {book.subtitle}
          </p>
        )}
        {book.tagline && (
          <p
            className="text-[9px] sm:text-[10px] mt-1 tracking-wide opacity-80"
            style={{ color: isDark ? '#C7B198' : '#7A4B2A' }}
          >
            {book.tagline}
          </p>
        )}
      </div>

      {/* Central Symbolic Artwork */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        {theme.symbol}
      </div>

      {/* Footer / Author & Seal */}
      <div className="relative z-10 text-center pb-1">
        <div className="inline-block border-t pt-2 w-32 mx-auto" style={{ borderColor: isDark ? 'rgba(217, 180, 142, 0.3)' : 'rgba(122, 75, 42, 0.25)' }}>
          <p
            className="font-serif text-xs sm:text-sm font-semibold tracking-wide"
            style={{ color: isDark ? '#FAF3E7' : '#2B1810' }}
          >
            {book.author}
          </p>
        </div>
        {book.scriptureReference && (
          <p
            className="text-[8px] sm:text-[9px] uppercase tracking-widest mt-1 opacity-70"
            style={{ color: isDark ? '#DFCFBA' : '#5C381E' }}
          >
            {book.scriptureReference}
          </p>
        )}
      </div>

      {/* Subtle paper lighting glare */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/15 via-transparent to-white/10" />
    </div>
  );
};
