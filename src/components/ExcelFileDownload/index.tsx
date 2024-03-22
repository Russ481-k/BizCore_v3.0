import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import ToastMessage from "components/ToastMessage";
import { useAppSelector } from "storage/redux/hooks";

const ExcelFileDownload = ({ url }: { url: string }) => {
  const toast = useToast();
  const token = useAppSelector((state) => state?.user?.accessToken);
  const handleExcelDownloadButtonClick = async () => {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "example.xlsx";
      link.click();
      toast({
        render: () => (
          <ToastMessage title="엑셀 다운로드 완료" type="SUCCESS">
            템플릿 목록을 엑셀 파일로 다운로드하였습니다.
          </ToastMessage>
        ),
        duration: 3000,
      });
    } catch (error) {
      toast({
        render: () => (
          <ToastMessage title="엑셀 다운로드 오류" type="ERROR">
            엑셀 다운로드 중 알 수 없는 오류가 발생하였습니다.
            <br />
            엑셀 다운로드를 다시 진행 하세요. 본 오류가 계속 발생하는 경우
            시스템 관리자에게 문의하기 바랍니다.
          </ToastMessage>
        ),
      });
    }
  };

  return (
    <Button
      size="sm"
      type="button"
      variant="secondaryBlue"
      onClick={handleExcelDownloadButtonClick}
    >
      엑셀 다운로드
    </Button>
  );
};

export default ExcelFileDownload;
