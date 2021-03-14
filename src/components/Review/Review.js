import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';


const Review = () => {
        const [cart, setCart] = useState([]);
       const [orderPlaced, setOrderPlace] = useState(false);
        const handlePlaceOrder = () =>{
            // console.log('order placed');
            setCart([]);
            setOrderPlace(true);
            processOrder ();
        }

        const RemoveProduct = (productKey) => {
        // console.log('removed clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
        }

        useEffect(() => {
        // cart data
        const saveCart = getDatabaseCart();
        // console.log(saveCart);
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
        const product =fakeData.find(pd => pd.key === key);
        product.quantity =saveCart[key]; 
        return product;

     });
        setCart(cartProducts);
        // console.log(cartProducts);
     }, [])

let  thankYou ;
  if(orderPlaced){
     thankYou = <img src= {happyImage} alt=""/>
  }
    return (
    <div className="twin-container">
        <div className="product-container">
            <h1> review cart item: {cart.length}</h1>
            {
            cart.map(pd => <ReviewItem 
            key= {pd.key}
            RemoveProduct = {RemoveProduct}
            product={pd}></ReviewItem>)
            } 
       
       {  thankYou}
         
        </div>   
        <div className="cart-container">
            <h1>cart container</h1>
            <Cart cart={cart}>
                <button onClick ={handlePlaceOrder} className="main-button">Place Oder</button>
            </Cart>
        </div>
    </div>
    );
};

export default Review;