import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Box,
  } from '@chakra-ui/react'
import { useCart } from '../../providers/Cart'
import { CartProducts } from '../CartProducts'

  interface CartModalProps {
      isOpen: boolean
      onClose: () => void
  }

export const CartModal = ({isOpen, onClose}: CartModalProps) => {
    
    const {cart} = useCart()

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <ModalContent >
                <ModalHeader borderRadius={"0px 0px 10px 10px"} bg={"orange.500"} > Carrinho de compras </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                {
                    cart.length < 1  ? (<Box height={"100px"} textAlign={"center"} mt={"2.5rem"} >
                        <Text fontWeight={"bold"} >Sua sacola está vazia</Text>
                        <Text>Adicione itens</Text>
                    </Box>) : (
                        <>
                            <CartProducts/>
                            <Button mt={"0.5rem"} color={"white"} bgColor={"orange.500"}>Remover tudo</Button>
                        </>
                    )
                }
                </ModalBody>
                <ModalFooter borderRadius={"10px 10px 0px 0px"} bg={"orange.500"}>
                    <Text> Total: $
                    {
                        cart.reduce((acc, curr) => acc + curr.price, 0)
                    }
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}