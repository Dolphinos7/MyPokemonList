import React from "react";
import api from "../apis";
import Input from "./Input";
import { encode as base64_encode } from "base-64";

const SigninAccount = () => {
  const createUser = async (username, password) => {
    try {
      const loginResponse = await fetch(`${api.flask}login`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64_encode(username + ":" + password)}`,
        },
      });
      const loginResult = await loginResponse.json();
      localStorage.setItem("token", loginResult.token);
      window.location.href = "/";
      // alert("User Successfully Logged In");
    } catch (exception) {
      alert("Failed To Log In, Check Sign In Information");
      console.log(exception);
    }
  };

  return (
    <div>
      <form
        className="d-flex flex-column"
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target[0].value;
          const password = e.target[1].value;

          if (!username || !password) {
            alert("enter both username and password");
            return;
          }
          console.log("calling createUser");
          createUser(username, password);
        }}
      >
        <Input label="username" />
        <Input label="password" />
        <button type="submit" className="my-2 btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SigninAccount;
