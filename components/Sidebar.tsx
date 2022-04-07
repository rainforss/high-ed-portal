import { Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { NavigationItem } from "../types/components";
import { SiMicrosoftacademic } from "react-icons/si";
import { RiFilePaper2Fill } from "react-icons/ri";
import {
  MdDashboard,
  MdEditCalendar,
  MdLocalOffer,
  MdNotifications,
} from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import NavItem from "./NavItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaSchool } from "react-icons/fa";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const navItems: NavigationItem[] = [
    { label: "Dashboard", url: "", icon: MdDashboard },
    { label: "Programs", url: "programs", icon: FaSchool },
    {
      label: "My Applications",
      url: "applications",
      icon: RiFilePaper2Fill,
    },
    { label: "My Offers", url: "offers", icon: MdLocalOffer },
    { label: "My Programs", url: "my-programs", icon: IoIosSchool },
    { label: "My Courses", url: "my-courses", icon: SiMicrosoftacademic },
    {
      label: "My Appointments",
      url: "appointments",
      icon: MdEditCalendar,
    },
    { label: "My Notifications", url: "notifications", icon: MdNotifications },
  ];

  const router = useRouter();

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      px={4}
      py={12}
      h="100%"
      w="300px"
      bg="white"
      flexDirection="column"
      align="center"
      justify="flex-start"
      style={{ gap: "60px" }}
      borderRight="1px solid #ebe6e6"
      color="#63605f"
    >
      <Flex
        w="90%"
        flexDirection="column"
        justify="center"
        align="center"
        style={{ gap: "20px" }}
      >
        <Image
          src="/York_University.png"
          width="120px"
          height="120px"
          alt="Betach Institute Logo"
          loading="eager"
        />
        <Text
          as="span"
          fontWeight="bold"
          fontSize="1.2rem"
          textTransform="uppercase"
        >
          York University
        </Text>
        <Box w="100%" h="1px" bgColor="#e92731"></Box>
        <Text as="small">School of Continuing Studies</Text>
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
