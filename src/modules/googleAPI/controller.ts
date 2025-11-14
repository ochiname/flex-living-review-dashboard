import { Request, Response } from "express";
import { getApprovedReviewsWithGoogleData } from "./service";


export const getGoogleReviewsController = async (req: Request, res: Response) => {
  try {
    const data = await getApprovedReviewsWithGoogleData();

    return res.status(200).json({
      status: "success",
      message: "Google data fetched successfully",
      result: data
    });

  } catch (err: any) {
    console.error("Google Controller Error:", err.message);

    // If service already threw a custom error:
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        status: "error",
        message: err.message
      });
    }

    // fallback for unexpected errors
    return res.status(500).json({
      status: "error",
      message: "Google API fetch failed"
    });
  }
};
