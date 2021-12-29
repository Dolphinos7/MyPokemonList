const Pagination = ({ curPage, goToPage, maxPages }) => {
  const roundUp = (num) => {
    let toReturn = num;
    if (toReturn > parseInt(num)) {
      toReturn = parseInt(num + 1);
    } else {
      toReturn = parseInt(num);
    }
    return toReturn;
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {curPage < 2 ? (
            <li className="disabled page-item">
              <button className="page-link">Previous</button>
            </li>
          ) : (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => goToPage(curPage - 1)}
              >
                Previous
              </button>
            </li>
          )}

          {curPage > 2 && (
            <li className="page-item">
              <button
                onClick={() => goToPage(curPage - 2)}
                className="page-link"
              >
                {curPage - 2}
              </button>
            </li>
          )}
          {curPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => goToPage(curPage - 1)}
              >
                {curPage - 1}
              </button>
            </li>
          )}
          <li className="active page-item">
            <button className="page-link">{curPage}</button>
          </li>
          <li className="page-item" aria-current="page">
            {curPage < maxPages && (
              <button
                className="page-link"
                onClick={() => goToPage(curPage + 1)}
              >
                {curPage + 1}
              </button>
            )}
          </li>
          <li className="page-item">
            {curPage < maxPages - 1 && (
              <button
                className="page-link"
                onClick={() => goToPage(curPage + 2)}
              >
                {curPage + 2}
              </button>
            )}
          </li>
          {curPage >= maxPages ? (
            <li className="disabled page-item">
              <button className="page-link">Next</button>
            </li>
          ) : (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => goToPage(curPage + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div className="form-floating">
        <input
          id="pageJump"
          className="form-control"
          placeholder="1"
          onChange={(event) => {
            const value = event.target.valueAsNumber;
            if (value > 0 && value <= roundUp(maxPages)) {
              goToPage(value);
            }
          }}
          type="number"
        />
        <label htmlFor="pageJump">
          Jump to a page (1 - {roundUp(maxPages)})
        </label>
      </div>
    </div>
  );
};

export default Pagination;
