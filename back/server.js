//start server
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");



connectDB();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.listen(8000 , (req , res) => {
    console.log("server is runing on the port 8000");
})