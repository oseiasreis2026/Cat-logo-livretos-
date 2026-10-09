import React, { useState, useRef } from 'react';
import { Book } from '../types/book';
import { BookCoverArt } from './BookCoverArt';
import { X, MessageCircle, BookOpen, Layers, CheckCircle2, ChevronRight, Share2, Check, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { getWhatsAppBookUrl } from '../utils/whatsapp';
import { optimizeCoverImage } from '../utils/imageStorage';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAcquire: (book: Book) => void;
  onUpdateCover?: (bookId: string, imageUrl: string) => Promise<void> | void;
  customImageUrl?: string;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAcquire,
  onUpdateCover,
  customImageUrl,
}) => {
  const [showBackCover, setShowBackCover] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isUpdatingCover, setIsUpdatingCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!book) return null;

  const handleDirectCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateCover) {
      setIsUpdatingCover(true);
      try {
        const optimized = await optimizeCoverImage(file);
        await onUpdateCover(book.id, optimized);
      } catch (err) {
        console.error('Erro ao atualizar capa:', err);
      } finally {
        setIsUpdatingCover(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Conheça o livreto cristão "${book.title}" de Oséias Reis: ${window.location.href}`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C120C]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#FBF3E7] text-[#2B1810] rounded-[2px] shadow-2xl border border-[#B08968]/50 overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B08968]/30 bg-[#F6EDE0]">
          <div className="flex items-center gap-2 text-xs font-display-title tracking-widest uppercase text-[#7A4B2A]">
            <span>{book.collectionName}</span>
            {book.volume && (
              <>
                <span aria-hidden="true">·</span>
                <span>{book.volume}</span>
              </>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C381E] hover:text-[#2B1810] hover:bg-[#EBDBC8] rounded-sm transition-colors cursor-pointer"
            aria-label="Fechar detalhes da obra"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Book Cover Presentation & Cover Switcher */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px]">
                <BookCoverArt
                  book={book}
                  size="lg"
                  showBackCover={showBackCover}
                  customImageUrl={showBackCover ? undefined : customImageUrl}
                />
              </div>

              {/* Cover/Back Cover Toggle */}
              <div className="mt-4 flex items-center gap-2 p-1 bg-[#F2E5D3] rounded-sm border border-[#B08968]/40">
                <button
                  onClick={() => setShowBackCover(false)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                    !showBackCover
                      ? 'bg-[#7A4B2A] text-[#FBF3E7] shadow-sm'
                      : 'text-[#5C381E] hover:text-[#2B1810]'
                  }`}
                >
                  Capa Frontal
                </button>
                <button
                  onClick={() => setShowBackCover(true)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                    showBackCover
                      ? 'bg-[#7A4B2A] text-[#FBF3E7] shadow-sm'
                      : 'text-[#5C381E] hover:text-[#2B1810]'
                  }`}
                >
                  Contra-Capa
                </button>
              </div>

              {/* Direct Cover Replacement Trigger */}
              {onUpdateCover && (
                <div className="mt-2.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2E5D3] hover:bg-[#EBDDCB] border border-[#B08968]/50 text-[11px] font-sans uppercase tracking-wider text-[#7A4B2A] rounded-sm cursor-pointer transition-colors shadow-xs">
                    {isUpdatingCover ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7A4B2A]" />
                        <span>Otimizando & Salvando...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-[#7A4B2A]" />
                        <span>Trocar Capa Deste Livro</span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      disabled={isUpdatingCover}
                      onChange={handleDirectCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Quick Details Box */}
              <div className="w-full mt-6 p-4 bg-[#F6EDE0] border border-[#B08968]/30 rounded-sm text-xs space-y-2">
                <div className="font-display-title text-[11px] uppercase tracking-wider text-[#7A4B2A] font-semibold border-b border-[#B08968]/20 pb-1 mb-2">
                  Ficha da Obra
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4627]">Autor:</span>
                  <span className="font-medium text-[#2B1810]">{book.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4627]">Formato:</span>
                  <span className="font-medium text-[#2B1810]">{book.details.format}</span>
                </div>
                {book.details.keyVerse && (
                  <div className="flex flex-col pt-1 border-t border-[#B08968]/20">
                    <span className="text-[#6B4627] mb-0.5">Versículo-Chave:</span>
                    <span className="font-serif italic text-[#2B1810] text-[11px]">
                      {book.details.keyVerse}
                    </span>
                  </div>
                )}
                {book.details.seal && (
                  <div className="flex justify-between pt-1 border-t border-[#B08968]/20">
                    <span className="text-[#6B4627]">Selo Editorial:</span>
                    <span className="font-medium text-[#7A4B2A]">{book.details.seal}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Editorial Depth & Content Sections */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Title Lockup */}
              <div>
                <h2 className="font-display-title text-2xl sm:text-3xl font-bold text-[#2B1810] leading-tight">
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="font-serif italic text-base sm:text-lg text-[#7A4B2A] mt-1">
                    {book.subtitle}
                  </p>
                )}
                {book.tagline && (
                  <p className="text-xs uppercase tracking-widest text-[#8C6B52] mt-1.5">
                    {book.tagline}
                  </p>
                )}
              </div>

              {/* Central Message Highlight Quote */}
              <div className="p-4 bg-[#F2E5D3] border-l-4 border-[#7A4B2A] rounded-r-sm">
                <div className="text-[10px] uppercase font-display-title tracking-widest text-[#7A4B2A] font-semibold mb-1">
                  Mensagem Central
                </div>
                <p className="font-serif text-sm italic text-[#381F0E] leading-relaxed">
                  "{book.centralMessage}"
                </p>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="font-display-title text-xs tracking-widest uppercase text-[#7A4B2A] font-bold mb-2">
                  Sobre Esta Obra
                </h4>
                <div className="font-serif text-sm text-[#381F0E] leading-relaxed space-y-3 whitespace-pre-line text-justify">
                  {book.fullDescription}
                </div>
              </div>

              {/* Para Quem é Indicado */}
              {book.targetAudience && book.targetAudience.length > 0 && (
                <div>
                  <h4 className="font-display-title text-xs tracking-widest uppercase text-[#7A4B2A] font-bold mb-2.5">
                    Para Quem É Indicado
                  </h4>
                  <ul className="space-y-1.5">
                    {book.targetAudience.map((audience, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#381F0E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7A4B2A] shrink-0 mt-0.5" />
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Principais Temas Abordados */}
              {book.keyThemes && book.keyThemes.length > 0 && (
                <div>
                  <h4 className="font-display-title text-xs tracking-widest uppercase text-[#7A4B2A] font-bold mb-2">
                    Principais Temas Abordados
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5C381E]">
                    {book.keyThemes.map((theme, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B08968]" />
                        <span>{theme}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#B08968]/30 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getWhatsAppBookUrl(book.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-6 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] rounded-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Adquirir no WhatsApp</span>
                </a>

                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto py-3 px-4 text-xs font-medium uppercase tracking-wider text-[#2B1810] bg-[#F2E5D3] hover:bg-[#EADBCA] border border-[#B08968]/50 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Link Copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#7A4B2A]" />
                      <span>Compartilhar</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
