import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import svgImage from '../assets/images/undraw_sign_up_n6im.svg'; // Adjust the path if necessary
import '../Css/SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async () => {
        setLoader(true);
        setMessage(''); // Clear previous messages
        try {
            const response = await Path.post('/user/register', {
                username,
                email,
                password
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate('/login');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('Sign Up failed. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isFormValid = () => {
        return username && isValidEmail(email) && isValidPassword(password);
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-card">
                <h1 className="sign-up-title">Sign Up to UpStatus</h1>
                <p className="sign-up-subtitle">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint</p>
                <div className="sign-up-form">
                    <div className="input-group">
                        <input
                            required
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                        <label className="user-label">Full name</label>
                    </div>
                    <div className="input-group">
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        <label className="user-label">Email address</label>
                        {!isValidEmail(email) && email && <p className="error-message">Please enter a valid email address.</p>}
                    </div>
                    <div className="input-group">
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <label className="user-label">Password</label>
                        {!isValidPassword(password) && password && <p className="error-message">Password must be at least 8 characters long, include a number and a special character.</p>}
                    </div>
                    <div className="checkbox-container">
                        <label htmlFor="login" className="checkbox-label"> 
                            Already have an account!&emsp;
                            <a href="/login" className="link">click here</a>
                        </label>
                    </div>
                    {message && (
                        <div className="error-message" role="alert">
                            {message}
                        </div>
                    )}
                    <button onClick={handleSignUp} disabled={!isFormValid()} className="sign-up-button boton-elegante">
                        Sign Up
                    </button>
                    
                </div>
            </div>
            <div className="illustration">
                <img src={svgImage} alt="Sign Up Illustration" className="illustration-image" />
            </div>
        </div>
    );
};

export default SignUp;
