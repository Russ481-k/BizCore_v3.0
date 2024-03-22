import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InfoBox, InfoElement, TipText, ToastMessage } from "components";
import { useChangeMyPwd } from "features/user";
import authService from "libs/authService";
import message from "libs/message";
import pattern from "libs/pattern";

interface ChangePwdProps {
  isModal?: boolean;
  onClose?: () => void;
}
interface ChangePwdValues {
  pwd: string;
  pwdCheck: string;
}
function ChangePwd({ isModal, onClose }: ChangePwdProps) {
  const toast = useToast();
  const navigate = useNavigate();

  const { control, getValues, handleSubmit, register } =
    useForm<ChangePwdValues>({
      defaultValues: {
        pwd: "",
        pwdCheck: "",
      },
      mode: "onBlur",
    });
  const { errors, isValid, isSubmitting } = useFormState({ control });

  const { mutate: changeMyPwd } = useChangeMyPwd();
  const onSubmitChangePwd = handleSubmit((data) => {
    changeMyPwd(
      {
        password: data.pwd,
      },
      {
        onError: (error) => {
          toast({
            render: () => (
              <ToastMessage title="비밀번호 변경 오류" type="ERROR">
                {error.message}
                <br />
                비밀번호 변경 중 오류가 발생하였습니다.
                <br />
                비밀번호 변경을 다시 진행하세요. 본 오류가 계속 발생하는 경우
                시스템 담당자에게 문의하시기 바랍니다.
              </ToastMessage>
            ),
          });
        },
        onSuccess: () => {
          toast({
            render: () => (
              <ToastMessage title="비밀번호 변경 완료" type="SUCCESS">
                비밀번호를 정상적으로 변경하였습니다.
                <br />
                새로운 비밀번호로 다시 로그인하세요.
              </ToastMessage>
            ),
          });
          if (isModal && onClose) {
            onClose();
          } else {
            authService.logout();
          }
        },
      }
    );
  });

  return !isModal ? (
    <Center h="100vh">
      <Box as="form" w="400px" onSubmit={onSubmitChangePwd}>
        <VStack align="flex-start" spacing={5}>
          <Heading as="h3" color="black" fontSize="2xl">
            비밀번호 변경
          </Heading>
          <VStack align="flex-start" spacing={2.5}>
            <Text>
              초기 비밀번호로 로그인시 비밀번호를 변경해야합니다.
              <br />
              비밀번호는 6~18자리로 변경해주세요.
            </Text>
            <Text>비밀번호 변경 후 다시 로그인을 진행합니다.</Text>
          </VStack>
        </VStack>
        <VStack align="flex-start" mt={12} spacing={2.5} w="100%">
          <FormControl isInvalid={!!errors?.pwd}>
            <Input
              placeholder="새 비밀번호를 입력하세요."
              type="password"
              {...register("pwd", {
                required: message.password.change.pattern,
                pattern: {
                  value: pattern.password,
                  message: message.password.change.pattern,
                },
              })}
            />
            {!!errors?.pwd?.message && (
              <FormErrorMessage mt={2}>{errors?.pwd?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.pwdCheck}>
            <Input
              placeholder="새 비밀번호를 한 번 더 입력하세요."
              type="password"
              {...register("pwdCheck", {
                required: message.password.change.check,
                validate: {
                  equalPwd: (v) =>
                    v === getValues("pwd") || message.password.change.check,
                },
              })}
            />
            {!!errors?.pwdCheck?.message && (
              <FormErrorMessage mt={2}>
                {errors?.pwdCheck?.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <VStack spacing={4}>
          <Button
            isDisabled={!isValid}
            isLoading={isSubmitting}
            mt={8}
            size="lg"
            type="submit"
            variant="primaryBlue"
            w="100%"
          >
            비밀번호 변경
          </Button>
          <Button
            variant="link"
            color="gray.800"
            type="button"
            onClick={() => navigate("/login")}
          >
            로그인 페이지로 이동
          </Button>
        </VStack>
      </Box>
    </Center>
  ) : (
    <ModalContent as="form" minW="542px" onSubmit={onSubmitChangePwd}>
      <ModalHeader>비밀번호 변경</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack align="stretch" spacing={3}>
          <TipText hasBg text="4~12자 이내로 새 비밀번호를 등록하세요." />
          <InfoBox>
            <InfoElement label="새 비밀번호" required>
              <FormControl isInvalid={!!errors?.pwd}>
                <Input
                  placeholder="새 비밀번호를 입력하세요."
                  size="sm"
                  type="password"
                  {...register("pwd", {
                    required: message.password.change.pattern,
                    pattern: {
                      value: pattern.password,
                      message: message.password.change.pattern,
                    },
                  })}
                />
                {!!errors?.pwd?.message && (
                  <FormErrorMessage mt={2}>
                    {errors?.pwd?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </InfoElement>
            <InfoElement label="새 비밀번호 확인" required>
              <FormControl isInvalid={!!errors?.pwdCheck}>
                <Input
                  placeholder="새 비밀번호를 한 번 더 입력하세요."
                  size="sm"
                  type="password"
                  {...register("pwdCheck", {
                    required: message.password.change.check,
                    validate: {
                      equalPwd: (v) =>
                        v === getValues("pwd") || message.password.change.check,
                    },
                  })}
                />
                {!!errors?.pwdCheck?.message && (
                  <FormErrorMessage mt={2}>
                    {errors?.pwdCheck?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </InfoElement>
          </InfoBox>
        </VStack>
      </ModalBody>
      <ModalFooter gap={2}>
        <Button variant="textGray" onClick={onClose}>
          취소
        </Button>
        <Button
          isDisabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
          variant="primaryBlue"
        >
          비밀번호 변경
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default ChangePwd;
