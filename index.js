import express from 'express';
import path from 'path';
import userRouter from './Router/userRouters.js';
 import blogRouter from './Router/blog.js';
const app = express();

 import Blog from './Modles/blogModles.js';
import { CheckAuthentication } from './Middleware/authentication.js';

import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(CheckAuthentication("token"));
 app.use(express.static(path.resolve(`./public`)));
const port = 3000;
import { ConnectDB } from "./Config/dbConfig.js";

ConnectDB("mongodb://localhost:27017/blogging-app").then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log("Error connecting to database",error)
})

app.use(express.urlencoded({extended:true}));


app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.get(`/`, async(req, res) =>{

  const allBlogs= await Blog.find({});

   res.render(`home`,{

        user : req.user,
        blogs : allBlogs
   });
});

app.use(`/user`,userRouter)
app.use(`/blog` ,blogRouter)




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});