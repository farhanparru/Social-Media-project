const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")


const  createAccessToken = (payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}

const createRefreshToken = (payload)=>{
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SCCRET,{expiresIn:'30d'})
     
}

// email Config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SM_EMAIL1,
        pass:process.env.SM_PASSWORD1
    }
})



module.exports = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body;
            
            let newUserName =  username.toLowerCase().replace(/ /g,'')

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg:"This User name already exists"})

            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg:"This Email alredy exists"})

            if(password.length < 6){
                return res.status(400).json({msg:"Password must be at least 6 charcters"})
            }

            const passwordHash = await bcrypt.hash(password,12)

            const newUser = new Users({
                fullname,
                username: newUserName,
                email,
                password:passwordHash,
                gender
              })
           
            // console.log(newUser);
                
              const access_token = createAccessToken({id:newUser._id})
              const refresh_token = createRefreshToken({id:newUser._id})

              res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })
       
             await newUser.save()
                           
      
            res.json({
                 msg: 'Register Successfully' ,
                 access_token,
                 user:{
                    ...newUser._doc,
                      password:''
                 }
              });    
    
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
   
   login: async(req,res)=>{
    
        try{
         const {email, password} = req.body
         const user = await Users.findOne({email})
         .populate("followers following","avatar username fullname followers following")

         if(!user){
            return res.status(500).json({msg:"This email does not exist."})
         }
   
         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).json({msg:"Password is incorrect."})
         }

                  
         const access_token = createAccessToken({id: user._id})
         const refresh_token = createRefreshToken({id: user._id})

         res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: '/api/refresh_token',
          maxAge: 30*24*60*60*1000, // 30days
          secure: true, // Ensure true if you're using HTTPS
          sameSite: 'None',
      })
         res.json({
          msg: 'Login Success!',
          access_token,
          user: {
              ...user._doc,
              password: ''
          }
      })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
      try {
          res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
          return res.json({msg: "Logged out!"})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },  
  
     generateAccessToken:async(req,res)=>{
        try{ 

            const rf_token = req.cookies.refreshtoken      
            if (!rf_token) {
              console.log("No refresh token provided"); 
              return res.status(401).json({ msg: "Please login now." });
          }      
  
             jwt.verify(rf_token,process.env.REFRESH_TOKEN_SCCRET,async(err,result)=>{
                if(err) return res.status(400).json({msg:"Please login now."})
                
                const  user = await Users.findById(result.id).select("-password")
                .populate("followers following","avatar username fullname followers following")

                if(!user){
                 return res.status(400).json({msg:"This does not exist."})
                }
                const access_token = createAccessToken({ id: result.id });
                
                res.json({
                  access_token,
                  user
              });
          });
             
        }catch(err){
          console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },


    // send Email Link for ResetPassword

    sendpasswordlink: async (req, res) => {
        const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address' });
    }
    const userfind = await Users.findOne({ email });
   

    // token generate for reset Password
    const token = jwt.sign({_id:userfind._id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1d"
    })
       
     const setUsertoken =  await Users.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true})

     if(setUsertoken){
        const mailOptions = {
            from:"farhanparru87@gmail.com",
            to:email,
            subject:"Sending Email For password Reset",
            text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setUsertoken.verifytoken}`,



        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
                res.status(401).json({status:401,message:"email not send"})
            }else{
              console.log("Email sent",info.response);
              res.status(201).json({status:201,message:"Email sent Successfully"})
            }
        })
     }

    if (!userfind) {
      return res.status(404).json({ success: false, message: 'User not found with this email address' });
    }

    return res.status(200).json({ success: true, message: 'Reset link sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
 },   
   
  // verify user ForgotPassword Time

  forgotpassword: async (req, res) => {
    const { id, token } = req.params;
    
    try {
        const validuser = await Users.findOne({ _id: id, verifytoken: token });
       
         const verifyiToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

         
   
        if(validuser && verifyiToken._id){
           res.status(201).json({status:201,validuser}) 
        }else{
          res.status(401).json({status:401,message:"user not exist"})
        }        
  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
 },

 // change password

 changePassword: async(req,res)=>{
   const {id,token} = req.params;

   const {password,confirm} = req.body
   
   console.log( req.body);

   if (password !== confirm) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }
  try{
    const validUser =  await Users.findOne({_id:id,verifytoken:token})

    const verifyiToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    if(validUser && verifyiToken._id){
        const newPassword =  await  bcrypt.hash(password,12)

        const setnewuserpass = await Users.findByIdAndUpdate({_id:id},{password:newPassword})
       

        setnewuserpass.save()
        res.status(201).json({status:201,setnewuserpass})

    }else{
        res.status(401).json({status:401,message:"user not exist"})
    }

  }catch(error){
    console.log(error);
  }
 }
     

}    