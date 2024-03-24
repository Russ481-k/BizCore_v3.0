/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  CollapseSection,
  CustomCard,
  CustomSelect,
  CustomTableContainer,
  DeptGroupsTreePannel,
  InfoBox,
  InfoElement,
  NoDataTr,
  PaginationButtons,
  Section,
  SendIcon,
  SortableTh,
  TimelineIcon,
} from "components";
import {
  useGetDeptGroups,
  useGetPermission,
  useGetSendCountTotal,
  useGetUser,
  useGetUsers,
  USERS_OPTION,
} from "features/user";
import { convertCodeToName } from "libs/converter";
import { DEPARTMENT_GROUP } from "libs/fixture";
import { useAppSelector } from "storage/redux/hooks";
import Department from "type/Department";
import DepartmentGroup from "type/DepartmentGroup";
import MyProfile from "type/MyProfile";
import Option from "type/Option";
import UserListItem from "type/UserListItem";
import UserSendData from "type/UserSendData";
import AddUserModal from "./AddUserModal";
import ManageUserModal from "./ManageUserModal";
import SendDetailModal from "./SendDetailModal";

interface SearchForm {
  status: string[];
  permissionId: string | null;
  targetColumn: string;
  keyword: string;
}
const searchFormDefaultValues = {
  status: ["W", "D", "E"],
  permissionId: "0",
  targetColumn: "all",
  keyword: "",
};

