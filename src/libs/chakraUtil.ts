import { isStyleProp, SystemProps } from "@chakra-ui/system";
import { CSSProperties } from "react";

export const getStyleProps = (props: SystemProps) => {
  const styleProps: { [key: string]: CSSProperties } = {};
  const otherProps: { [key: string]: CSSProperties } = {};
  Object.entries(props).forEach(([key, value]) => {
    if (isStyleProp(key)) {
      styleProps[key] = value;
    } else {
      otherProps[key] = value;
    }
  });
  return [styleProps, otherProps];
};
