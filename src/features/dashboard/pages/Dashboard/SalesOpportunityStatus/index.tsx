import {
  BoxProps,
  Collapse,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

function SalesOpportunityStatus({ ...props }: BoxProps) {
  const {
    isOpen: isSalesOpportunityStatusOpen,
    onToggle: onSalesOpportunityStatusToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onSalesOpportunityStatusToggle}
      >
        <Heading size="sm">영업기회 현황</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isSalesOpportunityStatusOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isSalesOpportunityStatusOpen}>
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

export default SalesOpportunityStatus;
