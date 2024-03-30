import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import TuiCalendar from "@toast-ui/react-calendar";

import { getDate } from "date-fns";
import { useState } from "react";

import { CollapseSection, Section } from "components";

interface CalendarInfo {
  id: string;
  name: string;
  bgColor: string;
  borderColor: string;
}
enum ViewType {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}
interface CalendarInfo {}

interface Scadules {
  id: string;
  calendarId: string;
  title: string;
  category: string;
  dueDateClass: string;
  start: string;
  end: string;
  isReadOnly?: boolean;
}

function Calendar() {
  const [selectedView, setSelectedView] = useState<ViewType | undefined>(
    ViewType.MONTH
  );

  const handleCalendarViewButtonClick = (viewType: ViewType) => {
    setSelectedView(viewType);
  };
  const today = new Date().getTime();

  const calendars: CalendarInfo[] = [
    {
      id: "0",
      name: "Private",
      bgColor: "#9e5fff",
      borderColor: "#9e5fff",
    },
    {
      id: "1",
      name: "Company",
      bgColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
  ];

  // Especially avoid to declare the `template` prop inside the component.

  const scadules: Scadules[] = [
    {
      id: "1",
      calendarId: "0",
      title: "TOAST UI Calendar Study",
      category: "time",
      dueDateClass: "",
      start: today.toString(),
      end: getDate(today + 3).toString(),
    },
    {
      id: "2",
      calendarId: "0",
      title: "Practice",
      category: "milestone",
      dueDateClass: "",
      start: getDate(today + 1).toString(),
      end: getDate(today + 1).toString(),
      isReadOnly: true,
    },
    {
      id: "3",
      calendarId: "0",
      title: "FE Workshop",
      category: "allday",
      dueDateClass: "",
      start: getDate(today - 2).toString(),
      end: getDate(today - 1).toString(),
      isReadOnly: true,
    },
    {
      id: "4",
      calendarId: "0",
      title: "Report",
      category: "time",
      dueDateClass: "",
      start: today.toString(),
      end: getDate(today + 1).toString(),
    },
  ];

  const template = {
    milestone(schedule: any) {
      return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
    },
    milestoneTitle() {
      return "Milestone";
    },
    allday(schedule: any) {
      return `${schedule.title}<i class="fa fa-refresh"></i>`;
    },
    alldayTitle() {
      return "All Day";
    },
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Box>
        <CollapseSection
          headerTitle={
            <Text color="black" fontSize="lg" fontWeight="600">
              캘린더
            </Text>
          }
          borderBottomRadius={0}
        >
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
                <InfoElement flex={1} label=" 판매방식">
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
            <Flex>
              <Button
                onClick={() => handleCalendarViewButtonClick(ViewType.MONTH)}
              >
                월간
              </Button>
              <Button
                onClick={() => handleCalendarViewButtonClick(ViewType.WEEK)}
              >
                주간
              </Button>
              <Button
                onClick={() => handleCalendarViewButtonClick(ViewType.DAY)}
              >
                일간
              </Button>
            </Flex>
            <Flex flexDirection="column" gap={2} width="100%">
              <Box
                borderLeftWidth={1}
                borderRadius="12px"
                borderRightWidth={1}
                borderTopWidth={1}
                overflow="hidden"
              >
                <TuiCalendar
                  usageStatistics={true}
                  calendars={calendars}
                  // disableDblClick={false}
                  // disableDblClick={true}
                  isReadOnly={false}
                  month={{
                    startDayOfWeek: 0,
                  }}
                  // scadules={scadules}
                  // scheduleView={}
                  // taskView={}
                  template={template}
                  // theme={myTheme}
                  // timezones={[
                  //   {
                  //     timezoneOffset: 540,
                  //     displayLabel: "GMT+09:00",
                  //     tooltip: "Seoul",
                  //   },
                  //   {
                  //     timezoneOffset: -420,
                  //     displayLabel: "GMT-08:00",
                  //     tooltip: "Los Angeles",
                  //   },
                  // ]}
                  useDetailPopup
                  // useCreationPopup
                  view={selectedView} // You can also set the `defaultView` option.
                  week={{
                    showTimezoneCollapseButton: true,
                    timezonesCollapsed: true,
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        </Section>
      </Box>
    </VStack>
  );
}

export default Calendar;
