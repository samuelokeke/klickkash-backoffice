import React, { Suspense } from "react";
import OTPForm from "./form";

const OTPVerification = () => {
  return (
    <figure className="border rounded-lg px-12 py-40">
      <figcaption className="text-center mb-8">
        <h1 className="text-base font-bold mb-1">Enter OTP</h1>
        <p className="text-sm">An OTP has been sent to your number 0813000****.</p>
      </figcaption>

      <Suspense>
        <OTPForm />
      </Suspense>
    </figure>
  );
};

export default OTPVerification;
