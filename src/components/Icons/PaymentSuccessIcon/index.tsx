import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 16,
};

function PaymentSuccessIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 64 64" {...props}>
      <path d="M42 34h10v10H42V34Z" />
      <path d="M26 41H12v3h14v-3Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 10h56v44H4V10Zm3 3h50v6H7v-6Zm0 14v24h50V27H7Z"
      />
    </Icon>
  );
}

PaymentSuccessIcon.defaultProps = defaultProps;

export default PaymentSuccessIcon;
