import { Flex, FlexProps, Text } from "@chakra-ui/react";

import TipIcon from "components/Icons/TipIcon";
import { ReactNode } from "react";

interface TipTextProps {
  children?: ReactNode;
  size?: string;
  text?: string | ReactNode;
  hasBg?: boolean;
}

function TipText({
  children,
  size,
  text,
  hasBg,
  ...props
}: TipTextProps & FlexProps) {
  return (
    <Flex
      align="flex-start"
      bgColor={hasBg ? "gray.100" : "transparent"}
      borderRadius={hasBg ? "xl" : 0}
      color="gray.700"
      fontSize={size === "sm" ? "xs" : "sm"}
      fontWeight={size === "sm" ? "400" : "400"}
      lineHeight={size === "sm" ? "1.25rem" : "1.5rem"}
      px={hasBg ? 3 : 0}
      py={hasBg ? 3 : 0}
      whiteSpace="pre-line"
      wordBreak="keep-all"
      {...props}
    >
      <TipIcon
        boxSize={size === "sm" ? 4 : 5}
        color="primary.700"
        h={size === "sm" ? "18px" : 5}
        mr={1}
      />
      <>
        {text ? (
          <Text
            fontSize={size === "sm" ? "0.75rem" : "0.875rem"}
            lineHeight={size === "sm" ? "short" : "base"}
          >
            {text}
          </Text>
        ) : (
          children
        )}
      </>
    </Flex>
  );
}

export default TipText;
