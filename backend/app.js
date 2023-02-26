const express=require('express');
const people = require('./models/people');
require('./models/config');
const cors=require('cors');
const sender = require('./utility/mailer');
var bodyParser = require('body-parser');
var app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/add", async (req,res)=>
{
   const reqobj=req.body;
    console.log("body "+req.body.Name+ " "+req.body.Email);
    let added= new people(reqobj);
    const ans=await  added.save();
        if(ans)   
         res.send("Successfull");
        else
         res.send("Fail");
});
app.get("/list",async (req,res)=>
{
  const result =  await people.find({});
    
       if(result)
        res.send(result);      
       else
        res.send("Error");
});
app.get('/delete/:id',(req,res)=>
{
  const id=req.params.id;
  console.log("id received" +id);
  people.findByIdAndRemove(id, function(err){
    if(err){
       console.log(err);
       res.send("not DELETED");
    } else {
       res.send("not found");
    }
 });
});
app.post('/mail/:id',async(req,res)=>
{
    
    let id=req.params.id;
    id = id.substring(1);
    console.log(id);
    //find that user in the db. and info such as email of receiver
    console.log(typeof(id));
    const all=req.body;
    console.log("backend "+all.Subject +" "+all.Msg +" "+id); //geting the 
    let props;
     var doc;
     people.find({_id:id}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          console.log("Result : ", docs);
          const doc=docs[0];
          console.log("doc  - "+ doc)
          console.log("add    - " +all.Subject );
          props={Subject:all.Subject,Msg:all.Msg,Email:doc.Email,Name:doc.Name};
           console.log(props.Msg+' '+props.Subject+' '+props.Email+" "+props.Name);
          sender(props);
      }
     
  
     res.send("response");
});
});
app.listen(5000);