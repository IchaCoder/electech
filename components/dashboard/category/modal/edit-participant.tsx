import { SaveImageUrl } from "@/app/actions/participant/save-image";
import { UpdateParticipantRequest } from "@/app/actions/participant/update";
import { AvatarUploader } from "@/components/image-uploader/uploader";
import { IParticipant } from "@/models/Category";
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
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: {
    participantId: string;
    categoryId: string;
  };
  participant: IParticipant;
  reload: () => void;
};

type FormValueTypes = {
  first_name: string;
  middle_name: string;
  last_name: string;
  imgUrl: string;
};

function EditParticipant({ isOpen, onClose, id, participant, reload }: Props) {
  const btnRef = useRef(null);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValueTypes>();

  const onSubmit = async (data: FormValueTypes) => {
    const { message, status } = await UpdateParticipantRequest(id.categoryId, id.participantId, data);
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
    reload();
  };

  useEffect(() => {
    const fieldsArray: (keyof FormValueTypes)[] = ["first_name", "middle_name", "last_name"];
    fieldsArray.forEach((field) => {
      setValue(field, participant?.[field] || "");
    });
  }, []);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Participant</DrawerHeader>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Stack spacing={4} p={{ base: 2, sm: 4 }} shadow={"md"}>
              <Stack>
                {participant.imgUrl ? (
                  <Image
                    src={participant.imgUrl}
                    alt="Profile Picture"
                    width="100"
                    height="100"
                    className="mx-auto rounded-full"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src="/placeholder.png"
                    alt="Profile Picture"
                    width="100"
                    height="100"
                    className="mx-auto rounded-full"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                  />
                )}
                <AvatarUploader
                  onUploadSuccess={(url) => {
                    SaveImageUrl(id.categoryId, id.participantId, url);
                    reload();
                  }}
                />
              </Stack>
              <FormControl isInvalid={!!errors.first_name}>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  id="first_name"
                  placeholder="First Name"
                  {...register("first_name", { required: "First Name is required" })}
                />
                {errors.first_name && <FormErrorMessage color="red">{errors.first_name.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.middle_name}>
                <FormLabel htmlFor="middle_name">Middle Name</FormLabel>
                <Input id="middle_name" placeholder="Middle Name" {...register("middle_name")} />
                {errors.middle_name && <FormErrorMessage color="red">{errors.middle_name.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.last_name}>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input
                  id="last_name"
                  placeholder="Last Name"
                  {...register("last_name", { required: "Last Name is required" })}
                />
                {errors.last_name && <FormErrorMessage color="red">{errors.last_name.message}</FormErrorMessage>}
              </FormControl>
            </Stack>
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

export default EditParticipant;
