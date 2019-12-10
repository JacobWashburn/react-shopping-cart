import React, {useContext} from 'react';
import {CartContext} from '../Contexts/CartContext';

const Item = props => {
    const {image, title, price, quantity} = props.item;
    const {removeItem, changeQty} = useContext(CartContext);
    return (
        <div className="shopping-cart_item">
            <img src={image} alt={`${title} book`}/>
            <div>
                <h1>{title}</h1>
                <p>$ {price}</p>
                <label>Qty: </label>
                <input
                    type='number'
                    onChange={e => changeQty(title, e.target.value)}
                    value={quantity}
                    min='1'
                    style={{width: 35}}
                />
                <button
                    onClick={e => removeItem(e, props.index, props.item)}
                >
                    Remove from cart
                </button>
            </div>
        </div>
    );
};

export default Item;
