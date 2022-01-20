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
        <Flex border="solid 1px" borderColor={"orange.500"} borderRadius={"10px"} width={"90%"} margin="0.3rem auto"  >
            <Flex alignItems={"center"} key={item.id} >
                <Image src={item.img} height={"120px"} />
                <Flex flexDirection={"column"} >
                    <Text>{item.name} </Text>
                    <Text>${item.price}</Text>
                </Flex>
            </Flex>
            <DeleteIcon onClick={() => handleDelete(item.name)} cursor={"pointer"}  marginLeft="auto" marginRight="1rem" marginTop={"1rem"} />
        </Flex>
    )
}