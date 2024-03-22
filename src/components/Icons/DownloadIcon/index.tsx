import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function DownloadIcon({ ...props }: IconProps) {
  return (
    <Icon viewBox="0 0 20 20" {...props} fill="currentColor">
      <path
        d="M10 3C10.2761 3 10.5 3.22386 10.5 3.5V12.2929L13.6464 9.14645C13.8417 8.95118 14.1583 8.95118 14.3536 9.14645C14.5488 9.34171 14.5488 9.65829 14.3536 9.85355L10.3536 13.8536C10.1583 14.0488 9.84171 14.0488 9.64645 13.8536L5.64645 9.85355C5.45118 9.65829 5.45118 9.34171 5.64645 9.14645C5.84171 8.95118 6.15829 8.95118 6.35355 9.14645L9.5 12.2929V3.5C9.5 3.22386 9.72386 3 10 3Z"
        fill="currentcolor"
      />
      <path
        d="M3 13.5C3 13.2239 2.77614 13 2.5 13C2.22386 13 2 13.2239 2 13.5V16.5C2 16.7761 2.22386 17 2.5 17H17.5C17.7761 17 18 16.7761 18 16.5V13.5C18 13.2239 17.7761 13 17.5 13C17.2239 13 17 13.2239 17 13.5V16H3V13.5Z"
        fill="currentcolor"
      />
    </Icon>
  );
}

DownloadIcon.defaultProps = defaultProps;

export default DownloadIcon;
