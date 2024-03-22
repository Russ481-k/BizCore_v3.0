import { Flex, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { RangeDateInput } from "components";

interface RangeDatePickerProps {
  name: string;
  option: "all" | "select";
  setOption: (option: "all" | "select") => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
}
function RangeDatePicker({
  option,
  name,
  setOption,
  setStartDate,
  setEndDate,
}: RangeDatePickerProps) {
  const { control, setValue } = useFormContext();
  const handleSearchDateChange = (value: "all" | "select") => {
    setOption(value);
    switch (value) {
      case "all":
        setStartDate(null);
        setEndDate(null);
        setValue(name, null);
        break;
      case "select":
        break;
      default:
        break;
    }
  };
  return (
    <Flex align="center">
      <RadioGroup
        flexShrink={0}
        value={option}
        me={2}
        onChange={(v: "all" | "select") => handleSearchDateChange(v)}
      >
        <HStack spacing={1}>
          <Radio colorScheme="primary" variant="button" value="all">
            전체
          </Radio>
          <Radio colorScheme="primary" variant="button" value="select">
            선택
          </Radio>
        </HStack>
      </RadioGroup>
      <RangeDateInput
        control={control}
        isDisabled={option === "all"}
        name={name}
      />
    </Flex>
  );
}

export default RangeDatePicker;
