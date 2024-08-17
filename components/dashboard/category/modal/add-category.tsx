import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddCategoryModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <FormControl>
              <Textarea placeholder="eg:President, Organiser" required />
              <FormHelperText>Use comma separated values for multiple categories</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
