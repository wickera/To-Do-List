import { useState, useEffect } from "react";
import Task from "./Task";
import "./styles.css";

function ToDo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [value, setValue] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Update the count of remaining tasks whenever tasks change
  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    // Adds a new task to the list with the entered value
    addTask(value);
    setValue("");
  };

  const addTask = (title) => {
    // Creates a new array with the current tasks and the new task
    const newTasks = [...tasks, { title, completed: false }];
    // Updates the tasks state
    setTasks(newTasks);
  };

  const completeTask = (completed, index) => {
    // Toggle the completion status of a task at the specific index
    const newTasks = [...tasks];
    newTasks[index].completed = !completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    // Remove a task from the list at the specific index
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    // Set the index of the task being edited and initialize the newTask state
    setEditingTaskIndex(index);
    setNewTask(tasks[index].title);
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    // Creates a copy of the current tasks array
    const newTasks = [...tasks];
    // Update the title of the edited task
    newTasks[index].title = newTask;
    // Update the tasks array with the new edited task
    setTasks(newTasks);
    // Reset the editing state and clear the edited task input value
    setEditingTaskIndex(null);
    setNewTask("");
  };

  return (
    <div className="todo-container">
      <h1 className="header">What's on the schedule for today?</h1>

      <div className="create-task">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={value}
            placeholder="Add a new task"
            aria-label="add a new task"
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>

      <ul className="tasks">
        {tasks.map((task, i) => (
          // Renders the Task component for each task
          <Task
            key={i}
            index={i}
            task={task}
            newTask={newTask}
            setNewTask={setNewTask}
            editingTaskIndex={editingTaskIndex}
            handleEditSubmit={handleEditSubmit}
            onEdit={editTask}
            onComplete={completeTask}
            onRemove={removeTask}
          />
        ))}
      </ul>
      <div className="header">Tasks Left - {tasksRemaining}</div>
    </div>
  );
}

export default ToDo;
