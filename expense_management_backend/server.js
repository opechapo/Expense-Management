require("dotenv").config();
const mongoose = require('mongoose');
const connectDb = require("./config/db");
const express= require('express');
const app = express();
const expenseRoutes = require("./Components/routes/expenseRoutes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

// app.use(cors({

//   origin: [process.env.FRONTEND_URL,"https://hostel-management-frontend-gamma.vercel.app"], 
//   credentials: true,
//   optionsSuccessStatus: 200,
//   methods: "GET, POST, PUT,DELETE, PATCH,HEAD, OPTIONS",
// }))




PORT= 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res,next) => {
  res.header("Access-Control-Allow-Origin");
  next();
})

app.use("/expense", expenseRoutes); 
// app.use("/user", userRoutes); 


app.get('/',(req, res) => console.log("Hello world"))

connectDb();

mongoose.connection.once("open", () =>{
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))  
})
