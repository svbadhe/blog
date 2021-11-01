const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
var nanoid = require("nanoid").nanoid;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true, useUnifiedTopology: true});

const blogSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid()
            },
        title: String, 
        content: String, 
        author: String, 
        date: String, 
        time: String
    }
);

const commentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid()
            },
        from_id: String,
        blog_id: String,
        comment: String,
        date: String, 
        time: String
    }
);

const userSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid()
            },
        name:String, 
        email: String, 
        password: String
    }
);

const BlogModel = mongoose.model("blog",blogSchema);
const UserModel = mongoose.model("user", userSchema);
const CommentModel = mongoose.model("comment", commentSchema);

const readline = require("readline");

app.get("/", (req,res)=>{
    BlogModel.find().sort({date:-1,time:-1}).exec((err, arr)=>{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(arr));
    }); 
});

app.get("/comments/:blogID", (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    CommentModel.find({blog_id:req.params.blogID}).sort({date:-1,time:-1}).lean().exec((err, arr)=>{
        arr.map((com,index,send) => {
            UserModel.findOne({_id:com.from_id}, (err, result)=>{
                if(result){
                    com["from"] = result.name;
                    if(index === send.length-1){
                        res.end(JSON.stringify(send));
                    }
                }
            });
        });
    }); 
});

app.get("/myposts/:author", (req,res)=>{
    BlogModel.find({author:req.params.author}).sort({date:-1,time:-1}).exec((err, arr)=>{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(arr));
    });    
});


app.delete("/:blogID", (req,res)=>{
    BlogModel.deleteOne({_id:req.params.blogID}, (err)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({code:"success"});
    });    
});

app.get("/myposts/:author", (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    BlogModel.findOne({author:req.params.author},(err,result)=>{
        if(result){
            res.end(JSON.stringify({code:"success", result:result}));
        } else {
            res.end(JSON.stringify({code:"fail"}));
        }
    })
});

app.post("/post", (req,res)=>{
    let blog = req.body;
    blog["date"] = new Date().toLocaleDateString();
    blog["time"] = new Date().toLocaleTimeString();
    res.setHeader('Content-Type', 'application/json');
    BlogModel.create(blog, ()=>{
        res.end(JSON.stringify({code:"success"}));
    });
    
});

app.post("/comment", (req,res)=>{
    let commentBody = req.body;
    commentBody["date"] = new Date().toLocaleDateString();
    commentBody["time"] = new Date().toLocaleTimeString();
    res.setHeader('Content-Type', 'application/json');
    CommentModel.create(commentBody, ()=>{
        res.end(JSON.stringify({code:"success"}));
    });
    
});

app.post("/register", (req,res)=>{
    let user = req.body;
    res.setHeader('Content-Type', 'application/json');
    UserModel.findOne({"email":user.email},(err,result)=>{
        if(result){
            res.end(JSON.stringify({code:"fail"}));
        } else {
            UserModel.create(user, (err, result)=>{
                res.end(JSON.stringify({code:"success", result:{_id:result._id,name:result.name}}));
            });
        }
    })
});

app.post("/login", (req,res)=>{
    let user = req.body;
    UserModel.findOne({"email":user.email},(err,result)=>{
        if(result){
            if(user.password === result.password){
                res.send(JSON.stringify({code:"e1p1",result:{_id:result._id,name:result.name}})); //User Matches email and pass
            } else {
                res.send(JSON.stringify({code:"e1p0"})); //Email found but incorrect pass
            }
        } else {
            res.send(JSON.stringify({code:"e0p0"})); //User email not found please register
        }
    })
});

app.get("/:blogID", (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    BlogModel.findOne({_id:req.params.blogID},(err,result)=>{
        if(result){
            res.end(JSON.stringify({code:"success", result:result}));
        } else {
            res.end(JSON.stringify({code:"fail"}));
        }
    })
});

app.listen("3001", ()=>console.log("PORT 3001 started listening!!"));