import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function EditParticipant({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit participant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam animi eaque aliquam pariatur cupiditate
          iure ex sapiente amet omnis labore quia, itaque facilis. Porro laudantium optio illo repellat voluptatum
          animi?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditParticipant;
