import { Flex, Text, Button } from "@chakra-ui/react"

export const StudentDetails = (props: { bio: string }) => {
    return (
        <Flex alignItems="center">
            <Button p={4} width="500px">Some Button</Button>
            <Text p={4}>{props.bio}</Text>
        </Flex>
    )
}