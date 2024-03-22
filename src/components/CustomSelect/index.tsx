import { forwardRef, Select, SelectProps } from "@chakra-ui/react";

interface CustomSelectProps extends SelectProps {
  codes?: Array<{ code: string; disabled?: boolean; name: string }>;
}

const CustomSelect = forwardRef<CustomSelectProps, "select">(
  ({ codes, isReadOnly, ...props }, ref) => (
    <Select
      ref={ref}
      {...props}
      sx={{
        "&": {
          "option:disabled": {
            color: "gray.300",
            backgroundColor: "gray.100",
          },
        },
      }}
    >
      {codes?.map((code) => (
        <option
          disabled={isReadOnly || code.disabled}
          key={code.code}
          value={code.code}
        >
          {code.name}
        </option>
      ))}
    </Select>
  )
);

export default CustomSelect;
