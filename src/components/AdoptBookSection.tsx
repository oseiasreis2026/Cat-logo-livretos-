import React, { useState } from 'react';
import { Heart, Gift, Copy, Check, QrCode, MessageCircle, X, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface AdoptBookSectionProps {
  onOpenContact: () => void;
}

export const AdoptBookSection: React.FC<AdoptBookSectionProps> = ({ onOpenContact }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  // Default PIX key using the author's real email
  const pixKey = 'oseiascristao21@gmail.com';

  const handleCopyPix = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const supportTiers = [
    { books: 1, amount: 'R$ 15', label: '1 Livreto Semeado' },
    { books: 5, amount: 'R$ 75', label: '5 Livretos em Comunidades' },
    { books: 10, amount: 'R$ 150', label: '10 Livretos Evangelísticos' },
    { books: 0, amount: 'Livre', label: 'Contribuição Voluntária' },
  ];

  return (
    <section id="adote-livro" className="py-24 bg-[#F4E9DC]/70 border-b border-[#B08968]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="paper-card rounded-[2px] p-8 sm:p-14 border border-[#B08968]/40 shadow-md relative overflow-hidden">
          
          {/* Subtle warm background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A4B2A]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            
            <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A]">
              <span>Projeto de Missão & Semeadura</span>
            </div>

            <h2 className="font-display-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1810]">
              ADOTE UM LIVRO
            </h2>

            <div className="w-16 h-0.5 bg-[#B08968] mx-auto" />

            <p className="font-serif text-base sm:text-lg text-[#3D2214] leading-relaxed text-justify sm:text-center">
              Acreditamos que a verdade da Palavra de Deus deve alcançar todo coração sedento, independentemente de sua condição financeira.
            </p>

            <p className="font-serif text-base sm:text-lg text-[#3D2214] leading-relaxed text-justify sm:text-center">
              Por meio do projeto <strong className="font-semibold text-[#7A4B2A]">Adote um Livro</strong>, livretos são impressos e distribuídos gratuitamente em hospitais, presídios, comunidades carentes e para pessoas que não teriam recursos para adquiri-los. Este trabalho pastoral é sustentado pela graça de Deus e por contribuições voluntárias de irmãos e parceiros de ministério.
            </p>

            {/* Impact highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 bg-[#FBF3E7] border border-[#B08968]/30 rounded-sm">
                <span className="block font-display-title text-sm font-bold text-[#7A4B2A] mb-1">
                  Distribuição Gratuita
                </span>
                <span className="font-serif text-xs text-[#5C381E]">
                  Envio e entrega direta a quem não pode pagar por literatura cristã.
                </span>
              </div>

              <div className="p-4 bg-[#FBF3E7] border border-[#B08968]/30 rounded-sm">
                <span className="block font-display-title text-sm font-bold text-[#7A4B2A] mb-1">
                  Prestação de Contas
                </span>
                <span className="font-serif text-xs text-[#5C381E]">
                  Transparência e registros de alcance ministerial compartilhados com mantenedores.
                </span>
              </div>

              <div className="p-4 bg-[#FBF3E7] border border-[#B08968]/30 rounded-sm">
                <span className="block font-display-title text-sm font-bold text-[#7A4B2A] mb-1">
                  Fruto que Permanece
                </span>
                <span className="font-serif text-xs text-[#5C381E]">
                  A Palavra impressa alcança lares e transforma famílias inteiras.
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 text-xs font-semibold tracking-[0.14em] uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] rounded-sm transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#FDE047]" />
                <span>Quero Apoiar o Projeto</span>
              </button>
            </div>

            <p className="text-[11px] text-[#7A5A41] italic font-serif">
              "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7
            </p>

          </div>

        </div>

      </div>

      {/* Interactive Modal for Donation & PIX */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C120C]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FBF3E7] text-[#2B1810] rounded-[2px] shadow-2xl border border-[#B08968]/60 overflow-hidden my-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B08968]/30 bg-[#F6EDE0]">
              <div className="flex items-center gap-2 text-xs font-display-title tracking-widest uppercase text-[#7A4B2A] font-bold">
                <Heart className="w-4 h-4 text-[#7A4B2A]" />
                <span>Apoiar Projeto Adote um Livro</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-[#5C381E] hover:text-[#2B1810] hover:bg-[#EBDBC8] rounded-sm transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <h3 className="font-display-title text-xl font-bold text-[#2B1810]">
                  Semeie a Palavra de Deus
                </h3>
                <p className="font-serif text-xs text-[#5C381E] mt-1 leading-relaxed">
                  Sua contribuição voluntária é integralmente destinada à impressão e envio de livretos para pessoas que necessitam de despertamento e cura espiritual.
                </p>
              </div>

              {/* Tiers */}
              <div>
                <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-2">
                  Escolha uma Cota de Apoio:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {supportTiers.map((tier, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTier(idx)}
                      className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${
                        selectedTier === idx
                          ? 'border-[#7A4B2A] bg-[#F2E5D3] ring-1 ring-[#7A4B2A]'
                          : 'border-[#B08968]/40 bg-[#FBF3E7] hover:bg-[#F6EDE0]'
                      }`}
                    >
                      <div className="font-display-title text-sm font-bold text-[#2B1810]">
                        {tier.amount}
                      </div>
                      <div className="text-[11px] text-[#6B4627] mt-0.5 font-serif">
                        {tier.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PIX Box */}
              <div className="p-4 bg-[#F2E5D3] border border-[#B08968]/40 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold">
                    Chave PIX (E-mail):
                  </span>
                  <span className="text-[10px] text-[#6B4627]">Banco / Conta Oficial</span>
                </div>

                <div className="flex items-center gap-2 bg-[#FBF3E7] p-2.5 rounded-sm border border-[#B08968]/50">
                  <span className="font-mono text-xs text-[#2B1810] font-medium truncate flex-1 select-all">
                    {pixKey}
                  </span>
                  <button
                    onClick={handleCopyPix}
                    className="px-3 py-1.5 bg-[#7A4B2A] text-[#FBF3E7] text-[11px] font-semibold uppercase tracking-wider rounded-sm hover:bg-[#633A1F] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Chave</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-[#5C381E] leading-relaxed">
                  <strong>Favorecido:</strong> Oséias Reis · Ministério Editorial Independente
                </div>
              </div>

              {/* Inform Author via WhatsApp */}
              <div className="pt-2 border-t border-[#B08968]/20 flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl(
                    `Olá Oséias Reis! Acabei de contribuir com o projeto Adote um Livro para semear a Palavra de Deus.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] rounded-sm transition-colors text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Comprovante / Falar com o Autor no WhatsApp</span>
                </a>
                <p className="text-[10px] text-center text-[#8C6B52]">
                  Ao enviar o comprovante, você receberá relatórios e notícias sobre os livretos distribuídos.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
