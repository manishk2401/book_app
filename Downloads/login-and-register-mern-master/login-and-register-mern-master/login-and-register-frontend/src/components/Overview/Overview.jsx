import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Container, TextareaAutosize } from "@mui/material";
import Todolist from "../TodoList/Todolist";

export default function Overview() {
  const [todoList, setTodolist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9002/getTodoList")
      .then(function (response) {
        setTodolist(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [myTodo, setTodo] = useState({
    title: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...myTodo,
      [name]: value,
    });
  };

  const addTodo = () => {
    const { title, details } = myTodo;
    if (details && title) {
      axios.post("http://localhost:9002/addtodo", myTodo).then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setTodolist((todoList) => [...todoList, myTodo]);
        }
      });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <>
      <Container>
        <div className="addTodo_container" style={{ margin: "10px", padding: "10px", maxWidth: "70%", minWidth: "300px" }}>
          <h3>Add Todos</h3>
          <TextField fullWidth id="title" size="small" label="Title" name="title" onChange={handleChange} margin="normal" variant="outlined" />

          <TextareaAutosize
            minRows={3}
            placeholder="Details"
            id="details"
            name="details"
            onChange={handleChange}
            style={{ width: "-webkit-fill-available", fontSize: "large", padding: "5px 10px", background: "transparent", borderRadius: "5px" }}
          />
          <button className="register_green_btn" onClick={addTodo}>
            Add Todo
          </button>
        </div>
        <Todolist todoList={todoList}></Todolist>
      </Container>
    </>
  );
}
