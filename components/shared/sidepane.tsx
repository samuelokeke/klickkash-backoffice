"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import routes from "@/app/routes";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { logout } from "@/app/actions/auth";
import { User } from "@/lib/types/user.type";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type SidePaneProps = {
  user: User;
};

const SidePane = ({ user }: SidePaneProps) => {
  const pathname = usePathname();

  const variants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid place-content-center mb-8">
        <Link href="/">
          <Image src="/logo.svg" className="h-16 w-auto" width={0} height={0} priority alt="logo" />
        </Link>
      </div>

      <nav className="mb-auto">
        <div className="mb-4">
          <Button variant="outline" className="w-full h-12 flex justify-start items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <p className="text-xs">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-muted-foreground">Welcome back</p>
            </div>
          </Button>
        </div>

        <ul className="flex flex-col items-stretch gap-4">
          {routes.map((route) => (
            <motion.li
              variants={variants}
              key={route.path}
              className="group border-bx"
              data-current={pathname === route.path}
            >
              <Link href={route.path} className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 grid place-content-center group-data-[current=true]:bg-primary group-hover:bg-primary rounded">
                  {pathname === route.path ? route.activeIcon : route.inactiveIcon}
                </div>

                <p className="text-sm text-gray-600 group-hover:text-gray-800">{route.name}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <Button className="h-12 flex items-center justify-center gap-2" onClick={() => logout()}>
        <LogOut className="text-red-500" />

        <p className="text-base text-red-500">Logout</p>
      </Button>
    </div>
  );
};

export default SidePane;
