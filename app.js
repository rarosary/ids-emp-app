import express from 'express'
import connectDB from "./config/connectdb.js"
import web from  './routes/web.js'
import bodyparser from 'body-parser'
import multer from 'multer';
import path from 'path'
import xlsx from 'xlsx'
import morgan from 'morgan'
import cors from 'cors'
import passport  from 'passport';
import dotenv from 'dotenv'

dotenv.config()



const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

//app.use(express.static(path.resolve(__dirname,'public')));

//importEmployees()

// Load Routes

app.use("/api", web)


app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})