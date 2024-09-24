import { AddVote } from "@/app/actions/participant/add-vote";
import { RecordVoter } from "@/app/actions/vote/record-voter";
import { useUser } from "@/context/user.context";
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type SelectedVotesType = {
  [key: string]: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedVotes: SelectedVotesType;
  setSelectedVotes: Dispatch<SetStateAction<SelectedVotesType>>;
  event_id: string;
};

export function ConfirmVoteModal({ isOpen, onClose, selectedVotes, setSelectedVotes, event_id }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();

  const onSubmitVote = async () => {
    setIsSubmitting(true);
    const { status } = await AddVote(selectedVotes);
    if (user && status === "success") {
      {
        await RecordVoter(event_id, user._id!);
      }
      setIsSubmitting(false);
      setSelectedVotes({});
      toast({
        title: "Vote submitted",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      router.push("/");
    }
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Text>An OTP has been sent to your email and phone number</Text> */}
          <Text>Please confirm to coninue</Text>
          {/* <HStack mt="2">
            <PinInput type="number">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack> */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue" onClick={onSubmitVote} isLoading={isSubmitting}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
