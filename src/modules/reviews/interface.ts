export interface ReviewCategory {
  category: string;
  rating: number;
};

export interface Review {
  id: number;
  type: string;
  status: string;
  listingName: string;
  guestName: string;
  rating: number;
  reviewCategory: ReviewCategory[];
  publicReview: string;
  submittedAt: string;
  approved: boolean; 
  channel: string;
};

export interface ReviewsApiResponse {
  status: 'success' | 'error';
  result?: Review[];
  message?: string;
};