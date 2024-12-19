const User = require("../model/userModels");
const Expense = require("../model/expenseModels");
const asyncHandler = require('express-async-handler');



// Register User

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } 
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    } 
    if (password.length > 12) {
      return res.status(400).json({ message: "Password must be less than 12 characters" });
    }

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
  updateUser 
};
