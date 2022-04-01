import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import * as React from "react";
import TextInput from "../components/TextInput";
import { login } from "../services/user";

export interface LoginValues {
  password: string;
  username: string;
}

interface ILoginProps {}

const Login: NextPage<ILoginProps> = (props) => {
  const router = useRouter();
  return (
    <Center
      h="100vh"
      w="100%"
      bg="linear-gradient(to top right, #bdebaa 0%, #7dd956 100%)"
    >
      <Box w="30%" h="80vh" bg="white" borderRadius="10px" p="2rem">
        <Heading as="h2" p="1rem" py="2rem" fontWeight="normal">
          Student Login
        </Heading>
        <Formik
          initialValues={{
            password: "",
            username: "",
          }}
          onSubmit={async (values, actions) => {
            await login(values);
            router.push("/");
          }}
        >
          {(props: FormikProps<LoginValues>) => {
            return (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextInput
                  name="username"
                  type="text"
                  label="Username"
                  w="100%"
                  p="1rem"
                />
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  w="100%"
                  p="1rem"
                />
                <Button
                  type="submit"
                  isLoading={props.isSubmitting}
                  mx="auto"
                  my="4rem"
                  bgColor="#173f5e"
                  color="white"
                  px="2rem"
                  py="1.5rem"
                >
                  LOGIN
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Center>
  );
};

export default Login;
