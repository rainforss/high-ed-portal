import { useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import ApplicationForm from "../../forms/ApplicationForm";
import { useDocuments } from "../../hooks/useDocuments";
import DocumentsDrawer from "../../stated-components/DocumentsDrawer";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface ISingleApplicationProps {
  user: CurrentUser;
  applicationId: string;
}

const SingleApplication: NextPage<ISingleApplicationProps> = (props) => {
  return (
    <Layout user={props.user}>
      <ApplicationForm
        applicationId={props.applicationId}
        applicantId={props.user._id}
      />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { applicationId } = query;
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
        applicationId: applicationId as string,
      },
    };
  }
);

export default SingleApplication;
