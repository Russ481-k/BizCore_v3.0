import { Box, BoxProps } from "@chakra-ui/react";

interface InfoBoxProps {
  children: React.ReactNode;
  size?: string;
}

function InfoBox({ children, size, ...props }: InfoBoxProps & BoxProps) {
  return (
    <Box
      borderColor="gray.300"
      borderRadius="xl"
      borderWidth="1px"
      overflow="hidden"
      w="100%"
      position="relative"
      sx={{
        "*": {
          fontSize: size || "sm",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default InfoBox;
