import { Button, Flex, Image, Text } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useCart } from "../../../providers/Cart"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string

}
export const Card = ( product: Product) => {

    const { addToCart } = useCart()

    return (
        <Flex flexDirection={"column"} key={product.id} >
            <Text>{product.name}</Text>
            <Image src={product.img} boxSize={"100px"} />
            <Text>{product.category}</Text>
            <Text>{product.price.toFixed(2)}</Text>
            <Button
                onClick={() => addToCart(product)}
                rightIcon={<AddIcon/>}
                color={"white"}
                bgColor={"orange.500"}>
                    Adicionar
            </Button>
        </Flex>
    )
}