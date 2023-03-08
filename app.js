const express = require('express')

const bodyParser = require('body-parser')

const _ = require('lodash');

const ejs = require('ejs')

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/')
     
    },
    filename: function (req, file, cb) {
    cb(null,Date.now()+".png") //Appending .jpg
    }
  })
const upload = multer({storage:storage})

const db =[]

let Data ={
    name:String,
    description:String,
    filename:[]
}


const app = express();
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    console.log(db);
    res.render("home")
})

app.get("/admin",(req,res)=>{
    res.render("admin");
})
const tyPe={
    lp:["For Rent","For Sale"],
    sha:["Apartments","Builder Floors","Farm Houses","Houses & Villas"],
    rha:["Apartments","Builder Floors","Houses & Villas"],
    pgh:["Guest Hoses","PG","Roommate"]

}
const head =["Land & Plot", "Sale House & Apartment","Rent House & Apartment","PG & Guest Hoses","Sale Shop & Office","Rent Shop & Office"]

let postName='';
let headTitle='';
app.get("/add",(req,res,next)=>{
    let typ ='';
    if(postName){
        switch (postName) {
            case "lp":
                typ = tyPe.lp;
                headTitle =head[0];
                
                break;
                case "sh&a":
                    typ =tyPe.sha
                    headTitle =head[1];
                break;
                case "rh&a":
                    typ =tyPe.rha;
                    headTitle =head[2];
                break;
                case "p&gh":
                    typ =tyPe.pgh;
                    headTitle =head[3];
                break;
                case "ss&o":
                    headTitle =head[4];
                break;
                case "rs&o":
                    headTitle =head[5];
                break;


        
            default:
                break;
        }

    res.render("add",{head:headTitle,type:typ,menCheck:postName})
    next(empty());
    }else{

        res.redirect("/admin")
    }
});

function empty(){
    postName='';
    console.log("next");
    
}




app.get("/cat/:postname",(req,res)=>{

    postName = req.params.postname;
    console.log(postName);
    

    res.redirect("/add")
})

app.post("/add",upload.array('pic', 12),(req,res)=>{
    // console.log(req.files[0].filename);
    const file= req.files
    console.log(req.body);

    const file_names = []
    file.forEach((data)=>{
        file_names.push(data.filename)
    })
    Data = {
        name :req.body.ploSel1,
      description:req.body.plotDes,
      filename:file_names
    }
    
    db.push(Data)
    console.log(db);

    res.render("image",{image:req.files});
})

app.listen(3000 || process.env.PORT,()=>{
    console.log("Server started at Port : 3000");
})
