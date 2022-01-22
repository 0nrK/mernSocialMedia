import React, { useRef, useContext } from 'react'
import { loginCall } from "../../apiCalls"
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from "@material-ui/core"
import "./login.css"

const Login = () => {

    const email = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch)
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
                    <form className='loginBox' onSubmit={handleSubmit}>
                        <input placeholder="Email" ref={email} required minLength="6" type="email" className='loginInput' />
                        <input placeholder="Password" ref={password} type="password" className='loginInput' />
                        <button className='loginButton' disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px" /> : "Log In"}</button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton' disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px" /> : "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
