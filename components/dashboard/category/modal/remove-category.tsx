import { DeleteCategoryRequest } from "@/app/actions/category/delete";
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
  id: string;
  reload: () => void;
};

function DeleteCategoryDialog({ isOpen, onClose, id, reload }: Props) {
  const cancelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    const { message, status } = await DeleteCategoryRequest(id);
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
    setLoading(false);
    reload();
  };

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Category
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} isLoading={loading} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog;
