import React from "react";
import Navtext from "./Navtext";
const NavtextSignout = () => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/";
        alert("Signed Out");
      }}
    >
      <Navtext text="Sign Out" route="/" enabled={true} />
    </div>
  );
};

export default NavtextSignout;
