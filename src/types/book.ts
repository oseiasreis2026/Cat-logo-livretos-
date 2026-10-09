export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  volume?: string;
  author: string;
  collectionId: string;
  collectionName: string;
  coverImage?: string;
  backCoverImage?: string;
  coverAccent: string; // Hex color for lighting/accents
  coverTheme: 'water' | 'fire' | 'wind' | 'earth' | 'sanctuary' | 'judgment' | 'dawn' | 'grace';
  tagline: string;
  scriptureReference?: string;
  shortDescription: string;
  fullDescription: string;
  backCoverText?: string;
  targetAudience: string[];
  keyThemes: string[];
  centralMessage: string;
  details: {
    chapters?: string;
    pagesEstimate?: string;
    format: string;
    year?: string;
    keyVerse?: string;
    seal?: string;
  };
  isFeatured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  booksCount: number;
}
