import FieldNumber from "type/FieldNumbers";
import Option from "type/Option";

export const convertCodeToName = (
  Option: Option[],
  code: string | number | null
) => {
  return Option.find((el) => el.code === code)?.name;
};

export const convertNameToCode = (Option: Option[], name: string | null) => {
  return Option.find((el) => el.name === name)?.code;
};

export const convertNumbersToJSON = (arr: FieldNumber[]) => {
  const removedEmptyNumber = arr.filter((item) => item.number !== "");
  const phoneArr = removedEmptyNumber.reduce((accumulator, phone, i) => {
    return {
      ...accumulator,
      [`phone${i + 1}`]: phone.number,
    };
  }, {});
  return JSON.stringify(phoneArr);
};

export const convertJSONToNumbers = (data: string) => {
  const numberArr = Object.values(JSON.parse(data)).map((number) => {
    return {
      number: number as string,
    };
  });
  return numberArr;
};
