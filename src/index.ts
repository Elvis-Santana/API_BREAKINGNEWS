import  express, { Request, Response }  from "express";
import {connectcDatabase} from './database/db.js'

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";

import "dotenv/config"

const app = express();

const PORT:Number = Number(process.env.PORT) ||8080

connectcDatabase();
app.use(express.json());

app.use('/user',userRoute);
app.use('/auth',authRoute);
app.use('/news',newsRoute)


app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

export {}