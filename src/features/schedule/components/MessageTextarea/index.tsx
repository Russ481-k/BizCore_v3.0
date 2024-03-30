import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Spacer,
  StackProps,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FieldError, useFormContext, useFormState } from "react-hook-form";

import { ChannelTag, SpecialSymbolPopOver, ToastMessage } from "components";

interface MessageTextareaProps {
  name: string;
  channel?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  byteCurrent: number;
  required?: boolean;
  hasHelperText?: boolean;
  useSpecialSymbol?: boolean;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  setByteCurrent: React.Dispatch<React.SetStateAction<number>>;
}
function MessageTextarea({
  name,
  channel,
  defaultValue,
  isDisabled,
  byteCurrent,
  required,
  hasHelperText,
  useSpecialSymbol,
  setChannel,
  setContext,
  setByteCurrent,
  ...props
}: MessageTextareaProps & StackProps) {
  type FieldErrorsType = {
    [key: string]: FieldError | undefined;
  };

  const toast = useToast();
  const { control, register, setValue, getValues } = useFormContext();

  const { errors } = useFormState({
    control,
    name,
  }) as {
    errors: FieldErrorsType;
  };

  const [msgByteLimit, setMsgByteLimit] = useState<number>(0);

  const getByteFromText = (e: string, type: string) => {
    let count = 0;
    let msgChannel = "SMS";
    if (e?.length === 0) {
      setChannel(msgChannel);
      return setByteCurrent(0);
    }
    return e
      ?.split("")
      .map((s) => s.charCodeAt(0))
      .reduce((prev, c) => {
        if (prev <= 2000) {
          count++;
          setMsgByteLimit(count - 1);
        }
        let result: number = prev + (c === 10 ? 2 : c >> 7 ? 2 : 1);
        if (type === "contents") {
          setByteCurrent(result);
          setContext(e);
        }
        return result;
      }, 0);
  };

  const handleAddSymbol = (e: string) => () => {
    if (byteCurrent >= 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2000byte를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
    } else {
      let currentMessageText = getValues(name);
      getByteFromText(currentMessageText + e, "contents");
      setValue(name, currentMessageText + e);
      onChangeMsg(currentMessageText);
    }
  };

  const onChangeMsg = (e: string) => {
    getByteFromText(e, "contents");
  };

  const onBlurMsg = (e: string) => {
    if (byteCurrent > 2000) {
      toast({
        render: () => (
          <ToastMessage title="문자 내용 길이 초과" type="ERROR">
            문자 내용은 2000byte를 초과할 수 없습니다.
          </ToastMessage>
        ),
        duration: 5000,
      });
      getByteFromText(e.substring(0, msgByteLimit), "contents");
      setContext(e.substring(0, msgByteLimit));
      return e.substring(0, msgByteLimit);
    } else {
      getByteFromText(e, "contents");
      setContext(e);
      return e;
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <VStack align="flex-start" flex={1} spacing={2} {...props}>
      {channel && <ChannelTag channelType={channel} hasTooltip />}
      <FormControl isInvalid={!isDisabled && !!errors?.[name]} h="100%">
        <Flex
          bgColor={isDisabled ? "gray.100" : "white"}
          borderColor={errors?.[name] ? "red.500" : "gray.300"}
          boxShadow={
            errors?.[name] ? "0 0 0 1px var(--chakra-colors-red-500)" : "none"
          }
          borderRadius="xl"
          borderWidth="1px"
          direction="column"
          flex={1}
          w="100%"
          h="100%"
        >
          <Textarea
            bg="transparent"
            border="none !important"
            boxShadow="none !important"
            defaultValue={defaultValue}
            flex={1}
            resize="none"
            size="sm"
            {...register(name, {
              required: {
                value: required ? true : false,
                message: " 내용을 입력하세요.",
              },
              onBlur: (e) => {
                setValue(name, (e.target.value = onBlurMsg(e.target.value)));
              },
              onChange: (e) => onChangeMsg(e.target.value),
            })}
          />
          <Flex
            align="flex-end"
            borderRadius="xl"
            justify="space-between"
            p="0.5rem 1rem"
            zIndex={99}
          >
            {useSpecialSymbol ? (
              <SpecialSymbolPopOver addSymbol={handleAddSymbol} />
            ) : (
              <Spacer />
            )}
            <Flex flexShrink={0} lineHeight={1}>
              <Text
                color={byteCurrent > 2000 ? "red" : "primary.700"}
                fontSize="xs"
              >
                {byteCurrent}
              </Text>
              <Text color="gray" fontSize="xs">{`/${
                byteCurrent >= 90 ? 2000 : 90
              } bytes`}</Text>
            </Flex>
          </Flex>
        </Flex>
        {errors?.[name] && (
          <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
        )}
        {hasHelperText && (
          <FormHelperText color="gray.800" fontSize="xs" lineHeight="1.125rem">
            내용이 90bytes가 넘으면 장문로 자동변경됩니다. (단문 90bytes, 장문 /
            포토 2,000bytes)
            <br />
            문서 프로그램에서 작성한 특수문자 등을 복사/붙여넣기 할 경우
            자폰에서 깨짐 현상이 발생 할 수 있습니다.
            <br />
            상단 [특수문자]버튼을 클릭하여 특수문자를 직접 입력해주세요.
          </FormHelperText>
        )}
      </FormControl>
    </VStack>
  );
}

export default React.memo(MessageTextarea);
