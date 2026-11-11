import { Link } from "react-router-dom"

export function Home(){
    return <section style={{display:"grid", justifyItems:'center'}}>
        
    <h1>Home</h1>
    <img style={{height:200, width:200, margin:30}}
        src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794373753/toy-logo.png" 
       alt="" />
    <div>
    <Link to={'/login'}><button>Login</button></Link>
    <Link to={'/toy'}><button>Toys</button></Link>
    </div>
    </section>
}