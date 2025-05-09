import { useContext } from 'react';
import { Link } from 'react-router-dom';
import  AuthContext  from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="text-white text-2xl font-semibold">
          BookStore
        </Link>

        {/* Search bar (optional) */}
        {/* <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for books..."
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div> */}

        {/* Navbar links */}
        <div className="flex items-center space-x-4">
          {/* Home Link */}
          {/* <Link to="/home" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
            Home
          </Link> */}

          {/* Books Link */}
          <Link to="/books" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
            Books
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
            Cart
          </Link>

          {/* Profile Link (optional) */}
          {user && (
            <Link to="/profile" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
              Profile
            </Link>
          )}

          {/* Login/Signup or Logout */}
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
