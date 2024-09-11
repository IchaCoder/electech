import { UpdateEvent } from "@/app/actions/event/update";
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
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
};

const ConfirmEndEvent = ({ isOpen, onClose, eventId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const endVote = async () => {
    setIsLoading(true);
    const { message, status } = await UpdateEvent({ is_ended: true }, eventId);
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    setIsLoading(false);
    onClose();
    router.refresh();
  };

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            End Election
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" isLoading={isLoading} onClick={endVote} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmEndEvent;
