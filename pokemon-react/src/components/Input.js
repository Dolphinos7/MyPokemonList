import React from "react";

const Input = ({ label }) => {
  return (
    <div className="form-floating my-2">
      <input id="username" className="form-control" placeholder={label} />
      <label htmlFor="username">{label}</label>
    </div>
  );
};

export default Input;
