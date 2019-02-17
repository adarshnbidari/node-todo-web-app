const mongoose=require('mongoose');

const jwt=require('jsonwebtoken');

const validator=require('validator');

const bcrypt=require('bcryptjs');

var userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		default:null,
		unique:true,
		minLength:1,
		trim:true
	},
	email:{
		type:String,
		required:true,
		default:null,
		unique:true,
		minLength:4,
		trim:true,
		validate:{
			validator:validator.isEmail,
			message:`Invalid email!...`
		}
	},
	password:{
		type:String,
		required:true,
		default:null,
		unique:false,
		minLength:3,
		trim:true,
		tokens:[{
			access:{
				type:String,
				required:true
			},
			token:{
				type:String,
				required:true
			}
		}]
	}
});


userSchema.pre('save',function(next){

	var user=this;
	
	if(user.isModified('password')){
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password,salt,(err,hash)=>{
				user.password=hash;
				next();
			});
		});
	}else{
		next();
	}

});

var User = mongoose.model('Users',userSchema);

module.exports={
	User
};