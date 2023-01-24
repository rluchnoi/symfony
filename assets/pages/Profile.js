import React, { useEffect, useState } from 'react';
import axios from "axios";
import Layout from "../components/Layout";
import Header from "../components/Header";
import userIcon from '../images/default-user-icon.jpg'

function Profile () {
    const [info, setInfo] = useState({ email : '', name: '' })

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.post('/profile')
            .then(response => setInfo(JSON.parse(response.data.user)))
            .catch(error => console.log(error.response.data.message))
    }

    return (
        <Layout>
            <Header/>
            <div className="profile">
                <div className="profile-info">
                    <img src={ userIcon } alt="OOPS..." />
                    <span>{ `Name: ${ info.name }` }</span>
                    <span>{ `Email: ${ info.email }` }</span>
                </div>
                <div className="profile-actions">
                    <button>Edit</button>
                    <button>Change password</button>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
