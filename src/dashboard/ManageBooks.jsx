import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("https://setu-mern-server-1.onrender.com/all-books")
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
      .then(data => setAllBooks(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  // delete a book
  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://setu-mern-server.onrender.com/book/${id}`, {
      method: 'DELETE',
    })
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
      .then(data => {
        alert("Book deleted successfully!!");
        setAllBooks(allBooks.filter(book => book._id !== id));
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>
      {/* table for book data */}
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book, index) => (
            <Table.Body className="divide-y" key={book._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.bookTitle}
                </Table.Cell>
                <Table.Cell>{book.authorName}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>$10.00</Table.Cell>
                <Table.Cell>
                  <Link to={`/admin/dashboard/edit-books/${book._id}`} 
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(book._id)}
                    className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }
      </Table>
    </div>
  );
};

export default ManageBooks;