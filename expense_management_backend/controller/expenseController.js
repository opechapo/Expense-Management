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
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

//Update Expense

const updateExpense = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.expenseId;
    const { title, amount, date, category } = req.body;

    const expense = await Expense.findById(userId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



const getExpense = asyncHandler(async(req,res) => {
  try{
    const {expenseId} = req.params
    const expense = await Expense.findById(expenseId);
    if(expense) {
    const { title, amount, date, category } = req.body;
    res.status(200).json(expense);

    }else {
      res.status(404).json({message: "Expense not found!"});

    }
  }catch{error}{
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
})


// Get all expenses

const getAllExpenses = asyncHandler(async(req, res) => {
  try{
    // const expenses = await Expense.find({});
    const Expenses = await Expense.find().sort('-createdAt');

    if(!Expenses) {
      res.status(404).json({message: "Expenses not found"});
    }
    res.status(200).json(Expenses);
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
})


//deleteExpenses

const deleteExpenses = asyncHandler(async(req, res) => {
  try{
    const {expenseId} = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "User not found" });
    }
    await expense.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  }catch (error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error!' });
  }
 
})

module.exports = { createExpense, updateExpense, getAllExpenses,getExpense,deleteExpenses};
