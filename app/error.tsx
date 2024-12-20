"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const ErrorBoundary = ({ error, retry }: { error: Error; retry: () => void }) => {
  return (
    <div>
      <h3>{error.message}</h3>

      <Button onClick={retry}>Retry</Button>
    </div>
  );
};

export default ErrorBoundary;
