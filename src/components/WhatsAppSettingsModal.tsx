import React, { useState } from 'react';
import { X, MessageCircle, Check, Phone } from 'lucide-react';
import { getAuthorWhatsAppNumber, saveAuthorWhatsAppNumber } from '../utils/whatsapp';

interface WhatsAppSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberSaved?: (newNumber: string) => void;
}

export const WhatsAppSettingsModal: React.FC<WhatsAppSettingsModalProps> = ({
  isOpen,
  onClose,
  onNumberSaved,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(() => getAuthorWhatsAppNumber());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');
    saveAuthorWhatsAppNumber(clean);
    setSavedSuccess(true);
    if (onNumberSaved) {
      onNumberSaved(clean);
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C120C]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FBF3E7] text-[#2B1810] rounded-[2px] shadow-2xl border border-[#B08968]/60 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B08968]/30 bg-[#F6EDE0]">
          <div className="flex items-center gap-2 text-xs font-display-title tracking-widest uppercase text-[#7A4B2A] font-bold">
            <MessageCircle className="w-4 h-4 text-[#7A4B2A]" />
            <span>Configurar WhatsApp Oficial</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C381E] hover:text-[#2B1810] hover:bg-[#EBDBC8] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <p className="font-serif text-xs text-[#5C381E] leading-relaxed">
            Insira o seu número de WhatsApp com DDD (código do país 55 já incluído ou digite direto com DDD). Todos os botões <strong>"Adquirir"</strong> e <strong>"Saber Mais"</strong> do site serão direcionados diretamente para este número com mensagem personalizada.
          </p>

          <div>
            <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1.5">
              Seu Número de WhatsApp (com DDD):
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#7A4B2A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ex: 5561999998888 ou 61999998888"
                className="w-full pl-9 pr-4 py-2.5 text-xs text-[#2B1810] bg-[#F6EDE0] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] font-mono"
              />
            </div>
            <p className="text-[10px] text-[#8C6B52] mt-1">
              Exemplo: 55 + DDD (2 dígitos) + 9 dígitos (ex: 5511987654321)
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Número de WhatsApp salvo com sucesso!</span>
            </div>
          )}

          <div className="pt-3 border-t border-[#B08968]/20 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#5C381E] hover:bg-[#F2E5D3] rounded-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#7A4B2A] text-[#FBF3E7] rounded-sm hover:bg-[#633A1F] cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Número</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
