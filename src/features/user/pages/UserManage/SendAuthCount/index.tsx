import {
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  Controller,
  FieldError,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

import message from "libs/message";

interface SendAuthCountProps {
  useName?: string;
  unlimitedName: string;
  countName: string;
  justUnlimited?: boolean;
}

function SendAuthCount({
  useName,
  unlimitedName,
  countName,
  justUnlimited = false,
}: SendAuthCountProps) {
  type SendAuthType = {
    sendAuthorization: {
      [key: string]: boolean;
    };
    sendCountRequest: {
      [key: string]: number | null;
    };
  };
  type FieldErrorsType = {
    sendCountRequest?: {
      [key: string]: FieldError | undefined;
    };
  };

  const isUseName: `sendAuthorization.${string}` = `sendAuthorization.${useName}`;
  const isUnlimitedName: `sendAuthorization.${string}` = `sendAuthorization.${unlimitedName}`;
  const limitCountName: `sendCountRequest.${string}` = `sendCountRequest.${countName}`;
  const { control, register, resetField, setValue } =
    useFormContext<SendAuthType>();
  const isUseWatch = useWatch({ control, name: isUseName });
  const isUnlimitedWatch = useWatch({ control, name: isUnlimitedName });
  const { errors } = useFormState({ control, name: limitCountName }) as {
    errors: FieldErrorsType;
  };

  const handleIsUseOnChange = (isUseValue: boolean) => {
    if (!isUseValue) {
      setValue(limitCountName, null);
    } else {
      resetField(isUnlimitedName);
      resetField(limitCountName);
    }
  };

  const handleIsUnlimitedOnChange = (isUnlimitedValue: string) => {
    const valueToBoolean = isUnlimitedValue === "true" ? true : false;
    setValue(isUnlimitedName, valueToBoolean);
    if (valueToBoolean === true) {
      setValue(limitCountName, null);
    } else {
      setValue(limitCountName, 100);
    }
  };

  return (
    <Flex display="inline-flex" align="center">
      {!justUnlimited && (
        <Controller
          control={control}
          name={isUseName}
          render={({ field: { onChange, value } }) => (
            <Switch
              isChecked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                handleIsUseOnChange(e.target.checked);
              }}
            />
          )}
        />
      )}
      {(isUseWatch || justUnlimited) && (
        <Flex align="flex-start">
          {!justUnlimited && (
            <Text fontSize="sm" lineHeight="26px" ms={4}>
              월 발송량
            </Text>
          )}
          <Controller
            control={control}
            name={isUnlimitedName}
            render={({ field: { value } }) => (
              <RadioGroup
                ms={3}
                name={`${unlimitedName}`}
                value={value.toString()}
                onChange={(v) => handleIsUnlimitedOnChange(v)}
              >
                <HStack h="28px" spacing={2}>
                  <Radio colorScheme="primary" value="true">
                    무제한 발송
                  </Radio>
                  <Radio colorScheme="primary" value="false">
                    제한 발송
                  </Radio>
                </HStack>
              </RadioGroup>
            )}
          />
          <FormControl
            alignItems="center"
            display="flex"
            flex={1}
            isInvalid={!!errors?.sendCountRequest?.[countName]}
            ms={2}
            pb={
              justUnlimited && !!errors?.sendCountRequest?.[countName]
                ? "1rem"
                : "inherit"
            }
          >
            <Input
              isDisabled={isUnlimitedWatch}
              min={1}
              px={2}
              py={0}
              size="xs"
              textAlign="right"
              type="number"
              w="50px"
              {...register(limitCountName, {
                valueAsNumber: true,
                validate: (v: string | number | null) => {
                  if (v === "" || v === null) return true;
                  return Number(v) > 0 || message.limitCount.required;
                },
              })}
              onChange={(e) => {
                const value = Number(
                  e.target.value.replace(/(?<=^-)0+|^0+/, "")
                );
                setValue(limitCountName, value ?? null);
              }}
            />
            {!!errors?.sendCountRequest?.[countName] && (
              <FormErrorMessage
                fontSize="xs"
                ms={2}
                mt={0}
                sx={{
                  position: justUnlimited ? "absolute" : "inherit",
                  top: justUnlimited ? "2rem" : "inherit",
                  right: justUnlimited ? 0 : "inherit",
                  whiteSpace: justUnlimited ? "nowrap" : "inherit",
                }}
              >
                {errors?.sendCountRequest?.[countName]?.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
      )}
    </Flex>
  );
}

export default React.memo(SendAuthCount);
