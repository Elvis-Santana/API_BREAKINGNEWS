import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userServicers from "../services/user.service.js";
import { IUser } from "../models/User.js";
import userService from "../services/user.service.js";

const create =async (req:Request,res:Response)=>{
    try{
        const {name,usename,email,password,avatar,background} = req.body;

        if(!name || !usename || !email || !password || !avatar || !background){
            res.status(400).send({message:"Erro ao registrar"});
        }
        
        const user =  await userServicers.create(req.body)
        
        
        if(!user){
            return res.status(400).send({message:`Error creating User`})
        }

        res.status(201).json({
            message: "usuario criando com sucesso",
            user:{
                id:user._id,
                name,
                usename,
                email,
                avatar,
                background,
                
            },
            
        })
    }catch(err){
        res.status(500).send({message: `${err}`})
    }
}

const findAll = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users:Array<IUser> = await userServicers.findAll();

        if(users.length ===0)
            return res.status(400).send({message:`Não a usuarios cadastrados`})
        

        return res.json(users);
    }catch(err){
        res.status(500).send({message: `${err}`})
    }
}

const findById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = req.user
        return res.json(user)
    }catch(err){
        res.status(500).send({message: `${err}`})

    }
}

const update = async(req:Request,res:Response,)=>{
    try{
        const {name,usename,email,password,avatar,background} = req.body;

        if(!name && !usename && !email && !password && !avatar && !background){
            res.status(400).send({message:"Erro ao Atualizar"});
        }
    
        const id =String(req.id);
        const user = req.user
    
    
        await userService.UpdateService(
            id,
            name,
            usename,
            email,
            password,
            avatar,
            background
        );
    
        res.status(201).send({message:`usuario foi atualizado com sucesso`})
    }catch(err){
        res.status(500).send({message: `${err}`})

    }
}

export default { create, findAll, findById, update } 
