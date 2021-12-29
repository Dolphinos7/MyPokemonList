import React, { useRef } from "react";

const Navform = ({ action }) => {
  const searchQuery = useRef(null);

  return (
    <form
      className="d-flex"
      onSubmit={(data) => {
        data.preventDefault();
        action(searchQuery.current.value);
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        ref={searchQuery}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default Navform;
