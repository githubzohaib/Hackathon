const BASE_URL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_BACKEND_PROD
    : import.meta.env.VITE_BACKEND_DEV;

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    RECOMMEND: '/api/recommend',
    BOOK_DETAIL: '/api/books',
    SIMILAR_BOOKS: '/api/similar-books'
  },
  TIMEOUT: 30000,
};
