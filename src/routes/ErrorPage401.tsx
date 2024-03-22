import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ErrorPage401() {
  const navigate = useNavigate();
  const handleGoBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Flex
      alignItems="center"
      bg="gray.50"
      justifyContent="center"
      minH="100vh"
      px={6}
      py={10}
    >
      <Box textAlign="center">
        <Heading
          backgroundClip="text"
          bgGradient="linear(to-r, blue.400, blue.600)"
          size="2xl"
        >
          401
        </Heading>
        <Text fontSize="18px" mt={3}>
          권한이 없습니다.
        </Text>
        <Text color="gray.500">웹 사이트에서 페이지를 표시할 수 없습니다.</Text>
        <Button
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="primaryBlue"
          onClick={handleGoBackButtonClick}
        >
          돌아가기
        </Button>
      </Box>
    </Flex>
  );
}

export default ErrorPage401;
