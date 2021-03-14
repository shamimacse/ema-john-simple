import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name, quantity, img, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom:'1px solid lightGray',
        marginBottom: '5px',
        paddingBottom: '10px',  
        marginLeft : '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <img src={img}alt=""/>

            <h2 className="product-name">Name : {name} </h2>
            <p>Quantity : {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button className="main-button"
            onClick = {() => props.RemoveProduct(key)} 
            >Remove</button>
        </div>
    );
};

export default ReviewItem;