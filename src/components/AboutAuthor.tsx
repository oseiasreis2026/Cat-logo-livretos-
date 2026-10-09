import React, { useState } from 'react';
import { Feather, BookOpen, Heart, Award, Upload, Check, Loader2 } from 'lucide-react';
import { optimizeCoverImage } from '../utils/imageStorage';

interface AboutAuthorProps {
  onOpenContact: () => void;
}

export const AboutAuthor: React.FC<AboutAuthorProps> = ({ onOpenContact }) => {
  const [authorPhoto, setAuthorPhoto] = useState<string | null>(() => {
    return localStorage.getItem('oseias_author_photo');
  });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingPhoto(true);
      try {
        const optimized = await optimizeCoverImage(file, 800, 1000, 0.88);
        setAuthorPhoto(optimized);
        try {
          localStorage.setItem('oseias_author_photo', optimized);
        } catch {
          // ignore
        }
      } catch (err) {
        console.error('Erro ao carregar foto do autor:', err);
      } finally {
        setIsUploadingPhoto(false);
      }
    }
  };

  return (
    <section id="sobre-autor" className="py-24 border-b border-[#B08968]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Author Portrait Stage (Prepared for photography) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative framing */}
              <div className="absolute -inset-3 rounded-[3px] border border-[#B08968]/40 pointer-events-none" />
              <div className="absolute -inset-1 rounded-[2px] border border-[#7A4B2A]/30 pointer-events-none" />
              
              {/* Portrait container */}
              <div className="relative aspect-[3/4] bg-[#24150C] rounded-[2px] overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-6 text-[#FBF3E7]">
                
                {authorPhoto ? (
                  <img
                    src={authorPhoto}
                    alt="Retrato de Oséias Reis"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-24 h-24 rounded-full bg-[#3B2214] border-2 border-[#B08968] flex items-center justify-center text-[#B08968] shadow-inner">
                      <Feather className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-display-title text-xl font-bold tracking-wider text-[#FBF3E7]">
                        OSÉIAS REIS
                      </h4>
                      <p className="font-serif italic text-xs text-[#C9A88B] mt-1">
                        Autor Independente & Escritor Cristão
                      </p>
                    </div>
                    <div className="pt-2">
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3D2314] hover:bg-[#4D2D1B] border border-[#B08968]/50 text-[11px] font-sans uppercase tracking-wider text-[#FBF3E7] rounded-sm cursor-pointer transition-colors">
                        {isUploadingPhoto ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 text-[#B08968] animate-spin" />
                            <span>Processando...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-[#B08968]" />
                            <span>Carregar Minha Foto</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingPhoto}
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-[#A68A72] max-w-[200px] leading-tight opacity-75">
                      Espaço editorial preparado para sua fotografia oficial.
                    </p>
                  </div>
                )}

                {/* Subtle parchment grain */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C9A88B_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              {/* Caption */}
              <div className="text-center mt-4">
                <span className="text-xs font-display-title uppercase tracking-widest text-[#7A4B2A] font-semibold">
                  Ministério da Palavra Escrita
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Biography & Purpose */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A] mb-2">
                <span>Apresentação</span>
              </div>
              <h2 className="font-display-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1810]">
                OSÉIAS REIS
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[#7A4B2A] mt-1">
                “Autor independente e escritor cristão.”
              </p>
            </div>

            <div className="w-16 h-0.5 bg-[#B08968]" />

            {/* Core Mission Paragraphs */}
            <div className="font-serif text-base sm:text-lg text-[#3D2214] leading-relaxed space-y-4 text-justify">
              <p>
                O meu propósito é produzir materiais devocionais e pastorais que conduzam o leitor à profunda reflexão, ao conhecimento sólido da Palavra de Deus, ao despertamento espiritual e à verdadeira transformação de vida.
              </p>
              <p>
                Diante de um tempo marcado por discursos superficiais e religiosidade de aparências, cada livreto nasce do clamor secreto de joelhos e do compromisso inegociável de tornar as Escrituras acessíveis ao leitor comum, sem jamais negociar o rigor teológico e o poder confrontador do Evangelho.
              </p>
              <p className="italic text-[#7A4B2A]">
                “A Palavra de Deus não foi dada apenas para informar a nossa mente, mas para transformar o nosso coração e nos alinhar com o plano eterno do Criador.”
              </p>
            </div>

            {/* Ministry Focus Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F6EDE0] border border-[#B08968]/30 rounded-sm">
                <h4 className="font-display-title text-xs font-bold uppercase tracking-wider text-[#7A4B2A] mb-1">
                  Despertamento da Consciência
                </h4>
                <p className="font-serif text-xs text-[#5C381E] leading-relaxed">
                  Confrontar o vitimismo espiritual e a mornidão, restaurando o amor fervente pelas Escrituras.
                </p>
              </div>

              <div className="p-4 bg-[#F6EDE0] border border-[#B08968]/30 rounded-sm">
                <h4 className="font-display-title text-xs font-bold uppercase tracking-wider text-[#7A4B2A] mb-1">
                  Edificação da Igreja
                </h4>
                <p className="font-serif text-xs text-[#5C381E] leading-relaxed">
                  Livretos de bolso práticos e profundos para devocionais diários, discipulado e fortalecimento dos lares.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] rounded-sm transition-colors shadow-sm cursor-pointer"
              >
                Entrar em Contato com o Autor
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
