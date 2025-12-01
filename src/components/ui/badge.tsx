import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border-2 border-black px-3 py-1 text-xs font-bold transition-all shadow-neo hover:shadow-neo-md",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        joyful: "bg-mood-joyful text-black",
        calm: "bg-mood-calm text-black",
        sad: "bg-mood-sad text-white",
        angry: "bg-mood-angry text-white",
        anxious: "bg-mood-anxious text-black",
        neutral: "bg-mood-neutral text-black",
        yellow: "bg-yellow text-black",
        pink: "bg-pink text-white",
        cyan: "bg-cyan text-black",
        lime: "bg-lime text-black",
        purple: "bg-purple text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
