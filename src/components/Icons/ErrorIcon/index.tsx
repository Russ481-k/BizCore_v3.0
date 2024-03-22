import { Icon, IconProps } from "@chakra-ui/react";

const defaultProps = {
  boxSize: 5,
};

function ErrorIcon({ ...props }: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C5.30566 2 1.5 5.8056 1.5 10.5C1.5 15.1944 5.30566 19 10 19C14.6943 19 18.5 15.1944 18.5 10.5C18.5 5.8056 14.6943 2 10 2ZM2.86792 10.5C2.86792 6.56097 6.06104 3.36783 10 3.36783C11.6348 3.36783 13.1411 3.91785 14.344 4.84296L4.34302 14.844C3.41797 13.6411 2.86792 12.1348 2.86792 10.5ZM5.22632 15.7991C6.49048 16.9386 8.16431 17.6322 10 17.6322C13.939 17.6322 17.1321 14.439 17.1321 10.5C17.1321 8.66418 16.4385 6.99036 15.2991 5.72632L5.22632 15.7991Z"
      />
    </Icon>
  );
}

ErrorIcon.defaultProps = defaultProps;

export default ErrorIcon;
