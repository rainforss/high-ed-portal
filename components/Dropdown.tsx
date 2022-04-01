import {
  ArrowForwardIcon,
  InfoOutlineIcon,
  QuestionOutlineIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import * as React from "react";

interface IDropdownProps {}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  return (
    <Flex
      position="absolute"
      top="55px"
      left="0"
      w="200px"
      flexDir="column"
      justify="space-evenly"
      align="center"
      borderRadius="0.375rem"
      h="180px"
      bg="#bdebaa"
    >
      <Button leftIcon={<ArrowForwardIcon />} w="90%" h="40px">
        <Text w="50%" textAlign="start">
          Sign Out
        </Text>
      </Button>
      <Button leftIcon={<InfoOutlineIcon />} w="90%" h="40px">
        <Text w="50%" textAlign="start">
          Profile
        </Text>
      </Button>
      <Button leftIcon={<QuestionOutlineIcon />} w="90%" h="40px">
        <Text w="50%" textAlign="start">
          FAQ
        </Text>
      </Button>
    </Flex>
  );
};

export default Dropdown;
