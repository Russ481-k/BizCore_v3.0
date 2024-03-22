import { Box, Center, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CustomSpinner from "components/CustomSpinner";
import ProhibitIcon from "components/Icons/ProhibitIcon";
import WarningIcon from "components/Icons/WarningIcon";
import TipText from "components/TipText";
import Option from "type/Option";
import UserSendData from "type/UserSendData";

interface SendCountRequestProps {
  channelList: Option[];
  isChannelUsagePercent: "100" | "70" | null;
  data: UserSendData;
}

interface RecordBooleanProps {
  [key: string]: boolean;
}
interface RecordNumberProps {
  [key: string]: number;
}
interface RecordNumberOrNullProps {
  [key: string]: number | null;
}

const defalutBooleanProps = {
  sms: false,
  lms: false,
  mms: false,
  kkt: false,
  crs: false,
};
const defalutNumberProps = {
  sms: 0,
  lms: 0,
  mms: 0,
  kkt: 0,
  crs: 0,
};
const defalutNullProps = {
  sms: null,
  lms: null,
  mms: null,
  kkt: null,
  crs: null,
};

function SendCountRequest({
  channelList,
  isChannelUsagePercent,
  data,
}: SendCountRequestProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isUse, setIsUse] = useState<RecordBooleanProps>(defalutBooleanProps);
  const [isUnlimited, setIsUnlimited] =
    useState<RecordBooleanProps>(defalutBooleanProps);
  const [limitCount, setLimitCount] =
    useState<RecordNumberOrNullProps>(defalutNullProps);
  const [useCount, setUseCount] =
    useState<RecordNumberProps>(defalutNumberProps);

  useEffect(() => {
    if (data) {
      setIsUse({
        sms: data.sendAuthorization.isSmsUse ?? false,
        lms: data.sendAuthorization.isLmsUse ?? false,
        mms: data.sendAuthorization.isMmsUse ?? false,
        kkt: data.sendAuthorization.isKktUse ?? false,
        crs: data.sendAuthorization.isSmsUse ?? false,
      });
      setIsUnlimited({
        sms: data.sendAuthorization.isSmsUnlimited ?? false,
        lms: data.sendAuthorization.isLmsUnlimited ?? false,
        mms: data.sendAuthorization.isMmsUnlimited ?? false,
        kkt: data.sendAuthorization.isKktUnlimited ?? false,
        crs: data.sendAuthorization.isCrsUnlimited ?? false,
      });
      setLimitCount({
        sms: data.sendCountRequest?.smsLimitCount ?? null,
        lms: data.sendCountRequest?.lmsLimitCount ?? null,
        mms: data.sendCountRequest?.mmsLimitCount ?? null,
        kkt: data.sendCountRequest?.kktLimitCount ?? null,
        crs: data.sendCountRequest?.crsLimitCount ?? null,
      });
      setUseCount({
        sms: data.sendCountRequest?.smsUseCount ?? 0,
        lms: data.sendCountRequest?.lmsUseCount ?? 0,
        mms: data.sendCountRequest?.mmsUseCount ?? 0,
        kkt: data.sendCountRequest?.kktUseCount ?? 0,
        crs: data.sendCountRequest?.crsUseCount ?? 0,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [data]);

  const handleText = (
    used: boolean,
    unlimited: boolean,
    limitCnt: number | null,
    useCnt: number
  ) => {
    if (used) {
      if (unlimited) {
        return `${useCnt}건 / 무제한`;
      }
      if (limitCnt) {
        if (useCnt === limitCnt) {
          return (
            <Flex align="center">
              <ProhibitIcon color="red" boxSize={4} me={0.5} />
              <Text lineHeight={4}>
                <Text as="span" color="red">
                  {useCnt}건
                </Text>
                &nbsp;/ {limitCnt}건
              </Text>
            </Flex>
          );
        }
        if (useCnt / limitCnt >= 0.7) {
          return (
            <Flex align="center">
              <WarningIcon color="red" boxSize={4} me={0.5} />
              <Text lineHeight={4}>
                {useCnt}건 / {limitCnt}건
              </Text>
            </Flex>
          );
        }
        return `${useCnt}건 / ${limitCnt}건`;
      }
    } else {
      return "-";
    }
  };

  return (
    <>
      <List spacing={0}>
        {isLoading && (
          <Center h={"200px"}>
            <CustomSpinner />
          </Center>
        )}
        {!isLoading &&
          channelList.map((channel, i) => {
            return (
              <ListItem
                alignItems="center"
                borderBottomColor="gray.300"
                borderBottomWidth={i === channelList.length - 1 ? "0" : "1px"}
                display="flex"
                justifyContent="space-between"
                key={`${channel.code}-${i}`}
                px={5}
                py={2.5}
              >
                <Text color="black" fontSize="sm">
                  {channel.name}
                </Text>
                <Text as="div" color="black" fontSize="sm">
                  {handleText(
                    isUse[channel.code],
                    isUnlimited[channel.code],
                    limitCount[channel.code],
                    useCount[channel.code]
                  )}
                </Text>
              </ListItem>
            );
          })}
      </List>
      {isChannelUsagePercent !== null && (
        <Box p={3} pt={5}>
          <TipText
            hasBg
            size="sm"
            text="발송량의 추가가 필요한 경우 관리자(1500-1234)에게 문의해주시기 바랍니다."
          />
        </Box>
      )}
    </>
  );
}

export default SendCountRequest;
