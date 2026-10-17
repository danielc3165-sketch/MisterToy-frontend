import { useState, useEffect } from "react"

import { toyService } from "../services/toy.service.api"

export function ToyFilter({ filterBy, setFilterBy }){
    
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const allLabels = toyService.getLabels()
    const [ isOn, setIsOn ] = useState(false)
        

    useEffect(()=>{
      setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: isOn }))
      
    },[isOn])

    useEffect(()=>{
       setFilterBy(filterByToEdit)
    },[filterByToEdit])

    

    function handleFilter({target}){
        var field = target.name
        var value = target.value
        
        if (target.type === 'select-multiple') {
        value = Array.from(target.selectedOptions, (option) => option.value || [])
    }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt,labels } = filterByToEdit

    return <section>
    <div className="search">
      <p>Search:</p> <input type="text" name='txt' value={txt} onChange={handleFilter}/>
      
      <div className="flex" >
        <input type="checkbox" checked = {isOn} name="inStock" onChange={()=>setIsOn(!isOn)} /> 
        <p>Only In Stock</p>
      </div>
      
      <select
          multiple
          name="labels"
          value={labels || []}
          onChange={handleFilter}
        >
          <option value="">Labels</option>
          <>
            {allLabels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </>
        </select>

    </div>

    <div className="sort">
        <p>Sort By:</p>
        <select name="sortBy" onChange={handleFilter}>
            <option value="createdAt">New</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
    </div>
    </section>
}