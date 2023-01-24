import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    const pageLinks = [
        {
            "name": "Home",
            "url" :"/",
        },
        {
            "name": "Chat",
            "url" :"/chat",
        },
        {
            "name": "Profile",
            "url" :"/profile",
        },
        {
            "name": "Register",
            "url" : "/register"
        },
        {
            "name": "Login",
            "url" : "/login"
        }
    ];

    useEffect(() => {
        pageLinks.map((page)=>{
            if(page.url === location.pathname) {
                document.title = page.name;
            }
        });
    }, [])

    return (
        <div className="custom-header">
            <div className="app-logo">
                <span>Black & White</span>
            </div>
            {
                pageLinks.map((page, key) => {
                    return (
                        <div key={key} className={`header-item ${location.pathname === page.url ? 'header-item-active' : ''}`}>
                            <Link to={page.url} className="header-link">{page.name}</Link>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Header;
