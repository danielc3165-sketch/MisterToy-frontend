import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.api"
import { utilService } from "../services/util.service"

import { Children  } from "../cmps/Children"

export function ToyDetails(){

    const [ toy,setToy ] = useState()

    const { toyId } = useParams()

    useEffect(()=>{
      if(toyId) loadToy(toyId)
    },[])

    async function loadToy(toyId){
        const toyToSave = await toyService.getById(toyId)
        setToy(toyToSave)
    }

    function price(price){
        if(price<=50) return 'p-green'
        else if(price>=100) return 'p-gold'
        else return ''
    }
    
    if(!toy) return

    return <section>

    <h2>Toy Details</h2>
    
    <div className="toy-details">
    <div className="preview">
    <h3>{toy.name}</h3>
    <p className="toy-description">{utilService.makeLorem(25)}</p>
    <p>Price: <span className={price(toy.price)}>{toy.price}$</span></p>
    <p className={toy.inStock ? 'p-green-dark' : 'p-red'}>
        {toy.inStock ? 'In Stock' : 'Out Of Stock'}
    </p>
    <Link to={'/toy'}>Back</Link>
    </div>
    
    <Children />
    </div>

    
    </section>
}