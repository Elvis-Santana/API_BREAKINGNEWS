import { NextFunction, Request, Response } from "express";
import {
    createService,
    findAllService,
    CountNews,topNewsService,
    findByIdService,
} from "../services/news.service.js";

import userService from "../services/user.service.js";

import { IUser } from "../models/User.js";

interface IQuery {
    limit:number
    offset:number
}


export const create  =async (req:Request,res:Response)=>{
    try{

       
        const { title, text, banner } =req.body;
        
        if(!title||!text||!banner){
            res.status(400).send({
                message:"Erro ao registrar"
            });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })
        res.status(201).send(201);

    }catch(err){
        res.status(500).send({message: `${err}`})

    }
}

export const findAll =async (req:Request<{},{},{},IQuery>,res:Response)=>{

    try{

        let {limit,offset} = req.query ;
        limit  = Number(limit);
        offset = Number(offset);
    
        if(!limit) limit=5
        
        if(!offset) offset=0
        
        const news:Array<any> = await findAllService(offset,limit);
        const total =  await CountNews();
        const currentUrl = req.baseUrl;
    
        const next =offset + limit;
        const nextUrl = next < total 
            ?`${currentUrl}?limit=${limit}&offset=${next}`
            :null;
    
        const previous = offset-limit < 0? null :offset-limit ;
        
            const previousUrl = previous!=null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            :null;
    
        console.log(currentUrl)
       
        
        console.log(total);
    
      
    
    
      if(news.length ===0){
            return res.status(400).send({message:`Error no registered news`})
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
    
        results:news.map((itens) =>({
            id:itens._id,
            title:itens.title,
            text:itens.text,
            banner:itens.banner,
            likes:itens.likes,
            comments:itens.comments,
            name:itens.user.name,
            username:itens.user.usename,
            userAvatar:itens.user.avatar
             
        })),
      });
    }catch(err){
        res.status(500).send({message: `${err}`})
    }
}

export const topNews =async(req:Request,res:Response)=>{
    try{
        const news  = await topNewsService() ;
        const id:string = String(news?.user?._id ) ;
        const user =  await userService.findById(id) as IUser;
      
        if(!news){
           return res.status(400).send({message:"não há postagem registrada"});
        }
       
        res.send({
            news:{
                id:news._id,
                title:news.title,
                text:news.text,
                banner:news.banner,
                likes:news.likes,
                comments:news.comments,
                name:user.name ,
                username:user.usename,
                userAvatar:user.avatar,
             
            }
        });
        
    }catch(err){
        res.status(500).send({message: `${err}`})
    }
}

export const findById =async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;

        const news =await findByIdService(id);
        const userId:string = String(news?.user?._id ) ;
        const user =  await userService.findById(userId) as IUser;
  
        return res.send({
            news:{
                id:news?.id,
                title:news?.title,
                text:news?.text,
                banner:news?.banner,
                likes:news?.likes,
                comments:news?.comments,
                name:user.name ,
                username:user.usename,
                userAvatar:user.avatar,
             
            }
        })

    }catch(err){
        res.status(500).send({message: `${err}`})
    }
}



