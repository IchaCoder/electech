import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  chakra,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { CloseIcon } from "@chakra-ui/icons";
import { IParticipant } from "@/models/Category";
import { AddParticipantRequest } from "@/app/actions/participant/add";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { AvatarUploader } from "@/components/image-uploader/uploader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  reload: () => void;
};

type FormValueTypes = {
  first_name: string;
  middle_name: string;
  last_name: string;
  imgUrl: string;
};

type ParticipantType = {
  participants: FormValueTypes[];
};

const defaultParticipantValues: ParticipantType["participants"][0] = {
  first_name: "",
  middle_name: "",
  last_name: "",
  imgUrl: "",
};

export function AddParticipantDrawer({ isOpen, onClose, categoryId, reload }: Props) {
  const btnRef = useRef(null);
  const toast = useToast();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ParticipantType>({
    defaultValues: { participants: [defaultParticipantValues] },
  });

  const { fields, append, remove } = useFieldArray({ name: "participants", control });

  const onFieldRemove = () => {
    return toast({
      title: "Info",
      description: "One participant has been removed",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const onSubmit = async (data: ParticipantType) => {
    const participants = data.participants as unknown as IParticipant[];

    const token = getTokenFromLocalStorage();
    const { message, status } = await AddParticipantRequest(categoryId, token!, participants);
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    reload();
    onClose();
    reset();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent overflow={"auto"}>
        <DrawerCloseButton />
        <DrawerHeader>Add Participant</DrawerHeader>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Stack spacing={8}>
              {fields.map((field, index) => (
                <Stack spacing={4} p={{ base: 2, sm: 4 }} position={"relative"} key={field.id} shadow={"md"}>
                  <FormControl isInvalid={!!errors.participants?.[index]?.first_name}>
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <Input
                      id="first_name"
                      placeholder="First Name"
                      {...register(`participants.${index}.first_name`, { required: "First Name is required" })}
                    />
                    {errors.participants?.[index]?.first_name && (
                      <FormErrorMessage color="red">
                        {errors.participants?.[index]?.first_name.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.participants?.[index]?.middle_name}>
                    <FormLabel htmlFor="middle_name">Middle Name</FormLabel>
                    <Input
                      id="middle_name"
                      placeholder="Middle Name"
                      {...register(`participants.${index}.middle_name`)}
                    />
                    {errors.participants?.[index]?.middle_name && (
                      <FormErrorMessage color="red">
                        {errors.participants?.[index]?.middle_name.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.participants?.[index]?.last_name}>
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <Input
                      id="last_name"
                      placeholder="Last Name"
                      {...register(`participants.${index}.last_name`, { required: "Last Name is required" })}
                    />
                    {errors.participants?.[index]?.last_name && (
                      <FormErrorMessage color="red">{errors.participants?.[index]?.last_name.message}</FormErrorMessage>
                    )}
                  </FormControl>
                  {index !== 0 && (
                    <IconButton
                      aria-label="Delete"
                      size={"sm"}
                      icon={<CloseIcon />}
                      onClick={() => {
                        // remove the field from the list of fields if there is more than one field
                        if (fields.length > 1) {
                          remove(index);
                          onFieldRemove();
                        }
                      }}
                      colorScheme="red"
                      marginTop={-4}
                      position={"absolute"}
                      top={0}
                      right={2}
                    />
                  )}
                </Stack>
              ))}
            </Stack>

            <Button
              variant="ghost"
              leftIcon={<IoMdAdd />}
              onClick={() => append(defaultParticipantValues)}
              mt={4}
              colorScheme="blue"
            >
              Add another participant
            </Button>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </chakra.form>
      </DrawerContent>
    </Drawer>
  );
}
