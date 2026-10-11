import { ToyPreview } from "./ToyPreview"
import { Link } from 'react-router-dom'

export function ToyList({toys, onRemoveToy}){
    return <ul className="toy-container">
      {toys.map(toy=><li key={toy._id}>
        
        <ToyPreview toy={toy}/>

        <div className="li-btns">
            <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link> 
            <button onClick={()=>onRemoveToy()}>Delete</button>
        </div>

      </li>)}
    </ul>
}