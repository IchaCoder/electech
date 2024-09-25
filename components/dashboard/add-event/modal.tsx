import { url } from "@/lib/helpers";
import {
  Box,
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  event_id: string;
};

const EventCreatedModal = ({ onClose, isOpen, event_id }: Props) => {
  const uri = `${url}/e/${event_id}`;
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Event Created Successfully</ModalHeader>
        <ModalBody>
          <Box>
            <Box display={"grid"} gap={2}>
              <Text>
                Click{" "}
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(uri);
                    toast({
                      title: "Link copied to clipboard",
                      status: "info",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }}
                  bgColor={"transparent"}
                >
                  here
                </Button>{" "}
                to copy link to event
              </Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button as={Link} href={"/dashboard"}>
            Go to dashbaord
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventCreatedModal;
