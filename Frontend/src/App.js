import { Routes, Route, Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer'
import EastIcon from '@mui/icons-material/East';
import ListComponent from "./Pages/ShoppingList/index";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import MyLists from "./Pages/MyLists";
import CreateUser from "./Pages/CreateUser";
import Logout from "./Pages/Logout";
import "./style.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getMe } from "./Api/userApi"

function App() {
  const [drawer, setDrawer] = useState(false)
  const [num, setNum] = useState(1)
  const [username, setUsername] = useState('')
  useEffect(() => {
    getMe().then(response => setUsername(response.data.name)).catch((err) => {
      setUsername('')
      console.log('logout', err)
    })

  }, [num])
  return (<>
      <header>
        <div> <Button onClick={() => setDrawer(true)} ><EastIcon /></Button></div>
        <div>Logo</div>
        <div className="this">
          <p className="username" >{!username ? '' : username}</p>
          <Logout onLogout={() => setNum(num + 1)} />
        </div>
      </header>

      <nav>
        <Drawer open={drawer}>
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
        </Drawer >
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage onLogin={() => { setNum(num + 1) }} />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/ShoppingList/:id" element={<ListComponent />} />
          <Route path="/MyLists" element={<MyLists />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </main>
      <footer>
        <p>Samin kauppalista sovellus</p>
        <p>url</p>
        <p>s-posti osoite</p>
      </footer>
      </>
  );
}

export default App;
