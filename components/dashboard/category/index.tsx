"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { FiEdit2, FiMoreVertical } from "react-icons/fi";
import DeleteParticipantDialog from "./modal/delete-participant";
import EditParticipant from "./modal/edit-participant";
import DeleteCategoryDialog from "./modal/remove-category";
import { AddCategoryModal } from "./modal/add-category";
import { AddParticipantDrawer } from "./modal/add-participant";
import { useUser } from "@/context/user.context";
import { IEvent } from "@/models/Event";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import { ICategory } from "@/models/Category";
import { useState } from "react";

type Props = {
  data: IEvent;
};

const Category = ({ data }: Props) => {
  const [id, setId] = useState({ participantId: "", categoryId: "" });
  const {
    isOpen: isOpenDeleteParticipant,
    onOpen: onOpenDeleteParticipant,
    onClose: onCloseDeleteParticipant,
  } = useDisclosure();

  const {
    isOpen: isOpenEditParticipant,
    onOpen: onOpenEditParticipant,
    onClose: onCloseEditParticipant,
  } = useDisclosure();

  const {
    isOpen: isOpenRemoveCategory,
    onOpen: onOpenRemoveCategory,
    onClose: onCloseRemoveCategory,
  } = useDisclosure();

  const { isOpen: isOpenAddCategory, onOpen: onOpenAddCategory, onClose: onCloseAddCategory } = useDisclosure();

  const {
    isOpen: isOpenAddParticipant,
    onOpen: onOpenAddParticipant,
    onClose: onCloseAddParticipant,
  } = useDisclosure();

  const token = getTokenFromLocalStorage();
  const {
    data: categories,
    isLoading,
    error,
    mutate: reloadCategories,
  } = useConditionalFetchData<ICategory[]>({ endpoint: `categories?event_id=${data?._id}`, token: token! });

  return (
    <>
      {isOpenDeleteParticipant && (
        <DeleteParticipantDialog
          isOpen={isOpenDeleteParticipant}
          onClose={onCloseDeleteParticipant}
          reloadCategories={reloadCategories}
          id={id}
        />
      )}
      {isOpenEditParticipant && <EditParticipant isOpen={isOpenEditParticipant} onClose={onCloseEditParticipant} />}
      {isOpenRemoveCategory && <DeleteCategoryDialog isOpen={isOpenRemoveCategory} onClose={onCloseRemoveCategory} />}
      {isOpenAddCategory && <AddCategoryModal isOpen={isOpenAddCategory} onClose={onCloseAddCategory} />}
      {isOpenAddParticipant && <AddParticipantDrawer isOpen={isOpenAddParticipant} onClose={onCloseAddParticipant} />}
      <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
        <Stack flexDir={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
            Categories
          </Text>
          <Button
            bgColor={"rgba(97, 153, 203, 1)"}
            color={"white"}
            _hover={{ opacity: 0.7 }}
            _focus={{ opacity: 0.7 }}
            onClick={onOpenAddCategory}
          >
            Add Category
          </Button>
        </Stack>
        {isLoading ? (
          <Stack gap={5}>
            <Skeleton h={"30px"}></Skeleton>
            <Skeleton h={"30px"}></Skeleton>
            <Skeleton h={"30px"}></Skeleton>
            <Skeleton h={"30px"}></Skeleton>
          </Stack>
        ) : categories?.data?.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
              No categories found
            </Text>
            <Button
              bgColor={"rgba(97, 153, 203, 1)"}
              color={"white"}
              _hover={{ opacity: 0.7 }}
              _focus={{ opacity: 0.7 }}
              onClick={onOpenAddCategory}
            >
              Add Category
            </Button>
          </Box>
        ) : (
          <>
            {categories?.data?.map((category) => {
              return (
                <Stack mt={8} gap={8} key={category._id}>
                  <Stack
                    bgColor={"rgba(155, 214, 232, 0.5)"}
                    py={8}
                    gap={8}
                    px={{ base: 2, sm: 4, xl: 12 }}
                    rounded={"xl"}
                  >
                    <Stack flexDir={"row"} justifyContent={"space-between"}>
                      <Text fontSize={"lg"} fontWeight={"medium"} textAlign={"center"}>
                        {category.title}
                      </Text>
                      <ButtonGroup variant="solid" spacing={{ base: 2, md: "6" }} justifyContent={"center"}>
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          colorScheme="blue"
                          rounded={"lg"}
                          leftIcon={<IoMdAdd />}
                          title="Add another participant"
                          onClick={onOpenAddParticipant}
                        >
                          Add
                        </Button>
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          colorScheme="red"
                          rounded={"lg"}
                          leftIcon={<RiDeleteBin6Line />}
                          title="Remove this category"
                          onClick={onOpenRemoveCategory}
                        >
                          Remove
                        </Button>
                      </ButtonGroup>
                    </Stack>
                    <Box>
                      {category?.participants && category?.participants?.length > 0 ? (
                        <SimpleGrid
                          columns={{ base: 2, sm: 3, lg: 5 }}
                          gap={{ base: "4", md: "6" }}
                          justifyItems={"center"}
                        >
                          {category?.participants?.map((participant) => {
                            return (
                              <Box
                                key={participant._id}
                                width={"max-content"}
                                display={"flex"}
                                flexDir={"column"}
                                position={"relative"}
                              >
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    position={"absolute"}
                                    right={0}
                                    zIndex={1}
                                    width={"1.5rem"}
                                    height={"2rem"}
                                    minW={"0"}
                                    border={"none"}
                                    bgColor={"gray.50"}
                                    icon={<FiMoreVertical />}
                                    variant="outline"
                                  />
                                  <MenuList>
                                    <MenuItem icon={<FiEdit2 />} onClick={onOpenEditParticipant}>
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      icon={<RiDeleteBin6Line />}
                                      color={"red.500 "}
                                      onClick={() => {
                                        setId({ participantId: participant._id, categoryId: category._id! });
                                        onOpenDeleteParticipant();
                                      }}
                                    >
                                      Delete
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                                <Avatar
                                  name={`${participant.first_name} ${participant.middle_name} ${participant.last_name}`}
                                  size={{ base: "2xl", md: "xl" }}
                                  src={participant?.imageUrl}
                                  display={"flex"}
                                  alignSelf={"center"}
                                />
                                <Text fontSize={"15px"} mt={1} fontWeight={"medium"} textAlign={"center"}>
                                  {`${participant.first_name} ${participant.middle_name} ${participant.last_name}`}
                                </Text>
                              </Box>
                            );
                          })}
                        </SimpleGrid>
                      ) : (
                        <Box textAlign="center" mt={8}>
                          <Text fontSize={"lg"} fontWeight={"medium"}>
                            No Participants found
                          </Text>
                          <Button
                            bgColor={"rgba(97, 153, 203, 1)"}
                            color={"white"}
                            _hover={{ opacity: 0.7 }}
                            _focus={{ opacity: 0.7 }}
                            onClick={onOpenAddParticipant}
                          >
                            Add Participant
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              );
            })}
          </>
        )}
      </Box>
    </>
  );
};

export default Category;
