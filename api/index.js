import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import setRouter from './routes/studySetRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4041;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

const app = express();

app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

app.use('/sets', setRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
