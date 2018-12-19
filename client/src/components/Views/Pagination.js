import React from 'react';
import PaginationElement from './utils/PaginationElement';

const Pagination= (props) => {
  const { pageCount } = props;
  const pageArr = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArr.push(i);
  };
  const display = Object.keys(pageArr).map(page => <PaginationElement key={page} pageNumber={pageArr[page]} />);
  return (
      <nav>
        <ul className="pagination">
          {display}
        </ul>
      </nav>
  );
};

export default Pagination;
