import { Box, BoxProps, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { ViewImageModal } from "components";

interface PreviewMessageProps {
  type: "S" | "R"; // S:발신 / R:수신
  text: string;
  date?: string;
  filePath?: string | null;
  clickableFile?: boolean;
}
function PreviewMessage({
  type,
  text,
  filePath,
  date,
  clickableFile,
  ...props
}: PreviewMessageProps & BoxProps) {
  const [viewImageUrl, setViewImageUrl] = useState<string>("");
  const [viewImageModalOpen, setViewImageModalOpen] = useState<boolean>(false);
  const handleImageMsgClick = (filePath: string) => {
    setViewImageUrl(filePath);
    setViewImageModalOpen(true);
  };
  const onCloseViewImageModal = () => {
    setViewImageModalOpen(false);
  };

  useEffect(() => {
    if (filePath) {
      setViewImageUrl(filePath);
    }
  }, [filePath]);

  return (
    <>
      <Box
        alignItems={type === "S" ? "flex-end" : "flex-start"}
        alignSelf={type === "S" ? "flex-end" : "flex-start"}
        display="inline-flex"
        flexDirection="column"
        mb="1rem"
        {...props}
      >
        {filePath && (
          <Image
            alt="첨부파일"
            borderRadius="0.75rem"
            cursor={clickableFile ? "pointer" : "inherit"}
            maxWidth="200px"
            // TODO: 정상 연결될 때 URL수정
            // src={viewImageUrl}
            src={"https://cdn.imweb.me/thumbnail/20220504/b3cfa3b5bc931.jpg"}
            onClick={() => clickableFile && handleImageMsgClick(filePath)}
          />
        )}
        {filePath && text === "" ? null : (
          <Text
            as="p"
            bg={type === "S" ? "primary.700" : "gray.200"}
            borderRadius="0.5rem"
            color={type === "S" ? "white" : "gray.900"}
            fontSize="sm"
            fontWeight="400"
            lineHeight={5}
            maxW="200px"
            mt={filePath ? "0.4rem" : 0}
            p={text === "" ? 0 : "0.625rem 1rem"}
            whiteSpace="pre-line"
            wordBreak="keep-all"
          >
            {text}
          </Text>
        )}
        {date && (
          <Text
            as="small"
            color="gray.800"
            fontSize="xs"
            lineHeight="0.65rem"
            mt="0.4rem"
          >
            {format(new Date(date), "yyyy-MM-dd HH:mm")}
          </Text>
        )}
      </Box>
      <ViewImageModal
        isOpen={viewImageModalOpen}
        url={viewImageUrl}
        onClose={onCloseViewImageModal}
      />
    </>
  );
}
export default PreviewMessage;
