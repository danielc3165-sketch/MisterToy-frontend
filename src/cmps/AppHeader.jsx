import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { logout } from "../store/actions/user.action"
export function AppHeader(){
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [ smallMenuOn,setSmallMenuOn ] = useState(false)
    
    return <div className="header">
        <h2>mr. Toy</h2>
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
                <Link to={`/user/${loggedInUser._id}`}>Profile</Link>
            )}
            {loggedInUser ? (
                <a className="login-color" onClick={logout}>
                    Logout
                </a>
            ) : (
                <Link to={'/login'} className="login-color">Login</Link>
            )}
        </div>
        <button className="menu-btn" onClick={()=>setSmallMenuOn(true)}>Menu</button> 
    </div>
}