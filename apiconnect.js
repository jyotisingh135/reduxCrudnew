var express=require('express');
var {infodata}=require('./model');
var bodyParser=require('body-parser');
var {states}=require('./statemodel');
var {cities}=require('./citymodel');
var {passlogin}=require('./loginmodal');
var cors=require('cors');
var fileUpload=require('express-fileupload');
var passport=require('passport');
var localStratergy=require('passport-local').Strategy;
var app=express();
var token='';
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Access-Control-*, Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PATCH,PUT');
    next();
})
app.use(express.static(__dirname +'/'));
app.get('/',(res,resp)=>{
    resp.sendFile(__dirname+'/');
});

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
//////////////////////passport///////////////////////

app.use(passport.initialize());
passport.serializeUser((user,done)=>{
   // console.log("in serialize : ",user);
    return done(null,user);
});
passport.deserializeUser((user,done)=>{
    return    done(null,user);
});
app.post('/loginpost',(req,res)=>{
    var newdata=new passlogin({
        username:req.body.username,
        password:req.body.password
    });
    newdata.save().then(()=>{
      //  console.log('jdhfksd');
        return newdata.generateAuthToken();
       // res.send(result);
    }).then((token)=>{
        console.log('token',token);
        //token=token;
        res.header('x-auth',token).send(newdata);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})
passport.use(new localStratergy((username,password,done)=>{
    passlogin.findOne({username:username,password:password},(err,user)=>{
        if(err)
        {return done(null,err)
        };
        if(!user){
            return done(null,false,{msg:'inccorect User'})}
        else
        {
            token=user.tokens[0].token;
            return done(null,user);
        }
    })
}));
// app.post('/login',(req,res)=>{
//     console.log('post login');
//     res.send('kxdsdkas');
//     }
// )

app.post('/login',passport.authenticate('local',{successRedirect:'/suc',failureRedirect:'/fail'}));
app.get('/suc',(req,res)=>{
    console.log("response : ",res);
    passlogin.find({}).then((response)=>{
        if(response){
            //console.log('success token',token);
            console.log('asdasdasdasdasdasd',response);
           res.header('x-auth',token).send(response);
        }
    })
  //res.send({'msg':'success'}) ;
});
app.get('/fail',(req,res)=>{
    console.log('login fail');
    res.send({'msg':'fail'});

})

///////////////////state Data///////////////////////
app.get('/getstate',(req,res)=>{
    states.find().then((response)=>{
        res.send(response);
    })
});
//////////////////city Data//////////////////
app.get('/getcity/:stateid',(req,res)=>{
    console.log(req.params.stateid);
    cities.find({stateid:req.params.stateid}).then((response)=>{
        res.send(response);
    })
});
app.post('/newstate',(req,res)=>{
    var state=new states({
        statename:req.body.statename
    })
    state.save().then((response)=>{
        res.send(response);
        console.log(response);
    });
});
/////////////City Data//////////////////////////
app.post('/newcity',(req,res)=>{
    var city=new cities({
        stateid:req.body.stateid,
        cityname:req.body.cityname
    })
    city.save().then((response)=>{
        res.send(response);
    });
});
////Insert new Info Data//////////////////////////////////////
app.post('/newdata',(req,res)=>{
    console.log('in new data poast');
    let uploadFile=req.files.profileimage;
    console.log('upload file',uploadFile);
    var newinfo= new infodata({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        state:req.body.state,
        city:req.body.city,
        language:req.body.language,
        email:req.body.email,
        profileimage:req.files.profileimage.name,
        flag:false
    });
    //newinfo.profileimage=req.files.profileimage;
    uploadFile.mv('./upload/'+uploadFile.name,(err)=>{
        if(err)throw err;
    })
    console.log(req.files);
    console.log('namecsdfvddgdfggftgtrytr',req.body.name);
    console.log('newdata',newinfo);
    newinfo.save().then(()=>{

        console.log('values inserted');
        //res.send(response);
    }).then((token)=>{
        res.header('x-auth',token).send(newinfo);
    }).catch((err)=>{
        res.status(400).send(err);
    });

});
//////////////////Get Data/////////////////////////////
app.get('/getdata',(req,res)=>{
    infodata.find({flag:false}).then((response)=>{
        res.send(response);
    });
})
//////////////////Delete Data////////////////////////
app.put('/delete/:id',(req,res)=>{

    console.log(req.params.id);
    infodata.findByIdAndUpdate(req.params.id,{$set:{'flag':true}}).then((response)=>{
        console.log(response);
            res.send(response);
    });
});
app.put('/deletemulti',(req,res)=>{
    console.log(req.body);
    for(var i=0;i<req.body.length;i++) {
        infodata.findByIdAndUpdate(req.body[i], {$set: {'flag': true}}).then((response) => {
            console.log(response);
        });
    }
    res.send({'message':'deleted'});
})

////////////////////////Update data//////////////
app.put('/edit/:id',(req,res)=>{
    console.log(req.params.id);
    console.log(req.body.name);

   // console.log('profile image',req.files.profileimage);
    infodata.findById(req.params.id).then((response)=>{
        response.name=req.body.name,
            response.age=req.body.age,
            response.gender=req.body.gender,
            response.state=req.body.state,
            response.city=req.body.city,
            response.language=req.body.language,
            response.email=req.body.email

            if(req.files!==null){
                let uploadFile=req.files.profileimage;
                uploadFile.mv('./upload/'+uploadFile.name,(err)=>{
                    if(err)throw err;
                })
                response.profileimage=req.files.profileimage.name
            }
        response.save().then((result)=>{
            res.send(result);
        })

    });
});

///////////////////////////Get By Id////////////////////
app.get('/getDataById/:id',(req,res)=>{
    console.log(req.params.id);
    infodata.find({_id:req.params.id}).then((response)=>{

        res.send(response);
    }).catch((err)=>{
        console.log(err);
    })
});
//////////////////////get limited columns////////////
app.get('/getCols',(req,res)=>{
    infodata.find({},{city:1,name:1,_id:0}).sort({'name':-1}).then((docs)=>{
        console.log(docs);
        res.send(docs);

    });
});
app.get('/getByAge',(req,res)=>{
    infodata.findbyAge(22,function(err,info){
        console.log(info);
        res.send(info);
    });
});

app.listen(3000,()=>{
    console.log('server started on port 3000');
})
