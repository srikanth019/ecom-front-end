import { useSelector } from "react-redux";
import Login from "../features/auth/components/Login";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage () {
    const user = useSelector(selectLoggedInUser);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])
    return <div>
        <Login />
    </div>;
}
export default LoginPage;