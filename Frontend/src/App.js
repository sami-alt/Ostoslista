import { Routes, Route, Link} from "react-router-dom";
import Drawer from '@mui/material/Drawer'
import EastIcon from '@mui/icons-material/East';
import ListComponent from "./Pages/ShoppingList/index";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import MyLists from "./Pages/MyLists";
import CreateUser from "./Pages/CreateUser";
import Logout from "./Pages/Logout";
import Me from "./userName";
import "./style.css";
import { Button } from "@mui/material";
import { useState } from "react";

function App() {
  const [drawer, setDrawer] = useState(false)
  return (
    <body>
      <header>
     <div> <Button onClick={() => setDrawer(true)} ><EastIcon/></Button></div>
        <div>Logo</div>
        <div className="this">
          <Me />
          <Logout />
        </div>
      </header>

      <nav>
        
        <Drawer open={drawer} className="drawer">
          <ul>
            <li>
              <Link className="list-color" to="/" onClick={() => setDrawer(false)} >Kotiin</Link>
            </li>
            
            <li>
              <Link className="list-color" to="/Login" onClick={() => setDrawer(false)}>Kirjadu</Link>
            </li>
            <li>
              <Link className="list-color" to="/MyLists" onClick={() => setDrawer(false)}>Listat</Link>
            </li>
          </ul>
        </Drawer>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/ShoppingList/:id" element={<ListComponent />} />
          <Route path="/MyLists" element={<MyLists />} />
        </Routes>
      </main>
      <footer>
        <p>Samin kauppalista sovellus</p>
        <p>url</p>
        <p>s-posti osoite</p>
      </footer>
    </body>
  );
}

export default App;
