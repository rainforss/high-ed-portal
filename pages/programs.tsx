import { ClientCredentialRequest } from "@azure/msal-node";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { dynamicsProgram } from "../services/dynamicsProgram";
import ProgramsList from "../stated-components/ProgramsList";
import { instantiateCca } from "../utils/cca";
import { connect, disconnect } from "../utils/redis";

interface IProgramsProps {
  error?: {
    name: string;
    message: string;
  };
  programs?: any;
}

const Programs: NextPage<IProgramsProps> = (props) => {
  const { user, isError, isLoading } = useCurrentUser();
  console.log(user);
  return (
    <Layout user={user}>
      <ProgramsList />
    </Layout>
  );
};

export const getStaticProps = async () => {
  await connect();
  const cca = await instantiateCca();
  const clientCredentialsRequest: ClientCredentialRequest = {
    scopes: [`${process.env.CLIENT_URL}/.default`],
    skipCache: false,
  };
  const tokenResponse = await cca.acquireTokenByClientCredential(
    clientCredentialsRequest
  );
  if (!tokenResponse) {
    await disconnect();
    return {
      props: {
        error: {
          name: "External Server Error",
          message: "Failed to connect to remote server for data.",
        },
      },
    };
  }
  const programs = await dynamicsProgram(tokenResponse.accessToken).getAll();
  await disconnect();
  return {
    props: {
      programs,
    },
  };
};

export default Programs;
