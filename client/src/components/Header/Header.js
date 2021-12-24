import Signer from "../Signer/Signer";
import "./Header.scss";

function Header() {
    return (
        <header className="Header">
            <h1>Ethereum Todo List</h1>
            <Signer />
        </header>
    );
}

export default Header;
