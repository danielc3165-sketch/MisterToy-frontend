import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"

import { toyService } from "../services/toy.service.api.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { loadToys, removeToy } from "../store/actions/toy.action.js" 

import { }

// import { toyService } from "../services/toy.service.local.js"

export function ToyIndex(){
    
    const toys = useSelector(storeState => storeState.toyModule.toys) 
    const [filterBy,setFilterBy] = useState(toyService.getDefaultFilter)
    console.log('F',filterBy)


    useEffect(()=>{
      //console.log('filterBy',filterBy)  
      loadToys(filterBy)
    },[filterBy])

    
    function onRemoveToy(toyId) {
        removeToy(toyId)
        .then(()=>{
            showSuccessMsg('Toy deleted')
        })
        .catch(()=>{
            showErrorMsg('Cannot delete toy')
        })
    }

    if(!toys) return
    
    return <section>
    <h1>ToyIndex</h1>
    <ToyFilter filterBy={filterBy} setFilterBy={setFilterBy} />
    <div>
    <Link to={'/toy/edit'}><button className="add-btn" >Add Toy</button></Link>
    <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
    </div>
    </section>
}