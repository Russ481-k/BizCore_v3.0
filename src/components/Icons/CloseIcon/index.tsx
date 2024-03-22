import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function CloseIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M8.2 10L1 17.2L2.8 19L9.99996 11.8L17.2 19L19 17.2L11.8 9.99999L19 2.8L17.2 1L10 8.2L2.8 1.00002L1 2.80002L8.2 10Z" />
    </Icon>
  );
}

CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
