import { Flex, Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { NavigationItem } from "../types/components";
import { ImBooks, ImCalendar } from "react-icons/im";
import NavItem from "./NavItem";
import Image from "next/image";
import { useRouter } from "next/router";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const navItems: NavigationItem[] = [
    { label: "Course Sections", url: "/courses", icon: ImBooks },
    { label: "Academic Periods", url: "/", icon: ImCalendar },
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
            active={router.pathname === ni.url}
            key={ni.label}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
