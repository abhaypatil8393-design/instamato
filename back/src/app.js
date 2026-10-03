//create server

const express = require("express");
const authRouter = require("./routes/auth.routes.js");
const cookieparse = require("cookie-parser");
const  foodRouter = require("./routes/food.routes.js");
const foodpatnerid = require("./routes/food-patner.routes.js");
const cors = require("cors");




const app = express();
app.use(cookieparse());

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/auth" , authRouter);
app.use("/auth/food" , foodRouter );
app.use("/" , foodpatnerid );



module.exports = app;