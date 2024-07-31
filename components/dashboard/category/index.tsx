import { Avatar, Box, Button, ButtonGroup, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";

type Props = {};

const Category = (props: Props) => {
  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
        Categories
      </Text>
      <Stack mt={8} gap={8}>
        <Stack bgColor={"rgba(155, 214, 232, 0.5)"} py={8} gap={8} px={{ base: 2, sm: 4, xl: 12 }} rounded={"xl"}>
          <Stack flexDir={"row"} justifyContent={"space-between"}>
            <Text fontSize={"lg"} fontWeight={"medium"} textAlign={"center"}>
              SRC President
            </Text>
            <ButtonGroup variant="solid" spacing={{ base: 2, md: "6" }} justifyContent={"center"}>
              <Button size={{ base: "xs", md: "sm" }} colorScheme="blue" rounded={"sm"} leftIcon={<MdOutlineEdit />}>
                Edit
              </Button>
              <Button size={{ base: "xs", md: "sm" }} colorScheme="red" rounded={"sm"} leftIcon={<RiDeleteBin6Line />}>
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
          <Box>
            <SimpleGrid columns={{ base: 2, sm: 3, lg: 5 }} gap={{ base: "4", md: "6" }} justifyItems={"center"}>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
        <Stack bgColor={"rgba(155, 214, 232, 0.5)"} py={8} gap={8} px={{ base: 2, sm: 4, xl: 12 }} rounded={"xl"}>
          <Stack flexDir={"row"} justifyContent={"space-between"}>
            <Text fontSize={"lg"} fontWeight={"medium"} textAlign={"center"}>
              SRC Secretary
            </Text>
            <ButtonGroup variant="solid" spacing={{ base: 2, md: "6" }} justifyContent={"center"}>
              <Button size={{ base: "xs", md: "sm" }} colorScheme="blue" rounded={"sm"} leftIcon={<MdOutlineEdit />}>
                Edit
              </Button>
              <Button size={{ base: "xs", md: "sm" }} colorScheme="red" rounded={"sm"} leftIcon={<RiDeleteBin6Line />}>
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
          <Box>
            <SimpleGrid columns={{ base: 2, sm: 3, lg: 5 }} gap={{ base: "4", md: "6" }} justifyItems={"center"}>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
              <Box width={"max-content"}>
                <Avatar name="Dan Abramov" size={{ base: "2xl", md: "xl" }} src="https://bit.ly/dan-abramov" />
                <Text fontSize={"15px"} mt={1} textAlign={"center"}>
                  Dan Abramov
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
      </Stack>
      <Box textAlign="center" mt={8}>
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
          No categories found
        </Text>
        <Button
          as={Link}
          href={"/dashboard/add-category"}
          bgColor={"rgba(97, 153, 203, 1)"}
          color={"white"}
          _hover={{ opacity: 0.7 }}
          _focus={{ opacity: 0.7 }}
        >
          Add Category
        </Button>
      </Box>
    </Box>
  );
};

export default Category;
