import { Flex, Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { NavigationItem } from "../types/components";
import { ImFileZip } from "react-icons/im";
import { MdDashboard, MdLocalOffer } from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import NavItem from "./NavItem";
import Image from "next/image";
import { useRouter } from "next/router";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const navItems: NavigationItem[] = [
    { label: "Dashboard", url: "", icon: MdDashboard },
    { label: "Programs", url: "programs", icon: IoIosSchool },
    { label: "My Applications", url: "applications", icon: ImFileZip },
    { label: "My Offers", url: "offers", icon: MdLocalOffer },
  ];

  const router = useRouter();
  console.log(router.pathname);

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      px={4}
      py={12}
      h="100%"
      w="350px"
      bg="white"
      flexDirection="column"
      align="center"
      justify="flex-start"
      style={{ gap: "60px" }}
      borderRight="1px solid #ebe6e6"
      color="#63605f"
    >
      <Flex w="90%" justify="center" align="center" style={{ gap: "20px" }}>
        <Image
          src="/betach_small_logo.png"
          width="60px"
          height="50px"
          alt="Betach Institute Logo"
          loading="eager"
        />
        <Text as="span" fontWeight="bold" fontSize="1.5rem">
          Betach Institute
        </Text>
      </Flex>
      <Flex w="90%" flexDir="column" style={{ gap: "20px" }}>
        {navItems.map((ni, index) => (
          <NavItem
            navItem={ni}
            active={router.pathname.split("/")[1] === ni.url}
            key={ni.label}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
