import React, { useState, useEffect } from 'react';
import { BOOKS_DATA, COLLECTIONS } from './data/booksData';
import { Book } from './types/book';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBooks } from './components/FeaturedBooks';
import { BookCatalog } from './components/BookCatalog';
import { CollectionsSection } from './components/CollectionsSection';
import { AboutAuthor } from './components/AboutAuthor';
import { AdoptBookSection } from './components/AdoptBookSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { CustomCoverManager } from './components/CustomCoverManager';
import { WhatsAppSettingsModal } from './components/WhatsAppSettingsModal';
import { AddBookModal } from './components/AddBookModal';
import { getWhatsAppBookUrl } from './utils/whatsapp';
import { loadAllCoversFromStorage, saveCoverToStorage, removeCoverFromStorage } from './utils/imageStorage';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCoverManagerOpen, setIsCoverManagerOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [initialContactSubject, setInitialContactSubject] = useState('');

  // Books list merging static BOOKS_DATA with user-added custom books
  const [booksList, setBooksList] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('oseias_custom_books');
      if (saved) {
        const parsed: Book[] = JSON.parse(saved);
        const baseIds = new Set(BOOKS_DATA.map((b) => b.id));
        const customAdded = parsed.filter((b) => !baseIds.has(b.id));
        return [...BOOKS_DATA, ...customAdded];
      }
    } catch {
      // ignore
    }
    return BOOKS_DATA;
  });

  const handleAddBook = async (newBook: Book, coverImageDataUrl?: string) => {
    const updated = [...booksList, newBook];
    setBooksList(updated);
    try {
      const customAdded = updated.filter((b) => !BOOKS_DATA.some((base) => base.id === b.id));
      localStorage.setItem('oseias_custom_books', JSON.stringify(customAdded));
    } catch (e) {
      console.error('Failed to save book to localStorage', e);
    }
    if (coverImageDataUrl) {
      await handleUpdateCover(newBook.id, coverImageDataUrl);
    }
  };

  // Persist custom cover images in IndexedDB + localStorage for Oséias Reis
  const [customCovers, setCustomCovers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('oseias_custom_book_covers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // On mount, load full custom covers from IndexedDB
  useEffect(() => {
    loadAllCoversFromStorage().then((loadedCovers) => {
      if (loadedCovers && Object.keys(loadedCovers).length > 0) {
        setCustomCovers((prev) => ({ ...prev, ...loadedCovers }));
      }
    });
  }, []);

  const handleUpdateCover = async (bookId: string, imageUrl: string) => {
    setCustomCovers((prev) => ({ ...prev, [bookId]: imageUrl }));
    await saveCoverToStorage(bookId, imageUrl);
  };

  const handleRemoveCover = async (bookId: string) => {
    setCustomCovers((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
    await removeCoverFromStorage(bookId);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAcquireBook = (book: Book) => {
    const whatsappUrl = getWhatsAppBookUrl(book.title);
    window.open(whatsappUrl, '_blank');
    setInitialContactSubject(`Quero adquirir o livreto: ${book.title}`);
  };

  const handleOpenContact = () => {
    handleNavigate('contato');
  };

  // Track scroll position to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'livretos', 'colecoes', 'sobre-autor', 'adote-livro', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#2B1810] flex flex-col selection:bg-[#B08968]/30 selection:text-[#2B1810]">
      {/* Top Bar Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenContact={handleOpenContact}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreBooks={() => handleNavigate('livretos')}
          onOpenContact={handleOpenContact}
          onSelectBook={setSelectedBook}
          customCovers={customCovers}
        />

        {/* 2. Featured Books (Destaques) */}
        <FeaturedBooks
          books={booksList}
          onSelectBook={setSelectedBook}
          onAcquireBook={handleAcquireBook}
          customCovers={customCovers}
        />

        {/* 3. Book Catalog (Meus Livretos) */}
        <BookCatalog
          books={booksList}
          collections={COLLECTIONS}
          onSelectBook={setSelectedBook}
          onAcquireBook={handleAcquireBook}
          onOpenCoverManager={() => setIsCoverManagerOpen(true)}
          onOpenWhatsAppSettings={() => setIsWhatsAppModalOpen(true)}
          onOpenAddBookModal={() => setIsAddBookModalOpen(true)}
          customCovers={customCovers}
        />

        {/* 4. Collections Section (Coleções) */}
        <CollectionsSection
          collections={COLLECTIONS}
          books={booksList}
          onSelectBook={setSelectedBook}
          customCovers={customCovers}
        />

        {/* 5. About Author (Sobre o Autor) */}
        <AboutAuthor onOpenContact={handleOpenContact} />

        {/* 6. Adopt a Book Project (Adote um Livro) */}
        <AdoptBookSection onOpenContact={handleOpenContact} />

        {/* 7. Contact (Contato / Fale Comigo) */}
        <ContactSection initialSubject={initialContactSubject} />
      </main>

      {/* 8. Footer (Rodapé) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
      />

      {/* Book Detail Modal (Página/Modal Individual do Livreto) */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAcquire={handleAcquireBook}
        onUpdateCover={handleUpdateCover}
        customImageUrl={selectedBook ? customCovers[selectedBook.id] : undefined}
      />

      {/* Cover Image Manager for Oséias Reis */}
      <CustomCoverManager
        books={booksList}
        isOpen={isCoverManagerOpen}
        onClose={() => setIsCoverManagerOpen(false)}
        customCovers={customCovers}
        onUpdateCover={handleUpdateCover}
        onRemoveCover={handleRemoveCover}
      />

      {/* Official WhatsApp Number Settings Modal */}
      <WhatsAppSettingsModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Add New Book Modal */}
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        collections={COLLECTIONS}
        onAddBook={handleAddBook}
      />
    </div>
  );
}
