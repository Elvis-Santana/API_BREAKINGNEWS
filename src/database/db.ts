import mongoose from "mongoose";

 const connectcDatabase = async ()=>{
    console.log("connection database");
      mongoose.connect(String(process.env.DATABASE))
      .then(()=> console.log("connected"))
      .catch(()=> console.log("Error no connect"))

}


export {connectcDatabase};