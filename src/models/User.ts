import mongoose, { Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document{
  name:      string;
  usename:   string;
  email:     string;
  password:  string;
  avatar:    string;
  background:string;

}

const UserSchema = new mongoose.Schema({

    name:{
      type:String,
      require:true,
      
    },

    usename:{
      type:String,
      require:true
    },

    email:{
      type:String,
      require:true,
      unique:true,
      lowercase:true,
    },

    password:{
      type:String,
      require:true,
      select:false
    },

    avatar:{
      type:String,
      require:true
    },

    background:{
      type:String,
      require:true
    }  
});

UserSchema.pre<IUser>("save",async function(next){
   this.password = await bcrypt.hash(this.password,10);
   next()
})


const User =mongoose.model<IUser> ("User",UserSchema);


export {User}