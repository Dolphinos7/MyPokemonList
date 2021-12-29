import React from "react";
import Navtext from "./Navtext";
import Navform from "./Navform";
import NavtextSignout from "./NavtextSignout";
const Navbar = ({ searchFunction }) => {
  return (
    <nav
      className="navbar navbar-expand-xl navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Pokemon List Maker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLight"
          aria-controls="navbarLight"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarLight">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            <Navtext text="Home" route="/" enabled={true} />
            {localStorage.getItem("token") ? (
              <Navtext text="Your Pokemon List" route="/list  " enabled={true} />
            ) : (
              <Navtext text="Sign In" route="/signin" enabled={true} />
            )}
            {localStorage.getItem("token") ? (
              <NavtextSignout />
            ) : (
              <Navtext text="Sign Up" route="/signup" enabled={true} />
            )}
          </ul>
          <Navform action={searchFunction} />
        </div>
      </div>
      /
    </nav>
  );
};

export default Navbar;
