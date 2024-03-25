import { Box, Button, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Section, TipText, WarningIcon } from "components";
import sendAvailableCount from "libs/availableCount";
import { useAppSelector } from "storage/redux/hooks";
import Buttons from "type/Buttons";

interface PreviewPanelProps {
  buttons?: Array<Buttons>;
  imageURLs?: string[];
  isAlarmTalk?: boolean;
  isDisabled?: boolean;
  messageContents?: string | null;
  subjectCount: number;
}

const defaultProps = {
  buttons: [],
  imageURLs: [],
  isDisabled: true,
  messageContents: "",
  subjectCount: 0,
};

function PreviewPanel({
  buttons,
  imageURLs,
  isAlarmTalk,
  isDisabled,
  messageContents,
  subjectCount,
}: PreviewPanelProps) {
  const mySendData = useAppSelector((state) => state.user.sendData);
  const [isAvailableCount, setIsAvailableCount] = useState<number | null>(null);
  const [isAvailableSend, setIsAvailableSend] = useState<boolean>(false);

  useEffect(() => {
    setIsAvailableCount(sendAvailableCount.count(mySendData, "KKT"));
    if (isAvailableCount === null || isAvailableCount >= subjectCount) {
      setIsAvailableSend(true);
    } else {
      setIsAvailableSend(false);
    }
  }, [mySendData, setIsAvailableCount, setIsAvailableSend, isAvailableCount, subjectCount]);

  return (
    <Section
      flexDirection="column"
      height="680px"
      justifyContent="center"
      position="sticky"
      top="-8px"
      width="300px"
    >
      <Heading size="sm">미리보기</Heading>
      <Divider />
      <Box overflowY="hidden" height="450px">
        <Box
          backgroundImage={""}
          backgroundRepeat="no-repeat"
          backgroundSize="274px"
          height="450px"
          overflowY="hidden"
          pb="20px"
        >
          <Flex
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
            width="280px"
          >
            <Flex flexDirection="column">
              <Flex alignItems="center" gap={2}>
                <Image
                  alt="BizCore-profile"
                  borderColor="gray.500"
                  borderRadius="12px"
                  borderWidth={1}
                  height="50px"
                  src={""}
                  width="50px"
                />
                <Text fontWeight={700}>모비톡</Text>
              </Flex>
              {imageURLs?.map((url) => (
                <Box key={url} mx={8} overflow="hidden" p={3} width="190px">
                  <Image alt="preview" height="auto" src={url} />
                </Box>
              ))}
              {messageContents ? (
                <Box
                  backgroundColor="channel.kkt.bg"
                  borderRadius="12px"
                  color="channel.kkt.text"
                  mx={8}
                  p={3}
                  width="190px"
                >
                  {messageContents?.split("\n").map((line, i) => (
                    <Text display="block" fontSize="14px" key={line + i}>
                      {line}
                    </Text>
                  ))}
                  {!!buttons?.[0]?.name?.length && (
                    <>
                      <Divider my={5} borderColor="channel.kkt.text" />
                      {buttons
                        ?.filter((button) => !!button.name?.length)
                        .map((button, i) => (
                          <Box
                            key={button.name + "-" + i}
                            mb={2}
                            overflow="hidden"
                            px={3}
                            width="100%"
                          >
                            <Box bgColor="white" borderRadius={12} color="black" p={3} width="100%">
                              {button.name}
                            </Box>
                          </Box>
                        ))}
                    </>
                  )}
                </Box>
              ) : (
                ""
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Divider />
      <TipText size="sm" text="수신자의 단말기 설정에 따라 다르게 보일 수 있습니다." />
      {isAvailableSend ? (
        <Flex flexDirection="column" gap={3}>
          <Heading height="22px" size="sm">
            알림톡
          </Heading>
          <Flex flexDirection="column" gap={2} height="80px">
            <Button
              as="label"
              htmlFor="immediate-send"
              isDisabled={isDisabled}
              variant="primaryBlue"
              width="100%"
            >
              즉시
            </Button>
            <Button
              as="label"
              htmlFor="reserved-send"
              isDisabled={isDisabled}
              variant="secondaryBlue"
              width="100%"
            >
              예약
            </Button>
          </Flex>
        </Flex>
      ) : (
        !isAvailableSend && (
          <Flex backgroundColor="gray.100" borderRadius="12px" flexDirection="column" gap={3} p={4}>
            <Heading height="18px" size="sm">
              <WarningIcon color="red.500" mr={2} />
              알림톡 전송건 {subjectCount - (isAvailableCount ?? 0)}건 부족
            </Heading>
            <Flex flexDirection="column" gap={1} height="80px">
              <Text fontSize="xs">등록 수신 대상자 수 : {subjectCount} 명</Text>
              <Text fontSize="xs">당월 잔여 알림톡 건 : {isAvailableCount}건</Text>
              <Text fontSize="xs">당월 알림톡 건이 부족하여 알림톡을 할 수 없습니다.</Text>
              <Text fontSize="xs">관리자 (1500-1234)에게 문의하여 주시기 바랍니다.</Text>
            </Flex>
          </Flex>
        )
      )}
    </Section>
  );
}

PreviewPanel.defaultProps = defaultProps;

export default React.memo(PreviewPanel);
