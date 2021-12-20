import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./contract/TodoList.json";

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

      const todoList = new ethers.Contract(
        process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
        TodoList.abi
      );

      setContract(todoList);
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
    </div>
  );
}

export default App;
