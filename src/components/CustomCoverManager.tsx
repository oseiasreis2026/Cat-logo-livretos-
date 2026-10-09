import React, { useState, useRef } from 'react';
import { Book } from '../types/book';
import { X, Upload, RotateCcw, Check, Image as ImageIcon, AlertCircle, Loader2 } from 'lucide-react';
import { BookCoverArt } from './BookCoverArt';
import { optimizeCoverImage } from '../utils/imageStorage';

interface CustomCoverManagerProps {
  books: Book[];
  isOpen: boolean;
  onClose: () => void;
  customCovers: Record<string, string>;
  onUpdateCover: (bookId: string, imageUrl: string) => Promise<void> | void;
  onRemoveCover: (bookId: string) => Promise<void> | void;
}

export const CustomCoverManager: React.FC<CustomCoverManagerProps> = ({
  books,
  isOpen,
  onClose,
  customCovers,
  onUpdateCover,
  onRemoveCover,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>(books[0]?.id || '');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentBook = books.find((b) => b.id === selectedBookId) || books[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentBook) return;

    setIsProcessing(true);
    setFeedbackMessage(null);

    try {
      // Compress and optimize image to avoid storage quota limit
      const optimizedDataUrl = await optimizeCoverImage(file);
      await onUpdateCover(currentBook.id, optimizedDataUrl);
      setFeedbackMessage({
        type: 'success',
        text: `Capa de "${currentBook.title}" atualizada com sucesso!`,
      });
    } catch (err: any) {
      console.error('Erro ao processar imagem:', err);
      setFeedbackMessage({
        type: 'error',
        text: err?.message || 'Erro ao processar o arquivo. Tente outra imagem PNG ou JPG.',
      });
    } finally {
      setIsProcessing(false);
      // Reset input value so selecting the same file again works
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = async () => {
    if (!urlInput.trim() || !currentBook) return;

    setIsProcessing(true);
    setFeedbackMessage(null);

    try {
      await onUpdateCover(currentBook.id, urlInput.trim());
      setFeedbackMessage({
        type: 'success',
        text: `Link da capa de "${currentBook.title}" aplicado com sucesso!`,
      });
      setUrlInput('');
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: 'Não foi possível salvar o link da imagem.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetCover = async () => {
    if (!currentBook) return;
    setIsProcessing(true);
    try {
      await onRemoveCover(currentBook.id);
      setFeedbackMessage({
        type: 'success',
        text: `Capa padrão restaurada para "${currentBook.title}".`,
      });
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        text: 'Erro ao restaurar a capa padrão.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C120C]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FBF3E7] text-[#2B1810] rounded-[2px] shadow-2xl border border-[#B08968]/60 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B08968]/30 bg-[#F6EDE0]">
          <div className="flex items-center gap-2 text-xs font-display-title tracking-widest uppercase text-[#7A4B2A] font-bold">
            <ImageIcon className="w-4 h-4 text-[#7A4B2A]" />
            <span>Gerenciador de Capas dos Livretos</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C381E] hover:text-[#2B1810] hover:bg-[#EBDBC8] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          <div className="bg-[#F2E5D3] p-4 rounded-sm border border-[#B08968]/30 text-xs text-[#5C381E] leading-relaxed">
            <p className="font-semibold text-[#7A4B2A] mb-1">Como trocar a capa de um livro:</p>
            <p>
              1. Selecione o livreto abaixo.<br />
              2. Clique em <strong>"Carregar Imagem da Capa"</strong> e selecione o arquivo no seu computador ou celular.<br />
              3. O sistema comprime e otimiza a imagem automaticamente, garantindo alta resolução sem travar o navegador.
            </p>
          </div>

          {/* Book Selector Grid */}
          <div>
            <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-2">
              Selecione o Livreto que deseja alterar:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 bg-[#F6EDE0] rounded-sm border border-[#B08968]/30">
              {books.map((b) => {
                const hasCustom = !!customCovers[b.id];
                const isSelected = b.id === selectedBookId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBookId(b.id);
                      setFeedbackMessage(null);
                    }}
                    className={`p-2 text-left rounded-sm transition-all border text-xs cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#7A4B2A] bg-[#EBDBC8] shadow-sm font-semibold'
                        : 'border-transparent bg-[#FBF3E7] hover:bg-[#F2E5D3]'
                    }`}
                  >
                    <span className="line-clamp-2 leading-tight text-[#2B1810]">{b.title}</span>
                    <span className="text-[9px] uppercase tracking-wider mt-1 text-[#7A4B2A]">
                      {hasCustom ? '✓ Capa Própria' : 'Capa Padrão'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Banner */}
          {feedbackMessage && (
            <div
              className={`p-3.5 rounded-sm border text-xs flex items-center gap-2.5 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              {feedbackMessage.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{feedbackMessage.text}</span>
            </div>
          )}

          {/* Preview and Upload controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center pt-2 border-t border-[#B08968]/20">
            
            {/* Preview Stage */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <span className="text-[11px] font-display-title uppercase tracking-widest text-[#7A4B2A] mb-2 font-bold text-center">
                Visualização Atual:
              </span>
              <div className="w-40 sm:w-44 shadow-lg rounded-sm overflow-hidden">
                <BookCoverArt
                  book={currentBook}
                  size="sm"
                  customImageUrl={customCovers[currentBook.id]}
                />
              </div>
              <span className="text-[11px] text-[#7A4B2A] font-semibold mt-2.5">
                {customCovers[currentBook.id] ? '✓ Usando sua foto personalizada' : 'Usando arte editorial padrão'}
              </span>
            </div>

            {/* Upload Options */}
            <div className="sm:col-span-7 space-y-4">
              
              <div className="text-xs text-[#2B1810]">
                <strong>Livro Selecionado:</strong>
                <p className="font-serif text-sm font-bold text-[#7A4B2A]">{currentBook.title}</p>
                {currentBook.subtitle && (
                  <p className="font-serif italic text-xs text-[#5C381E]">{currentBook.subtitle}</p>
                )}
              </div>

              {/* File upload button */}
              <div className="p-5 bg-[#F2E5D3] border-2 border-dashed border-[#B08968]/60 hover:border-[#7A4B2A] rounded-sm text-center transition-colors">
                <label className="cursor-pointer block">
                  {isProcessing ? (
                    <div className="py-2 flex flex-col items-center justify-center">
                      <Loader2 className="w-7 h-7 text-[#7A4B2A] animate-spin mb-2" />
                      <span className="font-display-title text-xs font-bold uppercase tracking-wider text-[#7A4B2A]">
                        Otimizando & Salvando Capa...
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-[#7A4B2A] mx-auto mb-2" />
                      <span className="font-display-title text-xs font-bold uppercase tracking-wider text-[#7A4B2A] block">
                        Carregar Imagem da Capa
                      </span>
                      <span className="text-[10px] text-[#6B4627] block mt-1">
                        Formatos aceitos: PNG, JPG, JPEG ou WEBP
                      </span>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    disabled={isProcessing}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* URL upload alternative */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] uppercase font-display-title tracking-wider text-[#7A4B2A] font-semibold">
                  Ou inserir link direto da imagem:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    disabled={isProcessing}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://exemplo.com/capa.jpg"
                    className="flex-1 px-3 py-2 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
                  />
                  <button
                    type="button"
                    disabled={isProcessing || !urlInput.trim()}
                    onClick={handleApplyUrl}
                    className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#7A4B2A] text-[#FBF3E7] rounded-sm hover:bg-[#633A1F] disabled:opacity-50 cursor-pointer"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Reset button if custom cover exists */}
              {customCovers[currentBook.id] && (
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleResetCover}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7A4B2A] hover:text-[#523019] underline font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar arte editorial padrão deste livro</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          <div className="pt-4 border-t border-[#B08968]/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#7A4B2A] text-[#FBF3E7] rounded-sm hover:bg-[#633A1F] cursor-pointer shadow-sm"
            >
              Concluir & Fechar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
