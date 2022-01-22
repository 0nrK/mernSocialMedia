import React, { useRef } from 'react'
import "./register.css"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"
import axios from 'axios';


const Login = () => {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match! ")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                const res = await axios.post("/auth/register", user)
                navigate("/login")
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>XYZ</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you on XYZ.
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox'>
                        <input placeholder="Username" required ref={username} className='loginInput' />
                        <input type="email" placeholder="Email" required ref={email} className='loginInput' />
                        <input type="password" minLength="6" placeholder="Password" required ref={password} className='loginInput' />
                        <input type="password" placeholder="Password Again" required ref={passwordAgain} className='loginInput' />
                        <button className='loginButton' onClick={handleSubmit}>Sign Up</button>
                        <Link to="/login">
                            <button className='loginRegisterButton'>
                                Log into Account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
