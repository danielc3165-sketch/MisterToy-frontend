export function ToyPreview({toy}){
    return <div>
        <p>Toy Name: {toy.name}</p>
        <p>Price: {toy.price}$</p>
        <p>{toy.inStock ? 'In Stock' : 'Out Of Sale'}</p>
        </div>
}