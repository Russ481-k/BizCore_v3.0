import { Flex, FlexProps } from "@chakra-ui/react";

interface SectionProps {
  children: React.ReactNode;
}

function Section({ ...props }: SectionProps & FlexProps) {
  return (
    <Flex
      backgroundColor="white"
      borderColor="gray.300"
      borderRadius="12px"
      borderWidth="1px"
      gap={2}
      p={3}
      {...props}
    />
  );
}

export default Section;
