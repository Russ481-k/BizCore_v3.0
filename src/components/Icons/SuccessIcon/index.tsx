import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: "27px",
};

function SuccessIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 22 22" {...props}>
      <path d="M22.46 2.40635C22.8542 2.00281 22.8579 1.35951 22.4684 0.951429C22.0591 0.522697 21.376 0.518739 20.9618 0.942699L7.56792 14.6526L2.04578 8.86732C1.63671 8.43876 0.953814 8.43479 0.539788 8.85857C0.145705 9.26193 0.141968 9.90498 0.531336 10.3129L7.05448 17.1468C7.32586 17.4311 7.7789 17.4337 8.05356 17.1526L22.46 2.40635Z" />
    </Icon>
  );
}

SuccessIcon.defaultProps = defaultProps;

export default SuccessIcon;
