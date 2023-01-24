import React, { useState } from 'react';
import defaultIcon from '../../images/default-user-icon.jpg'
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {selectedChatState} from "../../recoilAtoms";

function Search () {
    const [username, setUsername] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);

    const setSelectedChat = useSetRecoilState(selectedChatState);

    const handleSearch = () => {
        axios.post(
            '/findUsersByName',
            { username }
        )
            .then(response => {
                setFoundUsers(JSON.parse(response.data.users));
            })
            .catch(() => alert('Error'))
    }

    // if user presses 'Enter' -> search
    const handleKey = e => {
        e.code === 'Enter' && handleSearch();
    }

    const handleChatSelect = (userId, e) => {
        e.preventDefault();

        setSelectedChat(userId);
    }

    return (
        <div className="search">
            <div className="searchInput">
                <input
                    type="text"
                    placeholder="Find a user"
                    onChange={ e => setUsername(e.target.value) }
                    onKeyDown={ handleKey }
                />
            </div>
            {
                foundUsers.map((user, index) => (
                    <div
                        key={index}
                        className="userChat"
                        onClick={ e => handleChatSelect(user.id, e) }
                    >
                        <img src={defaultIcon} alt="OOPS..."/>
                        <div className="userChatInfo">
                            <span>{ user.name }</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Search