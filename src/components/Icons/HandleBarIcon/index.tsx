import { Icon, IconProps } from "@chakra-ui/react";

function HandleBarIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 98 4" {...props}>
      <rect width="98" height="4" />
    </Icon>
  );
}

export default HandleBarIcon;
