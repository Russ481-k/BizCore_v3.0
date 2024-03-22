import { Flex, FlexProps, Text } from "@chakra-ui/react";

import { EssentialIcon } from "components";

interface InfoElementProps {
  label: string | React.ReactNode;
  labelWidth?: string;
  required?: boolean;
  children: React.ReactNode | null;
}

function InfoElement({
  label,
  labelWidth,
  required,
  children,
  ...props
}: InfoElementProps & FlexProps) {
  return (
    <Flex as="dl" align="stretch" marginLeft="-1px" marginTop="-1px" {...props}>
      <Flex
        as="dt"
        align="center"
        bgColor="gray.100"
        borderColor="gray.300"
        borderLeftWidth="1px"
        borderTopWidth="1px"
        minH="46px"
        p={4}
        shrink={0}
        w={labelWidth ?? "190px"}
      >
        <Flex alignSelf="flex-start">
          {typeof label === "string" ? <Text>{label}</Text> : label}
          {required && <EssentialIcon ml={1} />}
        </Flex>
      </Flex>
      <Flex
        as="dd"
        align="center"
        bgColor="white"
        borderColor="gray.300"
        borderLeftWidth="1px"
        borderTopWidth="1px"
        minH="46px"
        grow={1}
        px={4}
        py={2.5}
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default InfoElement;
