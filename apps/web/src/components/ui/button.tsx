import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-sm font-medium transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-base",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-accent text-accent-fg",
          "hover:bg-accent-bright",
          "active:scale-[0.97]",
        ],
        secondary: [
          "bg-surface-2 text-text-primary border border-border",
          "hover:bg-surface-3 hover:border-border-bright",
          "active:scale-[0.97]",
        ],
        ghost: [
          "text-text-secondary",
          "hover:bg-surface-2 hover:text-text-primary",
          "active:scale-[0.97]",
        ],
        destructive: [
          "bg-destructive/20 text-destructive border border-destructive/30",
          "hover:bg-destructive/30",
        ],
        link: [
          "text-accent underline-offset-4 hover:underline p-0 h-auto",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm",
        md: "h-9 px-4",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
