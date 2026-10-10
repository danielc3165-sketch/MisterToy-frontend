import { useState } from "react"

import { useSelector } from "react-redux"

import { ToyList } from "../cmps/ToyList.jsx"

import { toyService } from "../services/toy.storage.js"

export function ToyIndex(){
    
    const toys = useSelector(storeState => storeState.toyModule.toys) 
    console.log('toys',toys)
    
    if(!toys) return
    
    return <section>
    <h2>ToyIndex</h2>
    <div>
    <button className="add-btn">Add Toy</button>
    <ToyList toys={toys}/>
    </div>
    </section>
}