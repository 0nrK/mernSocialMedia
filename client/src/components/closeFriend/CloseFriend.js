import React from 'react'
import "./closefriend.css"

const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFriends">
            <img className='sidebarFriendImg' src={PF + user.profilePicture} alt="" />
            <span className='sidebarFriendName'>{user.username}</span>
        </li>
    )
}

export default CloseFriend
