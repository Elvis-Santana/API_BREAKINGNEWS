import { IUser, User } from "../models/User.js";
import  Jwt  from "jsonwebtoken";


export const  loginService =async (email:string)=>
    await User.findOne({email:email}).select("+password");

export const generateToken =(id:string)=>  
    Jwt.sign({ id : id} , String(process.env.SECRET_JWT),{ expiresIn:'1d'} );

