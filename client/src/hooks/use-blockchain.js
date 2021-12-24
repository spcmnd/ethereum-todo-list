import { ethers } from "ethers";
import { useEffect, useState } from "react";
import TodoList from "../contract/TodoList.json";

function useBlockchain() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function load() {
            const p = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(p);
            const addresses = await p.listAccounts();

            if (addresses.length) {
                const s = p.getSigner(addresses[0]);
                setSigner(s);
                const a = await s.getAddress();
                setAddress(a);
                const b = ethers.utils
                    .formatEther((await s.getBalance()).toString())
                    .substring(0, 6);
                setBalance(b);
                const c = new ethers.Contract(
                    process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
                    TodoList.abi,
                    s
                );
                setContract(c);
            }
        }

        load();
    }, []);

    async function authProvider() {
        await provider.send("eth_requestAccounts", []);
        const s = provider.getSigner();
        setSigner(s);
        const a = await s.getAddress();
        setAddress(a);
        const b = ethers.utils
            .formatEther((await s.getBalance()).toString())
            .substring(0, 6);
        setBalance(b);
        const c = new ethers.Contract(
            process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
            TodoList.abi,
            s
        );
        setContract(c);
    }

    return { provider, signer, address, balance, contract, authProvider };
}

export default useBlockchain;
