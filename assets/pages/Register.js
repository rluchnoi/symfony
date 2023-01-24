import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import AddIcon from '../images/addIcon.png'
import axios from "axios";
import Layout from "../components/Layout";
import Header from "../components/Header";

function Register() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        // const avatar = e.target[2].files[0];

        axios.post(
            '/register',
            { name, email, password }
        )
            .then(() =>
                navigate('/login')
            )
            .catch(() => alert('Error'))
    }

    return (
        <Layout>
            <Header/>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">React Chat</span>
                    <span className="title">Register</span>
                    <form onSubmit={ handleSubmit }>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input style={{ display: "none" }} type="file" id="file"/>
                        <label htmlFor="file">
                            <img src={AddIcon} alt="OOPS..."/>
                            <span>Add an avatar</span>
                        </label>
                        <button>Sign up</button>
                    </form>
                    <p>Do you have a account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </Layout>
    )
}

export default Register