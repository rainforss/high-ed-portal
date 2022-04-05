import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import Dropdown from "./Dropdown";

interface IHeaderProps {
  username?: string;
  userLoading?: boolean;
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
      zIndex={10}
    >
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Bright-Mode"
            icon={<BellIcon color="#f58d42" />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent zIndex={80} bgColor="white">
            <PopoverArrow />
            <PopoverHeader>Header</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Button colorScheme="blue">Button</Button>
            </PopoverBody>
            <PopoverFooter>This is the footer</PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
      <Box position="relative">
        {props.username && !props.userLoading && (
          <Button
            rightIcon={<ChevronDownIcon />}
            p={4}
            position="relative"
            w="200px"
            isLoading={props.userLoading}
            disabled={props.userLoading}
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
        )}
        {!props.username && !props.userLoading && (
          <>
            <Button mr={4} bg="royalblue" color="white" as="a" href="/login">
              Login
            </Button>
            <Button bg="#7dd956" color="white" as="a" href="/register">
              Register
            </Button>
          </>
        )}
        {isOpen && <Dropdown />}
      </Box>
    </Flex>
  );
};

export default Header;
