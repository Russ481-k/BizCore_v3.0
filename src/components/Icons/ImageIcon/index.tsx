import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function ImageIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M8 7.5C8 8.32843 7.32843 9 6.5 9C5.67157 9 5 8.32843 5 7.5C5 6.67157 5.67157 6 6.5 6C7.32843 6 8 6.67157 8 7.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM16 4H4C3.44772 4 3 4.44772 3 5V12.2857L5.60608 11.1688C5.85763 11.061 6.14237 11.061 6.39392 11.1688L8.92136 12.252C9.275 12.4036 9.68423 12.3388 9.97378 12.0854L12.8415 9.57619C13.2185 9.24629 13.7815 9.24629 14.1585 9.57619L17 12.0625V5C17 4.44772 16.5523 4 16 4Z"
      />
    </Icon>
  );
}

ImageIcon.defaultProps = defaultProps;

export default ImageIcon;
