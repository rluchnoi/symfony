import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Chat/Sidebar";
import ChatComponent from "../components/Chat/Chat";
import Layout from "../components/Layout";
import Header from "../components/Header";
import axios from "axios";

function Chat () {
    const [info, setInfo] = useState({ username: '', chatsPreviewInfo: '' })
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.post('/chatsInfo')
            .then(response => {
                setInfo(response.data);
                setLoaded(true);
            })
            .catch(error => console.log(error.response.data.message))
    }

    return (
        <Layout>
            <Header/>
            {
                loaded ?
                    <div className="chatBackground">
                        <div className="chat">
                            <Sidebar info={info}/>
                            <ChatComponent username={info.username}/>
                        </div>
                    </div>
                        :
                    <></>
            }
        </Layout>
    )
}

export default Chat