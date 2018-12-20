
var db=require('../modals/dbmethods')

//send index page
//function to send login page
exports.sendindex=function(req,res){
    res.render('index');
}

//method to call register ejs
exports.sendregister=function(req,res){
    res.render('register');
}

var i=1;
exports.register=function(req,res){
   // var input=JSON.parse(JSON.stringify(req.body));

    //assigning the data to user
    var id=i;
    var name=req.body.firstname;
    var lname=req.body.lastname;
    var uid=req.body.userid;
    var psd=req.body.psw1;
    var email=req.body.email;
    var phone=req.body.phoneno;
    var user='user';


    var data=[[id,name,lname,uid,psd,email,phone,user]];

    db.insert(data,function(err,result){
        if(err) console.log('db error');
       
       var check= JSON.stringify(result);
       if(check==1){
           i++;
           res.render('index');
       }
       else{
           res.render('register');
       }
    });   
        

}


//function to send login page
exports.sendlogin=function(req,res){
    res.render('login');
}


//function to check the validate user at login time
exports.validateuser=function(req,res){
   
    var username=req.body.uname;
    var password=req.body.pwd;

    //calling the validate method present in dbmethods
    db.validate(username,function(err,result){
        if(err) console.log('invalid username and password');
        //checking the username is correct or not if username is right result.length>0
        if(result.length!=0){
            //comparing the user entered password with db password 
            if(password==result[0].password){
                console.log(result[0].user_type)
                if(result[0].user_type == 'user'){
                    res.cookie('uname', username);
                    res.render('users_page')
                }
                else if(result[0].user_type == 'admin'){
                    console.log(username)
                    res.render('login');
                }
            }
            else{
                res.render('login');
            }
            
        }
        //this is for worng user name
        else{
            res.end('Invalid userand password');
        }
        
   });
}


//checking cookie
exports.checks=function(req,res){
    console.log("WHile checking ", req.cookies);
   
    var sample= req.cookies;
    console.log('samples: ', sample);
    res.render('checkcookie',{'username':sample.uname});
}






/** get user id from ajax method  
 * and send to db for validation 
 * and return result to ajax method */
exports.check= function(req,res){
    
    var input=req.query.loc;
     db.check(input,function(err,result){
         if(err) throw err;
         res.end(result);
     });
}