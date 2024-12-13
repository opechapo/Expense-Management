const Expense = require("../model/expenseModels");

// Create and save a new expense
const createExpense = async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const amount = req.body.amount;
  const date = req.body.date;
  const category = req.body.category;

  try {
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const expense = await Expense.create({ title,amount,date,category });


    // const expense = new Expense(req.body);
    // await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createExpense };
