import { Link } from "react-router-dom"
import { Button, VStack, Box } from "@chakra-ui/react"
import { Layout } from "./Layout"

export const Home = () => {
  return (
    <Layout title="Student Records Admin">
      <Box bg="white" p={6} rounded="md" w={64}>
        <VStack spacing={6}>
          <Button colorScheme="blue" width="full">
            <Link to="register">Register New Student</Link>
          </Button>
          <Button width="full">
            <Link to="view">View All Students</Link>
          </Button>
        </VStack>
      </Box>
    </Layout>
  )
}