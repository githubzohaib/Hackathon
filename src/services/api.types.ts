// src/services/api.types.ts

export interface MongoDBID {
  $oid: string;
}

export interface NumberInt {
  $numberInt: string;
}

export interface Book {
  _id: MongoDBID;
  bookid: NumberInt;
  isbn: string[];
  authors: string[];
  title: string;
  edition: string;
  publicationYear: NumberInt;
  publisher: string[];
  subject: string[];
  summary: string;
  thumbnailUrl?: string;
  fieldOfStudy: string[];
  wantToRead: NumberInt;
  averageRatings: NumberInt;
  noOfReviews: NumberInt;
  availableInLibrary: boolean;
}

export interface EnhancedResult extends Book {
  relevance_score: number;
  rank: NumberInt;
  match_reason: string;
}

export interface RecommendationRequest {
  query: string;
}

export interface RecommendationResponse {
  recommendations: Book[];
  enhanced_response: EnhancedResult[];
}

export interface SimilarBookRequest {
  book_id: string;
  title: string;
  summary: string;
  subject: string;
}