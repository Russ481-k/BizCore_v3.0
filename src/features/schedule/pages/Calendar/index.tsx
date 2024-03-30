import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  ChannelTag,
  CollapseSection,
  CustomCard,
  CustomSelect,
  InfoBox,
  InfoElement,
  PaginationButtons,
  RangeDatePicker,
  Section,
} from "components";
import formatter from "libs/formatter";

function Calendar() {
  const handleBatchSizeChange = () => {};
  const handlePageChange = () => {};
  return (
    <VStack align="stretch" spacing={2}>
      <CustomCard isHeader="캘린더" />
      <Box>
        <CollapseSection headerTitle="일정 조회" borderBottomRadius={0}>
          {/* <FormProvider {...methods}>
            <InfoBox>
              <Flex>
                <InfoElement label="날짜">
                  <RangeDatePicker
                    name="sendDate"
                    option={sendDateOption}
                    setOption={setSendDateOption}
                    setStartDate={setStartSendDate}
                    setEndDate={setEndSendDate}
                  />
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label="구분">
                  <CustomSelect
                    codes={sortTypeOption}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sortType", {
                      // onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="상태">
                  <Flex gap={3} width="100%">
                    <CustomSelect
                      codes={receiveStatusTypeOption}
                      placeholder="전체"
                      size="sm"
                      {...methods.register("receiveStatusType", {
                        // onChange: (e) => handleSearchTypeChange(e),
                      })}
                    />
                  </Flex>
                </InfoElement>
              </Flex>
              <Flex>
                <InfoElement flex={1} label=" 채널">
                  <CustomSelect
                    codes={sendChannelOption}
                    placeholder="전체"
                    size="sm"
                    {...methods.register("sendChannel", {
                      onChange: (e) => handleSendChannelChange(e),
                    })}
                  />
                </InfoElement>
                <InfoElement flex={1} label="키워드">
                  <Flex gap={3} width="100%">
                    <CustomSelect
                      codes={searchTypeOption}
                      placeholder="전체"
                      maxW={150}
                      size="sm"
                      {...methods.register("searchType", {
                        onChange: (e) => handleSearchTypeChange(e),
                      })}
                    />
                    <Input
                      size="sm"
                      {...(methods.register("keyword"),
                      {
                        onChange: (e) => handleSearchChange(e),
                        onKeyPress: (e) => handleOnKeyPress(e),
                      })}
                    />
                  </Flex>
                </InfoElement>
              </Flex>
            </InfoBox>
            <Flex justifyContent="flex-end">
              <Button
                isLoading={true}
                variant="primaryBlue"
                onClick={handleFormSubmit}
              >
                조회
              </Button>
            </Flex>
          </FormProvider> */}
        </CollapseSection>
        <Section borderTopRadius={0} borderTopWidth={0}>
          <Flex flexDirection="column" gap={2} width="100%">
            <Flex flexDirection="column" gap={2} width="100%">
              <HStack>
                <Text fontSize="xs" fontWeight="bold">
                  검색결과 : {0} 건
                </Text>
                <Flex flex={1} gap={2} justifyContent="flex-end">
                  <Button size="sm" type="button" variant="secondaryBlue">
                    엑셀 다운로드
                  </Button>
                </Flex>
              </HStack>
              <Box
                borderLeftWidth={1}
                borderRadius="12px"
                borderRightWidth={1}
                borderTopWidth={1}
                overflow="hidden"
              >
                <Flex
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderBottomWidth={1}
                  flex={1}
                  fontSize="sm"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Text flex={1} px={4} py={2} textAlign="center">
                    채널
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    구분
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    이름
                  </Text>
                  <Text flex={2} px={4} py={2} textAlign="center">
                    번호
                  </Text>
                  <Text flex={5} px={4} py={2} textAlign="center">
                    내용
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    상태
                  </Text>
                  <Text flex={1} px={4} py={2} textAlign="center">
                    일
                  </Text>
                </Flex>
                <Flex flexDirection="column" fontSize="sm">
                  {true &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        height="38px"
                        justifyContent="space-between"
                        key={[]?.[i] + "-" + i + "-messages-skeleton"}
                      >
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={2}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={5}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                        <Skeleton
                          flex={1}
                          height="20px"
                          mx={4}
                          my={2}
                          textAlign="center"
                        />
                      </Flex>
                    ))}
                  {false ? (
                    <Flex
                      alignItems="center"
                      borderBottomWidth={1}
                      flex={1}
                      fontSize="sm"
                      justifyContent="center"
                      p={3}
                      width="100%"
                    >
                      <Text>조회된 결과가 없습니다.</Text>
                    </Flex>
                  ) : (
                    []?.map((message: any, i: number) => (
                      <Flex
                        alignItems="center"
                        borderBottomWidth={1}
                        flex={1}
                        fontSize="sm"
                        height="37px"
                        justifyContent="space-between"
                        key={message.id + "-" + i}
                        width="100%"
                        _hover={{
                          backgroundColor: "gray.50",
                        }}
                      >
                        <Text flex={1} px={4} py={2} textAlign="center">
                          <ChannelTag channelType={message?.type ?? "SMS"} />
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.etc1}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.etc3}
                        </Text>
                        <Text flex={2} px={4} py={2} textAlign="center">
                          {formatter.contactFormatter(message.callback)}
                        </Text>
                        <Text
                          flex={5}
                          overflow="hidden"
                          px={4}
                          py={2}
                          textAlign="left"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {message.msg}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {message.rslt === "0" && "성공"}
                          {message.rslt === "1" && "실패"}
                        </Text>
                        <Text flex={1} px={4} py={2} textAlign="center">
                          {format(new Date(message.sentDate), "yyyy-MM-dd")}
                        </Text>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Box>
            </Flex>
            <PaginationButtons
              batchSize={10}
              data={[]}
              pagination={{
                offset: 10,
                currentPage: 1,
                pageSize: 10,
                paged: true,
                sort: {
                  empty: false,
                  sorted: true,
                  unsorted: false,
                },
                unpaged: false,
              }}
              pageLength={10}
              onPageChange={handlePageChange}
              onBatchSizeChange={handleBatchSizeChange}
            />
          </Flex>
        </Section>
      </Box>
    </VStack>
  );
}

export default Calendar;
