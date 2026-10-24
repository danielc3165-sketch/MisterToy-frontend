import { color } from "chart.js/helpers";

export function ToyPreview({toy}){
    return <div className="li-preview">
        <p>Toy Name: <span className="name-span">{toy.name}</span></p>
        <p>Price: {toy.price}$</p>
        <p className={toy.inStock ? 'p-green' : 'p-red'}>{toy.inStock ? 'In Stock' : 'Out Of Sale'}</p>
        </div>
}