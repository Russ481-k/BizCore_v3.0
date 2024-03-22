import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function MenuIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M2 4.67544C2 4.3024 2.3134 4 2.7 4H17.3C17.6866 4 18 4.3024 18 4.67544C18 5.04847 17.6866 5.35088 17.3 5.35088H2.7C2.3134 5.35088 2 5.04847 2 4.67544Z" />
      <path d="M2 9.5C2 9.12697 2.3134 8.82456 2.7 8.82456H17.3C17.6866 8.82456 18 9.12697 18 9.5C18 9.87303 17.6866 10.1754 17.3 10.1754H2.7C2.3134 10.1754 2 9.87303 2 9.5Z" />
      <path d="M2.7 13.6491C2.3134 13.6491 2 13.9515 2 14.3246C2 14.6976 2.3134 15 2.7 15H17.3C17.6866 15 18 14.6976 18 14.3246C18 13.9515 17.6866 13.6491 17.3 13.6491H2.7Z" />
    </Icon>
  );
}

MenuIcon.defaultProps = defaultProps;

export default MenuIcon;
