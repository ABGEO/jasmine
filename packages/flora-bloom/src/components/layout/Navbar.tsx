import Link from "next/link";
import { usePathname } from 'next/navigation'

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import GrassIcon from '@mui/icons-material/Grass';

export default function Navbar() {
  const pathname = usePathname()

  return (
    <List component="nav">
      <ListItemButton
        selected={pathname === '/'}
        component={Link}
        href="/"
        passHref
      >
        <ListItemIcon>
          <GrassIcon />
        </ListItemIcon>
        <ListItemText primary="Plants" />
      </ListItemButton>
    </List>
  );
}
