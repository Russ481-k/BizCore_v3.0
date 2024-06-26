import { Box, Flex, IconButton, TabPanel, TabPanels } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

import { CaretIcon, MenuIcon } from "components";
import { dummyMenuA } from "./MenusData/DummyMenuA";
import { dummyMenuB } from "./MenusData/DummyMenuB";
import { dummyMenuC } from "./MenusData/DummyMenuC";
import { dummyMenuD } from "./MenusData/DummyMenuD";
import MenuGroup from "./MenuGroup";
import Menu from "type/Menu";

interface SidebarContentProps {
  isFold: boolean;
  tabIndex?: number;
  onClose: () => void;
  onFold: () => void;
}

const defaultProps = {
  isFold: false,
  tabIndex: 0,
  onClose() {},
  onFold() {},
};

function SidebarContent({
  isFold,
  tabIndex,
  onClose,
  onFold,
  ...props
}: SidebarContentProps) {
  // const userAuthName = useAppSelector((state) => state.user.profile.authName);
  // const [rank, setRank] = useState<number>(0);

  const groupedMenus = useMemo(() => {
    let Menus: Menu[] = [];
    if (tabIndex === 0) {
      Menus = dummyMenuA;
    } else if (tabIndex === 1) {
      Menus = dummyMenuB;
    } else if (tabIndex === 2) {
      Menus = dummyMenuC;
    } else if (tabIndex === 3) {
      Menus = dummyMenuD;
    }

    const permissionMenus = Menus.map((menu) => {
      return {
        ...menu,
        useYN: menu.useYN,
      };
    });

    return (
      permissionMenus
        ?.filter((menu) => menu.groupMenuId === 0 && menu.useYN === "Y")
        .map((menu) => ({
          ...menu,
          menus: permissionMenus,
          // ?.filter(
          //   (submenu) =>
          //     menu.id === submenu.groupMenuId && submenu.useYN === "Y"
          // )
          // .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? []
    );
  }, [tabIndex]);

  // useEffect(() => {
  //   switch (userAuthName) {
  //     case "총괄 관리자":
  //       setRank(1);
  //       break;
  //     case "관리자":
  //       setRank(1);
  //       break;
  //     case "일반 관리자":
  //       setRank(0);
  //       break;
  //     default:
  //       setRank(0);
  //       break;
  //   }
  // }, [userAuthName]);

  return (
    <AnimatePresence>
      <Box
        animate={{
          width: isFold ? 72 : 240,
        }}
        as={motion.div}
        initial={{ width: 0 }}
        exit={{ width: 0 }}
        background="primary.700"
        borderColor="gray.300"
        borderRightWidth="1px"
        pt="64px"
        height="100%"
        overflow="hidden"
        position="fixed"
        left="0"
        top="0"
        zIndex={99}
        {...props}
      >
        <Box paddingTop="80px">
          <Flex
            animate={{
              backgroundColor: isFold ? "transparent" : "#302C7F",
              borderColor: isFold ? "transparent" : "#6e6ba5",
            }}
            as={motion.div}
            align="center"
            borderLeftRadius="12px"
            borderWidth="1px"
            h="54px"
            left="20px"
            right="-1px"
            position="absolute"
            pl={4}
            top="90px"
          >
            <Box
              color="white"
              fontSize="20"
              fontWeight="600"
              whiteSpace="nowrap"
            >
              {isFold ? (
                ""
              ) : (
                <TabPanels>
                  <TabPanel>업무관리</TabPanel>
                  <TabPanel>그룹웨어</TabPanel>
                  <TabPanel>회계관리</TabPanel>
                  <TabPanel>경영정보</TabPanel>
                </TabPanels>
              )}
            </Box>
            <IconButton
              animate={{
                height: isFold ? "40px" : "54px",
                borderRadius: isFold ? "12px" : "0",
                right: isFold ? "16px" : "-2px",
                top: isFold ? "7px" : "-1px",
              }}
              aria-label="menu fold button"
              as={motion.button}
              backgroundColor="primary.900"
              borderColor="primary.400"
              borderWidth="1px"
              color="gray.200"
              position="absolute"
              left="initial !important"
              width="40px"
              icon={isFold ? <MenuIcon /> : <CaretIcon direction="LEFT" />}
              _active={{
                backgroundColor: "primary.1000",
                color: "white",
              }}
              _hover={{
                backgroundColor: "primary.1100",
                color: "gray.100",
              }}
              onClick={onFold}
            />
          </Flex>
          <Flex
            aria-label="main menu navigation"
            as={motion.div}
            animate={{
              paddingLeft: isFold ? "0" : "2px",
              paddingRight: isFold ? "0" : "2px",
            }}
            direction="column"
            height={`calc(100vh - 140px)`}
            overflowY="scroll"
            sx={{
              "::-webkit-scrollbar-track": { background: "inherit" },
              "::-webkit-scrollbar-corner": {
                background: "rgba(0,0,0,0)",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#44418b",
                border: "4px solid #302c7f",
                borderRadius: "5rem",
                width: "14px",
              },
            }}
          >
            <TabPanels>
              <TabPanel pr={0}>
                {groupedMenus.map((menuItem) =>
                  menuItem.menus.length > 0 ? (
                    <MenuGroup
                      groupId={menuItem.id}
                      groupName={menuItem.name}
                      icon={menuItem.icon}
                      isFold={isFold}
                      key={`menu-${menuItem.id}`}
                      menus={menuItem.menus}
                      overflowY="scroll"
                      onMenuClose={onClose}
                    />
                  ) : null
                )}
              </TabPanel>
              <TabPanel>
                {groupedMenus.map((menuItem) =>
                  menuItem.menus.length > 0 ? (
                    <MenuGroup
                      groupId={menuItem.id}
                      groupName={menuItem.name}
                      icon={menuItem.icon}
                      isFold={isFold}
                      key={`menu-${menuItem.id}`}
                      menus={menuItem.menus}
                      onMenuClose={onClose}
                    />
                  ) : null
                )}
              </TabPanel>
              <TabPanel>
                {groupedMenus.map((menuItem) =>
                  menuItem.menus.length > 0 ? (
                    <MenuGroup
                      groupId={menuItem.id}
                      groupName={menuItem.name}
                      icon={menuItem.icon}
                      isFold={isFold}
                      key={`menu-${menuItem.id}`}
                      menus={menuItem.menus}
                      onMenuClose={onClose}
                    />
                  ) : null
                )}
              </TabPanel>
              <TabPanel>
                {groupedMenus.map((menuItem) =>
                  menuItem.menus.length > 0 ? (
                    <MenuGroup
                      groupId={menuItem.id}
                      groupName={menuItem.name}
                      icon={menuItem.icon}
                      isFold={isFold}
                      key={`menu-${menuItem.id}`}
                      menus={menuItem.menus}
                      onMenuClose={onClose}
                    />
                  ) : null
                )}
              </TabPanel>
            </TabPanels>
          </Flex>
        </Box>
      </Box>
    </AnimatePresence>
  );
}

SidebarContent.defaultProps = defaultProps;

export default SidebarContent;
