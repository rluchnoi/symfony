import React from 'react';
import Messages from "./Messages";
import Input from "./Input";

import {useRecoilValue} from "recoil";
import {selectedChatNameState} from "../../recoilAtoms";

function Chat (props) {

    const selectedChatName = useRecoilValue(selectedChatNameState)

    return (
        <div className="chatList">
            <div className="chatListInfo">
                <span>{ selectedChatName }</span>
            </div>

            <Messages username={props.username}/>
            <Input/>
        </div>
    )
}

export default Chat