import { Flex } from "@chakra-ui/react";
import Announcements from "./Announcements";
import AnnualPlanVsActualPerformance from "./AnnualPlanVsActualPerformance";
import ApprovalReviewHistory from "./ApprovalReviewHistory";
import AttendanceRequestHistory from "./AttendanceRequestHistory";
import ContractStatus from "./ContractStatus";
import CumulativePlanVsActualPerformance from "./CumulativePlanVsActualPerformance";
import CumulativeSalesbyMethodPerformance from "./CumulativeSalesbyMethodPerformance";
import MonthlyPlanVsActualPerformance from "./MonthlyPlanVsActualPerformance";
import SalesOpportunityStatus from "./SalesOpportunityStatus";
import SalesScheduleList from "./SalesScheduleList";

function Dashboard() {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      gap={2}
      overflow="hidden"
      width="100%"
    >
      <Flex gap={2}>
        <Flex gap={2} width="50%">
          <AnnualPlanVsActualPerformance width="75%" />
          <MonthlyPlanVsActualPerformance width="25%" />
        </Flex>
        <Flex gap={2} width="50%">
          <CumulativePlanVsActualPerformance width="25%" />
          <CumulativeSalesbyMethodPerformance width="75%" />
        </Flex>
      </Flex>
      <Flex gap={2}>
        <ApprovalReviewHistory width="50%" />
        <AttendanceRequestHistory width="50%" />
      </Flex>
      <Flex gap={2}>
        <SalesOpportunityStatus width="50%" />
        <SalesScheduleList width="50%" />
      </Flex>
      <Flex gap={2}>
        <ContractStatus width="50%" />
        <Announcements width="50%" />
      </Flex>
    </Flex>
  );
}

export default Dashboard;
