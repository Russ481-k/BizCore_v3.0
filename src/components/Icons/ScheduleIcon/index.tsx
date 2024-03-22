import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function ScheduleIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.1917 1.53529C10.1917 1.23966 10.4282 1 10.7199 1C11.0115 1 11.248 1.23966 11.248 1.53529V2.64706H12.875C13.7725 2.64706 14.5 3.38447 14.5 4.29412V13.3529C14.5 14.2626 13.7725 15 12.875 15H3.125C2.22754 15 1.5 14.2626 1.5 13.3529V4.29412C1.5 3.38447 2.22754 2.64706 3.125 2.64706H4.75V1.53529C4.75 1.23966 4.98645 1 5.27813 1C5.5698 1 5.80625 1.23966 5.80625 1.53529V2.64706H10.1917V1.53529ZM4.75 3.88235V4.58235C4.75 4.87799 4.98645 5.11765 5.27813 5.11765C5.5698 5.11765 5.80625 4.87799 5.80625 4.58235V3.88235H10.1917V4.58235C10.1917 4.87799 10.4282 5.11765 10.7199 5.11765C11.0115 5.11765 11.248 4.87799 11.248 4.58235V3.88235H12.875C13.0994 3.88235 13.2812 4.06671 13.2812 4.29412V5.94118L2.71875 5.94118V4.29412C2.71875 4.06671 2.90063 3.88235 3.125 3.88235H4.75ZM2.71875 7.17647L13.2812 7.17647V13.3529C13.2812 13.5804 13.0994 13.7647 12.875 13.7647H3.125C2.90063 13.7647 2.71875 13.5804 2.71875 13.3529V7.17647Z"
      />
    </Icon>
  );
}

ScheduleIcon.defaultProps = defaultProps;

export default ScheduleIcon;
