import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/auth/me', { credentials: 'include' }).then(response => {
            response.json().then(info => {
                if (info.success && info.data) {
                    setUserInfo(info.data);
                }
            });
        });
    }, [setUserInfo]);

    function logout() {
        fetch('http://localhost:5000/api/auth/logout', {
            credentials: 'include',
        }).then(() => {
            setUserInfo(null);
            navigate('/');
        });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">Blot.</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Write Story</Link>
                        <button onClick={logout}>Logout ({username})</button>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
