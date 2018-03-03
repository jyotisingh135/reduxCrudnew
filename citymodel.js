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
    stateid:{
        type:String,
        required:true,
    },
    cityname:{
        type:String,
        required:true
    }
});
var cities=mongoose.model('cities',UserSchema);
module.exports={cities};