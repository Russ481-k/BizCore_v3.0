import {
  Collapse,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

interface MonthlyPlanVsActualPerformanceProps {}

const defaultProps = {};

function MonthlyPlanVsActualPerformance({
  ...props
}: MonthlyPlanVsActualPerformanceProps & FlexProps) {
  const {
    isOpen: isMonthlyPlanVsActualPerformanceOpen,
    onToggle: onMonthlyPlanVsActualPerformanceToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onMonthlyPlanVsActualPerformanceToggle}
      >
        <Heading size="sm">월 계획대비 실적</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isMonthlyPlanVsActualPerformanceOpen
              ? "rotate(0deg)"
              : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isMonthlyPlanVsActualPerformanceOpen}>
        <Flex flexDirection="column" gap={4}></Flex>
      </Collapse>
    </Section>
  );
}

MonthlyPlanVsActualPerformance.defaultProps = defaultProps;

export default MonthlyPlanVsActualPerformance;
