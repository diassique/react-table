import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginationStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const buttonStyle = (page: number) => ({
    cursor: 'pointer',
    padding: '5px 10px',
    margin: '0 5px',
    border: '1px solid #ddd',
    backgroundColor: currentPage === page ? '#007bff' : '#fff',
    color: currentPage === page ? '#fff' : '#000',
    borderRadius: '5px'
  });

  return (
    <div style={paginationStyle}>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          style={buttonStyle(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
