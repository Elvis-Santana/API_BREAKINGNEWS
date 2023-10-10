import mongoose from "mongoose";
import userService from "../services/user.service.js";
import { NextFunction, Request, Response } from "express";

export const validId =(req:Request,res:Response,next:NextFunction)=>{
   try{
        const id =req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send({message:"Id invalido"});
        
        next();
   }catch(err){
     console.log(err);
   }
}

export const validUser =async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const id =req.params.id;

        const user = await userService.findById(id);
    
        if(!user)
            return res.status(400).send({message:`usuario não encontrado`})
    
            req.id = String(id);
            req.user =user
        next();
    }catch(err){
        console.log(err);

    }

}

