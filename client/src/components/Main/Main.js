import { useCallback, useEffect, useState } from "react";
import useBlockchain from "../../hooks/use-blockchain";
import TaskList from "../TaskList/TaskList";
import "./Main.scss";

function Main() {
    const { contract, signer } = useBlockchain();
    const [tasks, setTasks] = useState([]);

    const loadTasks = useCallback(async () => {
        if (!contract) {
            return;
        }

        const count = (await contract.getTasksCount()).toNumber();

        if (!count) {
            setTasks([]);

            return;
        }

        const loadedTasks = [];

        for (let index = 0; index < count; index++) {
            const task = await contract.getTask(index);
            loadedTasks.push(task);
        }

        setTasks(loadedTasks);
    }, [contract]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    async function handleFormSubmit(event) {
        event.preventDefault();
        const input = event?.target?.content;
        const value = input?.value;

        if (input) {
            input.value = "";
        }

        const response = await contract.createTask(value);
        await response.wait();
        loadTasks();
    }

    return (
        <main className="Main">
            {signer ? (
                <>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            placeholder="Add a new task..."
                            type="text"
                            name="content"
                            className="add-task"
                        />
                        <button hidden type="submit">
                            Submit
                        </button>
                    </form>
                    <TaskList tasks={tasks} loadTasks={loadTasks} />
                </>
            ) : (
                <p>Please connect to your wallet.</p>
            )}
        </main>
    );
}

export default Main;
