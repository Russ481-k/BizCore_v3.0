import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { useCallback } from "react";

interface StatusTextProps {
  text: string;
  colorScheme?: "success" | "warning" | "danger";
}
function StatusText({
  text,
  colorScheme,
  ...props
}: StatusTextProps & FlexProps) {
  const handleColor = useCallback(() => {
    switch (colorScheme) {
      case "success":
        return "primary.700";
      case "warning":
        return "yellow.500";
      case "danger":
        return "red.500";
      default:
        return "gray.500";
    }
  }, [colorScheme]);
  return (
    <Flex align="center" fontSize="sm" {...props}>
      <Box
        as="span"
        display="block"
        w="7px"
        h="7px"
        borderRadius="full"
        bgColor={handleColor()}
      />
      <Text ml={1} color="gray.900">
        {text}
      </Text>
    </Flex>
  );
}

export default StatusText;
