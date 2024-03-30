import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  CustomModal,
  EssentialIcon,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import formatter from "libs/formatter";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface CollectiveRegistrationModalProps {
  setOpen: (isOpen: boolean) => void;
  onChange: (data: any) => void;
}
interface SubjectTable {
  이름: string;
  휴대폰번호: string;
  전화번호: string;
  변수1: string;
  변수2: string;
  변수3: string;
  변수4: string;
  변수5: string;
}

function CollectiveRegistrationModal({
  setOpen,
  onChange,
}: CollectiveRegistrationModalProps) {
  const toast = useToast();

  const [excelFileTitle, setExcelFileTitle] = useState<string>("");
  const [uploadedFileData, setUploadedFileData] = useState<any>([]);
  const handleModalClose = () => {
    setOpen(false);
  };

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const csvFileType = "text/csv";
  const excelFileExtension = ".xlsx";
  const excelFileName = "sample";
  const excelDownload = (excelData: Array<any>) => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["이름", "휴대폰번호", "전화번호", "변수1", "변수2", "변수3", "변수4"],
    ]);
    excelData.map((data: any) => {
      XLSX.utils.sheet_add_aoa(ws, [[data.title, data.content]], {
        origin: -1,
      });
      ws["!cols"] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  const mappingDataToTable = (data: SubjectTable[]) => {
    const result = data.map((item: SubjectTable, i) => {
      const phoneNumberChecker = (phoneNumber: string) => {
        if (phoneNumber?.length >= 8) {
          return formatter.contactFormatter(
            phoneNumber.replace(/[^0-9]/g, "")?.substring(0, 11)
          );
        } else {
          return "";
        }
      };

      return {
        id: item.휴대폰번호 + "-" + i,
        name: item.이름?.substring(0, 10),
        mobile: phoneNumberChecker(String(item.휴대폰번호)),
        phone: phoneNumberChecker(String(item.전화번호)),
        expression_1: item.변수1,
        expression_2: item.변수2,
        expression_3: item.변수3,
        expression_4: item.변수4,
      };
    });
    return result;
  };
  const readExcel = async (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) {
        return;
      }
      const bufferArray = e.target.result;
      const fileInformation = XLSX.read(bufferArray, {
        type: "buffer",
        cellText: false,
        cellDates: true,
      });
      const sheetName = fileInformation.SheetNames[0];
      const rawData = fileInformation.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(rawData);

      data && setUploadedFileData(mappingDataToTable(data as SubjectTable[]));
      data && setExcelFileTitle(file.name);
    };
  };
  const handleExcelFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (!e?.target.files) {
      return;
    }
    if (
      !(
        e?.target.files?.[0].type === excelFileType ||
        e?.target.files?.[0].type === csvFileType
      )
    ) {
      toast({
        render: () => (
          <ToastMessage title="파일 형식 에러" type="ERROR">
            지정된 파일 형식이 아닙니다.
            <br />
            파일 업로드를 다시 진행해주세요.
          </ToastMessage>
        ),
        duration: 5000,
      });
    } else {
      const file = e?.target.files[0];
      readExcel(file);
      toast({
        render: () => (
          <ToastMessage title="파일 등록 성공" type="SUCCESS">
            엑셀 파일이 등록되었습니다.
          </ToastMessage>
        ),
      });
    }
  };
  const handleImportSubjects = () => {
    onChange(uploadedFileData);
    setOpen(false);
  };

  return (
    <CustomModal isOpen onClose={() => setOpen(false)}>
      <ModalContent minW="900px">
        <ModalHeader> 대상자 일괄 등록</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3} height="200px">
            <TipText
              hasBg
              text="샘플파일을 다운로드 받으신 후 정해진 서식에 따라 연락처를 정리하세요. 정리된 파일을 업로드 후 [등록] 버튼을 클릭하면 연락처로 일괄 등록됩니다."
            />
            <InfoBox>
              <InfoElement label="엑셀 파일" labelWidth="130px" required>
                <Flex alignItems="center" gap={3} width="100%">
                  <Input
                    display="none"
                    id="fileUpload"
                    type="file"
                    accept=".xlsx, .xlx, .csv"
                    onChange={(e) => handleExcelFileChange(e)}
                  />
                  <Text fontSize="14px" width="100%">
                    {excelFileTitle.length
                      ? excelFileTitle
                      : "파일을 선택해주세요"}
                  </Text>
                  <Flex gap={2}>
                    {excelFileTitle.length ? (
                      <Button
                        as="label"
                        htmlFor="fileUpload"
                        size="sm"
                        variant="secondaryBlue"
                      >
                        변경
                      </Button>
                    ) : (
                      <Button
                        as="label"
                        htmlFor="fileUpload"
                        size="sm"
                        variant="secondaryBlue"
                      >
                        찾아보기
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="secondaryGray"
                      onClick={() => excelDownload([])}
                    >
                      샘플파일 다운로드
                    </Button>
                  </Flex>
                </Flex>
              </InfoElement>
            </InfoBox>
            <Flex flexDirection="column" gap={3}>
              <Text>등록 컬럼</Text>
              <Flex
                borderWidth={1}
                fontSize="14px"
                textAlign="center"
                width="100%"
              >
                <Text borderRightColor="gray.300" borderRightWidth={1} flex={1}>
                  이름
                </Text>
                <Text
                  borderRightColor="gray.300"
                  borderRightWidth={1}
                  flex={1}
                  ml={2}
                >
                  휴대번호
                  <EssentialIcon ml={1} />
                </Text>
                <Text borderRightColor="gray.300" borderRightWidth={1} flex={1}>
                  전화번호
                </Text>
                <Text borderRightColor="gray.300" borderRightWidth={1} flex={1}>
                  변수1
                </Text>
                <Text borderRightColor="gray.300" borderRightWidth={1} flex={1}>
                  변수2
                </Text>
                <Text borderRightColor="gray.300" borderRightWidth={1} flex={1}>
                  변수3
                </Text>
                <Text flex={1}>변수4</Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            isDisabled={!uploadedFileData.length}
            variant="primaryBlue"
            onClick={handleImportSubjects}
          >
            일괄 등록
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}
export default CollectiveRegistrationModal;
