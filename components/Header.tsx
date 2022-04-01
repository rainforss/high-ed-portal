import { ChevronDownIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import Dropdown from "./Dropdown";

interface IHeaderProps {
  username?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      w="calc(100% - 350px)"
      h="80px"
      px={6}
      borderBottom="1px solid #ebe6e6"
      position="fixed"
      justify="flex-end"
      align="center"
      top="0"
      right="0"
      style={{ gap: "20px" }}
    >
      <IconButton aria-label="Bright-Mode" icon={<SunIcon color="#f58d42" />} />
      <Box position="relative">
        <Button
          rightIcon={<ChevronDownIcon />}
          p={4}
          position="relative"
          w="200px"
          onClick={onToggle}
        >
          {props.username && (
            <Avatar
              size="sm"
              name={props.username}
              src="https://bit.ly/dan-abramov"
            />
          )}
          <Text ml={4}>{props.username}</Text>
        </Button>
        {isOpen && <Dropdown />}
      </Box>
    </Flex>
  );
};

export default Header;
