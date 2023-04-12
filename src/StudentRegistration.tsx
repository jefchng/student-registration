import { Formik, Field } from "formik";
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    Box
} from "@chakra-ui/react";
import { ssnRegex } from "./helpers";
import { Layout } from "./Layout";
import {
    useMutation,
    useQueryClient,
} from 'react-query'
import { createStudent } from "./service";

const currDate = new Date()

export default function StudentRegistration() {
    const queryClient = useQueryClient()

    const mutation = useMutation(async ({ firstName, lastName, ssn, dob }: { firstName: string, lastName: string, ssn: string, dob: Date }) => {
        createStudent({ firstName, lastName, ssn, dob })
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('students')
        },
    })
    return (
        <Layout title="Student Registration">
            <Box bg="white" p={6} rounded="md" w={64}>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        ssn: "",
                        dob: ""
                    }}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        setSubmitting(true)
                        mutation.mutate({ firstName: values.firstName, lastName: values.lastName, ssn: values.ssn, dob: new Date(values.dob) })

                        resetForm()
                    }}
                >
                    {({ handleSubmit, errors, isValid, dirty, touched, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isRequired isInvalid={!!errors.firstName && touched.firstName}>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Field
                                        as={Input}
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        variant="filled"
                                        placeholder="Jane"
                                        validate={(value: string) => {
                                            let error;

                                            if (!value) {
                                                error = "First Name cannot be empty";
                                            }

                                            return error;
                                        }}

                                    />
                                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.lastName && touched.lastName}>
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Field
                                        as={Input}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        variant="filled"
                                        placeholder="Doe"
                                        validate={(value: string) => {
                                            let error;

                                            if (!value) {
                                                error = "Last Name cannot be empty";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.ssn && touched.ssn}>
                                    <FormLabel htmlFor="ssn">Social Security Number</FormLabel>
                                    <Field
                                        as={Input}
                                        id="ssn"
                                        name="ssn"
                                        type="ssn"
                                        variant="filled"
                                        validate={(value: string) => {
                                            let error;

                                            if (!ssnRegex.test(value)) {
                                                error = "Invalid SSN";
                                            }

                                            return error;
                                        }}
                                        placeholder="XXX-XX-XXXX"
                                    />
                                    <FormErrorMessage>{errors.ssn}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.dob && touched.dob}>
                                    <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                                    <Field
                                        as={Input}
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        variant="filled"
                                        max={currDate.toISOString().split('T')[0]}
                                        validate={(value: string) => {
                                            let error;

                                            if (!value) {
                                                error = "Date cannot be empty";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.dob}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" colorScheme="blue" width="full" isLoading={isSubmitting} isDisabled={!isValid || !dirty}>
                                    Register
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
}