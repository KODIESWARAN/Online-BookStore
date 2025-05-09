import React from 'react'
import {Link} from 'react-router-dom'
import { BookOpen, Flame, ShoppingCart } from 'lucide-react'; // or use react-icons

const Home = () => {
  return (
    <>
    <div className="bg-gray-50 min-h-screen">
        <section className='max-w-7xl mx-auto px-4 py-12'>
            <div className="text-center">
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to the BookStore</h1>
                <p className='text-lg text-gray-600 mb-8'>Discover your next favourite book from our vast collections</p>
                <Link to='/books' className='bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transiton'>Browse Book</Link>
            </div>
           
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <div className="">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Categories</h3>
            <p className="text-gray-600">
              Explore books by your favorite genres and categories.
            </p>
          </div>
            
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Flame className='w-6 h-6 text-blue-600'/>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Trending Titles</h3>
            <p className="text-gray-600">
              Check out the books everyone is talking about right now.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <ShoppingCart className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Checkout</h3>
            <p className="text-gray-600">
              Add books to your cart and checkout securely in just a few clicks.
            </p>
          </div>
        </div>
        </section> 
    </div>
    
    </>
  )
}

export default Home