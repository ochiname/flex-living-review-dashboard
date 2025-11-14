import axios from "axios";
import { getAllApprovedReviews } from "../reviews/service";
import { errors } from "../../middlewares/error";

export const fetchGooglePlace = async (listingName: string) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const baseUrl = process.env.GOOGLE_PLACES_BASE_URL;

    if (!apiKey || !baseUrl) {
      console.error("Missing GOOGLE env vars.");
      throw errors.BAD_REQUEST;
    }

    const response = await axios.get(baseUrl, {
      params: { query: listingName, key: apiKey }
    });

    return response.data;
  } catch (err: any) {
    console.error("Google API Error:", err.message);
    throw errors.NOT_FOUND; // ⬅ your required format
  }
};


export const getApprovedReviewsWithGoogleData = async () => {
  try {
    const approvedReviews =  getAllApprovedReviews();
    const results = [];

    for (const review of approvedReviews) {
      try {
        const googleData = await fetchGooglePlace(review.listingName);

        results.push({
          ...review,
          googleSearch: googleData?.results || []
        });

      } catch (err: any) {
        console.error(
          `Failed Google Lookup for ${review.listingName}:`,
          err.message
        );

        // Throw using your required pattern
        throw errors.NOT_FOUND;
      }
    }

    return results;

  } catch (err: any) {
    console.error("Google Service Error:", err.message);
    throw errors.INTERNAL_SERVER_ERROR; // ⬅ final fallback
  }
};
