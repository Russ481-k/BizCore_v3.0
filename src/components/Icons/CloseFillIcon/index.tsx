import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function CloseFillIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
        fill="currentColor"
      />
      <path
        d="M13.5355 7.17157C13.7308 6.97631 13.7308 6.65973 13.5355 6.46447C13.3403 6.2692 13.0237 6.2692 12.8284 6.46447L10 9.29289L7.17157 6.46447C6.97631 6.2692 6.65973 6.2692 6.46447 6.46447C6.2692 6.65973 6.2692 6.97631 6.46447 7.17157L9.29289 10L6.46447 12.8284C6.2692 13.0237 6.2692 13.3403 6.46447 13.5355C6.65973 13.7308 6.97631 13.7308 7.17157 13.5355L10 10.7071L12.8284 13.5355C13.0237 13.7308 13.3403 13.7308 13.5355 13.5355C13.7308 13.3403 13.7308 13.0237 13.5355 12.8284L10.7071 10L13.5355 7.17157Z"
        fill="white"
      />
    </Icon>
  );
}

CloseFillIcon.defaultProps = defaultProps;

export default CloseFillIcon;
