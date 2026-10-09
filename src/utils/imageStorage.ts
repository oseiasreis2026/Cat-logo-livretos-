// Robust client-side image optimization & persistent storage using IndexedDB with localStorage fallback

const DB_NAME = 'OseiasReisBooksDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_book_covers';
const LOCAL_STORAGE_KEY = 'oseias_custom_book_covers';

/**
 * Optimizes an uploaded image file by resizing it to suitable editorial cover dimensions
 * and compressing it, preventing QuotaExceededError in browser storage and improving performance.
 */
export async function optimizeCoverImage(file: File, maxWidth = 900, maxHeight = 1260, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    // Basic format check
    if (!file.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem válida (PNG, JPG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo no dispositivo.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Não foi possível processar a imagem selecionada.'));
      img.onload = () => {
        try {
          let { width, height } = img;

          // Calculate scaling
          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const ratio = Math.min(widthRatio, heightRatio);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // Fallback to original data URL if canvas 2D context fails
            resolve(e.target?.result as string);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed JPEG
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(optimizedDataUrl);
        } catch (err) {
          // If canvas fails, fallback to original data URL
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Open IndexedDB database
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB não suportado'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

/**
 * Save a custom cover for a specific book to IndexedDB and localStorage
 */
export async function saveCoverToStorage(bookId: string, dataUrl: string): Promise<void> {
  // 1. Try to save to IndexedDB (virtually unlimited quota)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put(dataUrl, bookId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB write warning:', err);
  }

  // 2. Try to save to localStorage as backup
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const covers = raw ? JSON.parse(raw) : {};
    covers[bookId] = dataUrl;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(covers));
  } catch (err) {
    console.warn('localStorage quota warning (IndexedDB is handling persistence):', err);
  }
}

/**
 * Remove a custom cover for a book
 */
export async function removeCoverFromStorage(bookId: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(bookId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete warning:', err);
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const covers = JSON.parse(raw);
      delete covers[bookId];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(covers));
    }
  } catch {
    // ignore
  }
}

/**
 * Load all custom covers from storage (IndexedDB preferred, fallback to localStorage)
 */
export async function loadAllCoversFromStorage(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  // First try localStorage for fast instant sync
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      Object.assign(result, JSON.parse(raw));
    }
  } catch {
    // ignore
  }

  // Then merge with IndexedDB which has higher capacity
  try {
    const db = await openDB();
    const idbCovers = await new Promise<Record<string, string>>((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.openCursor();
      const collected: Record<string, string> = {};

      req.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          collected[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(collected);
        }
      };

      req.onerror = () => resolve(collected);
    });

    Object.assign(result, idbCovers);
  } catch (err) {
    console.warn('IndexedDB read notice:', err);
  }

  return result;
}
