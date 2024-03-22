import { Spinner, SpinnerProps } from "@chakra-ui/react";

function CustomSpinner({ ...props }: SpinnerProps) {
  return (
    <Spinner
      thickness="3px"
      speed="0.75s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      {...props}
    />
  );
}

export default CustomSpinner;
