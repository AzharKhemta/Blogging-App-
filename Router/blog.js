 import  express   from "express";
import multer from "multer";
import path from "path";
 const blogRouter = express.Router();
import Blog from "../Modles/blogModles.js";
import Comment from "../Modles/commentModles.js";
import console from "console";


   const storage = multer.diskStorage({
   destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {

    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage })

  blogRouter.get(`/add`,(req, res) =>{
    res.render(`addblog`,{
        user : req.user
    })
  });

    blogRouter.get(`/:id`, async(req, res) =>{
             const blogId = req.params.id;
             console.log("BLOG ID:", blogId);
            const blog = await Blog.findById(blogId).populate("createdBy"); 

            const comments = await Comment.find({ blogId:req.params.id }).populate("createdBy");
              console.log("BLOG:", blog);
             return res.render(`blog`,{
                user : req.user,
                blog,
                comments
             });

        });

   blogRouter.post(`/` ,upload.single("coverImage"), async (req, res) =>{
   
       
       const {title, Body} = req.body;

      const blog = await Blog.create({
        title,
        Body,
        createdBy :  req.user.id,
        coverImageUrl : req.file ? `/uploads/${req.file.filename}` : null,
      
     });
     res.redirect(`/blog/${blog._id}`);
    });

    blogRouter.post(`/comment/:id`, async(req, res) =>{
        const blogId = req.params.id;
        const {content} = req.body;     
         await Comment.create({
            content,
            blogId,
            createdBy : req.user.id
        });
        res.redirect(`/blog/${blogId}`);
    });


    export default blogRouter;


 
