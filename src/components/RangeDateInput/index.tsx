import { Flex, Input, InputProps, Text } from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { Control, RegisterOptions, useController } from "react-hook-form";

import { ScheduleIcon } from "components";
import { getStyleProps } from "libs/chakraUtil";

interface inputPropsType {
  [key: string]: React.CSSProperties;
}
const CustomInput = forwardRef(({ ...inputProps }: inputPropsType, ref) => {
  return (
    <Input
      {...inputProps}
      bg="transparent !important"
      borderRadius="0.25rem"
      borderWidth="0 !important"
      boxShadow="none !important"
      h="32px"
      px={2}
      size="sm"
      width={inputProps.value ? "94px" : "108px"}
    />
  );
});

interface RangeDateInputProps {
  control: Control<any, any>;
  dateFormat: string;
  iconColor?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  name: string;
  portalId?: string;
  rules: RegisterOptions;
}

const defaultProps = {
  dateFormat: "yyyy-MM-dd",
  rules: {},
};

function RangeDateInput({
  control,
  dateFormat,
  iconColor,
  isClearable = false,
  isDisabled,
  name,
  placeholder,
  portalId,
  rules,
  ...inputProps
}: RangeDateInputProps & InputProps) {
  const { field } = useController({
    control,
    name,
    rules,
    defaultValue: [null, null],
  });
  const [styleProps, otherProps] = getStyleProps(inputProps);

  const handleStartDateChange = (startDate: Date | null) => {
    field.onChange([startDate, field.value?.[1]]);
  };
  const handleEndDateChange = (endDate: Date | null) => {
    field.onChange([field.value?.[0], endDate]);
  };

  return (
    <Flex
      {...styleProps}
      align="center"
      bg={isDisabled ? "gray.100" : "white"}
      borderColor="gray.400"
      borderRadius="xl"
      borderWidth={1}
      flex="0 0 280px"
      pointerEvents={isDisabled ? "none" : "inherit"}
      px={3}
      w="280px"
    >
      <ScheduleIcon
        color={isDisabled ? "gray.500" : "gray.700"}
        flexShrink={0}
      />
      <ReactDatePicker
        customInput={<CustomInput {...otherProps} />}
        dateFormat={dateFormat}
        dropdownMode="select"
        endDate={field.value?.[1]}
        locale={ko}
        placeholderText="YYYY-MM-DD"
        portalId={portalId}
        selected={field.value?.[0]}
        selectsStart
        showMonthDropdown
        showMonthYearPicker={dateFormat === "yyyy-MM"}
        showPopperArrow={true}
        showYearDropdown
        startDate={field.value?.[0]}
        onChange={handleStartDateChange}
      />
      <Text as="span">~</Text>
      <ReactDatePicker
        customInput={<CustomInput {...otherProps} />}
        dateFormat={dateFormat}
        dropdownMode="select"
        endDate={field.value?.[1]}
        locale={ko}
        minDate={field.value?.[0]}
        placeholderText="YYYY-MM-DD"
        portalId={portalId}
        selected={field.value?.[1]}
        selectsEnd
        showMonthDropdown
        showMonthYearPicker={dateFormat === "yyyy-MM"}
        showPopperArrow={true}
        showYearDropdown
        startDate={field.value?.[0]}
        onChange={handleEndDateChange}
      />
    </Flex>
  );
}

RangeDateInput.defaultProps = defaultProps;

export default RangeDateInput;
