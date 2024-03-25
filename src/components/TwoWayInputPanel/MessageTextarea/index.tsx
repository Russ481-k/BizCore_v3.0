import { Box, Flex, FormControl, FormErrorMessage, Text, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { ChannelTag } from "components";

interface MessageTextareaProps {
  channel: string;
  contentsByteCount: number;
  defaultValue?: string;
  isDisabled?: boolean;
  handleContentsBlur: (value: string) => string;
  handleContentsChange: (value: string) => void;
}
function MessageTextarea({
  channel,
  contentsByteCount,
  defaultValue,
  isDisabled,
  handleContentsBlur,
  handleContentsChange,
}: MessageTextareaProps) {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext<{
    messageContents: string;
  }>();

  useEffect(() => {
    if (defaultValue) {
      setValue("messageContents", defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <Box>
      <Flex flexDirection="row" justifyContent="space-between" mb={1} width="100%">
        <ChannelTag channelType={channel} hasTooltip />
        <Flex alignItems="end" lineHeight={1}>
          <Text color={contentsByteCount > 2000 ? "red" : "black"} fontSize="xs">
            {contentsByteCount}
          </Text>
          {isDisabled ? (
            <Text color="black" fontSize="xs">{`/2000 bytes`}</Text>
          ) : (
            <Text color="black" fontSize="xs">{`/${
              contentsByteCount >= 90 ? 2000 : 90
            } bytes`}</Text>
          )}
        </Flex>
      </Flex>
      <FormControl isInvalid={!isDisabled && !!errors?.messageContents}>
        <Textarea
          defaultValue={defaultValue}
          disabled={isDisabled}
          fontSize="xs"
          minHeight="200px"
          placeholder={`안녕하세요. 안내 테스트입니다.

1번 응답을 받으려면: 1
2번 응답을 받으려면: 2

를 회신 주세요. (숫자로만 회신 주세요.)`}
          size="sm"
          width="100%"
          {...register("messageContents", {
            required: {
              value: true,
              message: "메시지 내용을 입력하세요.",
            },
            onBlur: (e) => {
              setValue("messageContents", (e.target.value = handleContentsBlur(e.target.value)));
            },
            onChange: (e) => handleContentsChange(e.target.value),
          })}
        />
        {errors?.messageContents && (
          <FormErrorMessage>{errors?.messageContents.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

export default MessageTextarea;
