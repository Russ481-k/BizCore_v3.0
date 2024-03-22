import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import {
  CustomModal,
  InfoBox,
  InfoElement,
  SuccessIcon,
  TipText,
} from "components";

interface ReplacementCodeInfoModalProps {
  setOpen: (isOpen: boolean) => void;
}
function ReplacementCodeInfoModal({ setOpen }: ReplacementCodeInfoModalProps) {
  const { onClose } = useDisclosure();

  const handleModalClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <CustomModal isOpen onClose={handleModalClose}>
      <ModalContent minW="640px">
        <ModalHeader>치환코드 사용안내</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={3} flexDirection="column">
            <TipText
              hasBg
              text={`작성한 메시지의 특정 부분 (이름 등)을 수신자에 맞게 변경하여 발송하는 서비스입니다.\n[*이름*], [*휴대폰번호*], [*전화번호*]와 함께 [*1*]~[*4*]의 치환코드를 사용할 수 있으며, 각각의 치환코드는 bytes 수가 지정되어 있습니다.`}
            />
            <InfoBox>
              <InfoElement label="#{이름}" labelWidth="160px">
                10bytes
              </InfoElement>
              <InfoElement label="#{휴대전화번호}" labelWidth="160px">
                13bytes
              </InfoElement>
              <InfoElement label="#{전화번호}" labelWidth="160px">
                13bytes
              </InfoElement>
              <InfoElement label="#{변수1}~#{변수4}" labelWidth="160px">
                <Flex flexDirection="column" my={3}>
                  <Text>
                    단문 (SMS): 10bytes, 장문 (LMS) / 멀티 (MMS): 100bytes
                  </Text>
                  <TipText
                    mt={2}
                    size="sm"
                    text={`지정된 bytes수 이상으로 치환코드값을 등록하여 문자
                        메시지를 발송할 수 있습니다. 단, 단문 (SMS)의 경우 지정된 bytes수 이상 사용에 따라 장문 (LMS)으로 발송될 수 있습니다.`}
                  />
                </Flex>
              </InfoElement>
            </InfoBox>
            <Text size="lg">
              <SuccessIcon color="primary.500" boxSize={4} mr={2} />
              치환코드 사용법
            </Text>
            <Divider borderColor="gray.400" />
            <Flex flexDirection="column" gap={2}>
              <Flex align="center">
                <Center
                  backgroundColor="primary.500"
                  borderRadius="100%"
                  color="white"
                  fontSize="xs"
                  height={5}
                  mr={1}
                  width={5}
                >
                  1
                </Center>
                <Text>치환코드 추가를 통해 메시지 내용 작성</Text>
              </Flex>
              <Textarea
                fontSize="12px"
                height="90px"
                mx={8}
                isDisabled
                value="#{이름} 님
#{변수1} #{변수2}에
납부하셔야 할 요금은 #{변수3} 원 입니다.
감사합니다."
                width="250px"
              />
              <Flex align="center">
                <Center
                  backgroundColor="primary.500"
                  borderRadius="100%"
                  color="white"
                  fontSize="xs"
                  height={5}
                  mr={1}
                  width={5}
                >
                  2
                </Center>
                <Text>
                  다음과 같이 엑셀 혹은 수신 대상자에 치환코드 값 등록
                </Text>
              </Flex>
              <Image
                mx={8}
                src={require("../../assets/img/ExcelExample.png")}
                alt="excel-example"
              />
              <Flex align="center">
                <Center
                  backgroundColor="primary.500"
                  borderRadius="100%"
                  color="white"
                  fontSize="xs"
                  height={5}
                  mr={1}
                  width={5}
                >
                  3
                </Center>
                <Text>실제 메시지 내용</Text>
              </Flex>
              <Box
                backgroundColor="channel.sms.bg"
                borderRadius="12px"
                color="channel.sms.text"
                mx={8}
                overflow="hidden"
                p={3}
                width="240px"
              >
                {"김남수 님\n12월 8일에\n납부하셔야 할 요금은 1,000 원 입니다.\n감사합니다."
                  ?.split("\n")
                  .map((line, i) => (
                    <Text key={line + i} fontSize="14px">
                      {line}
                      <br />
                    </Text>
                  ))}
                <Text></Text>
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
export default ReplacementCodeInfoModal;
