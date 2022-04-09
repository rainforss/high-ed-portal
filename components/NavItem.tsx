import { Center, Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { NavigationItem } from "../types/components";

interface INavItemProps {
  navItem: NavigationItem;
  active: boolean;
}

const NavItem: React.FunctionComponent<INavItemProps> = ({
  navItem,
  active,
}) => {
  return (
    <Center
      h="50px"
      w="100%"
      p={2}
      bgColor={active ? "#e92731" : "white"}
      color={active ? "whiteAlpha.900" : "#63605f"}
      boxShadow={active ? "rgba(0,0,0, 0.35) 0px 5px 15px" : "none"}
      borderRadius="15px"
      style={{ gap: "15px" }}
      as="a"
      href={"/" + navItem.url}
    >
      <Icon
        as={navItem.icon}
        fontSize="1.2rem"
        color={active ? "whiteAlpha.900" : "#e92731"}
      />
      <Text as="span" w="70%">
        {navItem.label}
      </Text>
    </Center>
  );
};

export default NavItem;
