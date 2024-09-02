import AddCategoryRequest from "@/app/actions/category/add";
import { getTokenFromLocalStorage } from "@/lib/helpers";
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
  useToast,
} from "@chakra-ui/react";
import { set } from "mongoose";
import { FormEvent, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddCategoryModal({ isOpen, onClose }: Props) {
  const [categories, setCategories] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    /* 
    TO DO
    Replace event_id with the actual event id
    */
    const categoriesArray = categories.split(",").map((category) => {
      return { title: category.trim(), event_id: "66d4a893022edc3ef84f9663" };
    });

    const token = getTokenFromLocalStorage();
    categoriesArray.forEach(async (category) => {
      const { message, status } = await AddCategoryRequest(category, token!);
      toast({
        title: message,
        status: status,
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    });
    onClose();
    setCategories("");
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl>
              <Textarea
                placeholder="eg:President, Organiser"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                required
              />
              <FormHelperText>Use comma separated values for multiple categories</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
