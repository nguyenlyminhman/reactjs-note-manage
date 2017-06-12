var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000, console.log("Server is running..."));

var mang = ["Hello", "Bonjour", "React JS"];

app.get("/", (req, res) => {
    res.render("home");
});
app.post("/getnode", (req, res) => {
    res.send(mang);
});

app.post("/add", function(){
    
});