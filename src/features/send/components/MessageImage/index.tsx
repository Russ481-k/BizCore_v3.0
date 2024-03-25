import {
  FormControl,
  FormHelperText,
  HStack,
  StackProps,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ToastMessage } from "components";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import ImageUploader from "./ImageUploader";

interface MessageImageProps {
  name: string;
  isButtonType?: boolean;
  multiple?: boolean;
  imgUrls: string[];
  imgFiles: File[];
  setImgURLs: React.Dispatch<React.SetStateAction<string[]>>;
  setImgFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

function MessageImage({
  name,
  isButtonType,
  multiple,
  imgUrls,
  imgFiles,
  setImgURLs,
  setImgFiles,
  ...props
}: MessageImageProps & StackProps) {
  const toast = useToast();
  const { setValue } = useFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files![0].type === "image/jpeg" || e.target.files![0].type === "image/jpg") {
      if (e.target.files![0].size <= 300000) {
        const files = e.target.files;
        if (files && files.length > 0) {
          const uploadedFiles: File[] = Array.from(files);
          uploadedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const url = reader.result as string;
              if (imgUrls[index]) {
                const updatedImgUrls = [...imgUrls];
                const updatedImgFiles = [...imgFiles];
                updatedImgUrls[index] = url;
                updatedImgFiles[index] = file;
                setImgURLs(updatedImgUrls);
                setImgFiles(updatedImgFiles);
                return;
              }
              setImgURLs((prevUrls) => [...prevUrls, url]);
              setImgFiles((prevFiles) => [...prevFiles, file]);
            };
          });
        }
      } else {
        toast({
          render: () => (
            <ToastMessage title="이미지 크기 오류" type="ERROR">
              선택하신 사진 이미지의 크기가 제한된 크기(300KB)를 초과하였습니다.
              <br />
              이미지 파일의 크기(300KB 이하)를 조절하시거나 다른 파일을 선택하세요.
            </ToastMessage>
          ),
          duration: 5000,
        });
        return;
      }
    } else {
      toast({
        render: () => (
          <ToastMessage title="이미지 형식 오류" type="ERROR">
            지원되는 이미지 파일 형식 (jpg, jpeg)이 아닙니다. 파일 형식을 확인하신 후 다시 사진
            이미지를 선택하여 등록하세요.
          </ToastMessage>
        ),
        duration: 5000,
      });
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updatedImgUrls = imgUrls.filter((_, idx) => idx !== index);
    const updatedImgFiles = imgFiles.filter((_, idx) => idx !== index);
    setImgURLs(updatedImgUrls);
    setImgFiles(updatedImgFiles);
  };

  useEffect(() => {
    setValue(name, imgFiles);
  }, [name, imgFiles, setValue]);

  return isButtonType ? (
    <VStack {...props}>
      <ImageUploader
        isButtonType
        name={name}
        index={0}
        imgUrl={imgUrls[0]}
        imgFile={imgFiles[0]}
        handleFileChange={handleFileChange}
      />
    </VStack>
  ) : (
    <VStack align="flex-start" spacing={2} {...props}>
      <FormControl>
        <HStack>
          {imgUrls &&
            imgUrls.map((imgUrl, index) => {
              return (
                <ImageUploader
                  key={`upload-file-${index}`}
                  name={name}
                  index={index}
                  multiple={multiple ?? false}
                  imgUrl={imgUrl}
                  handleFileChange={handleFileChange}
                  removeFile={removeFile}
                />
              );
            })}
          {(multiple && imgUrls.length >= 0 && imgUrls.length < 3) ||
            (!multiple && imgUrls.length === 0 && (
              <ImageUploader
                key={`upload-file-${imgUrls.length}`}
                name={name}
                index={imgUrls.length}
                multiple={multiple ?? false}
                handleFileChange={handleFileChange}
              />
            ))}
        </HStack>
        <FormHelperText color="gray.800" fontSize="xs" lineHeight="1.125rem">
          이미지 첨부 시 멀티(MMS)로 전환됩니다.
          <br />
          jpg 파일만 등록 가능하며, 용량은 최대 300KB입니다.
          <br />
          이미지 픽셀 1500x1400 초과시 이동사 정책에 따라 전송이 실패할 수 있습니다.
        </FormHelperText>
      </FormControl>
    </VStack>
  );
}

export default React.memo(MessageImage);
