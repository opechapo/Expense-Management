const User = require("../model/userModels");
const asyncHandler = require('express-async-handler');


const registerUser = asyncHandler(async(req,res) => {
  try{
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({message: "All fields are required"});

  }else if(password.lenght <6 ){
    res.status(400).json({message: "Password must be at least 6 characters"});
  }else if(password.length > 12){
    res.status(400).json({message: "Password must be less than 12 characters"});
  }  
  }catch{
    res.status(500).json({message: "Internal Server Error"});

  }
})



const loginUser = asyncHandler(async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({message: "All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user ||!(await user.matchPassword(password))){
      return res.status(401).json({message: "Invalid email or password"});
    }
    res.json({message: "Logged in successfully"});
    
  }catch{
    res.status(500).json({message: "Internal Server Error"});
  }
})

const getUserExpense = asyncHandler(async(req,res) => {

  try{
    const {expenseId} = req.params
    const expense = await expenseModels.findById(expenseId);
    if(!expense){
      res.status(404).json({message: "Expense not found"});
    }
    res.status(200).json(expense);
  }catch{
    res.status(500).json({message: "Internal Server Error"});
  }
})

const getAllUserExpense = asyncHandler(async (req, res) => {
  try{
    const expenses = await User.find({});
    if(!expenses) {
      res.status(404).json({message: " Expenses not found"});
    }
    res.status(200).json(expenses);
  }catch{
    res.status(500).json({message: "Internal Server Error"});
  }
})



// module.exports = {
//   registerUser,
//   loginUser,
//   getAllExpense,
//   getExpense
// }