import React, { useState } from "react";
import "../stylesheets/Input.css"
import { v4 as uuidv4 } from "uuid";

function Input (props) {

  const [ inputText, setInputText ] = useState(''); 

  const manageSend = e => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: inputText,
      completed: false
    };

    props.onSubmit(newTask);
  }

  const manageChange = e => {
     setInputText(e.target.value);
  }

  return (
    <form className="task-form" onSubmit={manageSend}>
      <input 
        className="task-input"
        type="text"
        name="task"
        placeholder="Insert a task"
        onChange={manageChange} />
        <button className="add-button">Add</button>
    </form>
  )
}

export default Input;