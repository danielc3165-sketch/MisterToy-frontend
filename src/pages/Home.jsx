import { Link } from "react-router-dom"

export function Home(){
    return <section>
        
    <h1>Home</h1>
    
    <Link to={'/login'}><button>Login</button></Link>
    <Link to={'/toy'}><button>Toys</button></Link>
    </section>
}