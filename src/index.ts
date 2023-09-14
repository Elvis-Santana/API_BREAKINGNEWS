import  express, { Request, Response }  from "express";
import "dotenv/config"
const app = express();

const PORT:Number = Number(process.env.PORT)
app.get("/Home",(req:Request,res:Response)=>{
 res.send("Hello World")
})

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

export {}