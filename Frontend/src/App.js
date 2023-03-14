import ListComponent from "./Pages/ShoppingList/index";
import  "./style.css";
import { useState } from "react";
import  Alert  from "@mui/material/Alert";


function App() {
  const [alertState, setAlertState] = useState(null)
  return (
    <div className="body">
      <ListComponent setAlertState={setAlertState} />
      {alertState ? <Alert severity="error" variant="filled" sx={{width:'80%', height:"40px", position: 'absolute', top: 200, zIndex:'tooltip' }}> Kirjoita tuote</Alert> : ""}
    </div>
  );
}

export default App;
