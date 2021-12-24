import "./Task.scss";

function Task({ task, handleTaskCheck, handleTaskDelete }) {
    return (
        <div className="Task">
            <p className={task.completed ? "completed" : ""}>{task.content}</p>
            <input
                type="checkbox"
                checked={task.completed}
                onClick={() => !task.completed && handleTaskCheck()}
                readOnly
            />
            <button className="btn secondary small" onClick={handleTaskDelete}>
                X
            </button>
        </div>
    );
}

export default Task;
