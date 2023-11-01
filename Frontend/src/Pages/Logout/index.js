import  Button  from "@mui/material/Button"
import { logoutUser } from "../../Api/userApi"
import { useNavigate } from "react-router-dom"

const Logout = (props) => {
    const nav = useNavigate();

    const logoutHandle = async () => {
        await logoutUser()
        props.onLogout()
        nav('/')
    }

    return (
        <Button onClick={logoutHandle} >Kirjadu ulos</Button>
    )
}

export default Logout