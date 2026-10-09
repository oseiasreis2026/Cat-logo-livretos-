import React, { useState, useMemo } from 'react';
import { Book, Collection } from '../types/book';
import { BookCoverArt } from './BookCoverArt';
import { Search, Eye, MessageCircle, Filter, Image as ImageIcon, Plus } from 'lucide-react';
import { getWhatsAppBookUrl } from '../utils/whatsapp';

interface BookCatalogProps {
  books: Book[];
  collections: Collection[];
  onSelectBook: (book: Book) => void;
  onAcquireBook: (book: Book) => void;
  onOpenCoverManager: () => void;
  onOpenWhatsAppSettings?: () => void;
  onOpenAddBookModal?: () => void;
  customCovers: Record<string, string>;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({
  books,
  collections,
  onSelectBook,
  onAcquireBook,
  onOpenCoverManager,
  onOpenWhatsAppSettings,
  onOpenAddBookModal,
  customCovers,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCollection =
        selectedCollection === 'all' || book.collectionId === selectedCollection;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        (book.subtitle && book.subtitle.toLowerCase().includes(query)) ||
        book.shortDescription.toLowerCase().includes(query) ||
        book.keyThemes.some((t) => t.toLowerCase().includes(query));

      return matchesCollection && matchesSearch;
    });
  }, [books, selectedCollection, searchQuery]);

  return (
    <section id="livretos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#B08968]/20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A] mb-2">
            <span>Catálogo Completo</span>
          </div>
          <h2 className="font-display-title text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1810]">
            MEUS LIVRETOS
          </h2>
          <div className="w-16 h-0.5 bg-[#B08968] my-3" />
          <p className="font-serif text-base text-[#5C381E] max-w-xl leading-relaxed">
            Navegue pelas obras cristãs publicadas. Cada livro é uma ferramenta pastoral desenhada para alinhamento bíblico e edificação contínua.
          </p>
        </div>

        {/* Quick action for author to manage covers, WhatsApp and new books */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenAddBookModal && (
            <button
              onClick={onOpenAddBookModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] rounded-sm transition-colors cursor-pointer shadow-xs"
              title="Adicionar um novo livreto ao catálogo"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Livro</span>
            </button>
          )}

          {onOpenWhatsAppSettings && (
            <button
              onClick={onOpenWhatsAppSettings}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#7A4B2A] bg-[#F4E9DC] hover:bg-[#EBDDCB] border border-[#B08968]/40 rounded-sm transition-colors cursor-pointer"
              title="Configurar seu número de WhatsApp para os botões de adquirir"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Configurar WhatsApp</span>
            </button>
          )}

          <button
            onClick={onOpenCoverManager}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#7A4B2A] bg-[#F4E9DC] hover:bg-[#EBDDCB] border border-[#B08968]/40 rounded-sm transition-colors cursor-pointer"
            title="Atualizar ou carregar imagens de capas dos livros"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Personalizar Capas</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#F6EDE0] p-4 sm:p-5 rounded-[2px] border border-[#B08968]/30 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Interactive Collection Filter Buttons (Functional Segmented Control) */}
        <div className="flex items-center flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCollection('all')}
            className={`px-3.5 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
              selectedCollection === 'all'
                ? 'bg-[#7A4B2A] text-[#FBF3E7] shadow-sm'
                : 'text-[#5C381E] hover:bg-[#ECE0D0] hover:text-[#2B1810]'
            }`}
          >
            Todos ({books.length})
          </button>

          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-3.5 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                selectedCollection === col.id
                  ? 'bg-[#7A4B2A] text-[#FBF3E7] shadow-sm'
                  : 'text-[#5C381E] hover:bg-[#ECE0D0] hover:text-[#2B1810]'
              }`}
            >
              {col.name.replace('Coleção ', '')}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#7A4B2A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título ou tema..."
            className="w-full pl-9 pr-4 py-2 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] placeholder:text-[#8C6B52]"
          />
        </div>

      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16 paper-card rounded-sm border border-[#B08968]/30">
          <p className="font-serif text-lg text-[#5C381E]">
            Nenhum livreto encontrado para os critérios selecionados.
          </p>
          <button
            onClick={() => {
              setSelectedCollection('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#7A4B2A] text-[#FBF3E7] rounded-sm cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="paper-card rounded-[2px] p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group border border-[#B08968]/30 hover:border-[#7A4B2A]/50"
          >
            {/* Book Cover Container */}
            <div
              onClick={() => onSelectBook(book)}
              className="relative cursor-pointer max-w-[210px] mx-auto w-full mb-5 group-hover:-translate-y-1 transition-transform duration-300"
            >
              <BookCoverArt
                book={book}
                size="sm"
                customImageUrl={customCovers[book.id]}
              />

              {/* Hover Quick Action */}
              <div className="absolute inset-0 bg-[#2B1810]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[3px]">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF3E7] text-[#2B1810] text-[11px] font-semibold uppercase tracking-wider rounded-sm shadow-md">
                  <Eye className="w-3.5 h-3.5 text-[#7A4B2A]" />
                  Ver Obra
                </span>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Collection Kicker */}
                <div className="text-[10px] uppercase font-display-title tracking-widest text-[#7A4B2A] font-semibold mb-1">
                  {book.collectionName}
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectBook(book)}
                  className="font-display-title text-lg font-bold text-[#2B1810] hover:text-[#7A4B2A] transition-colors cursor-pointer leading-snug"
                >
                  {book.title}
                </h3>

                {/* Subtitle */}
                {book.subtitle && (
                  <p className="font-serif italic text-xs text-[#6B4627] mt-0.5 leading-tight">
                    {book.subtitle}
                  </p>
                )}

                {/* Short Description */}
                <p className="font-serif text-xs text-[#4A2E19] mt-2.5 line-clamp-3 leading-relaxed">
                  {book.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#B08968]/20 flex flex-col gap-2">
                <button
                  onClick={() => onSelectBook(book)}
                  className="w-full py-2 px-3 text-xs font-semibold tracking-wider uppercase text-[#2B1810] bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/40 rounded-sm transition-colors cursor-pointer text-center"
                >
                  Conhecer Livreto
                </button>
                <a
                  href={getWhatsAppBookUrl(book.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Adquirir / Saber Mais</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
