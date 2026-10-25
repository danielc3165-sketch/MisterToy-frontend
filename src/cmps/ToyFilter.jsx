import { useState, useEffect, useRef } from "react"

import { toyService } from "../services/toy.service.api"
import { utilService } from "../services/util.service"

import { useConfirmTabClose } from "../hooks/useConfirmTabClose"
import { useEffectUpdate } from "../hooks/useEffectUpdate"

export function ToyFilter({ filterBy, onSetFilterBy }){
    
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const allLabels = toyService.getLabels()
    const [ onlyInStock, setOnlyInStock ] = useState(false)
    const [ hasChange,setHasChange ] = useState(false)
    
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetEditFilter))
    useConfirmTabClose(hasChange)


    useEffect(()=>{
      setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: onlyInStock }))
      
    },[onlyInStock])

    useEffectUpdate(()=>{
      
      debouncedOnSetFilter.current(filterByToEdit)
        
    },[filterByToEdit])

    function onSetEditFilter(filterByToEdit){
        onSetFilterBy(filterByToEdit)
    }

    function handleFilter({target}){
        setHasChange(true)

        var field = target.name
        var value = target.value
        
        if (target.type === 'select-multiple') {
        value = Array.from(target.selectedOptions, (option) => option.value || [])
    }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    if(!filterByToEdit) return
    console.log('f',filterByToEdit)
    const { txt,labels,sortBy } = filterByToEdit

    return <section>
    <div className="search">
      <p>Search:</p> <input type="text" name='txt' value={txt} onChange={handleFilter} placeholder="Text"/>
      
      <div className="flex" >
        <input type="checkbox" checked = {onlyInStock} name="inStock" onChange={(ev)=> {
          setOnlyInStock(!onlyInStock)
          setHasChange(true)
        }} /> 
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
        <select name="sortBy" value={sortBy} onChange={handleFilter}>
            <option value="createdAt">New</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
    </div>
    </section>
}