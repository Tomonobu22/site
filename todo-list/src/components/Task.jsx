import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../stylesheets/Task.css";

function Task(props) {
  return (
    <div className={ props.completed ? "task-container completed" : "task-container"}>
      <div className="task-text" onClick={() => props.toggleCompleted(props.id)}>
        {props.text}
      </div>
      <div className="icons">
        <AiOutlineCloseCircle className="done-icon" onClick={() => props.deleteTask(props.id)} />
      </div>
    </div>
  );
};

export default Task;