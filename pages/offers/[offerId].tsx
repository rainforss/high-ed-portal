import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import OfferForm from "../../forms/OfferForm";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface ISingleOfferProps {
  user: CurrentUser;
  offerId: string;
}

const SingleOffer: NextPage<ISingleOfferProps> = (props) => {
  return (
    <Layout user={props.user}>
      <OfferForm offerId={props.offerId} />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { offerId } = query;
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
        offerId: offerId as string,
      },
    };
  }
);

export default SingleOffer;
