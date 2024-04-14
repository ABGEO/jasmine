"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { IconLogout, IconPlant } from "@tabler/icons-react";

import classes from "./Navbar.module.css";

const data = [{ link: "/", label: "Plants", icon: IconPlant }];

export function Navbar() {
  const pathName = usePathname();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathName || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            signOut();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}
