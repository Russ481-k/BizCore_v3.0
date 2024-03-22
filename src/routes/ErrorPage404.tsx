import { Box, Button, Heading, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ErrorPage404() {
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
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          원하시는 페이지를 찾을 수 없습니다.
        </Text>
        <Text color="gray.500" mb={6}>
          잘못된 주소로 접근하셨습니다. 경로를 확인해 주세요.
        </Text>
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

export default ErrorPage404;
