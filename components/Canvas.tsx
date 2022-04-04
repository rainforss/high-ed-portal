import { Box } from "@chakra-ui/react";
import * as React from "react";

interface ICanvasProps {}

const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  return (
    <Box
      position="fixed"
      w="calc(100% - 350px)"
      h="calc(100vh - 80px)"
      top="80px"
      left="350px"
      overflow="hidden"
      p={8}
    >
      {props.children}
    </Box>
  );
};

export default Canvas;