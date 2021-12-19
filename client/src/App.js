import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { TODOLIST_ABI, TODOLIST_ADDRESS } from './config/contract';
import "./App.css";

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
      setBalance(ethers.utils.formatEther((await signer.getBalance()).toString()));

      const todoList = new ethers.Contract(TODOLIST_ADDRESS, TODOLIST_ABI);
    }

    load();
  }, []);

  return (
    <div className="App">
      <h1>Ethereum Todo List</h1>
      <p>Your account is: {account}</p>
      <p>Your balance is: {balance} ETH</p>
      <hr />
    </div>
  );
}

export default App;
