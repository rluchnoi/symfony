import React, { useEffect, useState } from 'react';
import Message from "./Message";
import axios from "axios";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { selectedChatState, selectedChatNameState } from "../../recoilAtoms";

function Messages (props) {

    const [messages, setMessages] = useState([]);

    const selectedChat = useRecoilValue(selectedChatState);

    const setSelectedChatName = useSetRecoilState(selectedChatNameState);

    const loadChat = () => {
        axios.post(
            '/loadChat',
            { selectedChat }
        )
            .then(response => {
                setMessages(JSON.parse(response.data.messages));
                setSelectedChatName(response.data.chatName);
            })
            .catch(() => {
                console.log('Error');
                setMessages([]);
                setSelectedChatName('');
            })
    }

    useEffect(() => {
        loadChat();
        setMessages([]);
    }, [selectedChat]);

    return (
        <div className="messages">
            { messages.map((message, index) => (
                <Message
                    key={index}
                    username={props.username}
                    author={message.author}
                    text={message.content}
                    time={message.time}
                />
            )) }
        </div>
    )
}

export default Messages
