import { useState, useEffect, useRef } from "react"

import { toyService } from "../services/toy.service.api"
import { utilService } from "../services/util.service"

import { useConfirmTabClose } from "../hooks/useConfirmTabClose"

export function ToyFilter({ filterBy, setFilterBy }){
    
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const allLabels = toyService.getLabels()
    const [ onlyInStock, setOnlyInStock ] = useState(false)
    const [ hasChange,setHasChange ] = useState(false)
    
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetEditFilter))
    useConfirmTabClose(hasChange)


    useEffect(()=>{
      setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: onlyInStock }))
      
    },[onlyInStock])

    useEffect(()=>{
      
      debouncedOnSetFilter.current(filterByToEdit)
        
    },[filterByToEdit,setFilterBy])

    function onSetEditFilter(filterByToEdit){
        setFilterBy(filterByToEdit)
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

    const { txt,labels } = filterByToEdit

    return <section>
    <div className="search">
      <p>Search:</p> <input type="text" name='txt' value={txt} onChange={handleFilter}/>
      
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
        <select name="sortBy" onChange={handleFilter}>
            <option value="createdAt">New</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
    </div>
    </section>
}