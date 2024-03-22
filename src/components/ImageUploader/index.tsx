import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { DeleteIcon, ModifyIcon, TipText, ToastMessage } from "components";

interface ImageUploaderProps {
  imageURLs?: string[];
  isAlarmTalk?: boolean;
  isDisabled?: boolean;
  isTwoWay?: boolean;
  onChange?: (
    imageContents: File,
    url: string | null,
    index: number | null
  ) => void;
  removeImageFile?: (index: number) => void;
}
function ImageUploader({
  imageURLs,
  isAlarmTalk,
  isDisabled,
  isTwoWay,
  onChange,
  removeImageFile,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const [imageId, setImageId] = useState<number | null>(null);

  const handleAddImageButtonClick = (i: number | null) => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
      setImageId(i);
    }
  };
  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files![0].type === "image/jpeg" ||
      e.target.files![0].type === "image/jpg"
    ) {
      if (e.target.files![0].size <= 300000) {
        onChange?.(e.target.files![0], null, imageId);
      } else {
        toast({
          render: () => (
            <ToastMessage title="이미지 크기 오류" type="ERROR">
              선택하신 사진 이미지의 크기가 제한된 크기(300KB)를 초과하였습니다.
              <br />
              이미지 파일의 크기(300KB 이하)를 조절하시거나 다른 파일을
              선택하세요.
            </ToastMessage>
          ),
          duration: 5000,
        });
      }
    } else {
      toast({
        render: () => (
          <ToastMessage title="이미지 형식 오류" type="ERROR">
            지원되는 이미지 파일 형식 (jpg, jpeg)이 아닙니다. 파일 형식을
            확인하신 후 다시 사진 이미지를 선택하여 등록하세요.
          </ToastMessage>
        ),
        duration: 5000,
      });
    }
    e.target.value = "";
  };

  return (
    <Flex flexDirection="column" gap={2} width="100%">
      {imageURLs && imageURLs.length > 0 && (
        <Flex gap={2}>
          {imageURLs?.map((imagesURL, index) => (
            <Flex id={`${imagesURL}-${index}`} key={imagesURL}>
              <Flex
                backgroundImage={imagesURL}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                gap={1}
                height="100px"
                justifyContent="right"
                p={1}
                width="100px"
              >
                <Button
                  isDisabled={isDisabled}
                  opacity={0.8}
                  p={0}
                  size="xs"
                  _hover={{ opacity: 1 }}
                  _disabled={{ opacity: isDisabled ? 0 : 1 }}
                  onClick={() => handleAddImageButtonClick(index)}
                >
                  <ModifyIcon boxSize="12px" color="primary.800" />
                </Button>
                <Button
                  isDisabled={isDisabled}
                  opacity={0.8}
                  p={0}
                  size="xs"
                  _hover={{ opacity: 1 }}
                  _disabled={{ opacity: isDisabled ? 0 : 1 }}
                  onClick={() => {
                    removeImageFile?.(index);
                  }}
                >
                  <DeleteIcon boxSize="14px" color="primary.800" />
                </Button>
              </Flex>
            </Flex>
          ))}
        </Flex>
      )}
      {isAlarmTalk ? (
        <TipText
          size="sm"
          text="800 x 400 사이즈의 이미지를 사용하세요. 이미지 첨부 시 메시지 내용은
        400자(800bytes)로 제한됩니다."
        />
      ) : (
        <>
          <Flex
            alignItems="center"
            as="form"
            encType="multipart/form-data"
            gap={2}
            width="100%"
          >
            <Input
              accept="image/jpeg, image/jpg"
              hidden
              ref={fileInputRef}
              type="file"
              onChange={handleImagesUpload}
            />
            <Button
              isDisabled={isDisabled || (isTwoWay && !!imageURLs?.[0]?.length)}
              maxWidth="250px"
              minWidth="100px"
              size="sm"
              variant="secondaryBlue"
              onClick={() => handleAddImageButtonClick(null)}
            >
              이미지 첨부
            </Button>
            <TipText size="sm" text="이미지 첨부시 멀티 (MMS)로 전환됩니다." />
          </Flex>
          <TipText
            size="sm"
            text="jpg 파일만 등록가능하며, 이미지 용량은 최대 300kb입니다. 이미지
            픽셀이 1500 x 1400 이상일 경우 이통사 정책에 따라 메시지 발송이
            실패할 수 있습니다."
          />
        </>
      )}
    </Flex>
  );
}

export default ImageUploader;
