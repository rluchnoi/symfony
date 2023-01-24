import React from 'react';
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar (props) {
    return (
        <div className="sidebar">
            <Navbar username={props.info.username}/>
            <Search/>
            <Chats chatsPreviewInfo={props.info.chatsPreviewInfo}/>
        </div>
    )
}

export default Sidebar
