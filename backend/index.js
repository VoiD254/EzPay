const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", mainRouter);


// app.use("/api/v2", v2Router);

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});
