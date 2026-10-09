import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

//import { AppHeader } from './cmps/AppHeader.js'

export function App() {
  return (
 
 <Router>
 
  <section>

  <Routes>
    <Route path='/toy' element={<ToyIndex />} />
    <Route path='/toy/edit/:toyId'element={<ToyEdit />} />
    <Route path='/toy/:toyId' element={<ToyDetails />} />
  </Routes>
  </section>
  
  </Router>
  
)
}


