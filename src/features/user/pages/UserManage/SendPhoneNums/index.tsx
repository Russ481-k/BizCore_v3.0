import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import {
  FieldError,
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

import formatter from "libs/formatter";
import message from "libs/message";
import pattern from "libs/pattern";

interface SendPhoneNumProps {
  registerName: string;
}

function SendPhoneNum({ registerName }: SendPhoneNumProps) {
  type WiredPhoneNumType = {
    [key: string]: Array<{
      number: string;
    }>;
  };
  type FieldErrorsType = {
    [key: string]: Array<{
      number: FieldError | undefined;
    }>;
  };

  const { control, register, setValue } = useFormContext<WiredPhoneNumType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: registerName,
  });
  const WiredPhoneNumWatch = useWatch({
    control,
    name: registerName,
  });
  const { errors } = useFormState({
    control,
    name: registerName,
  }) as {
    errors: FieldErrorsType;
  };

  const appendListItem = useCallback(
    (e: any) => {
      e.preventDefault();
      append({ number: "" });
    },
    [append]
  );

  const removeListItem = useCallback(
    (idx: any) => (e: any) => {
      e.preventDefault();
      remove(idx);
    },
    [remove]
  );

  return (
    <VStack align="flex-start" spacing={1}>
      {fields.map((field, index) => {
        return (
          <FormControl
            isInvalid={!!errors?.[registerName]?.[index]?.number}
            key={`send-phone-${field.id}`}
          >
            <Flex align="flex-start">
              <Input
                flex="240px 0 0"
                placeholder="발신 번호를 입력하세요."
                size="sm"
                {...register(`${registerName}.${index}.number`, {
                  validate: {
                    pattern: (v: string) => {
                      if (v === "") return true;
                      return (
                        pattern.phoneNumber.mobile.test(v) ||
                        pattern.phoneNumber.tel.test(v) ||
                        pattern.phoneNumber.rep.test(v) ||
                        pattern.phoneNumber.rep2.test(v) ||
                        pattern.phoneNumber.num.test(v) ||
                        message.phoneNumber.pattern
                      );
                    },
                    uniqueness: (v: string) => {
                      const otherValues = fields
                        .filter((_, idx) => idx !== index)
                        .map((field) => field.number);
                      if (otherValues.includes(v)) {
                        return message.phoneNumber.uniqueness;
                      }
                      return true;
                    },
                  },
                  onBlur: (e) =>
                    setValue(
                      `${registerName}.${index}.number`,
                      formatter.contactFormatter(
                        e.target.value.replace(/[^0-9]/g, "").substring(0, 11)
                      )
                    ),
                })}
              />
              {fields.length > 1 && (
                <Button
                  flex="56px 0 0"
                  ms={1}
                  size="sm"
                  type="button"
                  variant="secondaryBlue"
                  onClick={removeListItem(index)}
                >
                  삭제
                </Button>
              )}
              {index === fields.length - 1 && (
                <Button
                  flex="56px 0 0"
                  isDisabled={
                    WiredPhoneNumWatch?.[index]?.number !== "" &&
                    !!!errors?.[registerName]?.[index]?.number
                      ? false
                      : true
                  }
                  ms={1}
                  size="sm"
                  type="button"
                  variant="secondaryBlue"
                  onClick={appendListItem}
                >
                  추가
                </Button>
              )}
            </Flex>
            {errors?.[registerName]?.[index]?.number?.message && (
              <FormErrorMessage fontSize="xs" mt={1}>
                {errors?.[registerName]?.[index]?.number?.message}
              </FormErrorMessage>
            )}
          </FormControl>
        );
      })}
    </VStack>
  );
}

export default React.memo(SendPhoneNum);
