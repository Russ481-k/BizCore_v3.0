import { Flex, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CustomCard, InputPanel, ToastMessage } from "components";
import { useGetWiredPhoneNumbers } from "features/send";
import NoneWiredNumberModal from "./NoneWiredNumberModal";
import PreviewPanel from "./PreviewPanel";

function OneWaySendMessage() {
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
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [noneWiredNumberModalOpen, setNoneWiredNumberModalOpen] =
    useState<boolean>(false);
  const [templateMsgContext, setTemplateMsgContext] = useState<string | null>(
    null
  );
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const { data: wiredPhoneNumbers } = useGetWiredPhoneNumbers();

  const wiredPhoneNumberCodes = useMemo(() => {
    if (!wiredPhoneNumbers?.wiredPhoneNumber) {
      return;
    }
    const wiredPhoneNumberCodesArray: Array<{ code: string; name: string }> = [
      {
        code: wiredPhoneNumbers?.wiredPhoneNumber,
        name: wiredPhoneNumbers?.wiredPhoneNumber,
      },
    ];
    if (!!wiredPhoneNumbers?.wiredPhoneNumberPlus.length) {
      Object.values(
        JSON.parse(wiredPhoneNumbers?.wiredPhoneNumberPlus)
      ).forEach((wiredPhoneNumber) => {
        wiredPhoneNumberCodesArray.push({
          code: String(wiredPhoneNumber),
          name: String(wiredPhoneNumber),
        });
      });
    }
    return wiredPhoneNumberCodesArray;
  }, [wiredPhoneNumbers]);

  const changeImageFile = useMemo(
    () => (file: File, url: string | null, index: number | null) => {
      if (index !== null) {
        const bufImageFiles = imageFiles;
        const bufImageUrls = imageURLs;
        if (!!url?.length) {
          setImageFiles([]);
          setImageURLs([]);
          bufImageFiles[index] = new File(
            [],
            url.slice(url.indexOf("/resources/") + 11, url.length)
          );
          bufImageUrls[index] = url;
          setImageFiles([...bufImageFiles]);
          setImageURLs([...bufImageUrls]);
          return;
        }
        if (!!imageURLs[index]?.length) {
          setChangedIndex(changedIndex.filter((changed) => changed !== index));
          setChangeFiles([
            ...imageURLs
              .filter((_, i) => i !== index)
              .map((url) => {
                return {
                  uniqueFileName: url.slice(
                    url.indexOf("/resources/") + 11,
                    url.length
                  ),
                  fileOrder: index,
                };
              }),
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
      imageFiles,
      imageURLs,
      toast,
      setChangedIndex,
      setImageFiles,
      setImageURLs,
    ]
  );
  const removeImageFile = (index: number) => {
    const bufImageFiles = imageFiles;
    const bufImageUrls = imageURLs;
    setChangedIndex(changedIndex.filter((changed) => changed !== index));
    setChangeFiles([
      ...imageURLs
        .filter((_, i) => i !== index)
        .map((url) => {
          return {
            uniqueFileName: url.slice(
              url.indexOf("/resources/") + 11,
              url.length
            ),
            fileOrder: index,
          };
        }),
    ]);
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
  const handleNoneWiredNumberModalClose = () => {
    setNoneWiredNumberModalOpen(false);
  };

  useEffect(() => {
    if (
      !!wiredPhoneNumbers &&
      !wiredPhoneNumbers?.wiredPhoneNumber.length &&
      !wiredPhoneNumbers?.wiredPhoneNumberPlus.length
    ) {
      setNoneWiredNumberModalOpen(true);
    }
  }, [wiredPhoneNumbers]);

  return (
    <VStack align="stretch" spacing={3}>
      <CustomCard isHeader="문자 메시지 발송" />
      <Flex gap={3} width="100%">
        <FormProvider {...methods}>
          <InputPanel
            changeFile={changeFiles}
            imageFiles={imageFiles}
            imageURLs={imageURLs}
            subjectPanel={true}
            wiredPhoneNumbers={wiredPhoneNumberCodes ?? []}
            onChannelChange={setChannel}
            onContextChange={setTemplateMsgContext}
            onDisabled={setDisabled}
            onImagesChange={changeImageFile}
            onSubjectCountChange={setSubjectCount}
            removeImageFile={removeImageFile}
            resetFiles={handleResetFiles}
          />
          <PreviewPanel
            channel={channel}
            imageURLs={imageURLs}
            isDisabled={isDisabled}
            messageContents={templateMsgContext}
            subjectCount={subjectCount}
          />
        </FormProvider>
      </Flex>
      {noneWiredNumberModalOpen && (
        <NoneWiredNumberModal onClose={handleNoneWiredNumberModalClose} />
      )}
    </VStack>
  );
}

export default OneWaySendMessage;
