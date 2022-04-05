import type { NextPage } from "next";
import "isomorphic-unfetch";
import { withSessionSsr } from "../utils/withSession";
import { CurrentUser } from "../types/dynamicsEntities";
import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import DashBoard from "../stated-components/Dashboard";

interface IHomeProps {
  user: CurrentUser;
}

const Home: NextPage<IHomeProps> = (props) => {
  return (
    <Layout user={props.user}>
      <DashBoard contactId={props.user._id} />
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

export default Home;
