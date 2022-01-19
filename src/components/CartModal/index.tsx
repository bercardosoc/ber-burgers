import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
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
            <ModalContent>
                <ModalHeader> Carrinho de compras </ModalHeader>
                <ModalCloseButton/>
                {
                    cart.length > 1 ? (<ModalBody>
                        <Text>Sua sacola está vazia</Text>
                        <Text>Adicione itens</Text>
                    </ModalBody>) : (
                        <CartProducts/>
                    )
                }
            </ModalContent>
        </Modal>
    )
}