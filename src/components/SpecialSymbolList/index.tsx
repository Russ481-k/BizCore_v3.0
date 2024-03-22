import { Button } from "@chakra-ui/react";

interface SpacialSymbolListProps {
  addSymbol: (symbol: string) => () => void;
}

function SpecialSymbolList({ addSymbol }: SpacialSymbolListProps) {
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

  return (
    <>
      {SpecialSymbols.map((e, i) => (
        <Button
          borderRadius={0}
          key={e + i}
          p={2}
          width="40px"
          onClick={addSymbol(e)}
        >
          {e}
        </Button>
      ))}
    </>
  );
}
export default SpecialSymbolList;
