import { API_CONFIG } from './api.config';
import { 
  Book, 
  RecommendationRequest, 
  RecommendationResponse, 
  SimilarBookRequest 
} from './api.types';

class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

class ApiService {
  private baseUrl: string;
  
  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = API_CONFIG.TIMEOUT
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(id);
    
    if (!response.ok) {
      throw new ApiError(`API request failed: ${response.statusText}`, response.status);
    }
    
    return response;
  }

  // Get book details by ID
  async getBookById(bookId: string): Promise<Book> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrl}${API_CONFIG.ENDPOINTS.BOOK_DETAIL}/${bookId}`
      );
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to fetch book details: ${(error as Error).message}`);
    }
  }

  // Get book recommendations based on query
  async getRecommendations(query: string): Promise<RecommendationResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrl}${API_CONFIG.ENDPOINTS.RECOMMEND}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query } as RecommendationRequest),
        }
      );
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to fetch recommendations: ${(error as Error).message}`);
    }
  }

  // Get similar books
  async getSimilarBooks(request: SimilarBookRequest): Promise<RecommendationResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrl}${API_CONFIG.ENDPOINTS.SIMILAR_BOOKS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to fetch similar books: ${(error as Error).message}`);
    }
  }
}
// Create a singleton instance
const apiService = new ApiService();
export default apiService;

// Re-export types for convenience
export * from './api.types';