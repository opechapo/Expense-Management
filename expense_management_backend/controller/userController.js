const User = require("../model/userModels");
const Expense = require("../model/expenseModels");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');



const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (password.length > 12) {
    return res.status(400).json({ message: 'Password must be less than 12 characters' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if the user already exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Set the token in a secure cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // expires in 24 hours
      sameSite: 'none',
      secure: true,
    });

    // Respond with user details (exclude sensitive data like password)
    if (user) {
      const { _id, firstName, lastName, email } = user;
      return res.status(201).json({ _id, firstName, lastName, email, token });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Login User
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//logOutUser

const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),  
      sameSite: 'none',
      secure: true
  })
  return res.status(200).json({message: 'Logout Successful'})
})




// Get User 

const getUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(expenseId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DeleteUser

const deleteUser = asyncHandler(async(req, res) =>{
  try{
    const { userId } = req.params;
    // await User.findByIdAndDelete(userId);
    const user = await adminModel.findById(userId);
    if(!user){
      return res.status(404).json({message: 'User not found'})
    }
    await user.deleteOne();

    res.status(200).json({message: 'User deleted successfully'})
  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'})
  }
})

// Update User

const updateUser = asyncHandler(async(req, res) => {
  try{
    const { userId } = req.params;
    const updatedUser = await adminModel.findByIdAndUpdate(userId, req.body, {new: true});
    if(!updatedUser){
      return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json(updatedUser)
  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'})
  }
})





module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  deleteUser,
  updateUser, 
};
