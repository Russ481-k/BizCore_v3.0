import { Badge, Flex, Tab, TabList, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";

import { CustomCard } from "components";
import { KEYWORD } from "features/send";
import ConsultTabPanel from "./ConsultTabPanel";

function TwoWayConsult() {
  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader=" 상담 관리" />
      <CustomCard align="stretch" direction="column">
        <Tabs variant="enclosed">
          <TabList>
            <Tab minW="360px">
              <Flex align="center">
                <Text>{KEYWORD.STATUS_PROGRESS}</Text>
                {/* TODO: 갯수 상단바에도 적용해야함 */}
                <Badge ms={1} variant="ghostBlue">
                  6
                </Badge>
              </Flex>
            </Tab>
            <Tab minW="360px">{KEYWORD.STATUS_END}</Tab>
          </TabList>
          <TabPanels>
            <ConsultTabPanel csltStatus="p" />
            <ConsultTabPanel csltStatus="e" />
          </TabPanels>
        </Tabs>
      </CustomCard>
    </VStack>
  );
}

export default TwoWayConsult;
