import React from "react";
import style from "./todolist.module.css";
import Grid from "@mui/material/Grid";

export default function Todolist(props) {
  return (
    <>
      <h3 style={{ padding: "0px 10px" }}>Todo List :</h3>
      <div style={{ margin: "20px" }}>
        <Grid container spacing={2}>
          {!props.todoList.length
            ? "Loading Data"
            : props.todoList.map((el, i) => {
                return (
                  <Grid key={i} item xs={4} style={{ padding: "5px" }}>
                    <div className={style.todoBox}>
                      <h4>{el.title}</h4>
                      <p>{el.details}</p>
                    </div>
                  </Grid>
                );
              })}
        </Grid>
      </div>
    </>
  );
}
