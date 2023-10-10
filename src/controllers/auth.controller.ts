
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { IUser } from "../models/User.js";
import {loginService,generateToken} from '../services/auth.service.js'

const login = async(req:Request,res:Response)=>{
 
    try{
        const {email ,password} = req.body;

        const user = await  loginService(email);

 
        const passwordIsValid =  await bcrypt.compare(password,String(user?.password))
   
        if(!passwordIsValid || !password)
        return res.status(404).send({message:`usuario e senha não encontrados`})

        const token = generateToken(user?.id)
        
       res.send({token})
    }catch(err){
        res.status(500).send(err)
    }
 
}

export {login}