import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='bg-blue-600 border-t py-6 '>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <p className='text-white'>&copy; {new Date().getFullYear()} BookStore. All rights reserved</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#"className='text-white hover:text-white-600 transiton'>Privacy Policy</a>
            <a href="#"className='text-white hover:text-blue-600 transiton' >Terms & Service</a>
            <a href="#"className='text-white hover:text-blue-600 transiton' >Contact</a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer