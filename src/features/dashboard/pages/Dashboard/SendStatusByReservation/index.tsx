import {
  BoxProps,
  Collapse,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";
import BarChartPanel from "../BarChartPanel";

function SendStatusByReservation({ ...props }: BoxProps) {
  const {
    isOpen: isSendStatusByReservationOpen,
    onToggle: onSendStatusByReservationToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onSendStatusByReservationToggle}
      >
        <Heading size="sm">예약 발송 현황</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isSendStatusByReservationOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isSendStatusByReservationOpen}>
        <Flex gap={4}>
          <Flex flexDirection="column" minHeight="200px" width="100%">
            <BarChartPanel data={[]} />
          </Flex>
        </Flex>
      </Collapse>
    </Section>
  );
}

export default SendStatusByReservation;
