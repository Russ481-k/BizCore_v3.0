import {
  Collapse,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

interface AnnualPlanVsActualPerformanceProps {}

const defaultProps = {};

function AnnualPlanVsActualPerformance({
  ...props
}: AnnualPlanVsActualPerformanceProps & FlexProps) {
  const {
    isOpen: isAnnualPlanVsActualPerformanceOpen,
    onToggle: onAnnualPlanVsActualPerformanceToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onAnnualPlanVsActualPerformanceToggle}
      >
        <Heading size="sm">연간 계획대비 실적</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isAnnualPlanVsActualPerformanceOpen
              ? "rotate(0deg)"
              : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isAnnualPlanVsActualPerformanceOpen}>
        <Flex flexDirection="column" gap={4}></Flex>
      </Collapse>
    </Section>
  );
}

AnnualPlanVsActualPerformance.defaultProps = defaultProps;

export default AnnualPlanVsActualPerformance;