function UserManage() {
  const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [getDeptGroupsEnabled, setGetDeptGroupsEnabled] =
    useState<boolean>(false);
  const [getUserEnabled, setGetUserEnabled] = useState<boolean>(false);
  const [getUsersEnabled, setGetUsersEnabled] = useState<boolean>(false);
  const [getSendCountTotalEnabled, setGetSendCountTotalEnabled] =
    useState<boolean>(false);
  const [manageUserModalOpen, setManageUserModalOpen] =
    useState<boolean>(false);
  const [permissionOptions, setPermissionOptions] = useState<Option[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchPermissionId, setSearchPermissionId] = useState<number | null>(
    null
  );
  const [searchPermissionOptions, setSearchPermissionOptions] = useState<
    Option[]
  >([]);
  const [searchStatus, setSearchStatus] = useState<string[]>(["W", "D", "E"]);
  const [searchTargetColumn, setSearchTargetColumn] = useState<string>("all");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedDeptGroup, setSelectedDeptGroup] = useState<DepartmentGroup>(
    DEPARTMENT_GROUP.ALL
  );
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [sendDetailModalOpen, setSendDetailModalOpen] =
    useState<boolean>(false);
  const [sortBy, setSortBy] = useState<keyof UserListItem>("userId");
  const [sortedUsersData, setSortedUsersData] = useState<UserListItem[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    control,
    handleSubmit,
    register,
    reset: resetSearchForm,
  } = useForm<SearchForm>({
    defaultValues: searchFormDefaultValues,
    mode: "onChange",
  });

  const { data: deptGroupsData } = useGetDeptGroups({
    enabled: getDeptGroupsEnabled,
    onSettled: () => {
      setGetDeptGroupsEnabled(false);
    },
  });
  const { data: permissionData } = useGetPermission();
  const {
    contents: usersData,
    paging: pagination,
    pageLength,
    totalCount,
  } = useGetUsers(
    {
      deptCode: selectedDept?.deptCode ?? null,
      status: searchStatus,
      permissionId: searchPermissionId,
      keyword: searchKeyword,
      targetColumn: searchTargetColumn,
      isBizCore: selectedDeptGroup.isBizCore,
      currentPage,
      pageSize: batchSize,
    },
    {
      enabled: getUsersEnabled,
      onSettled: () => {
        setGetUsersEnabled(false);
      },
    }
  );
  const { data: userData, refetch: refetchUser } = useGetUser(
    {
      userIdx: selectedUser?.userIdx ?? null,
    },
    {
      enabled: getUserEnabled,
      retry: 0,
      onSettled: () => {
        setGetUserEnabled(false);
      },
    }
  );
  const { data: sendCountTotalData, refetch: refetchSendCountTotal } =
    useGetSendCountTotal(
      {
        userIdx: selectedUser?.userIdx ?? null,
      },
      {
        enabled: getSendCountTotalEnabled,
        retry: 0,
        onSettled: () => {
          setGetSendCountTotalEnabled(false);
        },
      }
    );

  const handleSearchFormSubmit = handleSubmit((data) => {
    const permissionIdParams =
      data.permissionId === "0" ? null : Number(data.permissionId);
    setSearchStatus(data.status);
    setSearchPermissionId(permissionIdParams ?? null);
    setSearchTargetColumn(data.targetColumn);
    setSearchKeyword(data.keyword);
    onRefetchUsers();
  });

  const handleSortOrder = (columnName: keyof UserListItem) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const handleSortedData = useCallback(
    (data: UserListItem[]): UserListItem[] => {
      if (sortBy) {
        return data.slice().sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }
      return data;
    },
    [sortBy, sortOrder]
  );

  const handleBatchSizeChange = (batchSize: number) => {
    setBatchSize(batchSize);
    onRefetchUsers();
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onRefetchUsers();
  };

  const onRefetchUsers = useCallback(() => {
    setGetUsersEnabled(true);
    const targetElement = document.getElementById("main");
    targetElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setGetUsersEnabled]);

  const onRefetchPage = useCallback(() => {
    resetSearchForm();
    setGetDeptGroupsEnabled(true);
    setSelectedDept(null);
    onRefetchUsers();
  }, [onRefetchUsers, resetSearchForm]);

  const handleAddUserButtonClick = () => {
    setAddUserModalOpen(true);
  };

  const handleManageUserButtonClick: (user: UserListItem) => void = (user) => {
    setSelectedUser(user);
    setManageUserModalOpen(true);
  };

  const handleSendDetailButtonClick: (user: UserListItem) => void = (user) => {
    setSelectedUser(user);
    setSendDetailModalOpen(true);
  };

  useEffect(() => {
    let permissionOptions: Option[] = [];
    let searchPermissionOptions: Option[] = [];
    if (permissionData) {
      permissionOptions = permissionData.map((item) => {
        return {
          code: String(item.permissionsId),
          name: item.authName,
        };
      });
      setPermissionOptions(permissionOptions);
      searchPermissionOptions = permissionData.map((item) => {
        return {
          code: String(item.permissionsId),
          name: item.authName,
        };
      });
      searchPermissionOptions.unshift({
        code: "0",
        name: "전체",
      });
      setSearchPermissionOptions(searchPermissionOptions);
    }
  }, [permissionData]);

  useEffect(() => {
    if (usersData) {
      const sorted = handleSortedData(usersData);
      setSortedUsersData(sorted);
    }
  }, [usersData, sortBy, sortOrder, handleSortedData]);

  useEffect(() => {
    if (selectedUser) {
      refetchUser();
      refetchSendCountTotal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const myProfile = useAppSelector((state) => state.user.profile);
  const mySendData = useAppSelector((state) => state.user.sendData);
  const prevMyProfileRef = useRef<MyProfile | null>(null);
  const prevMySendDataRef = useRef<UserSendData | null>(null);

  useEffect(() => {
    prevMyProfileRef.current = myProfile;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prevMyProfile = prevMyProfileRef.current;
    const prevMySendData = prevMySendDataRef.current;
    if (
      (prevMyProfile && myProfile !== prevMyProfile) ||
      (prevMySendData && mySendData !== prevMySendData)
    ) {
      onRefetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile, mySendData]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="운영자 관리" />
      <CustomCard>
        {/* TODO: 추후 새올시스템 연동시 연결 */}
        <TimelineIcon boxSize={4} me={1} />
        <Text fontSize="sm">마지막 연동 일시: 2023년 8월 21일 11시 00분</Text>
      </CustomCard>
      <HStack alignItems="flex-start" spacing={3}>
        <Box flex="0 0 300px">
          <DeptGroupsTreePannel
            deptGroupsData={deptGroupsData}
            selectedDeptGroup={selectedDeptGroup}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            setSelectedDeptGroup={setSelectedDeptGroup}
            onRefetchPage={onRefetchPage}
            onRefetchUsers={onRefetchUsers}
            onResetSearchForm={resetSearchForm}
          />
        </Box>
        <VStack align="stretch" direction="column" flex={1}>
          {/* TODO: 다음 개발단계에서 적용 */}
          {/* <CustomCard justify="space-between">
            <Flex align="center">
              <TipText
                text="[운영자발송량 일괄수정] 버튼을 클릭하여 조건에 일치하는 운영자의
                발송량을 일괄 수정하세요."
              />
            </Flex>
            <Button size="sm" variant="secondaryBlue">
              운영자 발송량 일괄수정
            </Button>
          </CustomCard> */}
          <Box>
            <CollapseSection headerTitle="운영자 목록" borderBottomRadius={0}>
              <VStack align="stretch" as="form" spacing={3}>
                <InfoBox>
                  <InfoElement label="선택부서">
                    <Text fontSize="sm">
                      {selectedDept
                        ? selectedDept.deptName
                        : selectedDeptGroup.groupName}
                    </Text>
                  </InfoElement>
                  <Flex>
                    <InfoElement flex={6} label="상태">
                      <Controller
                        control={control}
                        name="status"
                        render={({ field: { onChange, value } }) => (
                          <CheckboxGroup
                            defaultValue={["W", "D", "E"]}
                            value={value}
                            onChange={(vals) => onChange(vals)}
                          >
                            <HStack spacing={4}>
                              {USERS_OPTION.STATUS.map((option: Option) => {
                                return (
                                  <Checkbox
                                    key={`state-${option.code}`}
                                    value={option.code}
                                  >
                                    {option.name}
                                  </Checkbox>
                                );
                              })}
                            </HStack>
                          </CheckboxGroup>
                        )}
                      />
                    </InfoElement>
                    <InfoElement flex={6} label="권한">
                      <CustomSelect
                        codes={searchPermissionOptions}
                        size="sm"
                        {...register("permissionId")}
                      />
                    </InfoElement>
                  </Flex>
                  <InfoElement label="키워드">
                    <Flex w="100%">
                      <CustomSelect
                        codes={USERS_OPTION.TARGET_COLUMN}
                        maxW={150}
                        size="sm"
                        {...register("targetColumn")}
                      />
                      <Input
                        ms={2}
                        size="sm"
                        flex={1}
                        {...register("keyword")}
                      />
                    </Flex>
                  </InfoElement>
                </InfoBox>
                <Flex justify="flex-end">
                  <Button
                    type="submit"
                    variant="primaryBlue"
                    onClick={handleSearchFormSubmit}
                  >
                    조회
                  </Button>
                </Flex>
              </VStack>
            </CollapseSection>
            <Section borderTopRadius={0} borderTopWidth={0}>
              <VStack align="stretch" spacing={3}>
                <Flex align="flex-end" justify="space-between">
                  <Text fontSize="xs" fontWeight="bold">
                    조회수 : {totalCount} 명
                  </Text>
                  <Flex flex={1} gap={2} justify="flex-end">
                    <Button size="sm" type="button" variant="secondaryBlue">
                      엑셀 다운로드
                    </Button>
                    <Button
                      isDisabled={
                        selectedDeptGroup !== DEPARTMENT_GROUP.ADDITION
                      }
                      size="sm"
                      type="button"
                      variant="primaryBlue"
                      onClick={handleAddUserButtonClick}
                    >
                      운영자등록
                    </Button>
                  </Flex>
                </Flex>
                <CustomTableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th width="60px">No</Th>
                        <SortableTh
                          text="아이디"
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                          sortValue="userId"
                          // onClick={() => handleSortOrder("userId")}
                        />
                        <SortableTh
                          text="이름"
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                          sortValue="userName"
                          // onClick={() => handleSortOrder("userName")}
                        />
                        <Th>직급</Th>
                        <Th>부서</Th>
                        <Th>권한</Th>
                        <Th>단문</Th>
                        <Th>장문</Th>
                        <Th>멀티</Th>
                        <Th>알림톡</Th>
                        <Th>양방향</Th>
                        <Th>당월발송량</Th>
                        <Th>상태</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* TODO: 추후 정렬관련 수정 */}
                      {/* {sortedUsersData && sortedUsersData.length > 0 ? (
                        sortedUsersData.map((user, i) => ( */}
                      {usersData && usersData.length > 0 ? (
                        usersData.map((user, i) => (
                          <Tr key={`user-${user.userIdx}`}>
                            <Td>
                              {totalCount &&
                                totalCount - batchSize * (currentPage - 1) - i}
                            </Td>
                            <Td>
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleManageUserButtonClick(user)
                                }
                              >
                                {user.userId}
                              </Button>
                            </Td>
                            <Td>{user.userName}</Td>
                            <Td>{user.positionName}</Td>
                            <Td>
                              <Text
                                maxW="100%"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {user.deptName}
                              </Text>
                            </Td>
                            <Td>{user.authName ?? "-"}</Td>
                            <Td>
                              {user.isSmsUnlimited
                                ? "무제한"
                                : user.smsLimitCount ?? "-"}
                            </Td>
                            <Td>
                              {user.isLmsUnlimited
                                ? "무제한"
                                : user.lmsLimitCount ?? "-"}
                            </Td>
                            <Td>
                              {user.isMmsUnlimited
                                ? "무제한"
                                : user.mmsLimitCount ?? "-"}
                            </Td>
                            <Td>
                              {user.isKktUnlimited
                                ? "무제한"
                                : user.kktLimitCount ?? "-"}
                            </Td>
                            <Td>
                              {user.isCrsUnlimited
                                ? "무제한"
                                : user.crsLimitCount ?? "-"}
                            </Td>
                            <Td py={0}>
                              <IconButton
                                aria-label="당월 발송량 상세"
                                icon={<SendIcon boxSize={4} />}
                                variant="transparent"
                                size="sm"
                                onClick={() =>
                                  handleSendDetailButtonClick(user)
                                }
                              />
                            </Td>
                            <Td>
                              {convertCodeToName(
                                USERS_OPTION.STATUS,
                                user.status
                              )}
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <NoDataTr
                          colspan={13}
                          text="조회된 운영자가 없습니다."
                        />
                      )}
                    </Tbody>
                  </Table>
                </CustomTableContainer>
                <PaginationButtons
                  batchSize={batchSize}
                  data={usersData ?? []}
                  pageLength={pageLength}
                  pagination={pagination}
                  onBatchSizeChange={handleBatchSizeChange}
                  onPageChange={handlePageChange}
                />
              </VStack>
            </Section>
          </Box>
        </VStack>
      </HStack>
      <AddUserModal
        isOpen={addUserModalOpen}
        permissionOptions={permissionOptions}
        selectedDept={selectedDept}
        onRefetchPage={onRefetchPage}
        setModalOpen={setAddUserModalOpen}
      />
      {selectedUser && sendCountTotalData && (
        <SendDetailModal
          isOpen={sendDetailModalOpen}
          userData={userData}
          sendData={sendCountTotalData}
          userIdx={selectedUser.userIdx}
          onRefetchPage={onRefetchPage}
          setModalOpen={setSendDetailModalOpen}
        />
      )}
      {selectedUser && (
        <ManageUserModal
          isModify={selectedUser.isBizCore ?? false}
          isOpen={manageUserModalOpen}
          permissionOptions={permissionOptions}
          userData={userData}
          userIdx={selectedUser.userIdx}
          onRefetchPage={onRefetchPage}
          setModalOpen={setManageUserModalOpen}
          setSelectedUser={setSelectedUser}
        />
      )}
    </VStack>
  );
}

export default UserManage;
