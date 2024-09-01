import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ConfirmVoteModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>An OTP has been sent to your email and phone number</Text>
          <Text>Please confirm to coninue</Text>
          <HStack mt="2">
            <PinInput type="number">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
