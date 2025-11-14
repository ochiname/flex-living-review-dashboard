import { getGoogleReviewsController } from "./controller";
import express from "express";

const googleRouter = express.Router();


/**
 * @swagger
 * /api/review/google:
 *   get:
 *     summary: Fetch Google Place data for all approved properties
 *     description: Retrieves approved properties and fetches Google Places data for each listing using the Places API.
 *     responses:
 *       200:
 *         description: List of approved properties with Google data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       listingName:
 *                         type: string
 *                       type:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       status:
 *                         type: string
 *                       googleSearch:
 *                         type: array
 *                         description: Array of Google Places results for the property
 *                         items:
 *                           type: object
 */
googleRouter.get("/google", getGoogleReviewsController);

export default googleRouter;