"use client";
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Skeleton,
  Stack,
  Text,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

type Props = {};

const Account = (props: Props) => {
  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" ml={2}>
        <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} aria-label="Cancel" {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" ml={2}>
        <IconButton size="sm" icon={<EditIcon />} aria-label="Edit" {...getEditButtonProps()} />
      </Flex>
    );
  };

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} textAlign={"center"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
        Account
      </Text>
      <Stack maxW={"60%"} mx={"auto"} borderWidth={1} mt={4} bgColor={"#f4f4f4"} rounded={"lg"}>
        <Stack p={4} direction={"row"} gap={4} bgColor={"gray.700"} alignItems={"center"}>
          <Avatar />
          <Box>
            <Text color={"white"} fontSize={"lg"} fontWeight={"bold"}>
              Dan Abramov
            </Text>
            <Text color={"white"}>example@example.com</Text>
          </Box>
        </Stack>
        <Box mt={8} px={6}>
          <Text fontSize={""} fontWeight={"bold"}>
            Edit Info
          </Text>
          <Divider my={2} borderColor={"gray.400"} />
          <Stack mb={4}>
            <FormControl id="name">
              <Stack
                direction={{ base: "column", md: "row" }}
                mt={6}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline" mb={0}>
                  Name
                </FormLabel>
                {/* add isLoaded prop to skeleton if name is undefined
              isLoaded={!userData?.name}
            */}
                <Skeleton height="30px" fadeDuration={1} isLoaded>
                  <Editable
                    // defaultValue={userData?.name}
                    defaultValue={"Dan Abramov"}
                    selectAllOnFocus={false}
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={{ base: "lg", md: "xl" }}
                    // onSubmit={onSubmitName}
                  >
                    <EditablePreview />
                    <Input as={EditableInput} />
                    <EditableControls />
                  </Editable>
                </Skeleton>
              </Stack>
            </FormControl>
            <FormControl id="phone">
              <Stack
                direction={{ base: "column", md: "row" }}
                mt={6}
                spacing={{ base: "1.5", md: "8" }}
                justify="space-between"
              >
                <FormLabel variant="inline" mb={0}>
                  Phone
                </FormLabel>
                {/* add isLoaded prop to skeleton if name is undefined
              isLoaded={!userData?.name}
            */}
                <Skeleton height="30px" fadeDuration={1} isLoaded>
                  <Editable
                    // defaultValue={userData?.name}
                    defaultValue={"0555543385"}
                    selectAllOnFocus={false}
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={{ base: "lg", md: "xl" }}
                    // onSubmit={onSubmitName}
                  >
                    <EditablePreview />
                    <Input as={EditableInput} />
                    <EditableControls />
                  </Editable>
                </Skeleton>
              </Stack>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Account;
