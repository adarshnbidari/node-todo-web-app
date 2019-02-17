const bcrypt=require('bcryptjs');

var password='adarsh';

bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password,salt,(err,hash)=>{
		console.log(hash);
		
	});
});

/* var hashedValue="$2a$10$610ieuIpKA.bipzJJRQwK.W1EqOdcPsFD5sqimLMiWmDF7x35GlhG";

bcrypt.compare("ssfsf",hashedValue,(err,res)=>{
	console.log(res);
}); */