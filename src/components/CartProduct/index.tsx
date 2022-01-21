import { Flex, Image, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons"
import { useCart } from "../../providers/Cart";

interface Cart {
    id: number
    name: string
    category: string
    price: number
    img: string
    quantity: number
    userId: number
}

export const CartProduct = (item: Cart) => {

    const { addQuantity, subQuantity, deleteFromCart } = useCart()

    return (
        <Flex border="solid 1px" borderColor={"orange.500"} borderRadius={"10px"} width={"90%"} margin="0.3rem auto"  >
            <Flex alignItems={"center"} key={item.id} >
                <Image src={item.img} height={"120px"} />
                <Flex flexDirection={"column"} >
                    <Text>{item.name} </Text>
                    <Text>${item.price}</Text>
                    <Text>{item.quantity}</Text>
                    <Flex>
                        <button onClick={() => addQuantity(item) } >+</button>
                        <button onClick={() => subQuantity(item)} >-</button>
                    </Flex>
                </Flex>
            </Flex>
            <DeleteIcon onClick={() => deleteFromCart(item)} cursor={"pointer"}  marginLeft="auto" marginRight="1rem" marginTop={"1rem"} />
        </Flex>
    )
}