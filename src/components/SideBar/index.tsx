import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import SidebarContent from "./SidebarContent";

interface SideBarProps {
  isMenuOpen: boolean;
  isSidebarFold: boolean;
  onMenuClose: () => void;
  onSideBarToggle: () => void;
}

function SideBar({
  isMenuOpen,
  isSidebarFold,
  onMenuClose,
  onSideBarToggle,
}: SideBarProps) {
  return (
    <>
      <SidebarContent isFold={isSidebarFold} onFold={onSideBarToggle} />
      <Drawer isOpen={isMenuOpen} onClose={onMenuClose} placement="left">
        <DrawerOverlay />
        <DrawerContent maxWidth="240px">
          <SidebarContent onClose={onMenuClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
