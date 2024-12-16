const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpense,
  updateExpense,
  getAllExpenses,
  deleteExpenses,
} = require("../../controller/expenseController");

router.post("/createExpense", createExpense);
router.get("/", getAllExpenses);
router.get("/:expenseId", getExpense);
router.patch("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpenses);

module.exports = router;
