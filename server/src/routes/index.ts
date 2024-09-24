import express from 'express';
import docRouter from './documentRoutes';

const router = express.Router();

router.use('/document', docRouter);

export default router;