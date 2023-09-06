import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

function ItemComponent({ item }) {

  const dispatch = useDispatch(); // Corrected

  function addTocart() {
    dispatch({ type: 'addTocart', payload: {...item, quantity:1} }); // Assuming 'props.item' is the item you want to add
  }

  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt={item.name} height={100} width={100} />
      <h4 className='price'>Price: ${item.price}</h4>
      <div className="d-flex justify-content-end">
        <Button onClick={()=>addTocart()} type="primary">Add to Cart</Button> {/* No need for an arrow function here */}
      </div>
    </div>
  );
}

export default ItemComponent;
