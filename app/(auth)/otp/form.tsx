"use client";

import React, { useState, useTransition } from "react";
import { verifyToken } from "./actions";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type OTPFormProps = Record<string, never>;

function OTPForm({}: OTPFormProps) {
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);

  const submitToken = async () => {
    const email = searchParams.get("email")!;

    startTransition(async () => {
      const result = await verifyToken({ email: email, token: value });

      setError(result);
    });
  };

  return (
    <>
      {error && <div className="flex justify-center p-4">{error?.message}</div>}

      <div className="grid place-content-center mb-4">
        <InputOTP maxLength={5} value={value} onChange={(value) => setValue(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button className="w-full bg-primary text-white" onClick={submitToken} disabled={value?.length !== 5 || pending}>
        {pending ? "Submitting" : "Continue"}
      </Button>
    </>
  );
}

export default OTPForm;
