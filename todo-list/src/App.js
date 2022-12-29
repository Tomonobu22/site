import './App.css';
import Task from './components/Task';
import Input from './components/Input';
import { useState, useEffect } from 'react'


function App() {

  const [ tasks, setTasks ] = useState([]);

  useEffect(() => {
    const recoverTasks = JSON.parse(localStorage.getItem('tasks'));
    if (recoverTasks.length) {
      setTasks(recoverTasks);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onSubmit = newTask => {
    if (newTask.text.trim()){
      newTask.text = newTask.text.trim();
      const newTasks = [ newTask, ...tasks];
      setTasks(newTasks);
    }
  };

  const toggleCompleted = id => {
    const newTasks = tasks.map(task => {
      if (task.id === id) task.completed = !task.completed;
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks)
  };

  return (
    <div className="App">
      <div className='todoList-app'>
        <div className='todoList-container'>
          <h1>ToDo List</h1>
          <Input onSubmit={onSubmit}/>
          { 
            tasks.map( task => 
              <Task 
                key={task.id}
                id={task.id}
                text={task.text} 
                completed={task.completed}
                toggleCompleted = {toggleCompleted}
                deleteTask = {deleteTask} />) 
          }
        </div>
      </div>
    </div>
  );
}

export default App;
