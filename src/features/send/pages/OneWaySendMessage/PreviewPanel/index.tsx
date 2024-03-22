import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Section, TipText, WarningIcon } from "components";
import sendAvailableCount from "libs/availableCount";
import { useAppSelector } from "storage/redux/hooks";

interface PreviewPanelProps {
  channel?: string;
  imageURLs?: string[];
  isDisabled?: boolean;
  messageContents?: string | null;
  subjectCount: number;
}

const defaultProps = {
  channel: "SMS",
  imageURLs: [],
  isDisabled: true,
  messageContents: "",
  subjectCount: 0,
};

function PreviewPanel({
  channel,
  imageURLs,
  isDisabled,
  messageContents,
  subjectCount,
}: PreviewPanelProps) {
  const mySendData = useAppSelector((state) => state.user.sendData);
  const [isAvailableCount, setIsAvailableCount] = useState<number | null>(0);
  const [isAvailableSend, setIsAvailableSend] = useState<boolean>(false);

  useEffect(() => {
    setIsAvailableCount(sendAvailableCount.count(mySendData, channel ?? "SMS"));
    if (isAvailableCount === null || isAvailableCount >= subjectCount) {
      setIsAvailableSend(true);
    } else {
      setIsAvailableSend(false);
    }
  }, [
    mySendData,
    setIsAvailableCount,
    setIsAvailableSend,
    isAvailableCount,
    subjectCount,
    channel,
  ]);

  return (
    <Section
      flexDirection="column"
      height="740px"
      justifyContent="center"
      position="sticky"
      top="-8px"
      width="300px"
    >
      <Heading size="sm">미리보기</Heading>
      <Divider />
      <Box overflowY="hidden" height="700px">
        <Box
          backgroundImage={""}
          backgroundRepeat="no-repeat"
          backgroundSize="274px"
          height="500px"
          overflowY="hidden"
          pb="20px"
        >
          <Box
            height="400px"
            mx={4}
            my={12}
            p={0}
            overflowX="hidden"
            overflowY="auto"
            sx={{
              "::-webkit-scrollbar-track": { background: "white" },
              "::-webkit-scrollbar-thumb": {
                borderColor: "white",
              },
            }}
            width="240px"
          >
            {imageURLs?.map((url) => (
              <Box key={url} mx={8} overflow="hidden" p={3} width="190px">
                <Image alt="preview" height="auto" src={url} />
              </Box>
            ))}
            {messageContents ? (
              <Box
                backgroundColor={
                  (channel === "SMS" && "channel.sms.bg") ||
                  (channel === "LMS" && "channel.lms.bg") ||
                  (channel === "MMS" && "channel.mms.bg") ||
                  "channel.sms.bg"
                }
                borderRadius="12px"
                color={
                  (channel === "SMS" && "channel.sms.text") ||
                  (channel === "LMS" && "channel.lms.text") ||
                  (channel === "MMS" && "channel.mms.text") ||
                  "channel.sms.text"
                }
                mx={8}
                overflow="hidden"
                p={3}
                width="190px"
              >
                {messageContents?.split("\n").map((line, i) => (
                  <Text display="block" fontSize="14px" key={line + i}>
                    {line}
                  </Text>
                ))}
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
      <Flex>
        <Button
          as="label"
          htmlFor="template-save"
          isDisabled={isDisabled}
          variant="secondaryBlue"
          width="100%"
        >
          문자 템플릿 등록
        </Button>
      </Flex>
      <TipText
        size="sm"
        text="수신자의 단말기 설정에 따라 다르게 보일 수 있습니다."
      />
      {isAvailableSend ? (
        <Flex flexDirection="column" gap={3} p={4}>
          <Heading height="22px" size="sm">
            메시지 발송
          </Heading>
          <Flex flexDirection="column" gap={2} height="80px">
            <Button
              as="label"
              htmlFor="immediate-send"
              isDisabled={isDisabled}
              variant="primaryBlue"
              width="100%"
            >
              즉시 발송
            </Button>
            <Button
              as="label"
              htmlFor="reserved-send"
              isDisabled={isDisabled}
              variant="secondaryBlue"
              width="100%"
            >
              예약 발송
            </Button>
          </Flex>
        </Flex>
      ) : (
        !isAvailableSend && (
          <Flex
            backgroundColor="gray.100"
            borderRadius="12px"
            flexDirection="column"
            gap={3}
            p={4}
          >
            <Heading height="18px" size="sm">
              <WarningIcon color="red.500" mr={2} />
              {channel} 메시지 발송건 {subjectCount - (isAvailableCount ?? 0)}건
              부족
            </Heading>
            <Flex flexDirection="column" gap={1} height="80px">
              <Text fontSize="xs">등록 수신 대상자 수 : {subjectCount} 명</Text>
              <Text fontSize="xs">
                당월 잔여 {channel} 발송건 : {isAvailableCount}건
              </Text>
              <Text fontSize="xs">
                당월 {channel} 발송건이 부족하여 메시지를 발송할 수 없습니다.
              </Text>
              <Text fontSize="xs">
                관리자 (1500-1234)에게 문의하여 주시기 바랍니다.
              </Text>
            </Flex>
          </Flex>
        )
      )}
    </Section>
  );
}

PreviewPanel.defaultProps = defaultProps;

export default React.memo(PreviewPanel);
