import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { CaretIcon, MenuIcon } from "components";
import { useAppSelector } from "storage/redux/hooks";
import { dummyMenu } from "./DummyMenu";
import MenuGroup from "./MenuGroup";

interface SidebarContentProps {
  isFold: boolean;
  onClose: () => void;
  onFold: () => void;
}

const defaultProps = {
  isFold: false,
  onClose() {},
  onFold() {},
};

function SidebarContent({
  isFold,
  onClose,
  onFold,
  ...props
}: SidebarContentProps) {
  const userAuthName = useAppSelector((state) => state.user.profile.authName);
  const [rank, setRank] = useState<number>(0);

  const groupedMenus = useMemo(() => {
    const permissionMenus = dummyMenu?.map((menu) => {
      return {
        ...menu,
        useYN:
          (rank === 0 && menu.id === 6 && "N") ||
          (rank === 0 && menu.id === 13 && "N") ||
          menu.useYN,
      };
    });

    return (
      permissionMenus
        ?.filter((menu) => menu.groupMenuId === 0 && menu.useYN === "Y")
        .map((menu) => ({
          ...menu,
          menus: permissionMenus
            ?.filter(
              (submenu) =>
                menu.id === submenu.groupMenuId && submenu.useYN === "Y"
            )
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? []
    );
  }, [rank]);

  useEffect(() => {
    switch (userAuthName) {
      case "총괄 관리자":
        setRank(1);
        break;
      case "관리자":
        setRank(1);
        break;
      case "일반 관리자":
        setRank(0);
        break;
      default:
        setRank(0);
        break;
    }
  }, [userAuthName]);

  return (
    <AnimatePresence>
      <Box
        animate={{
          width: isFold ? 72 : 240,
        }}
        as={motion.div}
        initial={{ width: 0 }}
        exit={{ width: 0 }}
        background="gray.100"
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
        <Box paddingTop="130px">
          <Flex
            animate={{
              backgroundColor: isFold ? "transparent" : "white",
              borderColor: isFold
                ? "transparent"
                : "var(--chakra-colors-gray-300)",
            }}
            as={motion.div}
            align="center"
            borderLeftRadius="12px"
            borderWidth="1px"
            h="54px"
            left="20px"
            right="0"
            position="absolute"
            pl={4}
            top="104px"
          >
            <Text color="primary.700" fontWeight="600" whiteSpace="nowrap">
              {isFold ? "" : "통합 메시징 시스템"}
            </Text>
            <IconButton
              animate={{
                height: isFold ? "40px" : "54px",
                borderRadius: isFold ? "12px" : "0",
                right: isFold ? "16px" : "-2px",
                top: isFold ? "7px" : "-1px",
              }}
              aria-label="menu fold button"
              as={motion.button}
              backgroundColor="white"
              borderColor="gray.300"
              borderWidth="1px"
              color="gray.700"
              position="absolute"
              left="initial !important"
              width="40px"
              icon={isFold ? <MenuIcon /> : <CaretIcon direction="LEFT" />}
              _active={{
                backgroundColor: "primary.300",
                color: "primary.500",
              }}
              _hover={{
                backgroundColor: "primary.100",
                color: "primary.700",
              }}
              onClick={onFold}
            />
          </Flex>
          <Flex
            aria-label="main menu navigation"
            direction="column"
            as={motion.div}
            animate={{
              paddingLeft: isFold ? "16px" : "20px",
              paddingRight: isFold ? "16px" : "20px",
            }}
          >
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
          </Flex>
        </Box>
      </Box>
    </AnimatePresence>
  );
}

SidebarContent.defaultProps = defaultProps;

export default SidebarContent;
