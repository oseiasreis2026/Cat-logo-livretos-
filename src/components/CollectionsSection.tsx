import React from 'react';
import { Collection, Book } from '../types/book';
import { BookCoverArt } from './BookCoverArt';
import { ShieldAlert, Compass, BookOpen, ChevronRight, Layers } from 'lucide-react';

interface CollectionsSectionProps {
  collections: Collection[];
  books: Book[];
  onSelectBook: (book: Book) => void;
  customCovers: Record<string, string>;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  collections,
  books,
  onSelectBook,
  customCovers,
}) => {
  const getCollectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#7A4B2A]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#7A4B2A]" />;
      case 'BookOpen':
      default:
        return <BookOpen className="w-5 h-5 text-[#7A4B2A]" />;
    }
  };

  return (
    <section id="colecoes" className="py-24 bg-[#F8EFE2]/60 border-b border-[#B08968]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A] mb-2">
            <span>Organização Editorial</span>
          </div>
          <h2 className="font-display-title text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1810]">
            COLEÇÕES TEMÁTICAS
          </h2>
          <div className="w-16 h-0.5 bg-[#B08968] mx-auto my-4" />
          <p className="font-serif text-base sm:text-lg text-[#5C381E] leading-relaxed">
            As publicações de Oséias Reis são agrupadas em séries temáticas coesas, permitindo um aprofundamento progressivo nas verdades das Escrituras.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {collections.map((collection) => {
            const collectionBooks = books.filter((b) => b.collectionId === collection.id);

            return (
              <div
                key={collection.id}
                className="paper-card rounded-[2px] p-6 sm:p-10 border border-[#B08968]/30 shadow-sm"
              >
                {/* Collection Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#B08968]/20 gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#F2E5D3] rounded-sm border border-[#B08968]/30">
                      {getCollectionIcon(collection.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display-title text-xl sm:text-2xl font-bold text-[#2B1810]">
                        {collection.name}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-[#7A4B2A] mt-0.5">
                        {collection.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-sans uppercase tracking-widest text-[#8C6B52] bg-[#F2E5D3] px-3 py-1.5 rounded-sm border border-[#B08968]/30 self-start md:self-auto">
                    {collectionBooks.length} {collectionBooks.length === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                {/* Collection Narrative Summary */}
                <p className="font-serif text-sm sm:text-base text-[#4A2E19] leading-relaxed max-w-3xl mb-8">
                  {collection.description}
                </p>

                {/* Books in this Collection */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {collectionBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => onSelectBook(book)}
                      className="group cursor-pointer flex flex-col"
                    >
                      <div className="relative mb-3 group-hover:-translate-y-1.5 transition-transform duration-300">
                        <BookCoverArt
                          book={book}
                          size="sm"
                          customImageUrl={customCovers[book.id]}
                        />
                      </div>
                      <h4 className="font-display-title text-xs sm:text-sm font-bold text-[#2B1810] group-hover:text-[#7A4B2A] transition-colors leading-tight">
                        {book.title}
                      </h4>
                      {book.subtitle && (
                        <p className="font-serif italic text-[11px] text-[#7A4B2A] mt-0.5 line-clamp-1">
                          {book.subtitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
