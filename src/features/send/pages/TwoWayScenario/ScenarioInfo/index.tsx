import { Flex, Heading, Text } from "@chakra-ui/react";

import { CollapseSection, InfoBox, InfoElement } from "components";
import { format } from "date-fns";
import formatter from "libs/formatter";
import ScenarioGroup from "type/ScenarioGroup";

interface ScenarioInfoProps {
  scenario: ScenarioGroup;
}

function ScenarioInfo({ scenario }: ScenarioInfoProps) {
  return (
    <CollapseSection
      header={<Heading size="sm">자동안내 시나리오 정보</Heading>}
    >
      <InfoBox>
        <Flex>
          <InfoElement flex={1} label="양방향 발신번호">
            <Text> {formatter.contactFormatter(scenario?.bizNumber)}</Text>
          </InfoElement>
          <InfoElement flex={1} label="수정(등록)일시">
            <Text> {format(new Date(scenario.regDate), "yyyy-MM-dd")}</Text>
          </InfoElement>
        </Flex>
        <Flex>
          <InfoElement flex={1} label="등록자">
            <Text>{scenario.createUserName}</Text>
          </InfoElement>
          <InfoElement flex={1} label="수정자">
            <Text>{scenario.modifyUserName}</Text>
          </InfoElement>
        </Flex>
      </InfoBox>
    </CollapseSection>
  );
}

export default ScenarioInfo;
