import mongoose from "mongoose";

import { createHmac,randomBytes } from "crypto" 

import { generateToken,validateToken } from "../services/authentication.js";
const userSchema =new mongoose .Schema({
     fullname:{

         type :String,
         required:true
     },
     email:{
        type :String,
        required:true,
        unique:true
     },
     salt:{
        type :String,
      
     },
     password:{
        type :String,
        required:true
     },

     profilePicture:{
        type :String,
        default:"/images/default.png"
    },
     role:{
        type :String,
        enum:["user","admin"],
        default:"user"
     }
    
},{
    timestamps:true
});

userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.password = hashedPassword;
  user.salt = salt;
});

userSchema.static("matchPasswordAndGenerateToken", async function(email, password){

   const user= await this.findOne({email});
   if(!user)throw new Error("User not Found");
   
  
   const salt=user.salt;

   const hashedPassword= user.password;
   const userProvideHashed= createHmac("sha256",salt).update(password).digest("hex")

     if(hashedPassword!==userProvideHashed)throw new Error("Incorrect password ");


     const  token = generateToken(user);

     
   return token; 
   
})


const User = mongoose.model("User",userSchema)

export default User