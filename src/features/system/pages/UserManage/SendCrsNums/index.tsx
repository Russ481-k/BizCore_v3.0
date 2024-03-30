import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FieldError, useFormContext, useFormState } from "react-hook-form";

import FieldNumber from "type/FieldNumbers";
import SelectCrsNumModal from "./SelectCrsNumModal";

interface SendCrsNumsProps {
  registerName: string;
}

function SendCrsNums({ registerName }: SendCrsNumsProps) {
  const [selectedNums, setSelectedNums] = useState<FieldNumber[]>([]);
  const [selectCrsNumsModalOpen, setSelectCrsNumsModalOpen] =
    useState<boolean>(false);

  type FieldErrorsType = {
    [registerName: string]: FieldError | undefined;
  };
  const { control, getValues, setValue } = useFormContext();
  const { errors } = useFormState({
    control: control,
    name: registerName,
  }) as {
    errors: FieldErrorsType;
  };

  const addListItem = (newItem: FieldNumber) => {
    setSelectedNums((prevItems: FieldNumber[]) => [...prevItems, newItem]);
  };
  const removeListItem = (removeItem: FieldNumber) => {
    setSelectedNums((prev: FieldNumber[]) =>
      prev.filter((item) => item !== removeItem)
    );
  };
  const handleAddBtnClick = () => {
    setSelectCrsNumsModalOpen(true);
  };

  useEffect(() => {
    const hadCrsPhoneNumber = getValues("crsPhoneNumbers");
    if (hadCrsPhoneNumber[0]?.number !== "") {
      setSelectedNums(hadCrsPhoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getValues("sendAuthorization.isCrsUse") && selectedNums.length === 0) {
      setValue("crsPhoneNumbers", [{ number: "" }]);
    } else {
      setValue("crsPhoneNumbers", selectedNums);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNums]);

  return (
    <>
      <VStack align="flex-start" spacing={1}>
        {selectedNums.length > 0 ? (
          selectedNums.map((item, index) => {
            return (
              <FormControl
                isInvalid={!!errors?.crsPhoneNumbers}
                key={`send-crs-${index}`}
              >
                <Flex align="flex-start">
                  <Input
                    flex="240px 0 0"
                    isDisabled
                    placeholder="발신번호를 선택하세요."
                    size="sm"
                    value={item.number}
                  />
                  {selectedNums.length > 0 && (
                    <Button
                      flex="56px 0 0"
                      ms={1}
                      size="sm"
                      type="button"
                      variant="secondaryBlue"
                      onClick={() => removeListItem(item)}
                    >
                      삭제
                    </Button>
                  )}
                  {index === selectedNums.length - 1 && (
                    <Button
                      flex="56px 0 0"
                      ms={1}
                      size="sm"
                      type="button"
                      variant="secondaryBlue"
                      onClick={handleAddBtnClick}
                    >
                      추가
                    </Button>
                  )}
                </Flex>
                {!!errors?.crsPhoneNumbers?.message && (
                  <FormErrorMessage fontSize="xs" mt={1}>
                    {errors?.crsPhoneNumbers?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            );
          })
        ) : (
          <Flex align="center" w="100%">
            <Input flex="240px 0 0" isDisabled size="sm" />
            <Button
              flex="56px 0 0"
              ms={1}
              size="sm"
              type="button"
              variant="secondaryBlue"
              onClick={handleAddBtnClick}
            >
              추가
            </Button>
          </Flex>
        )}
      </VStack>
      <SelectCrsNumModal
        isOpen={selectCrsNumsModalOpen}
        selectedNums={selectedNums}
        setModalOpen={setSelectCrsNumsModalOpen}
        addListItem={addListItem}
      />
    </>
  );
}

export default React.memo(SendCrsNums);
