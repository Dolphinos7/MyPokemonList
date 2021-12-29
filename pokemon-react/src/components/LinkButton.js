import React from "react";

const LinkButton = ({ link, text }) => {
  return (
    <button
      type="button"
      onClick={() => (window.location.href = link)}
      className="btn-primary mx-1 px-3 py-1"
    >
      {text}
    </button>
  );
};

export default LinkButton;
