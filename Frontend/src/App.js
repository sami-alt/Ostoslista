import ListComponent from "./Pages/ShoppingList/index";
import  "./style.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import MyLists from "./Pages/MyLists";


function App() {
  return (
    <div className="app">
      <nav>
        <ul>
          <li>
          <Link className="list-color" to="/">Kotiin</Link>
          </li>
          <li>
            <Link>Plase holder</Link>
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
        <Route path="/" element={<Home/>}/>
        <Route path="/ShoppingList/:id" element={<ListComponent/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/MyLists" element={<MyLists/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
