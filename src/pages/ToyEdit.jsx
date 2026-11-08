import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"

import { saveToy } from "../store/actions/toy.action"
import { loadReviews } from "../store/actions/review.action.js"

import { toyService } from "../services/toy.service.api"
import { reviewService } from "../services/review.service.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyEdit(){
    
    const [ toy,setToy ] = useState(toyService.getEmptyToy())
    const [ details,setDetails ] = useState({})
    
    const { toyId } = useParams()
    const navigate = useNavigate()
    
        useEffect(()=>{
          if(toyId) loadToy(toyId)
        },[])
    
        async function loadToy(toyId){
            const toy = await toyService.getById(toyId)
            setToy(toy)
            setDetails({name:toy.name,price:toy.price})
        }

        async function loadToyReviews() {
            const filterBy = reviewService.getDefultFilter() 
            filterBy.byToyId = toyId
            const reviews = await loadReviews(filterBy)
            setUserReviews(reviews)
        }
    
        async function onSubmit(ev){
            ev.preventDefault()
            if(!toy) return 
            if(!details.name && !toy._id) return (alert('must have name'))
            toy.name=details.name || toy.name
            toy.price=details.price || toy.price
            try{
            await saveToy(toy)  
            showSuccessMsg('Toy Update!')
            navigate('/toy')
            }
            catch (err) {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
                throw err  
            }
        }

    function handleDetails({target}){
        const field = target.name
        const value = target.value

        switch(target.type){
        case'number':
        +value
        break
        }

        setDetails( prev=>({ ...prev , [field]:value}))
    }

    return <section className="toy-edit">
    <h2>{toy._id ? 'Edit Toy' : 'Add Toy'}</h2>
     
    <form className="edit-form" onSubmit={onSubmit}>
    <input type="text" name="name" onChange={handleDetails} value={details.name} placeholder="Enter name"/>
    <input type="number" name="price" onChange={handleDetails} value={details.price} placeholder="Enter price" />

    <button>{toy._id ? 'Update' : 'Add' }</button>
    <div className="back-link">
    <Link to={'/toy'}>Back</Link>
    </div>
    </form>
    
    </section>
}