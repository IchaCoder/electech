import { DeleteParticipantRequest } from "@/app/actions/participant/delete";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: {
    participantId: string;
    categoryId: string;
  };
  reloadCategories: () => void;
};

function DeleteParticipantDialog({ isOpen, onClose, id, reloadCategories }: Props) {
  const cancelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    const token = getTokenFromLocalStorage()!;
    setIsLoading(true);
    // Call delete participant request
    const { message, status } = await DeleteParticipantRequest(id.categoryId, id.participantId, token);
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    setIsLoading(false);
    reloadCategories();
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Participant
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} isLoading={isLoading} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteParticipantDialog;
