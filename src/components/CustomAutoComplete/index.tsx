import { forwardRef, SelectProps } from "@chakra-ui/react";
import Select from "react-select";

interface CustomAutoCompleteProps extends SelectProps {
  codes?: Array<{ code: string; disabled?: boolean; name: string }>;
}

interface Option {
  readonly value: string;
  readonly label: string;
  readonly isDisabled?: boolean;
}

const CustomAutoComplete = forwardRef<CustomAutoCompleteProps, "select">(
  ({ codes, isReadOnly, ...props }, ref) => {
    const options: Option[] | undefined = codes?.map((code) => {
      return {
        value: code.code,
        label: code.name,
      };
    });
    return (
      <Select
        autoFocus
        ref={ref}
        isClearable={true}
        isSearchable={true}
        options={options}
        placeholder="선택"
        menuPortalTarget={document.body}
        styles={{
          container: (base) => ({
            ...base,
            borderRadius: "12px",
            width: "100%",
            height: "34px",
          }),

          control: (base) => ({
            ...base,
            borderRadius: "12px",
            height: "34px",
            minHeight: "34px !important",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "12px",
            overflow: "hidden",
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
            top: "-2px",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            margin: "0",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            paddingLeft: "8px",
            paddingTop: "7px",
            paddingBottom: "7px",
            top: "-2px",
            height: "34px",
          }),
          option: (base) => ({
            ...base,
            height: "100%",
          }),
        }}
      />
    );
  }
);

export default CustomAutoComplete;
