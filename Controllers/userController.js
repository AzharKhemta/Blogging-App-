import User from "../Modles/userModles.js";

export function SignIn(req,res){
    res.render(`signin`)
}

export function SignUp(req,res){
    res.render(`signup`)
}   

export async function  SignInPost(req,res){
const {email ,password} =req.body;
 
try{
   const token =await User.matchPasswordAndGenerateToken(email,password);

   console.log("token",token)
   return res.cookie("token", token).redirect("/");
}
catch (error){
     return res.render("signin" ,{

      error : "Incorrect Email Or Passowrd"
     });

}     
}
export  async function SignUpPost(req,res){

    console.log(req.body)
    const {fullname,email,password}=req.body;

    await User.create({
       fullname,
       email,
      password,

    });

    return res.redirect(`/`);

      
}

 export function LogOut(req,res){
    return res.clearCookie("token").redirect(`/`);
 }
