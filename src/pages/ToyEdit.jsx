import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"

import { saveToy } from "../store/actions/toy.action"

import { toyService } from "../services/toy.service.api"

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
        }
    
        async function onSubmit(ev){
            ev.preventDefault()
            if(!toy) return 
            if(!details.name) return (alert('must have name'))
            toy.name=details.name
            toy.price=details.price || 0
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

    return <section>
    <h1>{toy._id ? 'Edit Toy' : 'Add Toy'}</h1>
     
    <form className="edit-form" onSubmit={onSubmit}>
    <input type="text" name="name" onChange={handleDetails} placeholder="Enter name"/>
    <input type="number" name="price" onChange={handleDetails} placeholder="Enter price" />

    <button>{toy._id ? 'Update' : 'Add' }</button>
    <Link to={'/toy'}>Back</Link>
    </form>
    
    </section>
}