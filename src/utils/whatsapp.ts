// Utility for WhatsApp links and author number configuration

const STORAGE_KEY = 'oseias_whatsapp_number';
export const DEFAULT_WHATSAPP_NUMBER = '5511999999999'; // Default fallback until author inserts his exact number

export function getAuthorWhatsAppNumber(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) {
      return saved.replace(/\D/g, '');
    }
  } catch {
    // ignore
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function saveAuthorWhatsAppNumber(number: string): void {
  try {
    const clean = number.replace(/\D/g, '');
    localStorage.setItem(STORAGE_KEY, clean);
  } catch {
    // ignore
  }
}

export function getWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = customPhone ? customPhone.replace(/\D/g, '') : getAuthorWhatsAppNumber();
  const encodedText = encodeURIComponent(message);
  
  // If a valid phone number is available
  if (phone && phone.length >= 10) {
    return `https://wa.me/${phone}?text=${encodedText}`;
  }
  
  // Fallback to generic WhatsApp share if no number
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

export function getWhatsAppBookUrl(bookTitle: string): string {
  const message = `Olá Oséias Reis! Gostaria de mais informações e saber como adquirir o livreto: "${bookTitle}". Como posso solicitar?`;
  return getWhatsAppUrl(message);
}

export function getWhatsAppGeneralContactUrl(): string {
  const message = `Olá Oséias Reis! Visitei o seu site editorial e gostaria de conversar com você sobre os seus livros e ministério.`;
  return getWhatsAppUrl(message);
}
