import useBlockchain from "../../hooks/use-blockchain";
import Task from "../Task/Task";
import "./TaskList.scss";

function TaskList({ tasks, loadTasks }) {
    const { contract } = useBlockchain();

    async function handleTaskCheck(index) {
        const response = await contract.completeTask(index);
        await response.wait();
        loadTasks();
    }

    async function handleTaskDelete(index) {
        const response = await contract.deleteTask(index);
        await response.wait();
        loadTasks();
    }
    return (
        <div className="TaskList">
            {tasks.length ? (
                tasks.map((t, i) => (
                    <Task
                        key={i}
                        task={t}
                        handleTaskCheck={() => handleTaskCheck(i)}
                        handleTaskDelete={() => handleTaskDelete(i)}
                    />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default TaskList;
