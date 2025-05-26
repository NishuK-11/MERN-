// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import App from './App.jsx'
// import {ChakraProvider} from '@chakra-ui/react'
// // import ErrorBoundary from './ErrorBoundary';

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
    
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "./components/ui/provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider>
        <App />
      </Provider>
  </React.StrictMode>
);

