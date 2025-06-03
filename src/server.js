import express from 'express';
import authRouter from './routes/auth.routes.js';
import postsRouter from './routes/posts.routes.js';
import commentsRouter from './routes/comments.routes.js';
import voteRouter from './routes/vote.routes.js'
import profileRouter from './routes/profile.routes.js'
import teacherRouter from './routes/teachers.routes.js'
import categoriesRouter from './routes/categories.routes.js';
import teachersRouter from './routes/teacherReviews.routes.js'
import institutesRouter from './routes/institutes.router.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net"], 
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "http://localhost:3000"],
            connectSrc: ["'self'", "http://localhost:3000"],
            objectSrc: ["'none'"],
            frameSrc: ["'none'"],
            upgradeInsecureRequests: [], 
        },
    },
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}), (req, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static(path.join(__dirname, '..', 'uploads')));

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter)
app.use('/votes', voteRouter)
app.use('/profile', profileRouter)
app.use('/teachers', teacherRouter)
app.use('/categories', categoriesRouter)
app.use('/reviews', teachersRouter)
app.use('/institutes', institutesRouter)

app.listen(PORT, () => {
    console.log(`Post ${PORT} is listening`)
})


