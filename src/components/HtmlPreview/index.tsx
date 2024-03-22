import { Box, BoxProps } from "@chakra-ui/react";

interface HtmlPreviewProps {
  previewHeight: number;
  previewHtml: string;
  previewWidth: number;
}

const defaultProps = {
  previewHeight: 740,
  previewWidth: 360,
};

function HtmlPreview({
  previewHeight,
  previewHtml,
  previewWidth,
}: HtmlPreviewProps & BoxProps) {
  const pt = 60;
  const pb = 30;
  const px = 25;

  return (
    <Box overflowY="scroll">
      <Box
        // backgroundImage={preview}
        backgroundRepeat="no-repeat"
        backgroundSize={`${previewWidth + px * 2}px ${
          previewHeight + pt + pb
        }px`}
        pb={`${pb}px`}
        pt={`${pt}px`}
        px={`${px}px`}
      >
        <Box
          borderRadius="12px"
          height={`${previewHeight}px`}
          overflowX="hidden"
          overflowY="auto"
          width={`${previewWidth}px`}
        >
          <Box dangerouslySetInnerHTML={{ __html: previewHtml }}></Box>
        </Box>
      </Box>
    </Box>
  );
}

HtmlPreview.defaultProps = defaultProps;

export default HtmlPreview;
