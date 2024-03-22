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
import PieChartPanel from "../PieChartPanel";

function SalesScheduleList({ ...props }: BoxProps) {
  const {
    isOpen: isSalesScheduleListOpen,
    onToggle: onSalesScheduleListToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onSalesScheduleListToggle}
      >
        <Heading size="sm">영업일정 목록</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isSalesScheduleListOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isSalesScheduleListOpen}>
        <Flex gap={4}>
          <Flex flexDirection="column" minHeight="200px" width="40%">
            <PieChartPanel data={[]} />
          </Flex>
          <Flex flexDirection="column" minHeight="200px" width="60%">
            <BarChartPanel data={[]} />
          </Flex>
        </Flex>
      </Collapse>
    </Section>
  );
}

export default SalesScheduleList;
