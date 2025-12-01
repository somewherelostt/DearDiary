import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-3 border-black active:translate-x-[3px] active:translate-y-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white shadow-neo hover:shadow-neo-md active:shadow-none",
        reverse:
          "bg-white text-black shadow-neo hover:shadow-neo-md active:shadow-none",
        neutral:
          "bg-gray-200 text-black shadow-neo hover:shadow-neo-md active:shadow-none",
        yellow:
          "bg-yellow text-black shadow-neo hover:shadow-neo-md active:shadow-none",
        pink: "bg-pink text-white shadow-neo hover:shadow-neo-md active:shadow-none",
        cyan: "bg-cyan text-black shadow-neo hover:shadow-neo-md active:shadow-none",
        lime: "bg-lime text-black shadow-neo hover:shadow-neo-md active:shadow-none",
        purple:
          "bg-purple text-white shadow-neo hover:shadow-neo-md active:shadow-none",
        destructive:
          "bg-destructive text-white shadow-neo hover:shadow-neo-md active:shadow-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border-none shadow-none",
        link: "text-primary underline-offset-4 hover:underline border-none shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
