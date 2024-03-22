import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function CreditIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 6.13945C1 4.59887 2.23445 3.34998 3.75723 3.34998H16.2428C17.7655 3.34998 19 4.59887 19 6.13945V14.5605C19 16.1011 17.7655 17.35 16.2428 17.35H3.75723C2.23445 17.35 1 16.1011 1 14.5605V6.13945ZM3.75723 4.7184C2.98147 4.7184 2.3526 5.35462 2.3526 6.13945V14.5605C2.3526 15.3453 2.98147 15.9816 3.75723 15.9816H16.2428C17.0185 15.9816 17.6474 15.3453 17.6474 14.5605V6.13945C17.6474 5.35462 17.0185 4.7184 16.2428 4.7184H3.75723Z"
      />
      <path d="M1.67629 7.19207H18.3237V8.5605H1.67629V7.19207Z" />
      <path d="M7 12.5C7 13.3284 6.32843 14 5.5 14C4.67157 14 4 13.3284 4 12.5C4 11.6715 4.67157 11 5.5 11C6.32843 11 7 11.6715 7 12.5Z" />
    </Icon>
  );
}

CreditIcon.defaultProps = defaultProps;

export default CreditIcon;
