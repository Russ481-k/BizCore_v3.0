import { Flex } from "@chakra-ui/react";
import SendStatusByChannel from "./SendStatusByChannel";
import SendStatusByReservation from "./SendStatusByReservation";
import SendStatusByToday from "./SendStatusByToday";

function Dashboard() {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      gap={4}
      overflow="hidden"
      width="100%"
    >
      <SendStatusByToday />
      <SendStatusByChannel />
      <SendStatusByReservation />
    </Flex>
  );
}

export default Dashboard;
