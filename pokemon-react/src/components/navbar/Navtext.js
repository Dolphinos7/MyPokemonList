import React from "react";

const Navtext = ({text, route, enabled}) => {
  const classes = enabled ? "nav-link active" : "nav-link disabled";
  return (
    <li className="nav-item">
      <a className={classes} aria-current="page" href={route}>
        {text}
      </a>
    </li>
  );
};

export default Navtext;
