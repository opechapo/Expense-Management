const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Utilities",
        "Healthcare",
        "Entertainment",
        "Other",
      ],
    },

    // date: {
    //   type: Date,
    //   required: true,
    //   default: Date.now,
    // },
    // notes: {
    //   type: String,
    //   trim: true,
    // },
    // createdAt: { type: Date, default: Date.now },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;

