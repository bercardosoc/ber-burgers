import { useCart } from '../../providers/Cart'
import { CartProduct } from "../CartProduct"

export const CartProducts = () => {
    
    const {cart} = useCart()

    return (
        <>
        {
            cart.map(buyItem => <CartProduct key={buyItem.id} item={buyItem}/> )
        }
        </>
    )
}