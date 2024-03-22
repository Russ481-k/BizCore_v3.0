import {
  Collapse,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

interface CumulativePlanVsActualPerformanceProps {}

const defaultProps = {};

function CumulativePlanVsActualPerformance({
  ...props
}: CumulativePlanVsActualPerformanceProps & FlexProps) {
  const {
    isOpen: isCumulativePlanVsActualPerformanceOpen,
    onToggle: onCumulativePlanVsActualPerformanceToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onCumulativePlanVsActualPerformanceToggle}
      >
        <Heading size="sm">누적 계획대비 실적</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isCumulativePlanVsActualPerformanceOpen
              ? "rotate(0deg)"
              : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isCumulativePlanVsActualPerformanceOpen}>
        <Flex flexDirection="column" gap={4}></Flex>
      </Collapse>
    </Section>
  );
}

CumulativePlanVsActualPerformance.defaultProps = defaultProps;

export default CumulativePlanVsActualPerformance;
