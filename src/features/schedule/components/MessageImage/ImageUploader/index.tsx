import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { AddDashedCircleIcon, CloseFillIcon, ImageIcon } from "components";

interface ImageUploaderProps {
  name: string;
  isButtonType?: boolean;
  multiple?: boolean;
  imgUrl?: string;
  imgFile?: File;
  index: number;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleExistFileChange?: (index: number) => void;
  removeFile?: (idx: number) => void;
}
function ImageUploader({
  name,
  isButtonType,
  multiple,
  imgUrl,
  imgFile,
  index,
  handleFileChange,
  removeFile,
}: ImageUploaderProps) {
  return isButtonType ? (
    <Box position="relative" w="100%">
      {!imgUrl ? (
        <Button
          as="label"
          htmlFor={`upload-file-${name}-${index}`}
          leftIcon={<ImageIcon />}
          variant="textGray"
          cursor="pointer"
          w="100%"
        >
          이미지 선택
        </Button>
      ) : (
        <Flex align="center" gap={3} w="100%" minWidth="0">
          <Center
            as="label"
            htmlFor={`upload-file-${name}-${index}`}
            bgImage={imgUrl ? imgUrl : "none"}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            borderColor="gray.400"
            borderRadius="xl"
            borderWidth="1px"
            cursor="pointer"
            h="38px"
            w="70px"
            flex="0 0 auto"
          />
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize="sm"
            flex="1 1 auto"
            minWidth={0}
          >
            {imgFile && imgFile.name}
          </Text>
        </Flex>
      )}
      <Input
        type="file"
        accept="image/jpeg, image/jpg"
        id={`upload-file-${name}-${index}`}
        display="none"
        // position="absolute"
        // top="0"
        // left="0"
        // width="100%"
        // height="100%"
        onChange={(e) => handleFileChange(e, index)}
      />
    </Box>
  ) : (
    <Center
      as="label"
      htmlFor={`upload-file-${name}-${index}`}
      alignItems="center"
      bgImage={imgUrl ? imgUrl : "none"}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      borderColor="gray.400"
      borderRadius="xl"
      borderWidth="1px"
      cursor="pointer"
      flexDirection="column"
      h="100px"
      position="relative"
      w="100px"
    >
      <Input
        type="file"
        accept="image/jpeg, image/jpg"
        id={`upload-file-${name}-${index}`}
        display="none"
        multiple={multiple}
        onChange={(e) => handleFileChange(e, index)}
      />
      {!imgUrl ? (
        <>
          <AddDashedCircleIcon color="gray.600" />
          <Text color="gray.700" fontSize="xs" mt={2}>
            이미지 선택
          </Text>
        </>
      ) : (
        <IconButton
          aria-label="삭제"
          h={5}
          icon={<CloseFillIcon color="gray.700" />}
          isRound={true}
          minW={5}
          p={0}
          position="absolute"
          right="-10px"
          top="-5px"
          variant="unstyled"
          onClick={() => removeFile && removeFile(index)}
        />
      )}
    </Center>
  );
}

export default React.memo(ImageUploader);
