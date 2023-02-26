const mongoose= require('mongoose');
const peopleSchema= new mongoose.Schema({
    Name:String,
    Email:String,
 });

module.exports=mongoose.model("people",peopleSchema);

