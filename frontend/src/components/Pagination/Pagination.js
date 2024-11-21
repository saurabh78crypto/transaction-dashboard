import React from "react";

const Pagination = React.memo(({ page, perPage, total, onNextPage, onPreviousPage }) => {
  return (
    <div className="pagination">
      <div className="page-info">
        <span>Page No. {page}</span>
      </div>
      <div className="page-controls">
        <button onClick={onPreviousPage} disabled={page === 1}>Previous</button> 
        <button onClick={onNextPage} disabled={page * perPage >= total}>Next</button>
      </div>
      <div>
        <span>Per Page: {perPage}</span>
      </div>
    </div>
  );
});

export default Pagination;
