import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState(''); 
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/users/register', { username, password });
            setPopupMessage("User created successfully");
            setPopupType('success');
            setTimeout(() => {
                navigate("/login");
            }, 2000); 
        } catch (error) {
            console.error('Error registering', error);
            setPopupMessage("Error registering user");
            setPopupType('error');
        }
    };

    const login = () => {
        navigate("/login");
    }

    return (
        <div>
            <h6>MOVIE LIBRARY</h6>
            {popupMessage && (
                <div className={`popup-message ${popupType}`}>
                    {popupMessage}
                </div>
            )}
            <div className="container">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button onClick={handleRegister}>Register</button>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Register;
