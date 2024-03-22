import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { TipText, CustomModal } from "components";

interface AutoTestModalProps {
  onClose: () => void;
}
function AutoTestModal({ onClose }: AutoTestModalProps) {
  //const handleChangeTelNumberButtonClick = (bizNumber: string) => {
  // changeTelNumber(
  //   {
  //     bizNumber,
  //   },
  //   {
  //     onError: (error) => {
  //       toast({
  //         render: () => (
  //           <ToastMessage title="양방향 발신번호 변경 오류" type="ERROR">
  //             <Text>
  //               양방향 발신번호 변경 중 알 수 없는 오류가 발생하였습니다
  //             </Text>
  //             <Text>
  //               양방향 발신번호 변경을 다시 진행 하세요. 본 오류가 계속
  //               발생하는 경우 시스템 관리자에게 문의하기 바랍니다.
  //             </Text>
  //           </ToastMessage>
  //         ),
  //       });
  //     },
  //     onSuccess: () => {
  //       toast({
  //         render: () => (
  //           <ToastMessage title="양방향 발신번호 변경 완료" type="SUCCESS">
  //             <Text>양방향 발신번호 변경을 완료하였습니다.</Text>
  //             <Text>
  //               메시지 내용을 확인하신 다음 수신 대상자를 선택하여 양방향
  //               메시지를 발송하세요.
  //             </Text>
  //           </ToastMessage>
  //         ),
  //         duration: 3000,
  //       });
  //       onClose();
  //       onReset();
  //     },
  //   }
  // );
  //};

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState<number>(0);

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomModal isOpen onClose={onClose}>
      <ModalContent minW="420px">
        <ModalHeader>자동안내 시나리오 테스트</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={3}>
            <TipText
              hasBg
              text={`등록된 자동안내 시나리오로 양방향 문자 발송 테스트를
                진행합니다.\n하단의 입력 상자에 보낼 문자 내용을 입력하세요.`}
            />
            <Flex
              backgroundColor="white"
              borderColor="gray.300"
              borderRadius="12px"
              borderWidth={1}
              flexDirection="column"
              gap={3}
              height="100%"
              p={3}
            >
              <HStack justifyContent="space-between" mx={8}>
                <Text fontSize="lg" fontWeight="bold">
                  경과시간 : {formatTime(count)}
                </Text>
                <Button size="sm" variant="secondaryBlue" onClick={resetTimer}>
                  초기화
                </Button>
              </HStack>
              <Box overflowY="hidden" height="540px">
                <Box
                  backgroundImage={""}
                  backgroundRepeat="no-repeat"
                  backgroundSize="274px"
                  height="450px"
                  overflowY="hidden"
                  pb="20px"
                >
                  <Box
                    height="370px"
                    mx="auto"
                    my={12}
                    overflowX="hidden"
                    overflowY="auto"
                    width="280px"
                  >
                    {true ? (
                      <>
                        <Box
                          // backgroundColor={
                          //   (channel === "SMS" && "channel.sms.bg") ||
                          //   (channel === "LMS" && "channel.lms.bg") ||
                          //   (channel === "MMS" && "channel.mms.bg") ||
                          //   "channel.sms.bg"
                          // }
                          // borderRadius="12px"
                          // color={
                          //   (channel === "SMS" && "channel.sms.text") ||
                          //   (channel === "LMS" && "channel.lms.text") ||
                          //   (channel === "MMS" && "channel.mms.text") ||
                          //   "channel.sms.text"
                          // }
                          mx={8}
                          overflow="hidden"
                          p={3}
                          width="230px"
                        >
                          {"test"?.split("\n").map((line, i) => (
                            <Text fontSize="14px" key={line + "-" + i}>
                              {line}
                              <br />
                            </Text>
                          ))}
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <Divider my={2} />
                <Flex px={1}>
                  <InputGroup size="sm">
                    <Input placeholder="전송 내용을 입력하세요." />
                    <InputRightElement width="50px">
                      <Button
                        borderLeftRadius={0}
                        borderRightRadius={6}
                        size="sm"
                        variant="primaryBlue"
                        width="50px"
                        onClick={() => {}}
                      >
                        전송
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                <Divider my={2} />
                <TipText
                  size="sm"
                  text="수신자의 단말기 설정에 따라 다르게 보일 수 있습니다."
                />
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}

export default AutoTestModal;
