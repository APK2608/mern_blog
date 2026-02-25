import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful');
            navigate('/login');
        } else {
            setError(data.error || 'Registration failed');
        }
    }

    return (
        <div className="form-container">
            <h1>Join Blot.</h1>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={register}>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
