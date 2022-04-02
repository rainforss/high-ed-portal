import { Box } from "@chakra-ui/react";
import * as React from "react";
import { CurrentUser } from "../types/dynamicsEntities";
import Canvas from "./Canvas";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface ILayoutProps {
  user?: CurrentUser;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <Box h="100vh" w="100%">
      <Sidebar />
      <Header username={props.user?.username} />
      <Canvas>{props.children}</Canvas>
    </Box>
  );
};

export default Layout;
