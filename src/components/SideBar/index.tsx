import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import SideBarContent from "./SideBarContent";

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
      <SideBarContent isFold={isSidebarFold} onFold={onSideBarToggle} />
      <Drawer isOpen={isMenuOpen} onClose={onMenuClose} placement="left">
        <DrawerOverlay />
        <DrawerContent maxWidth="240px">
          <SideBarContent onClose={onMenuClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
