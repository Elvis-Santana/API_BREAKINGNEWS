import { IUser, User } from "../models/User.js";


const create = async(body:any)=> await User.create(body);

const findAll = async()=> await User.find();

const findById = async(_id:String)=> await User.findById(_id);

const UpdateService = async(
    id:string,
    name:string,
    usename:string,
    email:string,
    password:string,
    avatar:string,
    background:string
)=> User.findByIdAndUpdate(
    {_id:String(id)},
    {name,usename,email,password,avatar,background}
);



export default{
    create,
    findAll,
    findById,
    UpdateService,
}

