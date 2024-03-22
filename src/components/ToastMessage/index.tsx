import {
  Box,
  CloseButton,
  Flex,
  StyleProps,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, ErrorIcon, SuccessIcon } from "components";

interface ToastProps {
  children: React.ReactNode;
  title: string;
  type: "SUCCESS" | "ERROR" | "DELETE";
}

function ToastMessage({
  children,
  title,
  type,
  ...props
}: ToastProps & StyleProps) {
  const toast = useToast();

  return (
    <Flex
      alignItems="start"
      backgroundColor="white"
      borderColor={
        (type === "SUCCESS" && "primary.500") ||
        (type === "ERROR" && "red.500") ||
        (type === "DELETE" && "gray.700") ||
        "black"
      }
      borderRadius="12px"
      borderWidth="1px 1px 4px 4px"
      justifyContent="space-between"
      maxWidth="400px"
      p="20px 16px 20px 20px"
      {...props}
    >
      {(type === "SUCCESS" && (
        <SuccessIcon boxSize="27px" fill="primary.500" mr={2} />
      )) ||
        (type === "ERROR" && (
          <ErrorIcon boxSize="27px" fill="red.500" mr={2} />
        )) ||
        (type === "DELETE" && (
          <DeleteIcon boxSize="27px" fill="gray.700" mr={2} />
        ))}
      <Flex alignItems="center">
        <Box>
          <Text color="black" fontSize="16px" fontWeight="600">
            {title}
          </Text>
          <Text fontSize="12px" fontWeight="400">
            {children}
          </Text>
        </Box>
        <CloseButton
          ml={2}
          sx={{ "&:hover": "unset", "&:active": "unset" }}
          onClick={() => toast.closeAll()}
        />
      </Flex>
    </Flex>
  );
}

export default ToastMessage;
