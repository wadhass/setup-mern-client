// import React, { useEffect, useState } from 'react'
// import { Card } from "flowbite-react";

// const Shop = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch("https://setu-mern-server.onrender.com")
//       .then(res => res.json())
//       .then(data => setBooks(data));
//   }, []);

//   return (
//     <div className='mt-28 px-4 lg:px-24'>
//       <h2 className='text-5xl font-bold text-center'>All books are here</h2>

//       {/* cards */}
//       <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1'>
//         {
//           books.map(book => 
//             <Card className="max-w-sm">
//               <img src={book.URL} alt="" />
//               <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                 <p>
//                 {book.bookTitle}
//                 </p>
//                 Noteworthy technology acquisitions 2025
//               </h5>
//               <p className="font-normal text-gray-700 dark:text-gray-400">
//                 Here are the biggest enterprise technology acquisitions of 2025 so far, in reverse chronological order.
//               </p>
//               <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy New</button>
//             </Card>
//           )
//         }
//       </div>
//     </div>
//   )
// }

// export default Shop;



import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://setu-mern-server.onrender.com/all-books")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Expected JSON, but got " + contentType);
        }
        return res.json();
      })
      .then(data => setBooks(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All books are here</h2>

      {/* cards */}
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1'>
        {
          books.map(book => 
            <Card key={book._id} className="max-w-sm">
              <img src={book.URL} alt={book.bookTitle} />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{book.bookTitle}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.bookDescription}
              </p>
              <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy New</button>
            </Card>
          )
        }
      </div>
    </div>
  );
}

export default Shop;