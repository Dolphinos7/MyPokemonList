import React from "react";
import CreateAccount from "../components/CreateAccount";

const Signup = () => {
  return (
    <div className="d-flex container-fluid flex-column justify-content-center align-items-center">
      <h1 className="d-flex">Create An Account</h1>
      <a href="/signin">Already have an account? Sign In</a>
      <CreateAccount />
    </div>
  );
};

export default Signup;
