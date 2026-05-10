export interface Movie {
  id: string;
  title: string;
  image?: string;
  thumbnail: string;
  backdrop: string;
  category: string;
  language: 'Kannada' | 'Telugu' | 'Tamil' | 'Hindi' | 'English';
  year: number;
  description: string;
  videoUrl: string;
  links?: { label: string; url: string }[];
  chapters?: { title: string; time: number }[];
  createdAt?: any;
  updatedAt?: any;
}

export type Category = 'Kannada' | 'Telugu' | 'Tamil' | 'Hindi';

export interface User {
  userId: string;
  password?: string;
  name?: string;
  plan?: string;
  planName?: string;
  planPrice?: string;
  amount?: string | number;
  startDate?: string;
  expiry?: string;
  expiryDate?: string;
  trxId?: string;
  balance?: string | number;
  features?: string[];
  profileImage?: string;
  createdAt?: any;
  updatedAt?: any;
}
