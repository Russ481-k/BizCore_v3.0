import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Section, TipText } from "components";
import Buttons from "type/Buttons";

interface PreviewPanelProps {
  buttons?: Array<Buttons>;
  messageContents: string | null;
}

const defaultProps = {
  buttons: [],
  messageContents: "",
};
function PreviewPanel({ buttons, messageContents }: PreviewPanelProps) {
  return (
    <Section
      flexDirection="column"
      height="480px"
      justifyContent="center"
      position="sticky"
      top="0px"
      width="300px"
    >
      <Heading size="sm">미리보기</Heading>
      <Divider />
      <Box overflowY="hidden" height="400px">
        <Box
          backgroundImage={""}
          backgroundRepeat="no-repeat"
          backgroundSize="274px"
          height="450px"
          overflowY="hidden"
          pb="20px"
        >
          <Box
            height="350px"
            mx="auto"
            my={12}
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
            {messageContents ? (
              <>
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
                <Box
                  backgroundColor="channel.kkt.bg"
                  borderRadius="12px"
                  color="channel.kkt.text"
                  mx={8}
                  overflow="hidden"
                  p={3}
                  width="220px"
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
                            <Box
                              bgColor="white"
                              borderRadius={12}
                              color="black"
                              p={3}
                              width="100%"
                            >
                              {button.name}
                            </Box>
                          </Box>
                        ))}
                    </>
                  )}
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
      <Divider />
      <TipText
        size="sm"
        text="수신자의 단말기 설정에 따라 다르게 보일 수 있습니다."
      />
    </Section>
  );
}

PreviewPanel.defaultProps = defaultProps;

export default React.memo(PreviewPanel);
