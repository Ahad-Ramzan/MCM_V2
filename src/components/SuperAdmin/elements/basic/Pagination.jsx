'use client'
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <ul
      className="pagination"
      style={{
        display: 'flex',
        listStyle: 'none',
        gap: '8px',
        padding: '10px 0',
        justifyContent: 'center',
      }}
    >
      {/* Previous Button */}
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          //   style={{
          //     color: '#000',
          //     fontSize: '14px',
          //     padding: '5px 10px',
          //     borderRadius: '4px',
          //     border: '1px solid #ccc',
          //     backgroundColor: '#fff',
          //     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          //   }}
        >
          Previous
        </button>
      </li>

      {/* Page Numbers */}
      {getPages().map((page) => (
        <li key={page}>
          <button
            onClick={() => onPageChange(page)}
            style={{
              fontWeight: page === currentPage ? 'bold' : 'normal',
              backgroundColor: page === currentPage ? '#ddd' : '#fff',
              padding: '5px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#000',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        </li>
      ))}

      {/* Next Button */}
      <li>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          //   style={{
          //     color: '#000',
          //     fontSize: '14px',
          //     padding: '5px 10px',
          //     borderRadius: '4px',
          //     border: '1px solid #ccc',
          //     backgroundColor: '#fff',
          //     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          //   }}
        >
          Next
        </button>
      </li>
    </ul>
  )
}

export default Pagination
