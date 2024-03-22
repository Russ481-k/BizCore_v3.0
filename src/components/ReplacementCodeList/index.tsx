import { Button } from "@chakra-ui/react";

interface ReplacementCodeListProps {
  addSymbol: (symbol: string) => () => void;
}

function ReplacementCodeList({ addSymbol }: ReplacementCodeListProps) {
  const ReplacementCodeList = [
    "#{이름}",
    "#{전화번호}",
    "#{휴대폰번호}",
    "#{변수1}",
    "#{변수2}",
    "#{변수3}",
    "#{변수4}",
  ];

  return (
    <>
      {ReplacementCodeList.map((e, i) => (
        <Button
          borderRadius={0}
          key={e + i}
          p={2}
          width="160px"
          onClick={addSymbol(e)}
        >
          {e}
        </Button>
      ))}
    </>
  );
}
export default ReplacementCodeList;
