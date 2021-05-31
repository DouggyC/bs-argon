require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3001;
const session = require("express-session");
const sequelize = require("./config/connection");
const fileupload = require("express-fileupload");

const path = require("path");
const { DataTypes } = require("sequelize");

const users = require("./models/users");
const items = require("./models/items");
const UserController = require("./controllers/UserController");
const ItemController = require("./controllers/ItemController");

// File path
app.set("views", path.join(__dirname, "views"));

// Path to our public directory
const excelToJson = require("convert-excel-to-json");

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
  })
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(fileupload());

app.get("/api/isLog", UserController.isLog);
app.get("/api/role", UserController.role);
app.post("/api/save_as_excel", UserController.saveAsExcel);
app.post("/api/log", UserController.Log);
app.post("/api/register", UserController.register);
app.post("/api/update/item", ItemController.update);
app.post("/api/user/update", UserController.update);
app.post("/api/user/checkforgetkey", UserController.CheckForgetKey);
app.get("/api/user/logout", UserController.LogOut);
app.get("/api/user/forget", UserController.sendForgetMail);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// sequelize.sync({ force: true });

app.listen(port, () => {
  console.log(`Example,  app listening at http://localhost:${port}`);
});
