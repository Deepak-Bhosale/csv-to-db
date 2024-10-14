import express from 'express';
import { uploadCSVHandler } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload-csv', uploadCSVHandler);

export default router;
