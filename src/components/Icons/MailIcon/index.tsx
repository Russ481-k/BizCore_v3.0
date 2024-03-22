import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function MailIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5ZM4 4H16C16.5523 4 17 4.44772 17 5V6.24666L10.8871 10.7295C10.3591 11.1167 9.64097 11.1167 9.11298 10.7295L3 6.24661V5C3 4.44772 3.44772 4 4 4ZM3 7.48669V13.9448L7.16248 10.5392L3 7.48669ZM3.02372 15.2175C3.12301 15.6652 3.52241 16 4 16H16C16.4824 16 16.885 15.6584 16.9792 15.204L12.2637 10.96L11.4784 11.5359C10.5985 12.1812 9.4016 12.1812 8.52162 11.5359L7.99525 11.1499L3.02372 15.2175ZM17 13.8773V7.48673L13.0874 10.356L17 13.8773Z"
        fill="currentColor"
      />
    </Icon>
  );
}

MailIcon.defaultProps = defaultProps;

export default MailIcon;
