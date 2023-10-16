import  Jwt  from "jsonwebtoken";
import userService from '../services/user.service.js'
import 'dotenv/config'
import { NextFunction, Request, Response } from "express";

export const authMeddlere =async (req:Request,res:Response,next:NextFunction)=>{
    type TokenPayload ={
        id:string;
        iat:number;
        exp:number;
    }
    try{
        const {authorization} = req.headers;

        if(!authorization) return res.send(401);
        
        const parts = authorization.split(" ");
    
        if(parts.length !==2) return res.send(401);
    
        const [schema,token] =parts;
    
    
        if(schema !=="Bearer") return res.send(401);
        Jwt.verify(token,String(process.env.SECRET_JWT),async (error,decoded)=>{
                if(error)return res.status(401).send({message:`Token invalid!`});
                const getTakonId =  decoded as TokenPayload;

                const user = await userService.findById(getTakonId.id);
                 console.log(user)
                if(!user||!user.id)
                    return res.status(401).send({
                        message:`Ivalid token`
                });

                req.userId = user.id;
                return   next();

            });


    }catch(err){
        res.status(500).send({message: `${err}`})

    }
    
};