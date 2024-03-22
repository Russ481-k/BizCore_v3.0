import { Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ProhibitIcon,
  TopBarSendAmountIcon,
  TopBarTwoWayIcon,
  WarningIcon,
} from "components";
import { CHANNEL_OPTION } from "features/user";
import { useAppSelector } from "storage/redux/hooks";
import Option from "type/Option";
import SendCount from "type/SendCount";
import AlarmButton from "./AlarmButton";
import Profile from "./Profile";
import SendCountPopover from "./SendCountPopover";

import logo from "assets/img/logo.png";

interface TopBarProps {
  onMenuClick: () => void;
}

const usedCrsService: boolean = true;

function TopBar({ onMenuClick }: TopBarProps) {
  const [channelList, setChannelList] = useState<Option[]>([]);
  const [isChannelUsagePercent, setIsChannelUsagePercent] = useState<
    "100" | "70" | null
  >(null);

  const mySendData = useAppSelector((state) => state.user.sendData);

  const checkChannelUsagePercentage = (data: SendCount) => {
    const channels = ["sms", "lms", "mms", "kkt", "crs"];
    let maxPercent: "100" | "70" | null = null;
    if (data) {
      for (let channel of channels) {
        const useCount = data[`${channel}UseCount` as keyof SendCount] ?? 0;
        const limitCount = data[`${channel}LimitCount` as keyof SendCount];
        if (typeof limitCount === "number" && typeof useCount === "number") {
          if (useCount === limitCount) {
            maxPercent = "100";
          } else if (useCount / limitCount >= 0.7) {
            if (maxPercent !== "100") {
              maxPercent = "70";
            }
          }
        }
      }
    }
    setIsChannelUsagePercent(maxPercent);
  };

  useEffect(() => {
    if (usedCrsService) {
      setChannelList(CHANNEL_OPTION);
    } else {
      setChannelList(CHANNEL_OPTION.slice(0, 4));
    }
  }, []);

  useEffect(() => {
    if (mySendData) {
      checkChannelUsagePercentage(mySendData.sendCountRequest);
    }
  }, [mySendData]);

  return (
    <Flex
      align="center"
      backgroundColor="white"
      borderBottomWidth="1px"
      borderColor="gray.300"
      height="64px"
      justify="space-between"
      px="22px"
      width="100%"
      zIndex={99}
      position="fixed"
      top={0}
      left={0}
    >
      <Link to="/">
        <Image src={logo} />
      </Link>
      <Flex align="center" flex={1} gap={6} justify="end">
        <Flex align="center" gap={3}>
          <AlarmButton
            count={0}
            header="양방향 메시지 알람"
            icon={<TopBarTwoWayIcon color="gray.700" />}
            onClick={() => {
              console.log("AlarmButtonTest");
            }}
          />
          <AlarmButton
            count={0}
            header="메시지 발송량"
            icon={
              isChannelUsagePercent !== null ? (
                isChannelUsagePercent === "100" ? (
                  <ProhibitIcon color="red" />
                ) : (
                  <WarningIcon color="red" />
                )
              ) : (
                <TopBarSendAmountIcon color="gray.700" />
              )
            }
          >
            {mySendData && (
              <SendCountPopover
                channelList={channelList}
                data={mySendData}
                isChannelUsagePercent={isChannelUsagePercent}
              />
            )}
          </AlarmButton>
        </Flex>
        <Profile />
      </Flex>
    </Flex>
  );
}

export default TopBar;
