import {
  BoxProps,
  Collapse,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { CaretIcon, Section } from "components";

function ApprovalReviewHistory({ ...props }: BoxProps) {
  const {
    isOpen: isApprovalReviewHistoryOpen,
    onToggle: onApprovalReviewHistoryToggle,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Section flexDirection="column" gap={2} {...props}>
      <Flex
        justifyContent="space-between"
        mr={2}
        cursor="pointer"
        onClick={onApprovalReviewHistoryToggle}
      >
        <Heading size="sm">결재 검토 내역</Heading>
        <CaretIcon
          color="gray.900"
          transform={
            isApprovalReviewHistoryOpen ? "rotate(0deg)" : "rotate(180deg)"
          }
          transition=".15s"
          cursor="pointer"
        />
      </Flex>
      <Divider />
      <Collapse in={isApprovalReviewHistoryOpen}>
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

export default ApprovalReviewHistory;
