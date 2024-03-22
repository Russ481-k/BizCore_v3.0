import {
  Box,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, RegisterOptions, useController } from "react-hook-form";

import { getStyleProps } from "libs/chakraUtil";

const CustomInput = forwardRef(({ iconColor, size, ...inputProps }, ref) => (
  <InputGroup size={size}>
    <Input {...inputProps} />
    <InputLeftElement>
      <Box as="i" className="fa fa-calendar" color={iconColor}></Box>
    </InputLeftElement>
  </InputGroup>
));

interface DateInputProps {
  control: Control<any, any>;
  dateFormat: string;
  defaultValue?: any;
  disabled?: boolean;
  iconColor?: string;
  isClearable?: boolean;
  name: string;
  portalId?: string;
  rules: RegisterOptions;
  showTimeSelect: boolean;
}

const defaultProps = {
  dateFormat: "yyyy-MM-dd",
  iconColor: "gray.500",
  rules: {},
  showTimeSelect: false,
};

function DateInput({
  control,
  dateFormat,
  defaultValue,
  disabled,
  id,
  isClearable = false,
  name,
  placeholder,
  portalId,
  rules,
  showTimeSelect,
  ...inputProps
}: DateInputProps & InputProps) {
  const { field } = useController({
    defaultValue,
    control,
    name,
    rules,
  });

  const [styleProps, otherProps] = getStyleProps(inputProps);

  const handleDatePickerChange = (date: Date) => {
    field.onChange(date);
  };

  return (
    <Box {...styleProps} width="100%">
      <ReactDatePicker
        customInput={<CustomInput {...otherProps} />}
        dateFormat={dateFormat}
        disabled={disabled}
        id={id}
        locale={ko}
        placeholderText={placeholder}
        portalId={portalId}
        selected={field.value}
        showPopperArrow={false}
        showTimeSelect={showTimeSelect}
        onChange={handleDatePickerChange}
      />
    </Box>
  );
}

DateInput.defaultProps = defaultProps;

export default DateInput;
