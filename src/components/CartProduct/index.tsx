import { Button, Flex, Image, Text } from "@chakra-ui/react";
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
        <Flex border="solid 1px" borderColor={"orange.500"} borderRadius={"10px"} width={"90%"} margin="0.3rem auto">
            <Flex alignItems={"center"} key={item.id} >
                <Image src={item.img} width={"125px"} />
                <Flex marginLeft={"1.5rem"} flexDirection={"column"} textAlign={"center"} >
                    <Text fontWeight={"bold"} >{item.name} </Text>
                    <Text>${item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Flex margin="0 auto">
                        <Button marginRight={"0.5rem"} size={"sm"} bg={"green"} onClick={() => addQuantity(item) } >+</Button>
                        <Button marginLeft={"0.5.5rem"} size={"sm"} bg={"red"} onClick={() => subQuantity(item)} >-</Button>
                    </Flex>
                </Flex>
            </Flex>
            <DeleteIcon onClick={() => deleteFromCart(item)} cursor={"pointer"}  marginLeft="auto" marginRight="1rem" marginTop={"1rem"} />
        </Flex>
    )
}