import useBlockchain from "../../hooks/use-blockchain";
import "./Signer.scss";

function Signer() {
    const { authProvider, signer, address, balance } = useBlockchain();

    return (
        <div className="Signer">
            {signer ? (
                <>
                    <p className="balance">Balance: {balance} ETH</p>
                    <button className="btn primary">
                        Connected to: {address?.substring(0, 10)}...
                    </button>
                </>
            ) : (
                <button className="btn primary" onClick={authProvider}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default Signer;
