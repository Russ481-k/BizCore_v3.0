import {
  Collapse,
  Divider,
  Flex,
  FlexProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

interface CumulativeSalesbyMethodPerformanceProps {}

const defaultProps = {};

function CumulativeSalesbyMethodPerformance({
  ...props
}: CumulativeSalesbyMethodPerformanceProps & FlexProps) {
  const {
    isOpen: isCumulativeSalesbyMethodPerformanceOpen,
    onToggle: onCumulativeSalesbyMethodPerformanceToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onCumulativeSalesbyMethodPerformanceToggle}
      >
        <Heading size="sm">누적 판매방식별 실적</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isCumulativeSalesbyMethodPerformanceOpen
              ? "rotate(0deg)"
              : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isCumulativeSalesbyMethodPerformanceOpen}>
        <Flex flexDirection="column" gap={4}></Flex>
      </Collapse>
    </Section>
  );
}

CumulativeSalesbyMethodPerformance.defaultProps = defaultProps;

export default CumulativeSalesbyMethodPerformance;
