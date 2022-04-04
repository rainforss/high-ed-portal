import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import ApplicationsList from "../../stated-components/ApplicationsList";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface IApplicationsProps {
  user: CurrentUser;
}

const Applications: NextPage<IApplicationsProps> = (props) => {
  return (
    <Layout user={props.user}>
      <ApplicationsList contactId={props.user._id} />
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

export default Applications;
