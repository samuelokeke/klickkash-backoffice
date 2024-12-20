import React from "react";
import Link from "next/link";
import routes from "../routes";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

const SidePane = () => {
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
      <div className="py-2 mb-3">
        <h2 className="text-muted-foreground font-semibold uppercase text-sm">Settings menu</h2>
      </div>

      <nav className="mb-auto">
        <ul className="flex flex-col items-stretch gap-2">
          {routes.map((route) => (
            <motion.li variants={variants} key={route.path} className="group" data-current={pathname === route.path}>
              <Link
                href={route.path}
                className="flex items-center gap-2 py-1.5 px-2 bg-gray-50 group-data-[current=true]:bg-accent group-hover:bg-accent rounded-sm"
              >
                <p className="text-sm text-gray-600 group-data-[current=true]:text-primary group-hover:text-primary">
                  {route.name}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidePane;
