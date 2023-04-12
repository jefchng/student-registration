import { PropsWithChildren } from 'react'
import { VStack, Heading } from '@chakra-ui/layout'

type LayoutProps = {
    title: string
}

export const Layout = (props: PropsWithChildren<LayoutProps>) => {
    return (
        <VStack bg="gray.100" align="center" justify="center" h="100vh" spacing={12}>
            <Heading as="h1" size="2xl" >{props.title}</Heading>

            {props.children}
        </VStack>
    )
}