import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./contract/TodoList.json";

function App() {
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [taskCount, setTaskCount] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => loadBlockchainData());

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
    const count = (await todoList.taskCount()).toNumber();
    setTaskCount(count);
    loadTasks();
  }

  async function loadTasks() {
    const loadedTasks = [];

    for (let index = 1; index <= taskCount; index++) {
      const task = await contract.tasks(index);
      loadedTasks.push(task);
    }

    setTasks(loadedTasks);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const transactionResponse = await contract.createTask(
      event?.target?.content?.value
    );
    await transactionResponse.wait();
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
        {tasks.map((t) => (
          <div key={t.id.toNumber()} className="task">
            {t.id.toNumber()} - {t.content} -{" "}
            <input type="checkbox" checked={t.id.completed} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
