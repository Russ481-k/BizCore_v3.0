import { Box, Tabs, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { SideBar, TopBar } from "components";

function AppLayout() {
  const menuDisclosure = useDisclosure();
  const [isSidebarFold, setSidebarFold] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleSidebarToggle = () => {
    setSidebarFold(!isSidebarFold);
  };
  const handleTabIndexChanged = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    handleTabIndexChanged(tabIndex);
  }, [isSidebarFold, tabIndex]);

  return (
    <Box bg="gray.200" minH="100vh">
      <Tabs
        position="relative"
        variant="unstyled"
        onChange={(index) => handleTabIndexChanged(index)}
      >
        <SideBar
          tabIndex={tabIndex}
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
          <TopBar
            isFold={isSidebarFold}
            tabIndex={tabIndex}
            onMenuClick={menuDisclosure.onOpen}
          />
          <Box
            as="main"
            height="calc(100vh - 64px)"
            id="main"
            overflowY="scroll"
            pl={3}
            pr={0}
            py={3}
          >
            <Outlet />
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
}

export default AppLayout;
