const Expense = require("../model/expenseModels");
const asyncHandler = require("express-async-handler");
// const { getExpense } = require("./userController");

// Create and save a new expense
const createExpense = asyncHandler(async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const amount = req.body.amount;
  const date = req.body.date;
  const category = req.body.category;

  try {
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const expense = await Expense.create({ title, amount, date, category });

    // const expense = new Expense(req.body);
    // await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all expenses

const getAllExpenses = asyncHandler(async(req, res) => {
  try{
    const expenses = await Expense.find({});
    if(!expenses) {
      res.status(404).json({message: "Expenses not found"});
    }
    res.status(200).json(expenses);
  }catch{
    res.status(500).json({message: "Internal Server Error"});
  }
})

const getExpense = asyncHandler(async(req,res) => {
  try{
    const expense = await Expense.findById(req.params.id);
    if(!expense) {
      res.status(404).json({message: "Expense not found"});
    }
    res.status(200).json(expense);
  }catch{
    res.status(500).json({message: "Internal Server Error"});
  }
})



const updateExpense = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.expenseId;
    const { title, amount, date, category } = req.body;

    const expense = await Expense.findById(userId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteExpenses = asyncHandler(async(req, res) => {
  try{
    const {userId} = req.params;
    const user = await user.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted successfully" });
  }catch (error){
    console.log(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
  
 
})

module.exports = { createExpense, updateExpense, getAllExpenses,getExpense,deleteExpenses};
