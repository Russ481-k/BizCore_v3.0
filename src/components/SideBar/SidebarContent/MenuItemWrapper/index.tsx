import { PopoverTrigger } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Menu from "type/Menu";

interface MenuItemWrapperProps {
  children?: React.ReactNode;
  menuItem?: Menu;
  to?: string | null;
}

function MenuItemWrapper({ children, menuItem, to }: MenuItemWrapperProps) {
  return to ? (
    <NavLink
      to={to}
      state={{
        name: menuItem?.name,
      }}
      className="sidebar-nav-link"
    >
      {children}
    </NavLink>
  ) : (
    <PopoverTrigger>{children}</PopoverTrigger>
  );
}

export default MenuItemWrapper;
