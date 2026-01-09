//importing module
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 8000;

//middleWare
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));



//MongoDB Connection
mongoose.connect(
    "mongodb+srv://sssarijeet_db_user:ioLRgDoBxOhP8XXs@cluster0.dukcmhx.mongodb.net/projectDG"

    
  )
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));
  


//user Schema
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String,required:true},
    branch: String,
    year: String
})


const User = mongoose.model("User",userSchema);

//Routes
app.get("/",(req,res)=>{
    res.redirect("index.html");
})


app.post("/formFillup",async (req,res) => {
    try {
        const {name,email,branch,year} = req.body;

        await User.create({
            name,
            email,
            branch,
            year
        })

        console.log("Data inserted successfully!");
        res.redirect("formsubmitted.html");
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error saving data");
        
    }
    
})

//Starting Server
app.listen(port,()=>{
    console.log(`The application was started on ${port}`);
})

