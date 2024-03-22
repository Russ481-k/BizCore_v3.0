import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { LogoutIcon } from "components";
import authService from "libs/authService";
import { useAppSelector } from "storage/redux/hooks";
import ChangeProfileModal from "./ChangeProfileModal";
import LogoutModal from "./LogoutModal";

function Profile() {
  const myProfile = useAppSelector((state) => state.user.profile);

  const [changeProfileModalOpen, setChangeProfileModalOpen] =
    useState<boolean>(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

  const handleLogoutButtonClick = () => {
    setLogoutModalOpen(true);
  };
  const onCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  const onSubmitLogoutModal = () => {
    onCloseLogoutModal();
    authService.logout();
    if (!myProfile.isMobytalk) {
      window.close();
    }
  };
  return (
    <>
      <Flex as="label" cursor="pointer" htmlFor="popover-trigger-profile">
        <HStack align="center">
          <AspectRatio ratio={1 / 1} w="42px">
            <Avatar />
          </AspectRatio>
          <VStack align="flex-start" spacing={0}>
            <Text color="black" fontSize="sm" fontWeight="500" mt={0.5}>
              {myProfile.userName}
            </Text>
            <Text color="gray.800" fontSize="xs" fontWeight="400">
              {myProfile.userId}
            </Text>
          </VStack>
        </HStack>
        <Popover id="profile" variant="topBar" placement="bottom-end">
          <PopoverTrigger>
            <button />
          </PopoverTrigger>
          <PopoverContent w="260px">
            <PopoverBody px={4} py={5}>
              <HStack spacing={3}>
                <AspectRatio ratio={1 / 1} w="50px">
                  <Avatar />
                </AspectRatio>
                <Box>
                  <Text color="black" fontSize="md" fontWeight="500">
                    {myProfile.userName}
                  </Text>
                  <Text color="gray.800" fontSize="sm" fontWeight="400">
                    {myProfile.userId}
                  </Text>
                </Box>
              </HStack>
            </PopoverBody>
            <PopoverFooter display="flex" borderColor="gray.400" p={0}>
              <Button
                borderRadius={0}
                borderWidth={0}
                borderRightWidth={1}
                flex={1}
                py={3}
                variant="textGray"
                onClick={() => setChangeProfileModalOpen(true)}
              >
                정보수정
              </Button>
              <Button
                borderRadius={0}
                borderWidth={0}
                flex={1}
                variant="textGray"
                onClick={() => handleLogoutButtonClick()}
              >
                <LogoutIcon mr="5px" />
                {myProfile.isMobytalk ? "로그아웃" : "시스템종료"}
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
      <ChangeProfileModal
        isOpen={changeProfileModalOpen}
        myProfile={myProfile}
        setModalOpen={setChangeProfileModalOpen}
      />
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={onCloseLogoutModal}
        onSubmit={onSubmitLogoutModal}
        text={myProfile.isMobytalk ? "로그아웃" : "시스템 종료"}
      />
    </>
  );
}

export default Profile;
