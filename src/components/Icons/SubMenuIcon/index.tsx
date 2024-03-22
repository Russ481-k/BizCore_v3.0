import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function SubMenuIcon({ ...props }: IconProps) {
  return (
    <Icon fill="none" stroke="currentColor" viewBox="0 0 20 20" {...props}>
      <circle cx={10} cy={10} r={2.5} />
    </Icon>
  );
}

SubMenuIcon.defaultProps = defaultProps;

export default SubMenuIcon;
