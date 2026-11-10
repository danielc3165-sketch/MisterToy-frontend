import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { login, signup } from "../store/actions/user.action"

import { userService } from "../services/user.service.api"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service" 

import { ImgUploader } from "../cmps/ImgUploader"

export function LoginSignup() {

    const [ isSignup,setIsSignup] =  useState(false)
    const [ credentials,setCredentials ] = useState([userService.getEmptyCredentials()])

    
    //console.log('L',loggedInUser)
    const navigate = useNavigate()

    function handleCredentials({target}){
      const { value, name } = target
      setCredentials(prev=>({...prev,[name]:value}))
    }

    function onSubmit(ev){
       ev.preventDefault()
       isSignup ? _signup() : _login()
       
    }

    async function _login(){
    try {
      await login(credentials)
      navigate('/toy')
      showSuccessMsg('Logged in successfully')
    } catch (error) {
      showErrorMsg('Oops try again')
    }
    }

    async function _signup(){
    try {
      await signup(credentials)
      navigate('/toy')
      showSuccessMsg('Logged in successfully')
    } catch (error) {
      showErrorMsg('Oops try again')
    }
    }


    return <section className="login">

    <h2>{isSignup ? 'Signup' : 'Login'}</h2>
    
    <form className="login-form" onSubmit={onSubmit}>
    <div className="login-inputs">
    <input type="text" name="userName" value={credentials.userName} onChange={handleCredentials} placeholder="User Name" />
    {isSignup && <input type="text" name="fullName" value={credentials.fullName} onChange={handleCredentials} placeholder="Full Name"/>}
    <input type="password" name="password" value={credentials.password} onChange={handleCredentials} placeholder="Password" />
    </div>
    {isSignup && <ImgUploader />}
    <button>{isSignup ? 'Signup' : 'Login'}</button>
 
    </form>

    <button onClick={()=>setIsSignup(!isSignup)}>{isSignup ? 'Login' : 'Signup'}</button>
    
    <div className="back-link">
    <Link to={'/toy'}>Back</Link>
    </div>
    
</section>
}


