import { Layout } from "./Layout"
import { StudentTable } from "./StudentTable"
import { Box, Spinner } from "@chakra-ui/react"
import {
    useQuery,
} from 'react-query'
import { fetchStudents } from "./service"

export const StudentsView = () => {
    const { data, isLoading } = useQuery({ queryKey: ['students'], queryFn: fetchStudents })


    return (
        <Layout title="Student Records">
            <Box bg="white" p={6} rounded="md">
                {isLoading && <Spinner color='blue.500' size='xl' />}
                {data && <StudentTable students={data} />}
            </Box>
        </Layout>
    )
}