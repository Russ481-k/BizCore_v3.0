import { Button, Flex, HStack, Radio, RadioGroup, TabPanel, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ChannelTag, InfoBox, InfoElement } from "components";
import { MessageImage, MessageTextarea } from "features/send";
import PreviewModal from "./PreviewModal";

interface GuideTabPanelProps {
  autoSend: string;
  messageText: string;
  messageImage: string;
  setAutoSend: React.Dispatch<React.SetStateAction<string>>;
}

function GuideTabPanel({ autoSend, messageText, messageImage, setAutoSend }: GuideTabPanelProps) {
  // ㅇㅋ 각자 하나씩 가질 state
  const [msgByteCurrent, setMsgByteCurrent] = useState<number>(0);
  const [msgChannel, setMsgChannel] = useState<string>("SMS");
  const [msgContext, setMsgContext] = useState<string>("");
  const [msgImgFiles, setMsgImgFiles] = useState<File[]>([]);
  const [msgImgURLs, setMsgImgURLs] = useState<string[]>([]);

  // 모달 - 미리보기
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const handlePreviewButtonClick = () => {
    setPreviewModalOpen(true);
  };

  // 미사용 / 사용
  const handleAutoSendChange = (value: string) => {
    setAutoSend(value);
  };

  useEffect(() => {
    let msgChannel = "SMS";
    if (msgImgFiles.length > 0) {
      msgChannel = "MMS";
      setMsgChannel(msgChannel);
    } else {
      if (msgByteCurrent > 90) {
        msgChannel = "LMS";
      } else {
        msgChannel = "SMS";
      }
    }
    setMsgChannel(msgChannel);
  }, [msgImgFiles, msgByteCurrent]);

  return (
    <TabPanel>
      <VStack align="stretch" spacing={3}>
        <InfoBox>
          <InfoElement label="안내 메시지 " labelWidth="190px">
            <RadioGroup
              flexShrink={0}
              me={2}
              value={autoSend}
              onChange={(v) => handleAutoSendChange(v)}
            >
              <HStack spacing={3}>
                <Radio colorScheme="primary" variant="button" value="unused">
                  미사용
                </Radio>
                <Radio colorScheme="primary" variant="button" value="used">
                  사용
                </Radio>
              </HStack>
            </RadioGroup>
          </InfoElement>
        </InfoBox>
        {autoSend === "used" && (
          <InfoBox>
            <InfoElement label="메시지 내용" labelWidth="190px" required>
              <VStack align="flex-start" spacing={2}>
                <Flex align="center" justify="space-between" w="100%">
                  <ChannelTag channelType={msgChannel} hasTooltip />
                  <Button variant="textGray" size="sm" onClick={handlePreviewButtonClick}>
                    미리보기
                  </Button>
                </Flex>
                <MessageTextarea
                  name={messageText}
                  // defaultValue={defaultValue}
                  // isDisabled={isDisabled}
                  byteCurrent={msgByteCurrent}
                  required
                  hasHelperText
                  useSpecialSymbol
                  setContext={setMsgContext}
                  setChannel={setMsgChannel}
                  setByteCurrent={setMsgByteCurrent}
                />
              </VStack>
            </InfoElement>
            <InfoElement label="이미지 첨부" labelWidth="190px">
              <MessageImage
                name={messageImage}
                // multiple
                imgUrls={msgImgURLs}
                imgFiles={msgImgFiles}
                setImgURLs={setMsgImgURLs}
                setImgFiles={setMsgImgFiles}
              />
            </InfoElement>
          </InfoBox>
        )}
        <PreviewModal
          channel={msgChannel}
          context={msgContext}
          imgURL={msgImgURLs[0]}
          isOpen={previewModalOpen}
          setModalOpen={setPreviewModalOpen}
        />
      </VStack>
    </TabPanel>
  );
}
export default React.memo(GuideTabPanel);
