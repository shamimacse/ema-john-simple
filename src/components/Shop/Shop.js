import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
        const first10 =fakeData.slice(0, 80)
        const [products, setProducts] = useState(first10);
        const [cart, setCart] = useState([]);
        useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey =>{
        const product =fakeData.find(pd => pd.key === existingKey);
        product.quantity = saveCart[existingKey] ;
        return product;
        })
        setCart(previousCart);
        // console.log(previousCart);
 }, [])

const handleAddProduct = (product) =>{
        // console.log('product added', product);
        const toBeAddKey = product.key;
        const someProduct = cart.find(pd => pd.key === toBeAddKey );
        let count =1;
        let newCart;
        if(someProduct){
        count = someProduct.quantity + 1;
        someProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAddKey);
        newCart = [...others, someProduct];
        }
else{
    product.quantity = 1;
    newCart = [...cart, product];       
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
 }
    

    return (
        <div className="twin-container">
            
            <div className="product-container">
                {
                    products.map(pd => <Product
                    key= {pd.key}
                    showAddToCart = {true }
                    handleAddProduct ={handleAddProduct}
                    product={pd}>
                    </Product>)   
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                         <button className="main-button">Review Order</button>
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;