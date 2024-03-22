import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import {
  CollapseSection,
  CustomTableContainer,
  EssentialIcon,
  NoDataTr,
} from "components";
import formatter from "libs/formatter";
import Subject from "type/Subject";
import CollectiveRegistrationModal from "./CollectiveRegistrationModal";
import ImportAddressModal from "./ImportAddressModal";
import ImportStaffAddressModal from "./ImportStaffAddressModal";

interface SubjectPanelProps {
  isDisabled?: boolean;
  isReset: boolean;
  onChange: (params: Array<Subject>) => void;
}
function SubjectPanel({ isDisabled, isReset, onChange }: SubjectPanelProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    setValue,
  } = useForm<Subject>();
  const location = useLocation();

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [checkedSubject, setCheckedSubject] = useState<number[]>([]);
  const [collectiveRegistrationModalOpen, setCollectiveRegistrationModalOpen] =
    useState<boolean>(false);
  const [importAddressModalOpen, setImportAddressModalOpen] =
    useState<boolean>(false);
  const [importStaffAddressModalOpen, setImportStaffAddressModalOpen] =
    useState<boolean>(false);
  const [subjectsData, setSubjectsData] = useState<Subject[]>([]);

  const allChecked = !!checkedItems.length && checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheckboxCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxArray = subjectsData?.map(() => e.target.checked);
    setCheckedItems([...checkboxArray]);
    if (e.target.checked) {
      setCheckedSubject(subjectsData?.map((data) => data.id));
    } else {
      setCheckedSubject([]);
    }
  };
  const handleReceiverDeleteClick = useCallback(
    (ids: Array<number>) => {
      const result = subjectsData?.filter((data, i) => {
        if (ids.includes(data.id)) {
          setCheckedItems([...checkedItems.filter((_, j) => i !== j)]);
          return false;
        }
        return true;
      });
      setSubjectsData(result);
      setCheckedSubject([]);
    },
    [checkedItems, subjectsData]
  );
  const subjectDataRenderer = useMemo(() => {
    return subjectsData?.map((data, i) => {
      return {
        id: data.id,
        name: (
          <Input
            defaultValue={data.name ?? ""}
            isDisabled={isDisabled}
            name={`name_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              subjectsData[i].name = e.target.value;
            }}
          />
        ),
        mobile: (
          <Input
            defaultValue={data.mobile ?? ""}
            isDisabled={isDisabled}
            name={`mobile_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              e.target.value = formatter.contactFormatter(
                e.target.value.replace(/[^0-9]/g, "").substring(0, 11)
              );
              subjectsData[i].mobile = e.target.value;
            }}
          />
        ),
        phone: (
          <Input
            defaultValue={data.phone ?? ""}
            isDisabled={isDisabled}
            name={`phone_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              e.target.value = formatter.contactFormatter(
                e.target.value.replace(/[^0-9]/g, "").substring(0, 11)
              );
              subjectsData[i].phone = e.target.value;
            }}
          />
        ),
        expression_1: (
          <Input
            defaultValue={data.expression_1}
            isDisabled={isDisabled}
            name={`expression_1_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              subjectsData[i].expression_1 = e.target.value;
            }}
          />
        ),
        expression_2: (
          <Input
            defaultValue={data.expression_2}
            isDisabled={isDisabled}
            name={`expression_2_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              subjectsData[i].expression_2 = e.target.value;
            }}
          />
        ),
        expression_3: (
          <Input
            defaultValue={data.expression_3}
            isDisabled={isDisabled}
            name={`expression_3_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              subjectsData[i].expression_3 = e.target.value;
            }}
          />
        ),
        expression_4: (
          <Input
            defaultValue={data.expression_4}
            isDisabled={isDisabled}
            name={`expression_4_${i}_change`}
            size="sm"
            textAlign="center"
            onBlur={(e) => {
              subjectsData[i].expression_4 = e.target.value;
            }}
          />
        ),
        delete: (
          <Button
            isDisabled={isDisabled}
            size="sm"
            variant="secondaryBlue"
            width="60px"
            onClick={() => handleReceiverDeleteClick([data.id])}
          >
            삭제
          </Button>
        ),
      };
    });
  }, [isDisabled, subjectsData, handleReceiverDeleteClick]);
  const handleCollectiveRegistrationModalButtonClick = () => {
    setCollectiveRegistrationModalOpen(true);
  };
  const handleImportAddressModalButtonClick = () => {
    setImportAddressModalOpen(true);
  };
  const handleImportStaffAddressModalButtonClick = () => {
    setImportStaffAddressModalOpen(true);
  };
  const handleReceiverAddButtonClick = handleSubmit(
    ({
      name,
      mobile,
      phone,
      expression_1,
      expression_2,
      expression_3,
      expression_4,
    }) => {
      setSubjectsData([
        {
          id: Math.floor(Math.random() * 10000),
          name,
          mobile,
          phone,
          expression_1,
          expression_2,
          expression_3,
          expression_4,
        },
        ...subjectsData,
      ]);
      setCheckedItems([false, ...checkedItems]);
      resetField("name");
      resetField("mobile");
      resetField("phone");
      resetField("expression_1");
      resetField("expression_2");
      resetField("expression_3");
      resetField("expression_4");
      onChange([...subjectsData]);
    }
  );
  const handleImportSubjects = (e: Subject[]) => {
    setSubjectsData([...e, ...subjectsData]);
  };

  useEffect(() => {
    if (isReset) {
      onChange([]);
      setSubjectsData([]);
      setCheckedItems([false]);
    } else {
      onChange([...subjectsData]);
      const checkboxArray = subjectsData?.map(() => false);
      setCheckedItems([...checkboxArray]);
    }
  }, [isReset, subjectsData, onChange]);

  useEffect(() => {
    if (location.state && location.state.subjects) {
      const { subjects: importSubjects } = location.state;

      const subjectData = importSubjects.map(
        (subject: {
          msgId: number;
          name: string;
          phone: string;
          callNumber: string;
          setValue1: string;
          setValue2: string;
          setValue3: string;
          setValue4: string;
        }) => {
          return {
            id: subject.msgId,
            name: subject.name,
            mobile: subject.phone,
            phone: subject.callNumber,
            expression_1: subject.setValue1,
            expression_2: subject.setValue2,
            expression_3: subject.setValue3,
            expression_4: subject.setValue4,
          };
        }
      );
      setSubjectsData(subjectData ?? []);
    }
  }, [location.state]);

  return (
    <CollapseSection
      flexDirection="column"
      gap={2}
      headerTitle="수신 대상자 선택"
      mb={5}
      width="100%"
    >
      <Flex flex={1}>
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="xs" fontWeight="bold">
            대상자 수 : {subjectsData?.length} 명
          </Text>
          <Flex flex={1} gap={2} justifyContent="flex-end" px={4}>
            <Button
              isDisabled={isDisabled}
              size="sm"
              type="button"
              variant="secondaryBlue"
              width="130px"
              onClick={handleImportStaffAddressModalButtonClick}
            >
              직원 연락처 불러오기
            </Button>
            <Button
              isDisabled={isDisabled}
              size="sm"
              type="button"
              variant="secondaryBlue"
              width="130px"
              onClick={handleImportAddressModalButtonClick}
            >
              주소록 불러오기
            </Button>
            <Button
              isDisabled={isDisabled}
              size="sm"
              type="button"
              variant="secondaryBlue"
              width="130px"
              onClick={handleCollectiveRegistrationModalButtonClick}
            >
              일괄 등록
            </Button>
          </Flex>
        </HStack>
      </Flex>
      <Box width="100%">
        <CustomTableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th width="50px" py={4}>
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    isDisabled={checkedItems.length === 0 || isDisabled}
                    onChange={(e) => handleCheckboxCheckAll(e)}
                  />
                </Th>
                <Th width="120px">이름</Th>
                <Th width="150px">
                  휴대폰번호
                  <EssentialIcon ml={1} mr="-15px" />
                </Th>
                <Th width="150px">전화번호</Th>
                <Th>변수1</Th>
                <Th>변수2</Th>
                <Th>변수3</Th>
                <Th>변수4</Th>
                <Th>관리</Th>
              </Tr>
              <Tr>
                <Th width="50px"></Th>
                <Th>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    size="sm"
                    {...register("name")}
                  />
                </Th>
                <Th>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    isInvalid={!!errors.mobile}
                    size="sm"
                    {...register("mobile", {
                      minLength: {
                        value: 8,
                        message: "최소 8자 이상 입력하세요.",
                      },
                      required: true,
                      onBlur: (e) =>
                        setValue(
                          "mobile",
                          formatter.contactFormatter(
                            e.target.value
                              .replace(/[^0-9]/g, "")
                              .substring(0, 11)
                          )
                        ),
                    })}
                  />
                </Th>
                <Th>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    isInvalid={!!errors.phone}
                    size="sm"
                    {...register("phone", {
                      onBlur: (e) =>
                        setValue(
                          "phone",
                          formatter.contactFormatter(
                            e.target.value
                              .replace(/[^0-9]/g, "")
                              .substring(0, 11)
                          )
                        ),
                      minLength: {
                        value: 8,
                        message: "최소 8자 이상 입력하세요.",
                      },
                    })}
                  />
                </Th>
                <Th key={`expression_1_add`}>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    size="sm"
                    {...register("expression_1")}
                  />
                </Th>
                <Th key={`expression_2_add`}>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    size="sm"
                    {...register("expression_2")}
                  />
                </Th>
                <Th key={`expression_3_add`}>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    size="sm"
                    {...register("expression_3")}
                  />
                </Th>
                <Th key={`expression_4_add`}>
                  <Input
                    borderColor="gray.400"
                    isDisabled={isDisabled}
                    size="sm"
                    {...register("expression_4")}
                  />
                </Th>
                <Th>
                  <Button
                    isDisabled={isDisabled}
                    size="sm"
                    variant="secondaryBlue"
                    width="60px"
                    onClick={handleReceiverAddButtonClick}
                  >
                    추가
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!!subjectsData?.length ? (
                subjectDataRenderer?.map((data, i) => {
                  return (
                    <Tr key={data.id + i}>
                      <Td width="50px">
                        <Checkbox
                          isChecked={checkedItems[i]}
                          onChange={(e) => {
                            checkedItems[i] = e.target.checked;
                            e.target.checked
                              ? setCheckedSubject([...checkedSubject, data.id])
                              : setCheckedSubject(
                                  checkedSubject.filter((id) => id !== data.id)
                                );
                          }}
                        />
                      </Td>
                      <Td>{data.name}</Td>
                      <Td>{data.mobile}</Td>
                      <Td>{data.phone}</Td>
                      <Td>{data.expression_1}</Td>
                      <Td>{data.expression_2}</Td>
                      <Td>{data.expression_3}</Td>
                      <Td>{data.expression_4}</Td>
                      <Td>{data.delete}</Td>
                    </Tr>
                  );
                })
              ) : (
                <NoDataTr colspan={9} text="수신 대상자를 등록하세요." />
              )}
              {(isIndeterminate || allChecked) && (
                <Tr>
                  <Td colSpan={2}>
                    <Button
                      px={2}
                      size="sm"
                      variant="secondaryBlue"
                      onClick={() => handleReceiverDeleteClick(checkedSubject)}
                    >
                      {allChecked ? "전체 " : "선택 "}
                      삭제
                    </Button>
                  </Td>
                  <Td colSpan={7} />
                </Tr>
              )}
            </Tbody>
          </Table>
        </CustomTableContainer>
      </Box>
      {collectiveRegistrationModalOpen && (
        <CollectiveRegistrationModal
          onChange={handleImportSubjects}
          setOpen={setCollectiveRegistrationModalOpen}
        />
      )}
      {importAddressModalOpen && (
        <ImportAddressModal
          onChange={handleImportSubjects}
          setOpen={setImportAddressModalOpen}
        />
      )}
      {importStaffAddressModalOpen && (
        <ImportStaffAddressModal
          onChange={handleImportSubjects}
          setOpen={setImportStaffAddressModalOpen}
        />
      )}
    </CollapseSection>
  );
}
export default React.memo(SubjectPanel);
