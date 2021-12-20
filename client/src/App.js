import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./contract/TodoList.json";

function App() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  const [contract, setContract] = useState();
  const [taskCount, setTaskCount] = useState();

  useEffect(() => {
    async function load() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      setAccount(await signer.getAddress());
      setBalance(
        ethers.utils.formatEther((await signer.getBalance()).toString())
      );

      const todoList = new ethers.Contract(
        process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
        TodoList.abi,
        signer
      );

      setContract(todoList);
      setTaskCount((await todoList.taskCount()).toNumber());
    }

    load();
  }, []);

  return (
    <div className="App">
      <h1>Ethereum Todo List</h1>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance} ETH</p>
      <p>Current contract is: {contract?.address}</p>
      <hr />
      <p>Task count: {taskCount}</p>
    </div>
  );
}

export default App;
