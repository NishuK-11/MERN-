// src/components/ui/button.jsx
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ children, onClick, colorScheme = "blue", size = "md", ...props }) => {
  return (
    <ChakraButton colorScheme={colorScheme} size={size} onClick={onClick} {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;

