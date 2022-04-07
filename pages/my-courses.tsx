import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import CoursesList from "../stated-components/CoursesList";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface IMyCoursesProps {
  user: CurrentUser;
}

const MyCourses: NextPage<IMyCoursesProps> = (props) => {
  return (
    <Layout user={props.user}>
      <CoursesList contactId={props.user._id} />
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

export default MyCourses;
