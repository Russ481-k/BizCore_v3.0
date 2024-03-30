import { Tag, Tooltip, Text } from "@chakra-ui/react";

interface ChannelTagProps {
  channelType: string;
  hasTooltip?: boolean;
}

function ChannelTag({ channelType, hasTooltip }: ChannelTagProps) {
  return (
    <>
      {channelType === "SMS" && (
        <Tag
          backgroundColor="channel.sms.bg"
          color="channel.sms.text"
          size="sm"
        >
          단문 (SMS)
        </Tag>
      )}
      {channelType === "LMS" && hasTooltip && (
        <Tooltip
          arrowSize={8}
          backgroundColor="channel.lms.bg"
          borderRadius="0.75rem"
          closeOnScroll={true}
          color="channel.lms.text"
          fontSize="xs"
          fontWeight="normal"
          hasArrow
          label={
            <Text>
              장문 (LMS) 문자로 자동 전환하였습니다. <br />
              2,000bytes까지 내용을 입력 가능합니다.
            </Text>
          }
          py={1}
          px={3}
          placement="right-end"
        >
          <Tag
            backgroundColor="channel.lms.bg"
            color="channel.lms.text"
            size="sm"
          >
            장문 (LMS)
          </Tag>
        </Tooltip>
      )}
      {channelType === "LMS" && !hasTooltip && (
        <Tag
          backgroundColor="channel.lms.bg"
          color="channel.lms.text"
          size="sm"
        >
          장문 (LMS)
        </Tag>
      )}
      {channelType === "MMS" && hasTooltip && (
        <Tooltip
          arrowSize={10}
          backgroundColor="channel.mms.bg"
          borderRadius="0.75rem"
          borderWidth="0"
          closeOnScroll={true}
          color="channel.mms.text"
          fontSize="xs"
          fontWeight="normal"
          hasArrow
          label={
            <Text>
              멀티 (MMS) 문자로 자동 전환하였습니다. <br />
              2,000bytes까지 내용을 입력 가능합니다.
            </Text>
          }
          p={2}
          placement="right"
        >
          <Tag
            backgroundColor="channel.mms.bg"
            color="channel.mms.text"
            size="md"
          >
            멀티 (MMS)
          </Tag>
        </Tooltip>
      )}
      {channelType === "MMS" && !hasTooltip && (
        <Tag
          backgroundColor="channel.mms.bg"
          color="channel.mms.text"
          size="sm"
        >
          멀티 (MMS)
        </Tag>
      )}
      {channelType === "KKT" && (
        <Tag
          backgroundColor="channel.kkt.bg"
          color="channel.kkt.text"
          size="sm"
        >
          알림톡
        </Tag>
      )}
    </>
  );
}
export default ChannelTag;
