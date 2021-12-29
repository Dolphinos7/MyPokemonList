import React from "react";
import api from "../apis";
import Input from "./Input";
import { encode as base64_encode } from "base-64";

const CreateAccount = () => {
  const createUser = async (username, password) => {
    console.log(username);
    console.log(password);
    try {
      const response = await fetch(`${api.flask}user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });
      const res = await response.json();

      if (res.message === "new user created!") {
        const loginResponse = await fetch(`${api.flask}login`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${base64_encode(username + ":" + password)}`,
          },
        });
        const loginResult = await loginResponse.json();
        localStorage.setItem("token", loginResult.token);
        window.location.href = "/";
        // alert("user successfully created and logged in");
      } else {
        alert("failed to create for some reason");
      }
    } catch (exception) {
      alert("failed to create user, probably server is just down");
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
