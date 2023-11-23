import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect(props) {
    const nav = useNavigate()

    useEffect(() => {
        nav(props.to, {replace: true})
    }, [nav, props.to])
}
