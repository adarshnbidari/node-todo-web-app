const express=require('express');

const hbs=require('hbs');

const mongoose=require('mongoose');

const bodyParser=require('body-parser');

const bcrypt=require('bcryptjs');

mongoose.Promise=global.Promise;

var app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/social_media',{useNewUrlParser:true});


const {User}=require('./models');

app.set('view engine','html');

app.engine('html',hbs.__express);

//for signup

app.route('/')
	.get((req,res)=>{
	res.render('homepage');
/* 	let uname=req.query['usr'];
	if(uname){
		let user = new User({
			name:uname
		});
		
		user.save().then((doc)=>{
			console.log(doc);
		},(err)=>{
			console.log(err);
		});
	} */
})

	.post((req,res)=>{
		res.render('homepage');
		
		let uname=req.body.usr;
		let mail=req.body.email;
		let pwd=req.body.pwd;
		
		if(uname&&mail&&pwd){
			var user= new User({
				name:uname,
				email:mail,
				password:pwd
			});
			
			user.save().then((doc)=>{
				console.log(doc);
				console.log('Regsitration successfull :)');
		}).catch((err)=>{
				console.log('There was an error in registerting your account!..',err);
			});
		}
		
		
	});
	
	
	//for login 
	
app.route('/login')
	
	.get((req,res)=>{
		res.render('login');
	})

	.post((req,res)=>{
		res.render('login');
			
		let uname=req.body.usr;
		let pwd=req.body.pwd;
		
		if(uname&&pwd){
			User.find({name:uname}).then((check)=>{
				if(check.length!=0){
					bcrypt.compare(pwd,check[0].password,(err,res)=>{
							if(res){
								console.log(`${check[0].name} you are logged in!...`);	
							}else{
								console.log(`invalid credentials!...`);
							}
					});
					
				}else{
					console.log('invalid credentials!...');
				}
			},(e)=>{
				console.log('there was an error',e);
			});
		}
	});
	

app.listen(80,()=>{
	console.log("let's go");
});

			// Last-Seen:29/1/2019 -02:44 AM :) --expired :(