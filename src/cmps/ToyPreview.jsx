import { color } from "chart.js/helpers";

export function ToyPreview({toy}){

    function price(price){
        if(price<=50) return 'p-green'
        else if(price>=100) return 'p-gold'
        else return ''
    }

    return <div className="li-preview">
        <p>Toy Name: <span className="name-span">{toy.name}</span></p>
        <p>Price: <span className={price(toy.price)}>{toy.price}$</span></p>
        <p className={toy.inStock ? 'p-green-dark' : 'p-red'}>{toy.inStock ? 'In Stock' : 'Out Of Sale'}</p>
        </div>
}