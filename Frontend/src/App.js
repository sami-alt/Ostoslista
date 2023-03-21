import ListComponent from "./Pages/ShoppingList/index";
import  "./style.css";
import { useState } from "react";
import  Alert  from "@mui/material/Alert";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";


function App() {
  const [alertState, setAlertState] = useState(null)
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
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ShoppingList" element={<ListComponent setAlertState={setAlertState}/>}></Route>
      {alertState ? <Alert severity="error" variant="filled" sx={{width:'80%', height:"40px", position: 'absolute', top: 200, zIndex:'tooltip' }}> Kirjoita tuote</Alert> : ""}
      </Routes>
    </div>
  );
}

export default App;
