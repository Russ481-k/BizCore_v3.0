import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 6,
};

function LetterIcon({ ...props }: IconProps) {
  return (
    <Icon fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.71429 5C2.76751 5 2 5.76751 2 6.71429V17.2857C2 18.2325 2.76751 19 3.71428 19H20.2857C21.2325 19 22 18.2325 22 17.2857V6.71429C22 5.76751 21.2325 5 20.2857 5H3.71429ZM5.31895 7.44184C5.01069 7.26569 4.61799 7.37279 4.44184 7.68105C4.26569 7.98931 4.37279 8.38201 4.68105 8.55816L10.8305 12.0721C11.5552 12.4862 12.4448 12.4862 13.1695 12.0721L19.3189 8.55816C19.6272 8.38201 19.7343 7.98931 19.5582 7.68105C19.382 7.37279 18.9893 7.26569 18.6811 7.44184L12.5316 10.9558C12.2022 11.1441 11.7978 11.1441 11.4684 10.9558L5.31895 7.44184Z"
        fill="currentColor"
      />
    </Icon>
  );
}

LetterIcon.defaultProps = defaultProps;

export default LetterIcon;
