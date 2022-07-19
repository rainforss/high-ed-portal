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
import { RiFileList3Fill } from "react-icons/ri";

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
        bg="whiteAlpha.900"
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
          <Table variant="striped" colorScheme="blue">
            <Thead
              position="sticky"
              top="0"
              zIndex={3}
              bg="white"
              boxShadow="inset 0 2px 0 #0a2351, inset 0 -2px 0 #0a2351"
            >
              <Tr>
                <Th color="#0a2351">Application</Th>
                <Th color="#0a2351">Program</Th>
                <Th color="#0a2351">Prerequisite Program</Th>
                <Th color="#0a2351">Offer Status</Th>
                <Th color="#0a2351">Expiration Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {offers.length > 0 &&
                offers.map((a: any) => (
                  <Tr key={a.bsi_offerid}>
                    <Td>
                      <IconButton
                        aria-label="Details"
                        as="a"
                        icon={<Icon as={RiFileList3Fill} />}
                        bgColor="white"
                        color="#767676"
                        fontSize="2xl"
                        _hover={{ color: "#0a2351" }}
                        transition="ease-in-out 0.5s"
                        mr={4}
                        href={`/offers/${a.bsi_offerid}`}
                      />{" "}
                      {a.bsi_StudentApplication.bsi_name}
                    </Td>
                    <Td>{a.bsi_Program.mshied_name}</Td>
                    <Td>{a.bsi_PrerequisiteProgram?.mshied_name}</Td>
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
