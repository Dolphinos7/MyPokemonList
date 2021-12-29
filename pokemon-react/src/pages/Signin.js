import React from "react";
import SigninAccount from "../components/SigninAccount";

const Signin = () => {
  return (
    <div className="d-flex container-fluid flex-column justify-content-center align-items-center">
      <h1 className="d-flex">Sign Into Existing Account</h1>
      <a href="/signup">Dont have an account? Sign up</a>

      <SigninAccount />
    </div>
  );
};

export default Signin;
