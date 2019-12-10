import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import data from './data';
import {UseLocalStorage} from './Hooks/UseLocalStorage';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import {ProductContext} from './Contexts/ProductContext';
import {CartContext} from './Contexts/CartContext';

function App () {
    const [products] = useState(data);
    const [cart, setCart] = UseLocalStorage('Cart', []);

    const addItem = item => {
        // add the given item to the cart
        const cartTitles = cart.map(item => item.title);
        if (!cartTitles.includes(item.title)) {
            const addFormat = {...item, quantity: 1};
            setCart([...cart, addFormat]);
        } else {
            const changeItemQty = cart.map(cartItem => {
                if (cartItem.title !== item.title) {
                    return cartItem;
                } else {
                    const addQty = cartItem.quantity + 1;
                    return {...cartItem, quantity: addQty};
                }
            });
            setCart(changeItemQty);
        }
    };

    const changeQty = (title, value) => {
        const qty = cart.map(cartItem => {
            if (cartItem.title !== title) {
                return cartItem;
            } else {

                return {...cartItem, quantity: value};
            }
        });
        setCart(qty);
    };

    const removeItem = (e, itemIndex, item) => {
        e.preventDefault();
        setCart(cart.filter((product, index) => itemIndex !== index));
    };

    return (

        <div className="App">
            <CartContext.Provider value={cart}>
                <Navigation cart={cart}/>
            </CartContext.Provider>
            {/* Routes */}
            <ProductContext.Provider value={{products, addItem}}>
                <Route
                    exact
                    path="/"
                    component={Products}
                />
                <CartContext.Provider value={{cart, removeItem, changeQty}}>
                    <Route
                        path="/cart"
                        component={ShoppingCart}
                    />
                </CartContext.Provider>
            </ProductContext.Provider>
        </div>
    );
}

export default App;
