import { Box, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { SideBar, TopBar } from "components";

function AppLayout() {
  const menuDisclosure = useDisclosure();
  const [isSidebarFold, setSidebarFold] = useState<boolean>(false);
  const handleSidebarToggle = () => {
    setSidebarFold(!isSidebarFold);
  };

  return (
    <Box bg="gray.200" minH="100vh">
      <SideBar
        isMenuOpen={menuDisclosure.isOpen}
        isSidebarFold={isSidebarFold}
        onMenuClose={menuDisclosure.onClose}
        onSideBarToggle={handleSidebarToggle}
      />
      <Box
        as={motion.div}
        initial={{ marginLeft: 0 }}
        animate={{
          marginLeft: isSidebarFold ? "72px" : "240px",
        }}
        overflow="hidden"
        pt="64px"
      >
        <TopBar onMenuClick={menuDisclosure.onOpen} />
        <Box
          as="main"
          height="calc(100vh - 64px)"
          id="main"
          overflowY="scroll"
          pl="22px"
          pr={2}
          py={5}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
