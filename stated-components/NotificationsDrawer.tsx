import { InfoIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  ListIcon,
  Text,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { Task } from "../types/dynamicsEntities";

interface INotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Task[];
}

const NotificationsDrawer: React.FunctionComponent<
  INotificationsDrawerProps
> = ({ isOpen, onClose, notifications }) => {
  const btnRef = React.useRef(null);
  React.useLayoutEffect(() => {});
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="xl"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="#0a2351" mb={8}>
          Notifications
        </DrawerHeader>

        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <List spacing={6}>
            {notifications.map((n) => (
              <ListItem key={n.activityid} display="flex" alignItems="center">
                <ListIcon
                  as={
                    n[
                      "prioritycode@OData.Community.Display.V1.FormattedValue"
                    ] === "High"
                      ? WarningIcon
                      : InfoIcon
                  }
                  color={
                    n[
                      "prioritycode@OData.Community.Display.V1.FormattedValue"
                    ] === "High"
                      ? "#0a2351"
                      : "#767676"
                  }
                />
                <Text as="span">{n.description}</Text>
              </ListItem>
            ))}
          </List>
        </DrawerBody>

        <DrawerFooter>
          <Button
            bgColor="#0a2351"
            color="white"
            mr={3}
            as="a"
            href="/notifications"
          >
            Details
          </Button>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationsDrawer;
