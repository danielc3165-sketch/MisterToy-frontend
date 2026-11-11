import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { logout } from "../store/actions/user.action"
export function AppHeader(){
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [ smallMenuOn,setSmallMenuOn ] = useState(false)
    
    const navigate = useNavigate()

    async function onLogout(){
        await logout()
        navigate('/login')
    }

    return <div className="header">

        <img style={{marginBlock:20}}
        src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794373753/toy-logo.png" 
        alt="" />

        <div className={smallMenuOn ? 'header-links' : 'header-links off'} >
            <button className="close-menu" onClick={()=>setSmallMenuOn(false)}>X</button>
            <Link to={'/'}>Home</Link>
            <Link to={'/toy'}>Toys</Link>
            <Link to={'/map'}>Map</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
            {loggedInUser?.isAdmin && (
                <Link to={'/review'}>Reviews</Link>
            )}
            {loggedInUser && (
                <Link to={`/user/${loggedInUser._id}`} style={{color:'#0e4bbb'}}>Profile</Link>
            )}
            {loggedInUser ? (
                <a style={{color:'#00b1ff'}} onClick={onLogout}>
                    Logout
                </a>
            ) : (
                <Link to={'/login'} className="login-color">Login</Link>
            )}
        </div>
        <button className="menu-btn" onClick={()=>setSmallMenuOn(true)}>Menu</button> 
    </div>
}