import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { ChannelTag, TipText } from "components";

interface MessageTextareaProps {
  channel: string;
  contentsByteCount: number;
  defaultValue?: string;
  isDisabled?: boolean;
  isAlarmTalk?: boolean;
  onContentsBlur: (value: string) => string;
  onContentsChange: (value: string) => void;
  onSelectionStartChange?: (value: number) => void;
  onSelectionEndChange?: (value: number) => void;
}
function MessageTextarea({
  channel,
  contentsByteCount,
  defaultValue,
  isDisabled,
  isAlarmTalk,
  onContentsBlur,
  onContentsChange,
  onSelectionStartChange,
  onSelectionEndChange,
}: MessageTextareaProps) {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext<{
    messageContents: string;
  }>();

  const handleTextAreaChange = (start: number, end: number) => {
    onSelectionStartChange?.(start);
    onSelectionEndChange?.(end);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" mb={1} width="100%">
        {isAlarmTalk ? (
          <TipText
            size="sm"
            text="2,000bytes까지 작성 가능하지만, 이미지 첨부 시 800bytes로
          제한됩니다."
          />
        ) : (
          <ChannelTag channelType={channel} hasTooltip />
        )}
        <Flex alignItems="end" lineHeight={1}>
          <Text
            color={contentsByteCount > 2000 ? "red" : "black"}
            fontSize="xs"
          >
            {contentsByteCount}
          </Text>
          {isAlarmTalk ? (
            <Text color="black" fontSize="xs">{`/2000 bytes`}</Text>
          ) : (
            <Text color="black" fontSize="xs">{`/${
              contentsByteCount >= 90 ? 2000 : 90
            } bytes`}</Text>
          )}
        </Flex>
      </Flex>
      <FormControl isInvalid={!!errors?.messageContents}>
        <Textarea
          defaultValue={defaultValue}
          disabled={isAlarmTalk || isDisabled}
          fontSize="xs"
          minHeight="200px"
          placeholder={
            isAlarmTalk
              ? "카카오 알림톡 내용을 추가하세요."
              : `내용을 입력하세요.
[단문 (SMS)] 90bytes 이하인 경우
[장문 (LMS)] 90bytes 초과인 경우
[멀티 (MMS)] 이미지 첨부의 경우
자동으로 전환됩니다.`
          }
          size="sm"
          width="100%"
          {...register("messageContents", {
            required: {
              value: true,
              message: "메시지 내용을 입력하세요.",
            },
            onBlur: (e) => {
              setValue(
                "messageContents",
                (e.target.value = onContentsBlur(e.target.value))
              );
            },

            onChange: (e: any) => {
              onContentsChange(e.target.value);
              handleTextAreaChange(
                e.nativeEvent.srcElement?.selectionStart,
                e.nativeEvent.srcElement?.selectionEnd
              );
            },
          })}
          onClick={(e: any) =>
            handleTextAreaChange(
              e.nativeEvent.srcElement?.selectionStart,
              e.nativeEvent.srcElement?.selectionEnd
            )
          }
          onKeyDown={(e: any) => {
            handleTextAreaChange(
              e.nativeEvent.srcElement?.selectionStart,
              e.nativeEvent.srcElement?.selectionEnd
            );
          }}
        />
        {errors?.messageContents && (
          <FormErrorMessage>{errors?.messageContents.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

export default MessageTextarea;
