import express from 'express';
import fileUpload from 'express-fileupload';
import connectDB from './config/db.js';
import csvRoutes from './routes/csvRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for handling file uploads
app.use(fileUpload());

// Load CSV routes
app.use('/api/csv', csvRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
