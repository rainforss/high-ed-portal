import { Box } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import { CurrentUser } from "../types/dynamicsEntities";
import Canvas from "./Canvas";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface ILayoutProps {
  user?: CurrentUser;
  userLoading?: boolean;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/betach_small_logo.ico" />
      </Head>
      <Box h="100vh" w="100%">
        <Sidebar />
        <Header
          username={props.user?.username}
          userLoading={props.userLoading}
        />
        <Canvas>{props.children}</Canvas>
      </Box>
    </>
  );
};

export default Layout;
