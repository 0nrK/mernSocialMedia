import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import "./home.css"

const Home = () => {
    return (
        <div>
            <Topbar/>
            <div className='homeContainer'>
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}

export default Home
