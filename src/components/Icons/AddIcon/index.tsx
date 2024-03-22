import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function AddIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5H7.5V12.5C7.5 12.7761 7.72386 13 8 13C8.27614 13 8.5 12.7761 8.5 12.5V8.5H12.5C12.7761 8.5 13 8.27614 13 8C13 7.72386 12.7761 7.5 12.5 7.5H8.5V3.5Z" />
    </Icon>
  );
}

AddIcon.defaultProps = defaultProps;

export default AddIcon;
