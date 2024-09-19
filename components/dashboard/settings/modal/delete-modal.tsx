import { DeleteEvent } from "@/app/actions/event/delete";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  deleteId: string;
};

const DeleteEventModal = ({ isOpen, onClose, deleteId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();
  const cancelRef = useRef(null);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const { message, status } = await DeleteEvent(deleteId);
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status,
      duration: 4000,
      position: "top-right",
    });
    setIsDeleting(false);
    onClose();
    router.push("/dashboard");
  };
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Event
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Are you sure?</Text>
            <Text>This will end ongoing election and delete the event from the database</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteEventModal;
