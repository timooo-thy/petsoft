"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icon from "./icon";

export default function Header() {
  const path = usePathname();
  const routes = [
    { name: "Dashboard", path: "/app/dashboard" },
    { name: "Account", path: "/app/account" },
  ];
  return (
    <header className="flex items-center justify-between border-b border-white/10 py-2">
      <Icon />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => {
            return (
              <li key={route.name}>
                <Link
                  href={route.path}
                  className={cn(
                    "text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition",
                    {
                      "bg-black/10 text-white": route.path === path,
                    }
                  )}
                >
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
