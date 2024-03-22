import { AspectRatio, Avatar, Center } from "@chakra-ui/react";

function EditUserImage() {
  return (
    <Center py={2}>
      <AspectRatio ratio={1 / 1} w="90px">
        <Avatar />
      </AspectRatio>
    </Center>
  );
}

export default EditUserImage;
