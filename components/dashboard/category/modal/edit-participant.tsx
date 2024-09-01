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
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValueTypes = {
  first_name: string;
  middle_name: string;
  last_name: string;
  imgUrl: string;
};

function EditParticipant({ isOpen, onClose }: Props) {
  const btnRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormValueTypes>();

  const onSubmit = (data: FormValueTypes) => {
    console.log(data);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Participant</DrawerHeader>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Stack spacing={4} p={{ base: 2, sm: 4 }} shadow={"md"}>
              <Stack>
                <Image
                  src="/placeholder.png"
                  alt="Profile Picture"
                  width="100"
                  height="100"
                  className="mx-auto rounded-full"
                  style={{ aspectRatio: "200/200", objectFit: "cover" }}
                />
                <div className="space-y-2">
                  <FormLabel m={0} htmlFor="image">
                    Picture
                  </FormLabel>
                  <Input id="image" type="file" />
                </div>
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
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </chakra.form>
      </DrawerContent>
    </Drawer>
  );
}

export default EditParticipant;
