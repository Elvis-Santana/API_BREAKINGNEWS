import { Request, Response } from "express";


const soma =(req:Request,res:Response) =>{
    const soma =100 +1;
    res.send({soma:soma})
}


export {soma}
