import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef } from "react";

interface PreviewBoxProps {
  channelType: string;
  children: ReactNode;
}

function PreviewBox({
  channelType,
  children,
  ...props
}: PreviewBoxProps & BoxProps) {
  const previewBoxInnerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElement = previewBoxInnerRef.current;
    if (targetElement) {
      targetElement.scrollTo({
        top: targetElement.scrollHeight,
      });
    }
  }, [children]);
  return (
    <Flex direction="column" align="center">
      <Box
        bgColor={
          channelType ? `channel.${channelType.toLowerCase()}.bg` : "white"
        }
        bgImage={""}
        bgRepeat="no-repeat"
        bgSize="100% auto"
        borderTopRadius="1.6rem"
        h="405px"
        pt="48px"
        px="1rem"
        w="286px"
        {...props}
      >
        <Flex
          ref={previewBoxInnerRef}
          direction="column"
          h="100%"
          overflow="auto"
          px="0.5rem"
          py="0.5rem"
          sx={{
            "::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
            },
            "::-webkit-scrollbar-track": {
              bgColor: channelType
                ? `channel.${channelType.toLowerCase()}.bg`
                : "white",
            },
            "::-webkit-scrollbar-thumb": {
              bgColor: "gray.600",
              border: 0,
              borderRadius: "1rem",
              width: "14px",
            },
          }}
        >
          {children}
        </Flex>
      </Box>
      <Box bg="#5d5d5d" h="2px" w="320px" />
    </Flex>
  );
}
export default PreviewBox;
