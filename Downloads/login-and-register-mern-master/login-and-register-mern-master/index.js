import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myFirstDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  details: String,
});

const User = new mongoose.model("User", userSchema);
const Todo = new mongoose.model("Todo", todoSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/updateusername", (req, res) => {
  const { _id, name } = req.body;

  User.update({ _id: _id }, { $set: { name: name } }, function (err, result) {
    if (err) {
      res.send({ message: "Please Check Details", result: err });
    } else {
      res.send({ message: "Update Successfull", result: result });
    }
  });
});

app.post("/updatepass", (req, res) => {
  const { _id, password } = req.body;
  console.log(req.body);
  User.update({ _id: _id }, { $set: { password: password } }, function (err, result) {
    if (err) {
      res.send({ message: "Something Went Wrong", result: err });
    } else {
      res.send({ message: "Password Update Successfull", result: result });
    }
  });
});

app.get("/getTodoList", (req, res) => {
  Todo.find({}, (err, todoList) => {
    if (todoList) {
      res.send({ message: "Data Found", result: todoList });
    } else {
      res.send({ message: "No Data found", result: err });
    }
  });
});

app.post("/addtodo", (req, res) => {
  const { title, details } = req.body;
  const todo = new Todo({
    title,
    details,
  });

  todo.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "Add Todo Successfully." });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
