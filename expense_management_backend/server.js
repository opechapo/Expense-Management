require("dotenv").config();
const mongoose = require('mongoose');
const connectDb = require("./config/db");
const express= require('express');
const app = express();
const expenseRoutes = require("./Components/routes/expenseRoutes");



PORT= 5000



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res,next) => {
  res.header("Access-Control-Allow-Origin");
  next();
})

app.use("/expense", expenseRoutes); 
// app.use(errorHandler);

app.get('/',(req, res) => console.log("Hello world"))

connectDb();
mongoose.connection.once("open", () =>{
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))  
})
