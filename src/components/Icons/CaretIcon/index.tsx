import { Icon, IconProps } from "@chakra-ui/react";

interface CaretIconProps {
  direction: "DOWN" | "LEFT" | "RIGHT" | "UP";
}

const defaultProps = {
  boxSize: 5,
  direction: "up",
};

function CaretIcon({ direction, ...props }: CaretIconProps & IconProps) {
  let transformDegree = 0;
  if (direction === "DOWN") {
    transformDegree = 180;
  } else if (direction === "LEFT") {
    transformDegree = 270;
  } else if (direction === "RIGHT") {
    transformDegree = 90;
  }

  return (
    <Icon
      fill="currentColor"
      transform={`rotate(${transformDegree}deg)`}
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M3.42021 12.5639C3.18311 12.8199 3.18311 13.2152 3.42021 13.4712C3.68443 13.7565 4.13556 13.7565 4.39978 13.4712L9.50005 7.96489L14.6002 13.4711C14.8644 13.7564 15.3156 13.7564 15.5798 13.4711C15.8169 13.2151 15.8169 12.8198 15.5798 12.5638L9.7935 6.31682C9.63519 6.14591 9.36489 6.14591 9.20659 6.31682L3.42021 12.5639Z" />
    </Icon>
  );
}

CaretIcon.defaultProps = defaultProps;

export default CaretIcon;
