import News from "../models/News.js";

export const createService =async (body:any)=> await News.create(body);

export const findAllService = async()=>await News.find();