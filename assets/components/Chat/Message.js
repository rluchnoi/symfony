import React from 'react';
import userIcon from '../../images/default-user-icon.jpg'

function Message (props) {
    const processTime = (time) => {
        return new Date(time).toTimeString().slice(0, 5)
    }

    return (
        <div>
            {
                props.author === props.username
                ?
                    <div className="message yourMessage">
                        <div className="messageInfo yourMessageInfo">
                            <div className="messageInfoText">
                                <span className="messageText">{ props.text }</span>
                            </div>
                            <span className="messageTime">{ processTime(props.time) }</span>
                        </div>
                        <div>
                            <img className="userIcon" src={userIcon} alt="OOPS..."/>
                        </div>
                    </div>
                :
                    <div className="message">
                        <div>
                            <img className="userIcon" src={userIcon} alt="OOPS..."/>
                        </div>
                        <div className="messageInfo">
                            <div className="messageInfoText">
                                <span className="messageAuthor">{ props.author }</span>
                                <span className="messageText">{ props.text }</span>
                            </div>
                            <span className="messageTime">{ processTime(props.time) }</span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Message
