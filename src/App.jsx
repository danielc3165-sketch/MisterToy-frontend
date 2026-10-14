import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import { Home } from './pages/Home.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Map } from './pages/Map.jsx' 

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'



export function App() {
  return (
 
 <Router>
 
  <section>
    <AppHeader />
<main>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/toy' element={<ToyIndex />} />
    <Route path='/toy/edit'element={<ToyEdit />} />
    <Route path='/toy/edit/:toyId'element={<ToyEdit />} />
    <Route path='/toy/:toyId' element={<ToyDetails />} />
    <Route path='/login' element={<LoginSignup />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/map' element={<Map />} />
  </Routes>
  </main>

  <UserMsg />
  </section>
  
  </Router>
  
)
}


