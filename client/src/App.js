import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TodoList from "./contract/TodoList.json";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  async function loadBlockchainData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    const balance = ethers.utils.formatEther(
      (await signer.getBalance()).toString()
    );
    setBalance(balance);
    const todoList = new ethers.Contract(
      process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
      TodoList.abi,
      signer
    );
    setContract(todoList);

    return;
  }

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadTasks = useCallback(async () => {
    if (!contract) {
      return;
    }

    const count = (await contract.getTasksCount()).toNumber();
    setTaskCount(count);

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
    const response = await contract.createTask(event?.target?.content?.value);
    await response.wait();
    loadTasks();
  }

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
    <div className="App">
      <h1>Ethereum Todo List</h1>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance} ETH</p>
      <p>Current contract is: {contract?.address}</p>
      <hr />
      <p>Task count: {taskCount}</p>
      <h2>Add a new task</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="content" />
        <button type="submit">Submit</button>
      </form>
      <div className="tasks">
        {tasks.map((t, i) => (
          <div key={i} className="task">
            {i} - {t.content} -{" "}
            <input
              type="checkbox"
              checked={t.completed}
              onClick={() => !t.completed && handleTaskCheck(i)}
              readOnly
            />{" "}
            - <span onClick={() => handleTaskDelete(i)}>X</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
