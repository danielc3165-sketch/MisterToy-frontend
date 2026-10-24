import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"

import { toyService } from "../services/toy.service.api.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { loadToys, removeToy } from "../store/actions/toy.action.js" 

import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useEffectUpdate } from "../hooks/useEffectUpdate.js" 

// import { toyService } from "../services/toy.service.local.js"

export function ToyIndex(){
    
    const toys = useSelector(storeState => storeState.toyModule.toys) 
    const [ filterBy,setFilterBy ] = useState(toyService.getDefaultFilter)
    const isOnline = useOnlineStatus() 

    useEffectUpdate(()=>{
       
      loadToys(filterBy)

    },[filterBy])

    
    async function onRemoveToy(toyId) {
        try{
        await removeToy(toyId)
            showSuccessMsg('Toy deleted')
        }
        catch (err) {
            showErrorMsg('Cannot delete toy')
            throw err
        }
    }

    if(!toys) return
    
    return <section>
    <div className="is-online">{isOnline ? 'You Are Online' : 'Net out of conect'}</div>
    <h1>Toy Store</h1>
    <ToyFilter filterBy={filterBy} setFilterBy={setFilterBy} />
    <div>
    <Link to={'/toy/edit'}><button className="add-btn" >Add Toy</button></Link>
    <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
    </div>
    </section>
}