import React, { useState, useEffect, useContext } from 'react'
import "./post.css"
import { MoreVert, SettingsInputCompositeSharp } from "@material-ui/icons"
import axios from 'axios'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Post = ({ post }) => {
    const [user, setUser] = useState({})
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res)
        }
        fetchUser()
    }, [post.userId])


    const likeHandler = () => {
        try {
            axios.put("/posts" + post._id + "/like", { userId: currentUser._id })
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfilePic' src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt=""></img>
                        </Link>
                        <span className='postUsername'>{user.username}</span>
                        <span className='postDate'>(post.createdAt)</span>
                    </div>
                    <div className='postTopRight'><MoreVert /></div>
                </div>
                <div className='postCenter'>
                    <span className='postText'>{post?.desc}</span>
                    <img className='postImg' src={PF + post.img} alt="" />
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className='postLikeCounter'>{like} people liked it</span>
                    </div>
                    <div className='postBottomRight'>
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Post
