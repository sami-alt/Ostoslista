import ListComponent from "./Pages/ShoppingList/index";
import "./style.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import MyLists from "./Pages/MyLists";
import CreateUser from "./Pages/CreateUser";
import Logout from "./Pages/Logout";

function App() {
  return (
    <div className="app">
      <header>
        <Logout />
      </header>
      <nav>
        <ul>
          <li>
            <Link className="list-color" to="/">Kotiin</Link>
          </li>
          <li>
            <Link className="list-color" to="/CreateUser">Luo Käyttäjä</Link>
          </li>
          <li>
            <Link className="list-color" to="/Login">Kirjadu</Link>
          </li>
          <li>
            <Link className="list-color" to="/MyLists">Listat</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/ShoppingList/:id" element={<ListComponent />} />
        <Route path="/MyLists" element={<MyLists />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
