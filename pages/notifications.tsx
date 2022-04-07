import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import NotificationsList from "../stated-components/NotificationsList";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface INotificationsProps {
  user: CurrentUser;
}

const Notifications: NextPage<INotificationsProps> = (props) => {
  return (
    <Layout user={props.user}>
      <NotificationsList contactId={props.user._id} />
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

export default Notifications;
