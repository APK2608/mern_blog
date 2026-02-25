import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            setUserInfo(data.user);
            navigate('/');
        } else {
            setError(data.error || 'Wrong credentials');
        }
    }

    return (
        <div className="form-container">
            <h1>Welcome Back.</h1>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={login}>
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
