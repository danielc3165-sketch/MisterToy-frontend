import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { ToyList } from "../cmps/ToyList.jsx"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { loadToys, saveToy } from "../store/actions/toy.action.js" 

// import { toyService } from "../services/toy.service.local.js"

export function ToyIndex(){
    
    const toys = useSelector(storeState => storeState.toyModule.toys) 
    console.log('toys',toys)
    
    useEffect(()=>{
      loadToys()
    },[])

    
    function onRemoveToy(toyId) {
        console.log('it work')
    }

    if(!toys) return
    
    return <section>
    <h1>ToyIndex</h1>
    <div>
    <Link to={'/toy/edit'}><button className="add-btn" >Add Toy</button></Link>
    <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
    </div>
    </section>
}