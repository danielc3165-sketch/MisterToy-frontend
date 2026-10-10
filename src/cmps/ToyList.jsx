import { ToyPreview } from "./ToyPreview"

export function ToyList({toys}){
    return <ul className="toy-container">
      {toys.map(toy=><li key={toy._id}>
        
        <ToyPreview toy={toy}/>

        <div className="li-btns">
            <button>Details</button>
            <button>Edit</button>
            <button>Delete</button>
        </div>

      </li>)}
    </ul>
}