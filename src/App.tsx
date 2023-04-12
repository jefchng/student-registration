import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { StudentsView } from './StudentsView';
import StudentRegistration from './StudentRegistration';
import { Home } from './Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <StudentRegistration />,
  },
  {
    path: "/view",
    element: <StudentsView />,
  },
])

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
