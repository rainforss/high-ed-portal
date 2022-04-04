import { useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import ApplicationForm from "../../forms/ApplicationForm";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface INewApplicationProps {
  user: CurrentUser;
  applicationId: string;
}

const NewApplication: NextPage<INewApplicationProps> = (props) => {
  return (
    <Layout user={props.user}>
      <ApplicationForm applicantId={props.user._id} />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    return {
      props: {
        user,
      },
    };
  }
);

export default NewApplication;
