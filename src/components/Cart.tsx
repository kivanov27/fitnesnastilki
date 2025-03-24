import { useCart } from "@/context/CartContext";

const Cart = () => {
    const { state, dispatch } = useCart();

    return (
        <div>
            {state.items.length === 0 ? (
                <p>Количката е празна</p>
            ) : (
                state.items.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
                            X
                        </button>
                    </div>
                ))
            )}

            <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
                Изчисти количката
            </button>
        </div>
    );
};

export default Cart;
