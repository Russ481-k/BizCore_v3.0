import {
  Avatar,
  AvatarBadge,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

interface AlarmButtonProps {
  children?: React.ReactNode;
  count: number;
  header?: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  onClick?: () => void;
}

function AlarmButton({
  count,
  children,
  header,
  icon,
  onClick,
  ...props
}: AlarmButtonProps) {
  return (
    <Popover variant="topBar" placement="bottom">
      <PopoverTrigger>
        <Avatar
          bg="gray.100"
          borderRadius={12}
          cursor="pointer"
          height="36px"
          icon={icon}
          size="sm"
          width="36px"
          onClick={onClick && onClick}
        >
          <AvatarBadge bg="red.badge" boxSize="1.25em" placement="top-end">
            <Text fontSize="2xs">{count < 100 ? count : "+99"}</Text>
          </AvatarBadge>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent w="256px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
export default AlarmButton;
