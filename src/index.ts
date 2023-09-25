import  express, { Request, Response }  from "express";
import route from "./routes/user.route.js";
import "dotenv/config"
const app = express();

const PORT:Number = Number(process.env.PORT)


app.use(express.json());
app.use('/user',route);


app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

export {}