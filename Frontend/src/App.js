import { Routes, Route } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import ListComponent from "./Pages/ShoppingList/index";
import LoginPage from "./Pages/Login";
import MyLists from "./Pages/MyLists";
import CreateUser from "./Pages/CreateUser";
import "./style.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getMe, logoutUser } from "./Api/userApi"
import Redirect from "./Redirect";

function App() {
  const [num, setNum] = useState(1)
  const [userResult, setUserResult] = useState(null)

  const nav = useNavigate();
  useEffect(() => {
    getMe().then(response => {
      setUserResult({loggedIn: true, user: response.data})
    }).catch((err) => {
      console.log('loggedout', err)
      setUserResult({loggedIn: false})
      nav('/Login')
    })
  }, [num])

  const logoutHandle = async () => {
    await logoutUser()
    setUserResult({loggedIn: false})
    nav('/Login')
  }

  if (!userResult) {
    return 'Ladataan...'
  }

  const username = userResult.loggedIn ? userResult.user.name : undefined


  return (<>
      <header>
        <div></div>
        <div>Logo</div>
        <div >
          <p className="username" >{!username ? '' : username  }</p>
          {!username ? '' : <Button onClick={logoutHandle} >Kirjadu ulos</Button>}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/ShoppingList/:id" element={<ListComponent />} />
          <Route path="/MyLists" element={<MyLists />} />
          <Route path="/Login" element={<LoginPage onLogin={() => { setNum(num + 1) }} />} />
          <Route path="/Logout"  />
          <Route path="/" element={<Redirect to="/MyLists" />} />
        </Routes>
      </main>
      <footer>
        <p>samiraiha.fi</p>
        <p>Samin kauppalista sovellus</p>
        <p>sami.raiha94@gmail.com</p>
      </footer>
      </>
  );
}

export default App;
