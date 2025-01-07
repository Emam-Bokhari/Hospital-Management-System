import express from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', router);

// check health
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// global error handler
app.use(globalErrorHandler)

export default app;
