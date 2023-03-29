import ListComponent from "./Pages/ShoppingList/index";
import  "./style.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";


function App() {
  return (
    
    <div className="app">
      <nav>
        <ul>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ShoppingList">Lists</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ShoppingList" element={<ListComponent/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
