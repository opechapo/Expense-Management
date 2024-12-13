const express = require("express");
const router = express.Router();
const {
  createExpense,
  // getAllExpense,
  // getExpense,
  // updateExpense,
  // deleteExpense,
} = require("../../controller/expenseController");

router.post("/createExpense", createExpense);
// router.get("/", getAllExpense);
// router.get("/:expenseId", getExpense);
// router.patch("/:expenseId", updateExpense);
// router.delete("/:expenseId", deleteExpense);

module.exports = router;
