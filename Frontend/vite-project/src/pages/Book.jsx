import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CartContext from '../context/CartContext';

export default function Books() {
  const {addToCart}  = useContext(CartContext)
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/books')
      .then(res => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        const uniqueCategories = ['All', ...new Set(res.data.map(book => book.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = books;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchQuery, books]);

  const handleSort = (order) => {
    const sorted = [...filteredBooks].sort((a, b) => {
      return order === 'low' ? a.price - b.price : b.price - a.price;
    });
    setFilteredBooks(sorted);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r p-6">
  <h2 className="text-2xl font-semibold text-gray-700 mb-6">Filter by Category</h2>
  <ul className="space-y-4">
    {categories.map((cat, index) => (
      <li key={index}>
        <button
          onClick={() => setSelectedCategory(cat)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
            selectedCategory === cat
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-transparent text-gray-800 hover:bg-blue-100 hover:text-blue-700'
          }`}
        >
          {cat}
        </button>
      </li>
    ))}
  </ul>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            onChange={(e) => handleSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
         {filteredBooks.map(book => (
           <div
             key={book.id}
             className="bg-white rounded-2xl shadow-md hover:shadow-xl border transition-transform hover:-translate-y-1 duration-300"
           >
             <img
               src={book.imageURL}
               alt={book.title}
               className="w-full h-56 object-contain rounded-t-2xl mt-4 mb-3"
             />
             <div className="p-4 space-y-2">
               <h3 className="text-xl font-semibold text-gray-800 truncate">{book.title}</h3>
               <p className="text-sm text-gray-500">By {book.author}</p>
               <p className="text-sm text-gray-600 line-clamp-2">
                 {book.description}
               </p>
       
               <div className="flex justify-between text-xs text-gray-500 pt-2">
                 <span className="font-medium">📚 {book.category}</span>
                 <span className={`font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                   {book.stock > 0 ? `In stock: ${book.stock}` : 'Out of stock'}
                 </span>
               </div>
       
               <div className="flex justify-between items-center pt-4">
                 <span className="text-blue-600 font-bold text-lg">₹{book.price}</span>
                 <button
                   onClick={() =>addToCart(book.id)}
                   disabled={book.stock === 0}
                   className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                     book.stock > 0
                       ? 'bg-blue-500 text-white hover:bg-blue-600'
                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                   }`}
                 >
                   Add to Cart
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
       
        ) : (
          <p className="text-gray-600 text-center mt-20 text-lg">No books found.</p>
        )}
      </main>
    </div>
  );
}
