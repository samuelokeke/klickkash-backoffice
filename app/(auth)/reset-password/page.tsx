import React from "react";
import ForgotPasswordForm from "./form";

const ResetPassword = () => {
  return (
    <figure className="border rounded-lg px-6 py-8">
      <figcaption className="text-center mb-8">
        <h1 className="text-base font-bold mb-1">Reset Password</h1>
        <p className="text-sm">Let&apos;s help you get your password back</p>
      </figcaption>

      <ForgotPasswordForm />
    </figure>
  );
};

export default ResetPassword;
