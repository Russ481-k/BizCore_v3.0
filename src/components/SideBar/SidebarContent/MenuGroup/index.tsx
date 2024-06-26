import {
  Box,
  Collapse,
  Flex,
  FlexProps,
  Popover,
  PopoverBody,
  PopoverContent,
  Portal,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ReactSVG } from "react-svg";

import { CaretIcon } from "components";
import Menu from "type/Menu";
import MenuItem from "../MenuItem";

interface MenuGroupProps extends FlexProps {
  groupId: number;
  groupName?: string;
  icon?: string | null;
  isFold: boolean;
  menus: Array<Menu>;
  onMenuClose: () => void;
}

const defaultProps = {
  isFold: false,
  onMenuClose() {},
};

function MenuGroup({
  groupId,
  groupName,
  icon,
  isFold,
  menus,
  onMenuClose,
}: MenuGroupProps) {
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose, onToggle } = useDisclosure();

  useOutsideClick({
    ref: currentRef,
    handler: () => {
      if (isOpen) {
        onClose();
      }
    },
  });

  return (
    <Box ref={currentRef} mb={1}>
      <Popover placement="right-start" gutter={20} isOpen={isOpen}>
        <MenuItem
          alignItems="center"
          backgroundColor={isOpen ? "primary.900" : "unset"}
          color="gray.500"
          display="flex"
          height={isFold ? "36px" : "46px"}
          justifyContent={isFold ? "center" : "space-between"}
          px={isFold ? 0 : 4}
          py={2}
          transition=".3s"
          _active={{
            backgroundColor: "primary.1100",
            color: "white",
          }}
          _hover={{
            backgroundColor: "primary.1000",
            color: "white",
          }}
          onClick={onToggle}
        >
          <Flex
            w="100%"
            align="center"
            justify={isFold ? "center" : "flex-start"}
            color={isOpen ? "white" : "unset"}
          >
            {icon ? (
              <Box w={5} h={5}>
                <ReactSVG src={icon} />
              </Box>
            ) : null}
            {!isFold && (
              <Text
                fontSize="md"
                fontWeight="500"
                ml={2}
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {groupName}
              </Text>
            )}
          </Flex>
          {!isFold && (
            <CaretIcon
              boxSize={4}
              color={isOpen ? "white" : "unset"}
              cursor="pointer"
              direction="DOWN"
              transform={isOpen ? "rotate(0deg)" : "rotate(180deg)"}
              transition=".05s"
            />
          )}
        </MenuItem>
        {isFold ? (
          <Portal>
            <PopoverContent
              width="200px"
              borderColor="primary.200"
              borderRadius="0.75rem"
              mt="-8px"
            >
              <PopoverBody px={5}>
                {menus
                  .filter((menuItem) => menuItem.groupMenuId === groupId)
                  .sort()
                  .map((menuItem) => (
                    <MenuItem
                      height="38px"
                      color="gray.700"
                      key={`menuItem-${menuItem.id}`}
                      menuItem={menuItem}
                      py={2}
                      to={menuItem.programPath}
                      _active={{
                        color: "primary.1100",
                        fontWeight: "700",
                      }}
                      _hover={{
                        color: "primary.1000",
                        fontWeight: "700",
                      }}
                      onClick={onMenuClose}
                    >
                      <Text fontSize="sm" fontWeight="500">
                        {menuItem.name}
                      </Text>
                    </MenuItem>
                  ))}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        ) : (
          <Collapse in={isOpen}>
            <Box mt={1} mb={2}>
              {menus
                .filter((menuItem) => menuItem.groupMenuId === groupId)
                .sort()
                .map((menuItem) => (
                  <MenuItem
                    color="gray.400"
                    height="38px"
                    key={`menuItem-${menuItem.groupMenuId}-${menuItem.id}`}
                    menuItem={menuItem}
                    mb={1}
                    pl="42px"
                    pr={4}
                    py={2}
                    to={menuItem.programPath}
                    _active={{
                      backgroundColor: "primary.1000",
                      color: "gray.200",
                      fontWeight: "700",
                    }}
                    _hover={{
                      backgroundColor: "primary.900",
                      color: "gray.300",
                      fontWeight: "700",
                    }}
                    onClick={onMenuClose}
                  >
                    <Text fontSize="sm" fontWeight="500">
                      {menuItem.name}
                    </Text>
                  </MenuItem>
                ))}
            </Box>
          </Collapse>
        )}
      </Popover>
    </Box>
  );
}

MenuGroup.defaultProps = defaultProps;

export default MenuGroup;
