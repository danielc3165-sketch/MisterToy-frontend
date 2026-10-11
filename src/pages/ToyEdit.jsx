import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"

import { saveToy } from "../store/actions/toy.action"

import { toyService } from "../services/toy.service.local"


export function ToyEdit(){
    
    const [ toy,setToy ] = useState({})
    const [ details,setDetails ] = useState({})
    
    const { toyId } = useParams()
    const navigate = useNavigate()
    
        useEffect(()=>{
          if(toyId) loadToy(toyId)
        },[])
    
        function loadToy(toyId){
            toyService.getById(toyId)
            .then(toy=>setToy(toy))
        }
    
        function onSubmit(ev){
            ev.preventDefault()
            if(!toy) return
            toy.name=details.name
            toy.price=details.price
            saveToy(toy)  
            .then(() => {
                //showSuccessMsg('toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                //showErrorMsg('Had issues in car details')  
            })
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

        console.log('details',details)
    }

    return <section>
    <h2>ToyEdit</h2>
     
    <form className="edit-form" onSubmit={onSubmit}>
    <input type="text" name="name" onChange={handleDetails} placeholder="Enter name"/>
    <input type="number" name="price" onChange={handleDetails} placeholder="Enter price" />

    <button>Update</button>
    <Link to={'/toy'}>Back</Link>
    </form>
    
    </section>
}