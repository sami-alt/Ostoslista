import  Button  from "@mui/material/Button"
import { logoutUser } from "../../Api/userApi"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const nav = useNavigate();

    const logoutHandle = async () => {
        await logoutUser()
        nav('/')
    }

    return (
        <Button onClick={logoutHandle} >Kirjadu ulos</Button>
    )
}

export default Logout