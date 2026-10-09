import React, { useState, useRef } from 'react';
import { Book, Collection } from '../types/book';
import { X, Plus, Upload, BookOpen, Check, AlertCircle, Loader2 } from 'lucide-react';
import { optimizeCoverImage } from '../utils/imageStorage';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
  onAddBook: (newBook: Book, coverImageDataUrl?: string) => Promise<void> | void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  onClose,
  collections,
  onAddBook,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || 'palavra-transforma');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [centralMessage, setCentralMessage] = useState('');
  const [keyVerse, setKeyVerse] = useState('');
  const [targetAudienceText, setTargetAudienceText] = useState('');
  const [keyThemesText, setKeyThemesText] = useState('');
  const [coverTheme, setCoverTheme] = useState<Book['coverTheme']>('dawn');
  const [isFeatured, setIsFeatured] = useState(false);
  const [coverImageDataUrl, setCoverImageDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setErrorMessage(null);
      try {
        const optimized = await optimizeCoverImage(file);
        setCoverImageDataUrl(optimized);
      } catch (err: any) {
        setErrorMessage(err?.message || 'Erro ao carregar a imagem da capa.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      setErrorMessage('Por favor, preencha pelo menos o título e a descrição breve.');
      return;
    }

    const selectedCol = collections.find((c) => c.id === collectionId);
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `livro-${Date.now()}`;

    const newBook: Book = {
      id: slug,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      author: 'Oséias Reis',
      collectionId: collectionId,
      collectionName: selectedCol ? selectedCol.name : 'Coleção Geral',
      coverAccent: '#7A4B2A',
      coverTheme: coverTheme,
      tagline: selectedCol ? selectedCol.tagline : 'Edificação Bíblica',
      scriptureReference: keyVerse.trim() || undefined,
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || shortDescription.trim(),
      centralMessage: centralMessage.trim() || shortDescription.trim(),
      targetAudience: targetAudienceText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      keyThemes: keyThemesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      details: {
        chapters: 'Edição Devocional',
        format: 'Livreto Impresso e Digital',
        year: '2026',
        keyVerse: keyVerse.trim() || undefined,
        seal: selectedCol?.name.includes('Palavra') ? 'Palavra que Transforma' : 'Edição Autor',
      },
      isFeatured: isFeatured,
    };

    setIsProcessing(true);
    try {
      await onAddBook(newBook, coverImageDataUrl || undefined);
      onClose();
      // Reset form
      setTitle('');
      setSubtitle('');
      setShortDescription('');
      setFullDescription('');
      setCentralMessage('');
      setKeyVerse('');
      setTargetAudienceText('');
      setKeyThemesText('');
      setCoverImageDataUrl(null);
    } catch (err: any) {
      setErrorMessage('Erro ao cadastrar o livreto.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C120C]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FBF3E7] text-[#2B1810] rounded-[2px] shadow-2xl border border-[#B08968]/60 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B08968]/30 bg-[#F6EDE0]">
          <div className="flex items-center gap-2 text-xs font-display-title tracking-widest uppercase text-[#7A4B2A] font-bold">
            <Plus className="w-4 h-4 text-[#7A4B2A]" />
            <span>Adicionar Novo Livreto ao Catálogo</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C381E] hover:text-[#2B1810] hover:bg-[#EBDBC8] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 rounded-sm text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Título do Livreto *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: O Fruto da Obediência"
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Subtítulo (opcional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Alinhando o coração ao plano de Deus"
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Coleção *
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
              >
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Versículo de Base (opcional)
              </label>
              <input
                type="text"
                value={keyVerse}
                onChange={(e) => setKeyVerse(e.target.value)}
                placeholder="Ex: João 15:5"
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
              />
            </div>
          </div>

          {/* Cover image upload */}
          <div>
            <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
              Imagem da Capa (opcional)
            </label>
            <div className="p-4 bg-[#F2E5D3] border border-dashed border-[#B08968]/50 rounded-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {coverImageDataUrl ? (
                  <img
                    src={coverImageDataUrl}
                    alt="Prévia da capa"
                    className="w-12 h-16 object-cover rounded-xs shadow-sm border border-[#B08968]/50"
                  />
                ) : (
                  <div className="w-12 h-16 bg-[#EBDBC8] border border-[#B08968]/40 rounded-xs flex items-center justify-center text-[#7A4B2A]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                )}
                <div className="text-xs">
                  <span className="font-semibold block text-[#2B1810]">
                    {coverImageDataUrl ? 'Capa selecionada e pronta!' : 'Nenhuma imagem selecionada'}
                  </span>
                  <span className="text-[10px] text-[#6B4627]">
                    (Se não enviar, usaremos uma arte editorial personalizada)
                  </span>
                </div>
              </div>

              <label className="px-3.5 py-1.5 bg-[#7A4B2A] text-[#FBF3E7] hover:bg-[#633A1F] text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer shrink-0 transition-colors">
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Selecionar Capa'}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
              Breve Descrição para o Card *
            </label>
            <textarea
              required
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Uma frase marcante que resuma a obra para o visitante do catálogo..."
              className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
              Descrição Completa / Sinopse
            </label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="O texto completo que aparecerá na página detalhada do livreto..."
              className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Para quem é indicado (um por linha)
              </label>
              <textarea
                rows={2}
                value={targetAudienceText}
                onChange={(e) => setTargetAudienceText(e.target.value)}
                placeholder="Ex: Jovens em busca de direção&#10;Líderes de células"
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                Principais Temas (separados por vírgula)
              </label>
              <input
                type="text"
                value={keyThemesText}
                onChange={(e) => setKeyThemesText(e.target.value)}
                placeholder="Ex: Santidade, Oração, Comunhão, Fé"
                className="w-full px-3 py-2 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded-xs text-[#7A4B2A] focus:ring-[#7A4B2A]"
            />
            <label htmlFor="isFeatured" className="text-xs text-[#2B1810] cursor-pointer">
              Exibir este livro na seção de <strong>Livretos em Destaque</strong> na página inicial
            </label>
          </div>

          <div className="pt-4 border-t border-[#B08968]/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#5C381E] hover:bg-[#F2E5D3] rounded-sm cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#7A4B2A] text-[#FBF3E7] rounded-sm hover:bg-[#633A1F] cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>Cadastrar Livreto</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
