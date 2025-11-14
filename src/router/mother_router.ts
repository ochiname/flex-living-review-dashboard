import express from 'express';
import reviewrouter  from "../modules/reviews/index" ;
import googleRouter from '../modules/googleAPI';


const router = express.Router();

router.use('/review', reviewrouter);
router.use('/review', googleRouter);

export default router;
//mypassword123//