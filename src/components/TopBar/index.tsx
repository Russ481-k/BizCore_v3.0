import { Flex, Image, Tab, TabIndicator, TabList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TopBarTwoWayIcon } from "components";
import AlarmButton from "./AlarmButton";
import Profile from "./Profile";

import logo from "assets/img/logo.png";
import { AnimatePresence, motion } from "framer-motion";

interface TopBarProps {
  isFold: boolean;
  tabIndex: number;
  onMenuClick: () => void;
}

function TopBar({ isFold, tabIndex, onMenuClick }: TopBarProps) {
  const [tabIndicatorLeft, setTabIndicatorLeft] = useState<string>("254px");

  const onTabIndicatorChange = (tabIndex: number, isFold: boolean) => {
    if (tabIndex === 0) {
      setTabIndicatorLeft(isFold ? "86px !important" : "254px !important");
    } else if (tabIndex === 1) {
      setTabIndicatorLeft(isFold ? "187px !important" : "355px !important");
    } else if (tabIndex === 2) {
      setTabIndicatorLeft(isFold ? "288px !important" : "456px !important");
    } else if (tabIndex === 3) {
      setTabIndicatorLeft(isFold ? "389px !important" : "557px !important");
    }
  };

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
            그룹웨어
          </Tab>
          <Tab fontSize={20} fontWeight={600}>
            회계관리
          </Tab>
          <Tab fontSize={20} fontWeight={600}>
            경영정보
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
            header="수신 메시지"
            icon={<TopBarTwoWayIcon color="gray.700" />}
            onClick={() => {
              console.log("AlarmButtonTest");
            }}
          />
        </Flex>
        <Profile />
      </Flex>
    </Flex>
  );
}

export default TopBar;
