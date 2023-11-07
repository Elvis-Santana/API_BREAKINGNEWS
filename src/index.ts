import  express, { Request, Response }  from "express";
import {connectcDatabase} from './database/db.js'

// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
import swaaggerRoute from './routes/swagger.route.js';
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import "dotenv/config";

const app = express();

const PORT:Number = Number(process.env.PORT) ||8080

connectcDatabase();
app.use(express.json());

app.use('/user',userRoute);
app.use('/auth',authRoute);
app.use('/news',newsRoute)
app.use('/doc',swaaggerRoute)


app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

