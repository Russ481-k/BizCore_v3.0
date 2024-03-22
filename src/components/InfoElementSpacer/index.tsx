import { Spacer, SpacerProps } from "@chakra-ui/react";

function InfoElementSpacer({ ...props }: SpacerProps) {
  return (
    <Spacer
      borderTopColor="gray.300"
      borderTopWidth="1px"
      marginTop="-1px"
      {...props}
    />
  );
}

export default InfoElementSpacer;
