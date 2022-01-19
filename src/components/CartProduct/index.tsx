import { Flex, Image, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons"
import { useCart } from "../../providers/Cart";
import { useAuth } from "../../providers/Auth";

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

export const CartProduct = (item: Product) => {

    const { accessToken } = useAuth()

    const { deleteFromCart } = useCart()

    const handleDelete = (index: string) => {
        deleteFromCart(index, accessToken)
    }

    return (
        <Flex>
            <Flex key={item.id} >
                <Image src={item.img} />
                <Text>{item.name} </Text>
            </Flex>
            <DeleteIcon onClick={() => handleDelete(item.name)} />
        </Flex>
    )
}