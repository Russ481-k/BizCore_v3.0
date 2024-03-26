import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ToastMessage } from "components";
import { authLoginThunk } from "features/user";
import authService from "libs/authService";
import message from "libs/message";
import { useAppDispatch } from "storage/redux/hooks";

interface LoginInterface {
  compId: string;
  userId: string;
  password: string;
  saveId: boolean;
}
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const storageHaveSavedId = localStorage.getItem("savedId");

  const { control, handleSubmit, register, resetField, setError } =
    useForm<LoginInterface>({
      defaultValues: {
        compId: "vtek",
        userId: storageHaveSavedId ? storageHaveSavedId : "",
        password: "",
        saveId: storageHaveSavedId ? true : false,
      },
      mode: "onBlur",
    });
  const { errors, isValid, isSubmitting } = useFormState({ control });

  const onSubmitLogin = handleSubmit(async (data) => {
    const resultAction = await dispatch(
      authLoginThunk({
        compId: data.compId,
        userId: data.userId,
        password: data.password,
      })
    );

    if (authLoginThunk.rejected.match(resultAction)) {
      const message = resultAction.payload?.message;
      if (message === "unknown error") {
        toast({
          render: () => (
            <ToastMessage title="로그인 오류" type="ERROR">
              로그인 중 오류가 발생하였습니다.
              <br />
              로그인을 다시 진행하세요. 본 오류가 계속 발생하는 경우 시스템
              담당자에게 문의하시기 바랍니다.
            </ToastMessage>
          ),
        });
        return;
      }
      resetField("password");
      setError("password", {
        type: "isInvalid",
        message: message,
      });
      return;
    } else {
      authService.getMyData();
      return navigate("/dashboard");
    }

    // if (authLoginThunk.fulfilled.match(resultAction)) {
    //   checkInitialPwd(
    //     {
    //       password: data.password,
    //     },
    //     {
    //       onSuccess: (data) => {
    //         const isInitialPwd: boolean = data.data;
    //         if (isInitialPwd) {
    //           navigate("/change-pwd");
    //         } else {
    //           authService.getMyData();
    //           navigate("/one-way/send-message");
    //         }
    //       },
    //       onSettled: () => {
    //         if (data.saveId === true) {
    //           localStorage.setItem("savedId", data.userId);
    //         } else {
    //           localStorage.removeItem("savedId");
    //         }
    //         reset();
    //       },
    //     }
    //   );
    // }
  });

  return (
    <Center h="100vh">
      <Box as="form" w="400px" onSubmit={onSubmitLogin}>
        <VStack spacing={4}>
          <Image alt="logo" src={require("assets/img/logo.png")} />
        </VStack>
        <VStack alignItems="flex-start" mt={12} spacing={2.5} w="100%">
          <FormControl isInvalid={!!errors?.userId}>
            <Input
              placeholder="기업아이디"
              defaultValue={"vtek"}
              {...register("compId", {
                required: message.compNo.login,
              })}
            />
            {!!errors?.userId?.message && (
              <FormErrorMessage mt={2}>
                {errors?.userId?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.userId}>
            <Input
              placeholder="아이디"
              {...register("userId", {
                required: message.userId.login,
              })}
            />
            {!!errors?.userId?.message && (
              <FormErrorMessage mt={2}>
                {errors?.userId?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.password}>
            <Input
              placeholder="비밀번호"
              type="password"
              {...register("password", {
                required: message.password.login,
              })}
            />
            {!!errors?.password?.message && (
              <FormErrorMessage mt={2}>
                {errors?.password?.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <Controller
          control={control}
          name="saveId"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              isChecked={value}
              mt={4}
              value={value.toString()}
              onChange={onChange}
            >
              아이디 저장
            </Checkbox>
          )}
        />
        <Button
          isDisabled={!isValid}
          isLoading={isSubmitting}
          mt={8}
          size="lg"
          type="submit"
          variant="primaryBlue"
          w="100%"
        >
          로그인
        </Button>
      </Box>
    </Center>
  );
}

export default Login;
