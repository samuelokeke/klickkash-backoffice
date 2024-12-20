import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-2 pr-3 rounded border border-input bg-transparent focus-within:outline-none focus-within:ring-1 focus-within:ring-ring overflow-hidden",
        className
      )}
    >
      <input
        type={showPassword ? "text" : type}
        className={cn(
          "flex h-9 w-full bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />

      {showPassword ? (
        <EyeIcon onClick={() => setShowPassword(false)} />
      ) : (
        <EyeOffIcon onClick={() => setShowPassword(true)} />
      )}
    </div>
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
