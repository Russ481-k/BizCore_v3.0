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
import { format } from "date-fns";
import * as FileSaver from "file-saver";
import { ChangeEvent, useState } from "react";

import * as XLSX from "xlsx";

import {
  CustomModal,
  CustomSelect,
  InfoBox,
  InfoElement,
  TipText,
  ToastMessage,
} from "components";
import { useAddAddressesByExcel, useGetAddressGroups } from "features/address";

interface CollectiveAddressRegistrationModalProps {
  selectedAddressGroupId?: number;
  onRefetch: () => void;
  setOpen: (isOpen: boolean) => void;
}

function CollectiveAddressRegistrationModal({
  selectedAddressGroupId,
  onRefetch,
  setOpen,
}: CollectiveAddressRegistrationModalProps) {
  const toast = useToast();

  const { data: addressGroups } = useGetAddressGroups();
  const { mutate: addAddressesByExcel } = useAddAddressesByExcel();
  const addressGroupsCode = addressGroups?.map((group) => {
    return {
      code: String(group?.addressGroupId),
      name: group.addressGroupName,
    };
  });
  const [addressGroupId, setAddressGroupId] = useState<number>(
    !!selectedAddressGroupId
      ? selectedAddressGroupId
      : Number(!!addressGroupsCode?.length ? addressGroupsCode[0]?.code : 0)
  );
  const [excelFileTitle, setExcelFileTitle] = useState<string>("");
  const [uploadedFileData, setUploadedFileData] = useState<File>(
    new File([], "")
  );

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "sample";
  const excelDownload = (excelData: Array<any>) => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["주소록 목록 – [샘플 그룹]", "", "", ""],
      ["", "", "", ""],
      [`출력일: ${format(new Date(), "yyyy-MM-dd")}`, "", "", ""],
      ["이름", "휴대폰 번호", "전화번호", "메모"],
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

  const readExcel = async (file: File) => {
    setUploadedFileData(file);
    setExcelFileTitle(file.name);
  };
  const handleAddressGroupIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddressGroupId(Number(e.target.value));
  };
  const handleExcelFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (!e?.target.files) return;
    const file = e?.target.files[0];
    readExcel(file);
  };
  const handleImportAddresses = () => {
    addAddressesByExcel(
      {
        addressGroupId,
        file: uploadedFileData,
      },
      {
        onError: () => {
          toast({
            render: () => (
              <ToastMessage title="일괄 등록 오류" type="ERROR">
                일괄 등록 중 알 수 없는 오류가 발생하였습니다.
                <br />
                일괄 등록을 다시 진행 하세요. 본 오류가 계속 발생하는 경우
                시스템 관리자에게 문의하기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="일괄 등록 완료" type="SUCCESS">
                정상적으로 일괄 등록되였습니다.
              </ToastMessage>
            ),
          });
          setOpen(false);
          onRefetch();
        },
      }
    );
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <CustomModal isOpen onClose={() => setOpen(false)}>
      <ModalContent minW="680px">
        <ModalHeader>연락처 일괄 등록</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <TipText
              hasBg
              text={`샘플파일을 다운로드 받으신 후 정해진 서식에 따라 연락처를 정리하세요.\n등록할 주소록 그룹을 선택하신 다음 정리된 파일을 업로드 후 [등록] 버튼을 클릭하면 연락처로 일괄 등록됩니다.`}
            />
            <InfoBox>
              <InfoElement label="주소록" labelWidth="130px" required>
                <CustomSelect
                  codes={addressGroupsCode}
                  key={addressGroupsCode?.[0]?.code + "-selector"}
                  size="sm"
                  value={addressGroupId}
                  onChange={handleAddressGroupIdChange}
                />
              </InfoElement>
              <InfoElement label="엑셀 파일" labelWidth="130px" required>
                <Flex alignItems="center" gap={3} width="100%">
                  <Input
                    display="none"
                    id="fileUpload"
                    type="file"
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
          </Flex>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="textGray" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primaryBlue" onClick={handleImportAddresses}>
            등록
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
}
export default CollectiveAddressRegistrationModal;
