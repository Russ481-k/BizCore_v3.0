import { Flex, useToast, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CustomCard, ToastMessage, TwoWayInputPanel } from "components";
import PreviewPanel from "./PreviewPanel";

function TwoWaySendMessage() {
  const toast = useToast();
  const methods = useForm({ mode: "onBlur" });

  const [changeFiles, setChangeFiles] = useState<
    Array<{
      uniqueFileName: string;
      fileOrder: number;
    }>
  >([]);
  const [channel, setChannel] = useState<string>("SMS");
  const [changedIndex, setChangedIndex] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [templateMsgContext, setTemplateMsgContext] = useState<string | null>(
    null
  );

  const changeImageFile = useMemo(
    () => (file: File, url: string | null, index: number | null) => {
      if (index !== null) {
        if (!!url?.length) {
          setImageFiles([]);
          setImageURLs([]);
          const bufImageFiles = imageFiles;
          const bufImageUrls = imageURLs;
          bufImageFiles[index] = new File([], url);
          bufImageUrls[index] = url;
          setImageFiles([...bufImageFiles]);
          setImageURLs([...bufImageUrls]);
          return;
        }
        const bufImageFiles = imageFiles;
        const bufImageUrls = imageURLs;
        if (!!imageURLs[index]?.length && !changedIndex.includes(index)) {
          setChangedIndex([...changedIndex, index]);
          setChangeFiles([
            ...changeFiles,
            {
              uniqueFileName: bufImageUrls[index]?.slice(
                imageURLs[index].indexOf("/resources/") + 11,
                imageURLs[index].length
              ),
              fileOrder: index,
            },
          ]);
        }
        bufImageFiles[index] = file;
        bufImageUrls[index] = URL.createObjectURL(file);
        setImageFiles([...bufImageFiles]);
        setImageURLs([...bufImageUrls]);
        return;
      } else if (imageFiles.length < 3) {
        setImageFiles([...imageFiles, file]);
        if (!imageFiles) {
          return;
        }
        setImageURLs([...imageURLs, URL.createObjectURL(file)]);
      } else {
        toast({
          render: () => (
            <ToastMessage title="사진 파일 업로드 오류" type="ERROR">
              사진 파일 업로드 중 오류가 발생하였습니다.
              <br />
              사진 파일은 최대 3개까지 업로드 가능합니다.
            </ToastMessage>
          ),
        });
      }
    },
    [
      changedIndex,
      changeFiles,
      imageFiles,
      imageURLs,
      toast,
      setImageFiles,
      setImageURLs,
    ]
  );
  const removeImageFile = (index: number) => {
    const bufImageFiles = imageFiles;
    const bufImageUrls = imageURLs;
    bufImageFiles.splice(index, 1);
    bufImageUrls.splice(index, 1);
    setImageFiles([...bufImageFiles]);
    setImageURLs([...bufImageUrls]);
  };
  const handleResetFiles = () => {
    setImageFiles([]);
    setImageURLs([]);
    setChangeFiles([]);
  };

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="양방향 메시지 발송" />
      <Flex gap={3} width="100%">
        <FormProvider {...methods}>
          <TwoWayInputPanel
            changeFile={changeFiles}
            imageFiles={imageFiles}
            imageURLs={imageURLs}
            subjectPanel={true}
            onChannelChange={setChannel}
            onContextChange={setTemplateMsgContext}
            onDisabled={setDisabled}
            onImagesChange={changeImageFile}
            removeImageFile={removeImageFile}
            resetFiles={handleResetFiles}
          />
          <PreviewPanel
            channel={channel}
            imageURLs={imageURLs}
            isDisabled={isDisabled}
            messageContents={templateMsgContext}
          />
        </FormProvider>
      </Flex>
    </VStack>
  );
}

export default TwoWaySendMessage;
