// src/components/ui/box.jsx
import { Box as ChakraBox } from "@chakra-ui/react";

const Box = ({ children, ...props }) => {
  return <ChakraBox {...props}>{children}</ChakraBox>;
};

export default Box;
