import { Link } from "react-router-dom"

export function AppHeader(){
    return <div className="header">
        <h1>mr. Toy</h1>
        <div className="header-links">
            <Link to={'/'}>Home</Link>
            <Link to={'/toy'}>Toys</Link>
            <Link to={'/map'}>Map</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
        </div>
    </div>
}