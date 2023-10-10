import { NextFunction, Request, Response } from "express";
import { createService ,findAllService} from "../services/news.service.js";

const create  =async (req:Request,res:Response)=>{
    try{
        const {title,text,banner} =req.body;
        
        if(!title||!text||!banner){
            res.status(400).send({
                message:"Erro ao registrar"
            });
        }

        await createService({
            title,text,banner,id:'objectIdfake'
        })
        res.status(201).send(201);

    }catch(err){
        res.status(500).send({message: `${err}`})

    }
}
const findAll =async (req:Request,res:Response)=>{
  const news:Array<any> =[]
  res.send(news);
}


export{ create, findAll }