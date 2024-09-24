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
  useToast,
} from "@chakra-ui/react";
import DeleteEventModal from "./modal/delete-modal";
import Duration from "./election-info";
import { IEvent } from "@/models/Event";
import { UpdateEvent } from "@/app/actions/event/update";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.context";

type Props = {
  event: IEvent;
};

const Settings = ({ event }: Props) => {
  console.log(event);
  const toast = useToast();
  const router = useRouter();

  const { error, loading } = useUser();

  const onSubmit = async (data: Partial<IEvent>) => {
    const { message, status } = await UpdateEvent(data, event._id!);
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status,
      duration: 4000,
      position: "top-right",
    });
    router.refresh();
  };

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

  if (loading) {
    return (
      <Stack>
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
      </Stack>
    );
  }

  if (error === "Token expired") {
    router.push("/login");
  }

  return (
    <>
      {isOpen && <DeleteEventModal deleteId={event._id!} isOpen={isOpen} onClose={onClose} />}
      <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
        <Box>
          <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
            Settings
          </Text>
          <Text color={"gray.600"}>Manage your account and election preferences</Text>
        </Box>
        <Duration event={event} />
        <Stack shadow={"md"} p={{ base: 4, sm: 8 }} mt={8} rounded={"lg"} bgColor={"white"}>
          <Box>
            <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl" }}>
              Preferences
            </Text>
            <Text color={"gray.600"} fontSize={"sm"}>
              Change your preferences
            </Text>
            <Stack mt={4}>
              {/* <Stack flexDir={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight={"medium"} fontSize={{ base: "sm", sm: "lg" }}>
                    Start time
                  </Text>
                </Box>
                <Switch id="lock-election" size={{ base: "sm", sm: "md" }} />
              </Stack> */}
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
              <Switch
                id="lock-election"
                defaultChecked={event.is_lock_event}
                onChange={() => onSubmit({ is_lock_event: !event?.is_lock_event })}
                size={{ base: "sm", sm: "md" }}
              />
            </Stack>
            {event.is_lock_event && (
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
                    <Skeleton height="30px" fadeDuration={1} isLoaded={!!event?.org_domain}>
                      <Editable
                        defaultValue={event?.org_domain}
                        selectAllOnFocus={false}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={{ base: "lg", md: "xl" }}
                        onSubmit={(value) => onSubmit({ org_domain: value })}
                      >
                        <EditablePreview fontSize={"md"} />
                        <Input size={"sm"} as={EditableInput} />
                        <EditableControls />
                      </Editable>
                    </Skeleton>
                  </Stack>
                </FormControl>
              </Stack>
            )}

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
