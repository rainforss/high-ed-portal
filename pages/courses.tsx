import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface ICoursesProps {
  user: CurrentUser;
}

const Courses: NextPage<ICoursesProps> = (props) => {
  return (
    <Layout user={props.user}>
      <Box>Courses</Box>
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

export default Courses;
