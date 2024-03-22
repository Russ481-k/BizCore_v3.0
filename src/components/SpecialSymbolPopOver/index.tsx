import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

interface SpecialSymbolPopOverProps {
  isDisabled?: boolean;
  addSymbol: (symbol: string) => () => void;
}
function SpecialSymbolPopOver({
  isDisabled,
  addSymbol,
}: SpecialSymbolPopOverProps) {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          isDisabled={isDisabled ?? false}
          size="sm"
          variant="ghostGray"
          minW="120px"
          h="26px"
          borderRadius="lg"
        >
          특수문자
        </Button>
      </PopoverTrigger>
      <PopoverContent
        borderRadius="xl"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
        w="auto"
      >
        <PopoverArrow />
        <PopoverBody
          p={0}
          display="flex"
          flexWrap="wrap"
          width="480px"
          boxSizing="border-box"
        >
          {SpecialSymbols.map((symbol, i) => (
            <Button
              bgColor="white"
              borderColor="gray.300"
              borderRadius={0}
              borderRightWidth="1px"
              borderTopWidth="1px"
              flex="32px 0 0"
              fontSize="sm"
              h={8}
              key={`special-symbol-${i}`}
              minW={8}
              p={1}
              variant="unstyled"
              w={8}
              sx={{
                _hover: {
                  bgColor: "primary.100",
                  color: "primary.700",
                },
                ":nth-of-type(-n+15)": {
                  borderTopWidth: 0,
                },
                ":nth-of-type(15n)": {
                  borderRightWidth: 0,
                },
              }}
              onClick={addSymbol(symbol)}
            >
              {symbol}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

const SpecialSymbols = [
  "☆",
  "★",
  "♡",
  "♥",
  "♧",
  "♣",
  "◁",
  "◀",
  "▷",
  "▶",
  "♤",
  "♠",
  "♧",
  "♣",
  "⊙",
  "○",
  "●",
  "◎",
  "◇",
  "◆",
  "⇔",
  "△",
  "▲",
  "▽",
  "▼",
  "▒",
  "▤",
  "▥",
  "▦",
  "▩",
  "◈",
  "▣",
  "◐",
  "◑",
  "♨",
  "☏",
  "☎",
  "☜",
  "☞",
  "♭",
  "♩",
  "♪",
  "♬",
  "㉿",
  "㈜",
  "℡",
  "㏇",
  "™",
  "㏂",
  "㏘",
  "€",
  "®",
  "↗",
  "↙",
  "↖",
  "↘",
  "↕",
  "↔",
  "↑",
  "↓",
  "∀",
  "∃",
  "∮",
  "∑",
  "∏",
  "℉",
  "‰",
  "￥",
  "￡",
  "￠",
  "℃",
  "♂",
  "♀",
  "∴",
  "《",
  "》",
  "『",
  "』",
  "【",
  "】",
  "±",
  "×",
  "÷",
  "∥",
  "＼",
  "ⓒ",
  "√",
  "∽",
  "∵",
  "￦",
];

export default SpecialSymbolPopOver;
