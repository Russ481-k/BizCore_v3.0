import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function SearchIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.433 14.0827C16.7883 11.2932 16.6575 7.10416 14.0407 4.47002C11.2862 1.69733 6.82033 1.69733 4.06585 4.47002C1.31138 7.24271 1.31138 11.7381 4.06585 14.5108C6.71835 17.1809 10.9579 17.2797 13.7279 14.8074L17.1399 18.242C17.3367 18.44 17.6557 18.44 17.8524 18.242C18.0492 18.0439 18.0492 17.7228 17.8524 17.5248L14.433 14.0827ZM13.3267 5.18874C15.6868 7.56449 15.6868 11.4163 13.3267 13.7921C10.9665 16.1679 7.13999 16.1679 4.77985 13.7921C2.41971 11.4163 2.41971 7.56449 4.77985 5.18874C7.13999 2.81299 10.9665 2.81299 13.3267 5.18874Z"
      />
    </Icon>
  );
}

SearchIcon.defaultProps = defaultProps;

export default SearchIcon;
