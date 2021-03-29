require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();  
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");


//My routes 
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( ()=> {
    console.log("DB CONNECTED")
});
// mongoose.connect('mongodb://localhost:27017/myapp', 
//     {useNewUrlParser: true}
// );

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);


//Port
const port = process.env.PORT || 5000;


app.get("/",(req, res) => {
    res.send("Connected");
})

//Server
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})