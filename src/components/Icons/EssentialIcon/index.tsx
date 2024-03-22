import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 4,
};

function EssentialIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 16 16" {...props}>
      <circle cx="2.5" cy="2.5" r="2.5" fill="#D32F2F" />
    </Icon>
  );
}

EssentialIcon.defaultProps = defaultProps;

export default EssentialIcon;
