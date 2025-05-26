// src/App.jsx
import { ChakraProvider, Box, Heading, Button } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" mt={10}>
        <Heading mb={5}>Welcome to My Chakra App</Heading>
        <Button colorScheme="teal" size="lg" onClick={() => alert("Clicked!")}>
          Click Me
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
