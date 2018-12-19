import React from 'react';

const PaginationElement = (props) => {
  const { pageNumber } = props;
  const url = `/students/${pageNumber}`;
  return (
          <li className="page-item">
            <a href={url} className="page-link">
              {pageNumber}
            </a>
          </li>
  );
};

export default PaginationElement;
