const User=require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  
    return jwt.sign(
      {id: user._id.toString()},
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  };
 const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
const login=async (req,res)=>{
    try{
      const { email, password } = req.body;
      const user=await User.findOne({ email });
      // Handle case when user is not found
      if (!user) {
        return errorResponse(res, 401, 'User not registered. Please sign up.');
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        // Generate JWT token
        const token = generateToken(user); 
        return res.status(201).json({
          success: true,
          token,
          message: 'Login successful',
          userId:user._id.toString(),
        });
      } else {
        return respondWithError(res, 402, 'Invalid credential..');
      }
    }catch(err){
        console.error('Login error:', err);
        errorResponse(res, 500, 'Server Error Please try again.');
    }
}

const signup=async ()=>{
    try{
       const {name,email,password}=req.body;
       if(!name||!email||!password){
        errorResponse(res, 400, 'All field are required');
       }
       // Check if user with the same email already exists
       const existingUser = await User.findOne({ email });

       if (existingUser) {
       // return respondWithError(res, 400, 'User already exists. Please sign in.');
        return res.status(401).json({
        success: false,
        message:"user already exist",
       });
       }
       // Hash the password
       const hashedPassword = await bcrypt.hash(password, 10);
       // Create new user
       await User.create({
        name,
        email,
        password: hashedPassword
       });
       return res.status(201).json({
        success: true,
        message: 'Signup successful',
      });    
    }catch(err){
        console.error('Signup error:', err);
        errorResponse(res, 500, 'server error Please try again.');
    }
}