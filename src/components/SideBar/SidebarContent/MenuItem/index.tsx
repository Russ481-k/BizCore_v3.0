import { Flex, FlexProps } from "@chakra-ui/react";

import Menu from "type/Menu";
import MenuItemWrapper from "../MenuItemWrapper";

interface MenuItemProps {
  menuItem?: Menu;
  to?: string | null;
}

const defaultProps = {
  onClose() {},
};

function MenuItem({
  children,
  menuItem,
  to,
  ...props
}: MenuItemProps & FlexProps) {
  return (
    <MenuItemWrapper menuItem={menuItem} to={to}>
      <Flex borderRadius="12px" color="gray.800" cursor="pointer" {...props}>
        {children}
      </Flex>
    </MenuItemWrapper>
  );
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
