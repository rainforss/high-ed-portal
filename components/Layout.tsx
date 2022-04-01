import { Box } from "@chakra-ui/react";
import * as React from "react";
import { CurrentUser } from "../types/dynamicsEntities";
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
      {props.children}
    </Box>
  );
};

export default Layout;
