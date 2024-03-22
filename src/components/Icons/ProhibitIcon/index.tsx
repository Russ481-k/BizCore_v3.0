import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function ProhibitIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C9.90875 20.75 7.98885 20.0164 6.48363 18.7924L18.7924 6.48363C20.0164 7.98885 20.75 9.90875 20.75 12ZM5.57181 17.9365L17.9365 5.57181C16.3767 4.1306 14.2912 3.25 12 3.25C7.16751 3.25 3.25 7.16751 3.25 12C3.25 14.2912 4.1306 16.3767 5.57181 17.9365Z"
      />
    </Icon>
  );
}

ProhibitIcon.defaultProps = defaultProps;

export default ProhibitIcon;
