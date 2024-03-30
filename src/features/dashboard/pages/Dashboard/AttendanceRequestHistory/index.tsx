import {
  BoxProps,
  Collapse,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

function AttendanceRequestHistory({ ...props }: BoxProps) {
  const {
    isOpen: isAttendanceRequestHistoryOpen,
    onToggle: onAttendanceRequestHistoryToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onAttendanceRequestHistoryToggle}
      >
        <Heading size="sm">근태 요청 내역</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isAttendanceRequestHistoryOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isAttendanceRequestHistoryOpen}>
        <Flex gap={4}>
          <Flex flexDirection="column" minHeight="200px" width="40%">
            {/* <PieChartPanel data={[]} /> */}
          </Flex>
          <Flex flexDirection="column" minHeight="200px" width="60%">
            {/* <BarChartPanel data={[]} /> */}
          </Flex>
        </Flex>
      </Collapse>
    </Section>
  );
}

export default AttendanceRequestHistory;
