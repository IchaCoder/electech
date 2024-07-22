import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {/* <DrawerHeader>Create your account</DrawerHeader> */}

        <DrawerBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus reiciendis debitis officia, fugiat
          cumque, eum perferendis aliquid animi incidunt similique pariatur iure explicabo aut odio esse tempore
          inventore, impedit quisquam?
        </DrawerBody>

        <DrawerFooter flexDir={"column"} gap={2} width={"max-content"} mx={"auto"}>
          <div>Sign Out</div>
          <IconButton aria-label="sign out" icon={<MdLogout />} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
