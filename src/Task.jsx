import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  newTask,
  setNewTask,
  index,
  editingTaskIndex,
  handleEditSubmit,
  onEdit,
  onComplete,
  onRemove,
}) => {
  return (
    <li className="task" key={index}>
      {/* Checkbox to mark the task as complete */}
      <div
        aria-label="toggle completed"
        className={`custom-checkbox ${task.completed ? "checked" : ""}`}
        onClick={() => onComplete(task.completed, index)}
      >
        {task.completed && (
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
        )}
      </div>

      {/* Conditionally renders either editing form or current task title */}
      {editingTaskIndex === index ? (
        // Form for editing the task title
        <form
          onSubmit={(e) => handleEditSubmit(e, index)}
          className="edit-form"
        >
          <textarea
            type="text"
            value={newTask}
            aria-label="edit task"
            className="edit-input"
            placeholder="Edit Task"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" aria-label="submit" className="edit-submit">
            <FontAwesomeIcon icon={faCheck} className="submit-icon" />
          </button>
        </form>
      ) : (
        <>
          {/* Task title with toggled strike-through for completed tasks */}
          <p
            className="title"
            style={{
              textDecoration: task.completed ? "line-through" : "",
            }}
          >
            {task.title}
          </p>
          {/* Button to trigger task editing */}
          <button
            className="edit"
            aria-label="edit"
            onClick={() => onEdit(index)}
          >
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          </button>
          {/* Button to remove the task */}
          <button
            className="delete"
            aria-label="delete"
            onClick={() => onRemove(index)}
          >
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          </button>
        </>
      )}
    </li>
  );
};

export default Task;
