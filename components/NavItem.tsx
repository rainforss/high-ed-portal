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
      borderRadius="15px"
      style={{ gap: "15px" }}
      as="a"
      href={"/" + navItem.url}
    >
      <Icon as={navItem.icon} fontSize="1.2rem" />
      <Text as="span" w="70%">
        {navItem.label}
      </Text>
    </Center>
  );
};

export default NavItem;
