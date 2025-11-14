// src/modules/review/index.ts
import express from 'express';
import { getReviews,
    getUnapprovedReviews,
    approveReviewController,
    rejectReviewController,
    getReviewsByChannelController,
    getReviewsByDateController,
    getReviewsByListingController,
    getReviewsByTypeController,
    getApprovedReviews
 } from './controller';

const reviewrouter = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewCategory:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *         rating:
 *           type: number
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         type:
 *           type: string
 *         status:
 *           type: string
 *         listingName:
 *           type: string
 *         guestName:
 *           type: string
 *         rating:
 *           type: number
 *         reviewCategory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReviewCategory'
 *         publicReview:
 *           type: string
 *         submittedAt:
 *           type: string
 *         approved:
 *           type: boolean
 */

/**
 * @swagger
 * /api/review/hostaway:
 *   get:
 *     summary: Get mock Hostaway reviews
 *     description: Returns normalized mock review data for Flex Living properties
 *     responses:
 *       200:
 *         description: List of reviews
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
 *                     $ref: '#/components/schemas/Review'
 */
reviewrouter.get('/hostaway', getReviews);

/**
 * @swagger
 * /api/review/unapproved:
 *   get:
 *     summary: Get all unapproved reviews
 *     description: Fetch all reviews that are not yet approved by the manager
 *     responses:
 *       200:
 *         description: List of unapproved reviews
 */
reviewrouter.get('/unapproved', getUnapprovedReviews);

/**
 * @swagger
 * /api/review/approved:
 *   get:
 *     summary: Get all approved reviews
 *     description: Fetch all reviews that are approved by the manager
 *     responses:
 *       200:
 *         description: List of approved reviews
 */
reviewrouter.get('/approved', getApprovedReviews);

/**
 * @swagger
 * /api/review/approve/{id}:
 *   post:
 *     summary: Approve a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review approved
 */
reviewrouter.post('/approve/:id', approveReviewController);

/**
 * @swagger
 * /api/review/reject/{id}:
 *   post:
 *     summary: Reject a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review rejected
 */
reviewrouter.post('/reject/:id', rejectReviewController);

/**
 * @swagger
 * /api/review/by-listing:
 *   get:
 *     summary: Get reviews grouped by listing
 *     parameters:
 *       - in: query
 *         name: listingName
 *         schema:
 *           type: string
 *         description: Optional listing name to filter reviews
 *     responses:
 *       200:
 *         description: Reviews grouped by listing
 */
reviewrouter.get('/by-listing', getReviewsByListingController);

/**
 * @swagger
 * /api/review/by-type:
 *   get:
 *     summary: Get reviews grouped by type (host-to-guest / guest-to-host)
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Optional review type to filter
 *     responses:
 *       200:
 *         description: Reviews grouped by type
 */
reviewrouter.get('/by-type', getReviewsByTypeController);

/**
 * @swagger
 * /api/review/by-channel:
 *   get:
 *     summary: Get reviews grouped by channel
 *     parameters:
 *       - in: query
 *         name: channel
 *         schema:
 *           type: string
 *         description: Optional channel to filter (e.g., Hostaway)
 *     responses:
 *       200:
 *         description: Reviews grouped by channel
 */
reviewrouter.get('/by-channel', getReviewsByChannelController);

/**
 * @swagger
 * /api/review/by-date:
 *   get:
 *     summary: Get reviews grouped by date (YYYY-MM-DD)
 *     description: Returns reviews filtered by a specific date if `date` query parameter is provided
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: "Date to filter reviews (format: YYYY-MM-DD)"
 *     responses:
 *       200:
 *         description: Reviews filtered by date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
reviewrouter.get('/by-date', getReviewsByDateController);

export default reviewrouter;
