import React, { useState, useEffect } from 'react';
import defaultIcon from "../../images/default-user-icon.jpg";
import {useSetRecoilState} from "recoil";
import {selectedChatState} from "../../recoilAtoms";

function Chats (props) {

    const [parsedChats, setParsedChats] = useState([]);

    const setSelectedChat = useSetRecoilState(selectedChatState);

    useEffect(() => {
        parseData();
    }, [])

    const parseData = () => {
        setParsedChats(JSON.parse(props.chatsPreviewInfo));

        console.log(parsedChats)
    }

    const handleChatSelect = (chatId, e) => {
        e.preventDefault();

        setSelectedChat(chatId);
    }

    return (
        <div className="chats">
            {parsedChats.map((chat, index) => (
                <div
                    key={index}
                    className="userChat"
                    onClick={ e => handleChatSelect(chat.chatId, e) }
                >
                    <img src={defaultIcon} alt="OOPS..."/>
                    <div className="userChatInfo">
                        <span>{ chat.chatName }</span>
                        <p>{ chat.lastMessage }</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats
