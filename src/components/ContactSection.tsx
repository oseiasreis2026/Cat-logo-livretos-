import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, Instagram, Youtube, Phone, BookOpen } from 'lucide-react';
import { getWhatsAppGeneralContactUrl, getWhatsAppUrl } from '../utils/whatsapp';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject || 'Quero adquirir um livreto');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare direct mailto / WhatsApp link
    const formattedMessage = `Olá Oséias Reis,\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: ${subject}\n\nMensagem:\n${message}`;
    
    // Also opens mailto client
    window.location.href = `mailto:oseiascristao21@gmail.com?subject=${encodeURIComponent(
      `[Contato Livretos] ${subject} - ${name}`
    )}&body=${encodeURIComponent(formattedMessage)}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `Olá Oséias Reis!\n\nNome: ${name || 'Leitor'}\nE-mail: ${email || 'Não informado'}\nTelefone: ${phone || 'Não informado'}\nAssunto: ${subject}\n\nMensagem:\n${message || 'Gostaria de saber mais sobre as obras.'}`;
    window.open(getWhatsAppUrl(formattedMessage), '_blank');
  };

  return (
    <section id="contato" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#B08968]/20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-display-title tracking-[0.25em] uppercase text-[#7A4B2A] mb-2">
          <span>Comunicação Direta</span>
        </div>
        <h2 className="font-display-title text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1810]">
          FALE COMIGO
        </h2>
        <div className="w-16 h-0.5 bg-[#B08968] mx-auto my-4" />
        <p className="font-serif text-base sm:text-lg text-[#5C381E] leading-relaxed">
          Tem dúvidas sobre alguma obra, deseja adquirir exemplares para sua igreja ou grupo devocional, ou quer enviar uma palavra de testemunho? Será uma alegria ouvi-lo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Channels & Author Information */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="paper-card rounded-[2px] p-6 sm:p-8 border border-[#B08968]/30">
            <h3 className="font-display-title text-lg font-bold text-[#2B1810] mb-3">
              Canais Oficiais
            </h3>
            <p className="font-serif text-xs text-[#5C381E] leading-relaxed mb-6">
              O autor atende pessoalmente mensagens de leitores, pedidos de livretos e contatos pastorais.
            </p>

            <div className="space-y-4 text-xs">
              
              {/* WhatsApp direct card */}
              <a
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/40 rounded-sm flex items-center justify-between cursor-pointer transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#7A4B2A] text-[#FBF3E7] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display-title uppercase tracking-wider text-[#2B1810] font-bold block">
                      WhatsApp Oficial
                    </span>
                    <span className="text-[#6B4627]">Atendimento rápido e direto no WhatsApp</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#7A4B2A] uppercase tracking-wider shrink-0 ml-2">
                  Conversar &rarr;
                </span>
              </a>

              {/* Email direct */}
              <div className="p-3.5 bg-[#FBF3E7] border border-[#B08968]/30 rounded-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#F2E5D3] text-[#7A4B2A] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold block text-[10px]">
                    E-mail Direto
                  </span>
                  <a
                    href="mailto:oseiascristao21@gmail.com"
                    className="font-mono text-xs text-[#2B1810] hover:underline"
                  >
                    oseiascristao21@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#B08968]/20">
                <span className="block text-[11px] font-display-title uppercase tracking-widest text-[#7A4B2A] font-bold mb-3">
                  Redes Sociais & Conteúdo
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/30 rounded-sm text-[#2B1810] text-xs flex items-center gap-2 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#7A4B2A]" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/30 rounded-sm text-[#2B1810] text-xs flex items-center gap-2 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5 text-[#7A4B2A]" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Epigraph card */}
          <div className="p-5 bg-[#F6EDE0] border-l-2 border-[#7A4B2A] rounded-r-sm">
            <p className="font-serif italic text-xs text-[#5C381E] leading-relaxed">
              "Como maçãs de ouro em salvas de prata, assim é a palavra dita a seu tempo." — Provérbios 25:11
            </p>
          </div>

        </div>

        {/* Right Column: Contact & Book Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="paper-card rounded-[2px] p-6 sm:p-10 border border-[#B08968]/30 shadow-sm">
            
            <h3 className="font-display-title text-xl font-bold text-[#2B1810] mb-2">
              Envie Sua Mensagem
            </h3>
            <p className="font-serif text-xs text-[#5C381E] mb-6">
              Preencha o formulário abaixo para solicitar informações, adquirir exemplares ou conversar com o autor.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Sua mensagem foi preparada! Seu cliente de e-mail foi acionado e responderemos em breve.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full px-3.5 py-2.5 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-3.5 py-2.5 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                    Assunto do Contato
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A]"
                  >
                    <option value="Quero adquirir um livreto">Quero adquirir um livreto</option>
                    <option value="Dúvidas sobre O Quarto de Guerra">Dúvidas sobre O Quarto de Guerra</option>
                    <option value="Série Os Quatro Temperamentos">Série Os Quatro Temperamentos</option>
                    <option value="Quebrando as Armadilhas do Vitimismo">Quebrando as Armadilhas do Vitimismo</option>
                    <option value="O Propósito da Vida Segundo a Ótica de Deus">O Propósito da Vida</option>
                    <option value="Projeto Adote um Livro">Projeto Adote um Livro</option>
                    <option value="Exemplares para Igreja / Célula">Exemplares para Igreja / Célula</option>
                    <option value="Outro assunto">Outro assunto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-display-title uppercase tracking-wider text-[#7A4B2A] font-bold mb-1">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem, dúvidas ou pedido de informações sobre os livretos..."
                  className="w-full px-3.5 py-2.5 text-xs text-[#2B1810] bg-[#FBF3E7] border border-[#B08968]/40 rounded-sm focus:outline-none focus:border-[#7A4B2A] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:flex-1 py-3.5 px-6 text-xs font-semibold tracking-wider uppercase text-[#FBF3E7] bg-[#7A4B2A] hover:bg-[#633A1F] active:bg-[#4E2B16] rounded-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar pelo WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto py-3.5 px-6 text-xs font-semibold tracking-wider uppercase text-[#2B1810] bg-[#F2E5D3] hover:bg-[#EBDBC8] border border-[#B08968]/50 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#7A4B2A]" />
                  <span>Enviar por E-mail</span>
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>

    </section>
  );
};
