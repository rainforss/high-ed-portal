import { LockIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  DrawerFooter,
  Button,
  ListIcon,
  Link,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import { FaRegFile } from "react-icons/fa";
import { useDocuments } from "../hooks/useDocuments";
import { fileExtensionMap } from "../utils/constants";

interface IDocumentsDrawerProps {
  applicationId: string;
  applicationName: string;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentsDrawer: React.FunctionComponent<IDocumentsDrawerProps> = ({
  applicationId,
  applicationName,
  onClose,
  isOpen,
}) => {
  const btnRef = React.useRef(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [uploading, setUploading] = React.useState(false);

  const readFileAsBytes = (file: File) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onloadend = (ev) => {
        resolve(ev.target!.result);
      };

      fr.onerror = () => {
        reject(fr);
      };

      fr.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async () => {
    try {
      if (
        !fileInputRef ||
        !fileInputRef.current ||
        !fileInputRef.current.files
      ) {
        return;
      }
      const files = Array.from(fileInputRef.current.files);
      if (files.length === 0) {
        return;
      }
      setUploading(true);
      toast({
        title: "Upload Started",
        description:
          "Uploading the files to the remote server, please do not refresh the page.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const uploadSessions: Promise<any>[] = [];
      const readers: Promise<any>[] = [];
      files.forEach((f) => {
        uploadSessions.push(
          axios.post(
            `/api/proxy?path=/${
              applicationName +
              "_" +
              applicationId.replaceAll("-", "").toUpperCase()
            }/${f.name}:`,
            {
              item: {
                "@microsoft.graph.conflictBehavior": "rename",
                name: f.name,
              },
            }
          )
        );
        readers.push(readFileAsBytes(f));
      });

      const uploadSessionResults = await Promise.all(uploadSessions);
      const readerResults = await Promise.all(readers);
      const uploads: Promise<any>[] = [];
      readerResults.forEach((r, index) =>
        uploads.push(
          axios.put(uploadSessionResults[index].data.uploadUrl, r, {
            headers: {
              "Content-range": `bytes 0-${r.byteLength - 1}/${r.byteLength}`,
            },
          })
        )
      );
      await Promise.all(uploads);
      await mutateDocuments();
      setUploading(false);
      toast({
        title: "Upload Finished",
        description:
          "Files have been uploaded successfully, now you can close the page if needed.",
        status: "success",
        isClosable: true,
        onCloseComplete: () => onClose(),
        duration: 5000,
      });
    } catch (error: any) {
      setUploading(false);
      toast({
        title: "Upload Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const { documents, isError, isLoading, mutateDocuments } =
    useDocuments(applicationId);
  React.useLayoutEffect(() => {});
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="#e31837">Supporting Documents</DrawerHeader>

        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <List spacing={4}>
            {!isLoading &&
              !isError &&
              documents.map((d: any) => (
                <ListItem key={d.id} display="flex" alignItems="center">
                  <ListIcon
                    as={fileExtensionMap[d.name.split(".")[1]] || FaRegFile}
                  />
                  <Link href={d["@microsoft.graph.downloadUrl"]}>{d.name}</Link>
                </ListItem>
              ))}
          </List>
          <FormControl>
            <FormLabel>Upload Additional Documents</FormLabel>
            <Input
              type="file"
              h="fit-content"
              multiple
              p={4}
              ref={fileInputRef}
            />
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button
            bgColor="#e31837"
            color="white"
            mr={3}
            onClick={handleFileUpload}
            isLoading={uploading}
            disabled={uploading}
          >
            Upload
          </Button>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentsDrawer;
