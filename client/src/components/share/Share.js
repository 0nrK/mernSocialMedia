import React,{useContext,useRef,useState} from 'react'
import {AuthContext} from "../../context/AuthContext"
import {PermMedia, Label, Room, Cancel, EmojiEmotions} from "@material-ui/icons"
import "./share.css"
import axios from 'axios'

const Share = () => {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }

        if(file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("file",file)
            data.append("name",fileName)
            newPost.img = fileName
            try{
                await axios.post("/upload", data)
            } catch(err) {
                console.log(err)
            }
        }

        try{
          await axios.post("/posts", newPost)
          window.location.reload()
        }catch(err){

        }
    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className="shareProfilePic" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt=""></img>
                    <input className='shareInput' ref={desc} placeholder={"what's in your mind" + user.name + "?"}/> 
                </div>
                <hr className='shareHR'/>
                {file && (
                    <div className='shareImgContainer'>
                        <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
                    </div>
                )}
                <form className='shareBottom' onSubmit={handleSubmit}>
                    <div className='shareOptions'>
                        <label htmlFor="file" className='shareOption'>
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className='shareOptionText'>Photo or Video</span>
                            <input 
                            style={{display:"none"}} 
                            type="file"
                            id="file"
                            accept=".png, .jpg, .jpeg," 
                            onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
