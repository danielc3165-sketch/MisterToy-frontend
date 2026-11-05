import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { loadReviews } from "../store/actions/review.action.js"

import { toyService } from "../services/toy.service.api"
import { reviewService } from "../services/review.service.js"
import { utilService } from "../services/util.service"

import { Children  } from "../cmps/Children"

export function ToyDetails(){

    const [ toy,setToy ] = useState()
    const [ toyReviews, setToyReviews ] = useState(null)

    const { toyId } = useParams()

    useEffect(()=>{
      if(toyId) {
        loadToy(toyId)
        loadToyReviews()
      }
    },[])

    async function loadToy(toyId){
        const toyToSave = await toyService.getById(toyId)
        setToy(toyToSave)
    }

    async function loadToyReviews() {
            const filterBy = reviewService.getDefultFilter() 
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
    
    <Children toyId={toyId}/>
    </div>
    
    <div className="toy-reviews">
      <h3>Reviews</h3>
      {toyReviews && toyReviews.map(review => (
        <div key={review._id} className="review">
          <h4>{review.user?.fullName}</h4>
          <p>{review.txt}</p>
        </div>
      ))}
    </div>
  </section>
}