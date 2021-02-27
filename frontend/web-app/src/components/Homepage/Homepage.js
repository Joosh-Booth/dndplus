import React from "react";
import SignupForm from "@components/FormSignup"

const Homepage = () => {
  return (
    <div>
      <h1>DND PLUS</h1>
      <text>Username: </text> 
      <input></input>
      <text>Password: </text> 
      <input></input>
      <button>Sign up</button>
      <div>
        <SignupForm></SignupForm>
      </div>
      
    </div>
  );
};

export default Homepage;