"use client";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
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
  Switch,
  Text,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import DeleteEventModal from "./modal/delete-modal";
import Duration from "./election-info";

type Props = {};

const Settings = (props: Props) => {
  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" ml={2}>
        <IconButton icon={<CheckIcon />} size={"sm"} aria-label="Submit" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} size={"sm"} aria-label="Cancel" {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" ml={2}>
        <IconButton size="sm" icon={<EditIcon />} aria-label="Edit" {...getEditButtonProps()} />
      </Flex>
    );
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {isOpen && <DeleteEventModal isOpen={isOpen} onClose={onClose} />}
      <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
        <Box>
          <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
            Settings
          </Text>
          <Text color={"gray.600"}>Manage your account and election preferences</Text>
        </Box>
        <Duration />
        <Stack shadow={"md"} p={{ base: 4, sm: 8 }} mt={8} rounded={"lg"} bgColor={"#f4f4f4"}>
          <Box>
            <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl" }}>
              Preferences
            </Text>
            <Text color={"gray.600"} fontSize={"sm"}>
              Change your preferences
            </Text>
            <Stack mt={4}>
              <Stack flexDir={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight={"medium"} fontSize={{ base: "sm", sm: "lg" }}>
                    Start time
                  </Text>
                </Box>
                <Switch id="lock-election" size={{ base: "sm", sm: "md" }} />
              </Stack>
            </Stack>
          </Box>
          <Stack mt={4}>
            <Stack flexDir={"row"} justifyContent={"space-between"}>
              <Box>
                <Text fontWeight={"medium"} fontSize={{ base: "sm", sm: "lg" }}>
                  Lock this election to an organization
                </Text>
                <Text color={"gray.600"} fontSize={{ base: "xs", sm: "sm" }}>
                  Only users from the organization can view this event if checked
                </Text>
              </Box>
              <Switch id="lock-election" size={{ base: "sm", sm: "md" }} />
            </Stack>
            <Stack mb={4}>
              <FormControl id="domain">
                <Stack
                  direction={{ base: "column", md: "row" }}
                  mt={6}
                  spacing={{ base: "1.5", md: "8" }}
                  justify="space-between"
                >
                  <Box>
                    <FormLabel variant="inline" mb={0}>
                      Org Domain
                    </FormLabel>
                    <Text color={"gray.600"} fontSize={{ base: "xs", sm: "sm" }}>
                      Only users from the organization can view this election if checked
                    </Text>
                  </Box>
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
                      <EditablePreview fontSize={"md"} />
                      <Input size={"sm"} as={EditableInput} />
                      <EditableControls />
                    </Editable>
                  </Skeleton>
                </Stack>
              </FormControl>
            </Stack>
            <Stack flexDir={"row"} justifyContent={"space-between"}>
              <Box>
                <Text fontWeight={"medium"} fontSize={{ base: "sm", sm: "lg" }}>
                  Email notification
                </Text>
                <Text color={"gray.600"} fontSize={{ base: "xs", sm: "sm" }}>
                  Send email to users in our database with your set domain 1 hour before an election
                </Text>
              </Box>
              <Switch id="email-alerts" size={{ base: "sm", sm: "md" }} />
            </Stack>
          </Stack>
        </Stack>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mt={12}
          w={"full"}
          gap={2}
          py={8}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mb={1} fontSize="lg">
            Delete Event
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            <Button
              colorScheme="red"
              onClick={() => {
                onOpen();
                // setDeleteId(business?.id!);
              }}
            >
              Delete Event
            </Button>
          </AlertDescription>
        </Alert>
      </Box>
    </>
  );
};

export default Settings;
