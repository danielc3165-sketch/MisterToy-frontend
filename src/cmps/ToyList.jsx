import { ToyPreview } from "./ToyPreview"
import { Link } from 'react-router-dom'

export function ToyList({toys, onRemoveToy, loggedInUser}){
    return <ul className="toy-container">
      {toys.map(toy=><li key={toy._id}>
        
        <ToyPreview toy={toy}/>

        <div className="li-btns">
            <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
            {loggedInUser&&loggedInUser.isAdmin && (
                <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
            )}
            {loggedInUser&&loggedInUser.isAdmin && (
                <button onClick={()=>onRemoveToy(toy._id)}>Delete</button>
            )}
        </div>

      </li>)}
    </ul>
}