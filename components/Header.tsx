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
import { useTasks } from "../hooks/useTasks";
import NotificationsDrawer from "../stated-components/NotificationsDrawer";
import Dropdown from "./Dropdown";

interface IHeaderProps {
  username?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  userLoading?: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { isOpen: isDropdownOpen, onToggle: onDropdownToggle } =
    useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const { tasks, isLoading, isError } = useTasks(props.userId);

  return (
    <>
      <Flex
        w="calc(100% - 300px)"
        h="80px"
        px={8}
        borderBottom="1px solid #ebe6e6"
        position="fixed"
        justify="flex-end"
        align="center"
        top="0"
        right="0"
        style={{ gap: "20px" }}
        zIndex={10}
      >
        <Button
          aria-label="Notifications"
          isLoading={isLoading}
          disabled={isLoading || isError}
          leftIcon={
            <BellIcon
              color={!isLoading && tasks.length > 0 ? "#e31837" : "#767676"}
            />
          }
          color={!isLoading && tasks.length > 0 ? "#e31837" : "#767676"}
          onClick={onDrawerOpen}
        >
          {tasks ? tasks.length : "0"}
        </Button>

        <Box position="relative">
          {props.username && !props.userLoading && (
            <Button
              rightIcon={<ChevronDownIcon />}
              p={4}
              position="relative"
              w="200px"
              bg="white"
              color="#e31837"
              border="#e31837 1px solid"
              isLoading={props.userLoading}
              disabled={props.userLoading}
              onClick={onDropdownToggle}
            >
              {props.username && (
                <Avatar
                  size="sm"
                  name={props.firstName + " " + props.lastName}
                  src="https://bit.ly/broken-link"
                />
              )}
              <Text ml={4}>{props.firstName + " " + props.lastName}</Text>
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
          {isDropdownOpen && <Dropdown />}
        </Box>
      </Flex>
      {!isLoading && !isError && (
        <NotificationsDrawer
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          notifications={tasks}
        />
      )}
    </>
  );
};

export default Header;
