import { Flex, Image, Tab, TabIndicator, TabList } from "@chakra-ui/react";
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
import { AnimatePresence, motion } from "framer-motion";

interface TopBarProps {
  isFold: boolean;
  tabIndex: number;
  onMenuClick: () => void;
}

const usedCrsService: boolean = true;

function TopBar({ isFold, tabIndex, onMenuClick }: TopBarProps) {
  const [channelList, setChannelList] = useState<Option[]>([]);
  const [isChannelUsagePercent, setIsChannelUsagePercent] = useState<
    "100" | "70" | null
  >(null);
  const [tabIndicatorLeft, setTabIndicatorLeft] = useState<string>("254px");

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

  const onTabIndicatorChange = (tabIndex: number, isFold: boolean) => {
    if (tabIndex === 0) {
      setTabIndicatorLeft(isFold ? "86px !important" : "254px !important");
    } else if (tabIndex === 1) {
      setTabIndicatorLeft(isFold ? "187px !important" : "355px !important");
    } else if (tabIndex === 2) {
      setTabIndicatorLeft(isFold ? "288px !important" : "456px !important");
    }
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

  useEffect(() => {
    onTabIndicatorChange(tabIndex, isFold);
  }, [tabIndex, isFold]);

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
      <AnimatePresence>
        <Flex
          animate={{
            width: isFold ? 48 : 216,
          }}
          as={motion.div}
        >
          <Link to="/">
            <Image
              as={motion.img}
              float="left"
              src={logo}
              objectFit="cover"
              objectPosition="left"
              height={12}
            />
          </Link>
        </Flex>
      </AnimatePresence>
      <Flex px={4}>
        <TabList>
          <Tab fontSize={20} fontWeight={600}>
            업무관리
          </Tab>
          <Tab fontSize={20} fontWeight={600}>
            회계관리
          </Tab>
          <Tab fontSize={20} fontWeight={600}>
            일정관리
          </Tab>
        </TabList>
        <TabIndicator
          mt="55px"
          left={tabIndicatorLeft}
          height="4px"
          width="100px !important"
          bg="primary.600"
        />
      </Flex>
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
