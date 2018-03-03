var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/infodb');
var UserSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        language:{
            type:String,
            required:true
        },
    email:{
        type:String,
        required:true
    },
    profileimage:{
    type:String,
    required:true
    },
    flag:{
        type:Boolean,
        required:true
        }

});
UserSchema.statics.findbyAge=function(age,cb){
    return this.find({'age':age},cb);
}
var infodata=mongoose.model('infodata',UserSchema);

module.exports={infodata};