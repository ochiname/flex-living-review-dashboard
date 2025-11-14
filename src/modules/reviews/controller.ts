import { Request, Response } from 'express';
import { getMockReviews,
    getAllReviews,
    getAllUnapprovedReviews,
    approveReview,
    rejectReview,
    getReviewsByChannel,
    getReviewsByDate,
    getReviewsByListing,
    getReviewsByType,
    getAllApprovedReviews
 } from './service';
import { ReviewsApiResponse } from './interface';


export const getReviews = async (req: Request, res: Response) => {
  try {
    // In case getMockReviews becomes async in future
    const result = await Promise.resolve(getMockReviews());

    const response: ReviewsApiResponse = {
      status: 'success',
      result: result,
    };

    res.status(200).json(response);
  } catch (error) {

    const response: ReviewsApiResponse = {
      status: 'error',
      message: 'Failed to fetch reviews',
    };

    console.error("Error fetching reviews:", (error as Error).message);
    res.status(500).json(response);
  }
};


export const getallReviews = async (req: Request, res: Response) => {
  try {
    const result = await Promise.resolve(getAllReviews());

    const response: ReviewsApiResponse = {
      status: "success",
      result,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ReviewsApiResponse = {
      status: "error",
      message: "Failed to fetch reviews",
    };
    console.error("Error fetching reviews:", (error as Error).message);
    res.status(500).json(response);
  }
};


export const getUnapprovedReviews = async (req: Request, res: Response) => {
  try {
    const result = await Promise.resolve(getAllUnapprovedReviews());

    const response: ReviewsApiResponse = {
      status: "success",
      result,
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ReviewsApiResponse = {
      status: "error",
      message: "Failed to fetch unapproved reviews",
    };
    console.error("Error fetching unapproved reviews:", (error as Error).message);
    res.status(500).json(response);
  }
};

export const getApprovedReviews = (req: Request, res: Response) => {
  try {
    const approved = getAllApprovedReviews(); // reads from in-memory array

    return res.status(200).json({
      status: 'success',
      result: approved,
    });
  } catch (error) {
    return res.status(404).json({ status: 'error', message: 'Could not fetch approved reviews' });
  }
};


export const approveReviewController = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ status: 'error', message: 'Invalid review ID' });
    }

    const review = approveReview(id); // updates in-memory array

    return res.status(200).json({
      status: 'success',
      message: `Review ${id} approved successfully`,
      result: review,
    });
  } catch (error) {
    return res.status(404).json({ status: 'error', message: 'Review not found' });
  }
};


export const rejectReviewController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { reason } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid review ID",
      });
    }

    // Call service to reject the review
    const rejected = rejectReview(id, reason);

    return res.status(200).json({
      status: "success",
      message: `Review ${id} rejected successfully`,
      result: rejected,
    });

  } catch (err) {
    console.error(err);
    return res.status(404).json({
      status: "error",
      message: "Review not found or could not be rejected",
    });
  }
};

export const getReviewsByListingController = (req: Request, res: Response) => {
  try {
    const { listingName } = req.query;
    const result = getReviewsByListing(listingName as string);

    res.status(200).json({ status: "success", result });
  } catch (error) {
    res.status(404).json({ status: "error", message: "Listing not found" });
  }
};

export const getReviewsByTypeController = async (req: Request, res: Response) => {
  try {
    const result = await Promise.resolve(getReviewsByType());
    res.status(200).json({ status: "success", result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch reviews by type" });
  }
};


export const getReviewsByChannelController = async (req: Request, res: Response) => {
  try {
    const result = await Promise.resolve(getReviewsByChannel());
    res.status(200).json({ status: "success", result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch reviews by channel" });
  }
};


export const getReviewsByDateController = (req: Request, res: Response) => {
  try {
    const { date } = req.query as { date?: string };

    const result = getReviewsByDate(date);

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Reviews not found",
    });
  }
};