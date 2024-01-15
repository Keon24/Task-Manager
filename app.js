import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';

import mongoose from 'mongoose';

import cors from 'cors';


import session from 'express-session';
import connectMongo from 'connect-mongo';

import swaggerUI from 'swagger-ui-express';
import winston from 'winston';
import Joi from 'joi';
import nodemailer from 'nodemailer';

import path from "path";
import { fileURLToPath } from 'url';
import { register } from "./controllers/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(cors());

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});
const upload = multer({ storage });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL, {
 

}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}) 
.catch((error) => console.log(`${error} did not connect`));

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);