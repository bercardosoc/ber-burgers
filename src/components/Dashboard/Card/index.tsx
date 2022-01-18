import { Flex, Image, Text } from "@chakra-ui/react"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string

}
export const Card = ( product: Product) => {
    return (
        <Flex flexDirection={"column"} key={product.id} >
            <Text>{product.name}</Text>
            <Image src={product.img} boxSize={"100px"} />
            <Text>{product.category}</Text>
            <Text>{product.price}</Text>
        </Flex>
    )
}