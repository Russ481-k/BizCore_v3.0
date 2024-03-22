import { Box, Divider, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

import preview from "assets/img/preview.png";
import { Section, TipText } from "components";

interface PreviewPanelProps {
  channel?: string;
  imageURLs?: string[];
  messageContents: string | null;
}

const defaultProps = {
  channel: "SMS",
  imageURLs: [],
  messageContents: "",
};

function PreviewPanel({
  channel,
  imageURLs,
  messageContents,
}: PreviewPanelProps) {
  return (
    <Section
      flexDirection="column"
      gap={3}
      height="560px"
      justifyContent="center"
      position="sticky"
      top="0px"
      width="300px"
    >
      <Heading size="sm">미리보기</Heading>
      <Divider />
      <Box overflowY="hidden" height="600px">
        <Box
          backgroundImage={preview}
          backgroundRepeat="no-repeat"
          backgroundSize="274px"
          height="480px"
          overflowY="hidden"
          pb="20px"
        >
          <Box
            height="400px"
            mx="auto"
            my={12}
            overflowX="hidden"
            overflowY="auto"
            width="290px"
          >
            {imageURLs?.map((url) => (
              <Box key={url} mx={8} overflow="hidden" p={3} width="230px">
                <Image alt="preview" height="auto" src={url} />
              </Box>
            ))}
            {messageContents ? (
              <>
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
                  width="220px"
                >
                  {messageContents?.split("\n").map((line, i) => (
                    <Text key={line + "-" + i} fontSize="14px">
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
