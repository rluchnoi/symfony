import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { setAxiosHeader, setTokenCookie } from "../helpers";

function Login() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        axios.post(
            '/login',
            { email, password }
        )
            .then(response => {
                setAuthorization(response.data.token);
                navigate('/profile');
            })
            .catch(() => alert('Error'))
    }

    const setAuthorization = (token) => {
        setTokenCookie(token);
        setAxiosHeader(token);
    }

    return (
        <Layout>
            <Header/>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">React Chat</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Log in</button>
                    </form>
                    <p>No account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </Layout>
    )
}

export default Login