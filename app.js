const express = require("express");

const app = express();
const port = 3000;

app.get("/getfile", (req,res) => res.send("Hello Word!"));

//app.listen(port, () => console.log("listening....."));