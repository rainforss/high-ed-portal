import { Box } from "@chakra-ui/react";
import * as React from "react";

interface ICanvasProps {}

const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  return (
    <Box
      position="fixed"
      w="calc(100% - 300px)"
      h="calc(100vh - 80px)"
      top="80px"
      left="300px"
      overflow="hidden"
      p={8}
      bg="linear-gradient(to bottom right, #0a2351 0%, #b6922e 100%)"
    >
      {props.children}
    </Box>
  );
};

export default Canvas;
