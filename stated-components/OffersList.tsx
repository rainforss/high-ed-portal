import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  IconButton,
  Skeleton,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { FcViewDetails } from "react-icons/fc";
import * as React from "react";
import { useOffers } from "../hooks/useOffers";
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import axios from "axios";

interface IOffersListProps {
  contactId: string;
}

const OffersList: React.FunctionComponent<IOffersListProps> = (props) => {
  const { offers, isLoading, isError, mutateOffers } = useOffers(
    props.contactId
  );
  const acceptOffer = async (offerId: string) => {
    const offer = await axios.put(
      `/api/contact/${props.contactId}/offers/${offerId}`,
      { offer: { bsi_offerstatus: 861560001 } }
    );
    console.log(offer.data);
    await mutateOffers();
  };
  const rejectOffer = async (offerId: string) => {
    const offer = await axios.put(
      `/api/contact/${props.contactId}/offers/${offerId}`,
      { offer: { bsi_offerstatus: 861560002 } }
    );
    console.log(offer.data);
    await mutateOffers();
  };
  const [updating, setUpdating] = React.useState(false);
  return (
    <>
      <TableContainer
        h="100%"
        overflowX="auto"
        overflowY="auto"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        borderRadius="5px"
      >
        {isLoading && (
          <Flex flexDir="column" align="stretch" style={{ gap: "2px" }}>
            <Skeleton isLoaded={!isLoading} h="40.5px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
          </Flex>
        )}
        {!isLoading && (
          <Table variant="striped" colorScheme="red">
            <Thead>
              <Tr>
                <Th>Application</Th>
                <Th>Program</Th>
                <Th>Prerequisite Program</Th>
                <Th>Offer Status</Th>
                <Th>Expiration Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {offers.length > 0 &&
                offers.map((a: any) => (
                  <Tr key={a.bsi_offerid}>
                    <Td
                      display="flex"
                      justifyContent="start"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                    >
                      <IconButton
                        aria-label="Details"
                        as="a"
                        icon={<Icon as={FcViewDetails} color="red.500" />}
                        bgColor="white"
                        color="red"
                        fontSize="2xl"
                        href={`/offers/${a.bsi_offerid}`}
                      />{" "}
                      {a.bsi_StudentApplication.bsi_name}
                    </Td>
                    <Td>{a.bsi_Program.mshied_name}</Td>
                    <Td>{a.bsi_PrerequisiteProgram.mshied_name}</Td>
                    <Td>
                      {
                        a[
                          "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                        ]
                      }
                    </Td>
                    <Td>{new Date(a.bsi_expirationdate).toLocaleString()}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </>
  );
};

export default OffersList;
