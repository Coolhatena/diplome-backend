import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { PORT, URI } from './config/index.js';
import Router from './routes/index.js';

// Create server
const server = express();

// Configure header info
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
}
server.use(cors(corsOptions));
server.disable("x-powered-by"); // Disables header about the framework being used, reducing fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Connect to database
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(URI)
	.then(console.log("Connected to database"))
	.catch((err) => console.log(err));

// Configure routes
// Connect Route Handler to server
Router(server);

// Start up server
server.listen(
	PORT, 
	() => console.log(`Server running on http://localhost:${PORT}`)
);
