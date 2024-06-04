import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/users/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userID);
            console.log(response.data.userID);
            navigate("/home");
        } catch (error) {
            console.error('Error logging in', error);
            setError('Invalid username or password'); 
        }
    };

    const register = () => {
        navigate("/register");
    }

    return (
        <div>
        <h6><i class="fa-solid fa-film"></i>MOVIE LIBRARY</h6>
        <div className="container">
            <h1>Login</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {error && <div className="error-message">{error}</div>} 
            <button onClick={handleLogin}>Login</button>
            <button onClick={register}>Register</button>
        </div>
        </div>
    );
};

export default Login;
