import { Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CustomCard, InputPanel } from "components";
import PreviewPanel from "./PreviewPanel";
import Buttons from "type/Buttons";

function OneWaySendAlarmTalk() {
  const methods = useForm({ mode: "onBlur" });

  const [buttons, setButtons] = useState<Array<Buttons>>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [templateMsgContext, setTemplateMsgContext] = useState<string | null>(
    null
  );

  const handleButtonsChange = (buttons: Array<Buttons>) => {
    setButtons(buttons);
  };
  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="알림톡 메시지 발송" />
      <Flex gap={3} width="100%">
        <FormProvider {...methods}>
          <InputPanel
            changeFile={[]}
            imageFiles={[]}
            isAlarmTalk={true}
            subjectPanel={true}
            onButtonsChange={handleButtonsChange}
            onContextChange={setTemplateMsgContext}
            onDisabled={setDisabled}
            onSubjectCountChange={setSubjectCount}
          />
          <PreviewPanel
            buttons={buttons}
            isAlarmTalk={true}
            isDisabled={isDisabled}
            messageContents={templateMsgContext}
            subjectCount={subjectCount}
          />
        </FormProvider>
      </Flex>
    </VStack>
  );
}

export default OneWaySendAlarmTalk;
