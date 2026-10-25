import { Link } from "react-router-dom"

export function AppHeader(){
    return <div className="header">
        <h2>mr. Toy</h2>
        <div className="header-links">
            <Link to={'/'}>Home</Link>
            <Link to={'/toy'}>Toys</Link>
            <Link to={'/map'}>Map</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
        </div>
    </div>
}