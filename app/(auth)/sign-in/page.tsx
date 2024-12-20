import React from "react";
import SignInForm from "./form";

const SignIn = () => {
  return (
    <figure className="border rounded-lg px-6 py-8">
      <figcaption className="text-center mb-8">
        <h1 className="text-base font-bold mb-1">Create an account with us today</h1>
        <p className="text-sm">Let’s get you all started</p>
      </figcaption>

      <SignInForm />
    </figure>
  );
};

export default SignIn;
