import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { loadReviews } from "../store/actions/review.action.js"

import { toyService } from "../services/toy.service.api"
import { reviewService } from "../services/review.service.js"
import { utilService } from "../services/util.service"

import { Children  } from "../cmps/Children"
import { ToyReviews } from "../cmps/ToyReviews.jsx"


export function ToyDetails(){

    const [ toy,setToy ] = useState()
    const [ toyReviews, setToyReviews ] = useState(null)

    const { toyId } = useParams()

    useEffect(()=>{
      if(toyId) {
        loadToy(toyId)
        loadToyReviews(toyId)
      }
    },[])

    async function loadToy(toyId){
        const toyToSave = await toyService.getById(toyId)
        setToy(toyToSave)
    }

    async function loadToyReviews(toyId) {
            const filterBy = reviewService.getDefultFilter() 
             console.log('toyId:', toyId)
            filterBy.byToyId = toyId
            const reviews = await loadReviews(filterBy)
            setToyReviews(reviews)
        }

    function price(price){
        if(price<=50) return 'p-green'
        else if(price>=100) return 'p-gold'
        else return ''
    }
    
    if(!toy || !toyReviews) return <div>Loading...</div>

    return <section className="toy-details-page">

    <Children toyId={toyId} />
    
    <div className="toy-details">
    <h2>Toy Details</h2>
    <div className="preview">
    <h3>{toy.name}</h3>
    <p className="toy-description">{utilService.makeLorem(25)}</p>
    <p>Price: <span className={price(toy.price)}>{toy.price}$</span></p>
    <p className={toy.inStock ? 'p-green-dark' : 'p-red'}>
        {toy.inStock ? 'In Stock' : 'Out Of Stock'}
    </p>
    <div className="back-link">
    <Link to={'/toy'}>Back</Link>
    </div>
    </div>
    <ToyReviews toyReviews={toyReviews} toyId={toyId} loadToyReviews={loadToyReviews}/>
    
    </div>

  </section>
}