import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import OffersList from "../../stated-components/OffersList";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface IOffersProps {
  user: CurrentUser;
}

const Offers: NextPage<IOffersProps> = (props) => {
  return (
    <Layout user={props.user}>
      <OffersList contactId={props.user._id} />
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

export default Offers;
