var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/infodb',(err,db)=>{
    if(err){
        console.log(err);
    }
    else
    {
        console.log('connected');
    }
});
var UserSchema=new mongoose.Schema({
    statename:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
});
var states=mongoose.model('states',UserSchema);
module.exports={states};