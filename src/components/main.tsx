import { ReactNode } from "react";
import { cn } from "@/lib/tailwind-merge";

type MainProps = {
  children: ReactNode;
  className: string;
};

export function Main({ children, className }: MainProps) {
  return <main className={cn("max-w-screen-xl mx-auto p-4", className)}>{children}</main>;
}
