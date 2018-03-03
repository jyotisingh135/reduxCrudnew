var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
mongoose.Promise=global.Promise;
var Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            access:{type:String,
                    required:true},
            token:{type:String,
                    required:true}
        }
    ]
});
Schema.methods.generateAuthToken=function(){
    var user=this;
    console.log('user',user);
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens.push({access,token});
    return user.save().then(()=>{
        console.log('Token',token);
        return token;
    });



}
var passlogin=mongoose.model('passlogin',Schema);
module.exports={passlogin};
