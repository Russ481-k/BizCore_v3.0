import {
  Collapse,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

interface SendStatusByTodayProps {}

const defaultProps = {};

function SendStatusByToday({ ...props }: SendStatusByTodayProps & FlexProps) {
  const {
    isOpen: isSendStatusByTodayOpen,
    onToggle: onSendStatusByTodayToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onSendStatusByTodayToggle}
      >
        <Heading size="sm">당일 발송 현황</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isSendStatusByTodayOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isSendStatusByTodayOpen}>
        <Flex flexDirection="column" gap={4}></Flex>
      </Collapse>
    </Section>
  );
}

SendStatusByToday.defaultProps = defaultProps;

export default SendStatusByToday;
