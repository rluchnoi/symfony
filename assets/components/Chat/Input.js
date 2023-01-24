import React from 'react';
import send from '../../images/send.png'
import file from '../../images/file.png'

function Input () {
    return (
        <div className="messageInput">
            <input type="text" placeholder="Type a message"/>
            <div className="sendMessage">
                <input type="file" style={{display: 'none'}} id="file"/>
                <label htmlFor="file">
                    <img className="fileIcon" src={file} alt="OOPS..."/>
                </label>
                <img className="sendIcon" src={send} alt="OOPS..."/>
            </div>
        </div>
    )
}

export default Input