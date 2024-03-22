import {
  BoxProps,
  Collapse,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import CaretIcon from "components/Icons/CaretIcon";

interface CollapseSectionProps {
  children: ReactNode;
  header?: ReactNode;
  headerTitle: string | ReactNode | null;
}

const defaultProps = {
  header: null,
  headerTitle: null,
};

function CollapseSection({
  children,
  header,
  headerTitle,
  ...props
}: CollapseSectionProps & BoxProps) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex
      backgroundColor="white"
      borderColor="gray.300"
      borderRadius="12px"
      borderWidth="1px"
      flexDirection="column"
      p={3}
      {...props}
    >
      <Flex justify="space-between">
        {!!header ? (
          header
        ) : (
          <Heading size="sm" color="gray.900">
            {headerTitle}
          </Heading>
        )}
        <CaretIcon
          color="gray.900"
          transform={isOpen ? "rotate(0deg)" : "rotate(180deg)"}
          transition=".15s"
          cursor="pointer"
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen}>
        <Divider borderColor="gray.400" my={2} />
        <Flex
          flexDirection="column"
          gap={2}
          sx={{
            "*": {
              "::-webkit-scrollbar-track": { background: "white" },
              "::-webkit-scrollbar-thumb": {
                borderColor: "white",
              },
            },
          }}
        >
          {children}
        </Flex>
      </Collapse>
    </Flex>
  );
}

CollapseSection.defaultProps = defaultProps;

export default CollapseSection;
