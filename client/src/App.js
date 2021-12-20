import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import { getTodoListContract } from "./config/contract";

function App() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  const [contract, setContract] = useState();

  useEffect(() => {
    async function load() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      setAccount(await signer.getAddress());
      setBalance(
        ethers.utils.formatEther((await signer.getBalance()).toString())
      );

      const TODOLIST_ABI = await getTodoListContract();
      const todoList = new ethers.Contract(
        "0x29344bc6ca91345bdc2144cef28e2bffc321639b",
        TODOLIST_ABI
      );

      console.log(todoList);
    }

    load();
  }, []);

  return (
    <div className="App">
      <h1>Ethereum Todo List</h1>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance} ETH</p>
      <p>Current contract is: </p>
      <hr />
    </div>
  );
}

export default App;
