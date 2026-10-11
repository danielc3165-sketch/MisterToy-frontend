import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.local"
import { utilService } from "../services/util.service"

export function ToyDetails(){

    const [ toy,setToy ] = useState()

    const { toyId } = useParams()

    useEffect(()=>{
      if(toyId) loadToy(toyId)
    },[])

    function loadToy(toyId){
        toyService.getById(toyId)
        .then(toy=>setToy(toy))
    }
    
    if(!toy) return

    return <section>

    <h1>ToyDetails</h1>
    
    <div className="toy-details">
    <h2>{toy.name}</h2>
    <p>{utilService.makeLorem(25)}</p>
    <p>Price: {toy.price}$</p>
    <p>{toy.inStock ? 'In Stock' : 'Out Of Stock'}</p>
    <Link to={'/toy'}>Back</Link>
    </div>
    
    </section>
}