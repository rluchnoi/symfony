import React from 'react';
import userIcon from '../../images/default-user-icon.jpg';

function Navbar (props) {
    return (
        <div className="chatNavbar">
            <span className="chatName">React Chat</span>
            <div className="user">
                <img className="userIcon" src={userIcon} alt="OOPS..."/>
                <span>{props.username}</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar