import { reviews as mockData } from './mockdata';
import { errors } from '../../middlewares/error';
import { Review } from './interface';

let normalizedReviews: Review[] = [];
let reviews: Review[] = mockData.map(r => ({
  ...r,
  approved: false,      // new field
  status: r.status || 'new',
  channel: 'Hostaway', // new field
})) as Review[];

export const getMockReviews = (): Review[] => {
  try {
    if (!reviews || !Array.isArray(reviews)) {
      console.error("Invalid mock data format ---- review/service.ts");
      throw errors.CONFLICT_DATA;
    }

    return reviews.map((review: any): Review => ({
      id: review.id,
      type: review.type,
      status: review.status,
      listingName: review.listingName,
      guestName: review.guestName,
      rating: review.rating || 0,
      reviewCategory: review.reviewCategory || [],
      publicReview: review.publicReview || "",
      submittedAt: review.submittedAt || new Date().toISOString(),
      approved: false,
      channel: review.channel || 'Hostaway',
    }));
  } catch (error) {
    console.error("Error fetching mock data --- review/service.ts", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getAllReviews = (): Review[] => {
  try {
    return getMockReviews();
  } catch (error) {
    console.error("No reviews found -- review/service.ts", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const approveReview = (id: number): Review => {
  try {
    const review = reviews.find(r => r.id === id);

    if (!review) {
      console.error(`Review with ID ${id} not found`);
      throw errors.NOT_FOUND;
    }

    review.approved = true;
    review.status = "approved";

    return review;
  } catch (error) {
    console.error(`Error approving review with ID ${id}:`, (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const rejectReview = (id: number, reason?: string): Review => {
  try {
    const review = reviews.find(r => r.id === id);
    if (!review) throw errors.NOT_FOUND;

    review.approved = false;
    review.status = "rejected";
    (review as any).rejectionReason = reason || "No reason provided";

    return review;
  } catch (error) {
    console.error(`Error rejecting review with ID ${id}:`, (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getAllUnapprovedReviews = (): Review[] => {
  try {
    const data = getMockReviews();
    return data.filter(r => r.approved === false);
  } catch (error) {
    console.error("Could not find unapproved reviews ---- service.ts", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getAllApprovedReviews = (): Review[] => {
  try {
    return reviews.filter(r => r.approved);
  } catch (error) {
    console.error("Error fetching approved reviews:", (error as Error).message);
    return [];
  }
};

export const getReviewsByListing = (listingName?: string): Record<string, Review[]> => {
  try {
    const grouped: Record<string, Review[]> = {};
    getMockReviews().forEach(r => {
      if (listingName && r.listingName !== listingName) return;

      if (!grouped[r.listingName]) grouped[r.listingName] = [];
      grouped[r.listingName].push(r);
    });

    if (listingName && !grouped[listingName]) {
      throw errors.NOT_FOUND;
    }

    return grouped;
  } catch (error) {
    console.error("Error grouping reviews by listing:", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getReviewsByType = (): Record<string, Review[]> => {
  try {
    const grouped: Record<string, Review[]> = {};
    getMockReviews().forEach(r => {
      if (!grouped[r.type]) grouped[r.type] = [];
      grouped[r.type].push(r);
    });
    return grouped;
  } catch (error) {
    console.error("Error grouping reviews by type:", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getReviewsByChannel = (): Record<string, Review[]> => {
  try {
    const grouped: Record<string, Review[]> = {};
    getMockReviews().forEach(r => {
      const channel = r.channel || 'Hostaway';
      if (!grouped[channel]) grouped[channel] = [];
      grouped[channel].push(r);
    });
    return grouped;
  } catch (error) {
    console.error("Error grouping reviews by channel:", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};

export const getReviewsByDate = (filterDate?: string): Review[] => {
  try {
    const allReviews = getMockReviews();

    if (filterDate) {
      return allReviews.filter(r => {
        const dateKey = new Date(r.submittedAt).toISOString().split('T')[0];
        return dateKey === filterDate;
      });
    }

    return allReviews;
  } catch (error) {
    console.error("Error filtering reviews by date:", (error as Error).message);
    throw errors.NOT_FOUND;
  }
};
