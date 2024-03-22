import { PlacementWithLogical, Tag, Tooltip } from "@chakra-ui/react";

import { QuestionMarkIcon, TipText } from "components";
interface QuestionMarkTooltipProps {
  text: string;
  placement?: PlacementWithLogical | undefined;
}
function QuestionMarkTooltip({ text, placement }: QuestionMarkTooltipProps) {
  return (
    <Tooltip
      arrowSize={10}
      bgColor="primary.200"
      closeOnScroll={true}
      color="primary.700"
      hasArrow
      maxW={400}
      p={2}
      placement={placement || "bottom-end"}
      rounded="xl"
      label={<TipText size="sm" text={text} />}
    >
      <Tag background="transparent">
        <QuestionMarkIcon cursor="pointer" color="primary.700" />
      </Tag>
    </Tooltip>
  );
}

export default QuestionMarkTooltip;
