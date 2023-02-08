import React ,{ Suspense} from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Customer from './pages/Customer'
import Engineer from './pages/Engineer'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import Admin from './pages/Admin'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route 
        exact
        path='/'
        element={<Suspense fallback={<div className='loader'></div>}>
         <Login/>
        </Suspense>}
        />

        <Route
        exact
        path='/unauthorized'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <Unauthorized/>
          </Suspense>
        }
        />
        <Route
        exact
        path='/admin'
        element={
          <Suspense fallback={<div className='loader'></div>}>
           <Admin/>
          </Suspense>
        }
        />
        <Route
        exact
        path='/customer'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <Customer/>
          </Suspense>
        }
        />
        <Route
        exact
        path='/engineer'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <Engineer/>
          </Suspense>
        }
        />
        <Route
        exact
        path='/*'
        element={
          <Suspense fallback={<div className='loader'></div>}>
            <NotFound/>
          </Suspense>
        }
        />
      </Routes>
    </Router>
  )
}
