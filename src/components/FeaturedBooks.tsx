import React from 'react';
import { Book } from '../types/book';
import { BookCoverArt } from './BookCoverArt';
import { Eye, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppBookUrl } from '../utils/whatsapp';

interface FeaturedBooksProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onAcquireBook: (book: Book) => void;
  customCovers: Record<string, string>;
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({
  books,
  onSelectBook,
  onAcquireBook,
  customCovers,
}) => {
  const featured = books.filter((b) => b.isFeatured).slice(0, 6);

  return (
    <section className="py-20 bg-[#F6EDE0]/70 border-b border-[#B08968]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A] mb-2">
            <span>Curadoria Editorial</span>
          </div>
          <h2 className="font-display-title text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1810]">
            LIVRETOS EM DESTAQUE
          </h2>
          <div className="w-16 h-0.5 bg-[#B08968] mx-auto my-4" />
          <p className="font-serif text-base sm:text-lg text-[#5C381E] leading-relaxed">
            Obras fundamentais elaboradas para despertar a consciência espiritual, confrontar a religiosidade superficial e inspirar uma vida de devoção genuína.
          </p>
        </div>

        {/* Featured Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {featured.map((book) => (
            <div
              key={book.id}
              className="paper-card rounded-[2px] p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group border border-[#B08968]/30"
            >
              {/* Cover Stage */}
              <div
                onClick={() => onSelectBook(book)}
                className="relative cursor-pointer max-w-[240px] mx-auto w-full mb-6 group-hover:-translate-y-1.5 transition-transform duration-300"
              >
                <BookCoverArt
                  book={book}
                  size="md"
                  customImageUrl={customCovers[book.id]}
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#2B1810]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[3px]">
                  <span className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FBF3E7] text-[#2B1810] text-xs font-medium uppercase tracking-wider rounded-sm shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#7A4B2A]" />
                    Examinar Obra
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1 flex flex-col justify-between text-center pt-2">
                <div>
                  <div className="text-[11px] font-sans uppercase tracking-widest text-[#7A4B2A] mb-1 font-semibold">
                    {book.collectionName}
                  </div>
                  
                  <h3
                    onClick={() => onSelectBook(book)}
                    className="font-display-title text-xl font-bold text-[#2B1810] hover:text-[#7A4B2A] transition-colors cursor-pointer leading-snug"
                  >
                    {book.title}
                  </h3>
                  
                  {book.subtitle && (
                    <p className="font-serif italic text-xs text-[#6B4627] mt-1 leading-snug">
                      {book.subtitle}
                    </p>
                  )}

                  <p className="font-serif text-sm text-[#4A2E19] mt-3 line-clamp-3 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-4 border-t border-[#B08968]/20 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectBook(book)}
                    className="px-3 py-2.5 text-xs font-medium tracking-wider uppercase text-[#2B1810] bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/40 rounded-sm transition-colors cursor-pointer text-center whitespace-nowrap"
                  >
                    Conhecer Livreto
                  </button>
                  <a
                    href={getWhatsAppBookUrl(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Adquirir</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
