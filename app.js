import express from 'express';
import databaseConnection from './database/mongodb.js';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';

import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware);

app.get('/', (req, res) => {
	res.send('Welcome to the Suscription Tracker API!');
});

app.listen(PORT, async () => {
	console.log('Server is running on port', PORT);
	await databaseConnection();
});