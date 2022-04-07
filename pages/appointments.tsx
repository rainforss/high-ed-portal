import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import AppointmentsList from "../stated-components/AppointmentsList";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface IMyAppointmentsProps {
  user: CurrentUser;
}

const MyAppointments: NextPage<IMyAppointmentsProps> = (props) => {
  return (
    <Layout user={props.user}>
      <AppointmentsList contactId={props.user._id} />
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

export default MyAppointments;
