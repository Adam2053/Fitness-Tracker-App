import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/db.js';
import authRoutes from './routes/auth.routes.js'


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// PORT 
const port = process.env.PORT;

app.listen(port, (req, res)=>{
    connectDB();
    console.log(`Server is running on port: ${port}`);
})
