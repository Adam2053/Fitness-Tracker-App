import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// PORT 
const port = process.env.PORT;

app.listen(port, (req, res)=>{
    console.log(`Server is running on port: ${port}`);
})
