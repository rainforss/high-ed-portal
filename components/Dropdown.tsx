import {
  ArrowForwardIcon,
  InfoOutlineIcon,
  QuestionOutlineIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";

interface IDropdownProps {}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const router = useRouter();
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
      bg="#767676"
      zIndex={90}
    >
      <Button
        leftIcon={<ArrowForwardIcon />}
        w="90%"
        h="40px"
        color="#b6922e"
        onClick={async () => {
          await axios.get("/api/user/logout");
          router.push("/");
        }}
      >
        <Text w="50%" textAlign="start">
          Sign Out
        </Text>
      </Button>
      <Button leftIcon={<InfoOutlineIcon />} w="90%" h="40px" color="#b6922e">
        <Text w="50%" textAlign="start">
          Profile
        </Text>
      </Button>
      <Button
        leftIcon={<QuestionOutlineIcon />}
        w="90%"
        h="40px"
        color="#b6922e"
      >
        <Text w="50%" textAlign="start">
          FAQ
        </Text>
      </Button>
    </Flex>
  );
};

export default Dropdown;
