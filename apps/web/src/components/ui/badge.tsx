import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-text-secondary border border-border",
        accent: "bg-accent-muted text-accent-bright border border-accent/20",
        skill: "bg-[hsl(263_60%_25%)] text-[hsl(263_90%_78%)]",
        "claude-md": "bg-[hsl(202_60%_20%)] text-[hsl(199_89%_70%)]",
        hook: "bg-[hsl(152_40%_18%)] text-[hsl(152_65%_54%)]",
        command: "bg-[hsl(38_60%_18%)] text-[hsl(38_92%_58%)]",
        mcp: "bg-[hsl(0_40%_20%)] text-[hsl(0_72%_70%)]",
        success: "bg-success/15 text-success border border-success/20",
        warning: "bg-warning/15 text-warning border border-warning/20",
        destructive: "bg-destructive/15 text-destructive border border-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
