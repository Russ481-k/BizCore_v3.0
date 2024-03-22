import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import WarningIcon from "components/Icons/WarningIcon";

interface NoDataTrProps {
  colspan: number;
  text: string;
}

function NoDataTr({ colspan, text }: NoDataTrProps) {
  return (
    <Tr>
      <Td colSpan={colspan}>
        <Flex color="gray.600" justify="center" py={5}>
          <WarningIcon />
          <Text ms={1}>{text}</Text>
        </Flex>
      </Td>
    </Tr>
  );
}

export default NoDataTr;
