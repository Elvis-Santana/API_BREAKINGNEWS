import News from "../models/News.js";
import { IUser } from "../models/User.js";

export const createService = (body:any)=>  News.create(body);

export const findAllService = async(offset:number,limit:number)=>
    News.find().sort({_id:-1}).skip(offset).limit(limit).populate("user");

export const CountNews =()=> News.countDocuments();

export const topNewsService =()=> News.findOne().sort({_id:-1}).populate("user");

export const findByIdService =(id:string)=> News.findById(id).populate("user");