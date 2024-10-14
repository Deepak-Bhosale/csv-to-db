import express from 'express';
import { uploadCSV } from '../controllers/csvController.js';
const router = express.Router();

router.post('/upload', uploadCSV);

export default router;
