const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/usermodel');
require('dotenv').config();


exports.signup = async(req,res) =>{
    try {
        const {username ,email , password ,role} = req.body;

        const  userExists = await User.findOne({where : {email}})
        if(userExists) {
            return res.status(400).json({message : "Email is already Registered"})
        }

        const hashedPassword =  await bcrypt.hash(password , 12)

        const user = await User.create({username ,password :hashedPassword , email ,role})

        
        const token = jwt.sign({id : user.id , role : user.role} , process.env.JWT_SECRET , {expiresIn : '1d'})

        res.cookie('token' , token , {
            httpOnly : true,
            secure :true,
            sameSite  : 'Strict',
            maxAge : 20 * 60 * 60 * 1000
        })
        

        res.status(201).json({message : "User registered successfully",user})
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message : "server error" , error})
    }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 20 * 60 * 60 * 1000,
    });

    // ✅ Return user info in the response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.logout = async(req,res) => {
    try {
        res.clearCookie('token' , {
            httpOnly :true,
            secure :true,
            sameSite : 'Strict'
        })
        res.json({message : "logout successfully"})
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


exports.checkAuth = (req, res) => {
    if (req.user) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  };
  