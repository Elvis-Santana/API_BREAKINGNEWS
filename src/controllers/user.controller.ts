import { Request, Response } from "express";

const create = (req:Request,res:Response)=>{
    const {name,usename,email,password,avatar,background} = req.body;

    if(!name || !usename || !email || !password || !avatar || !background){
        res.status(400).send({message:"Erro ao registrar"});
    }
     
    res.status(201).json({
        message: "usuario criando com sucesso",
        user:{
            name,
            usename,
            email,
            avatar,
            background,
            
        },
        
    })
}


export {create}
