import {Routes , Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './component/Navbar'
import Book from './pages/Book'
import Home from './component/Home'
import Footer from './component/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content (Routes) */}
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/books" element={<Book />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    
    </>
  )
}

export default App
