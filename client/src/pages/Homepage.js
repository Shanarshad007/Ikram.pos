import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col } from 'antd';
import axios from 'axios';
import ItemComponent from '../components/ItemComponent';
import '../resourses/items.css'
import { useDispatch } from 'react-redux';
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const Categories = [
    {
      name : 'fruits',
      imageURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/500px-Culinary_fruits_front_view.jpg',
    },
    {
      name : 'vegetables',
      imageURL : 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name : 'meat',
      imageURL : 'https://www.americanostrichfarms.com/cdn/shop/articles/fresh-raw-meat_1200x.jpg?v=1618577157'
    },
    ];
    
  const dispatch = useDispatch()
  const getallitems = () => {
    dispatch({type : 'showLoading'})
    axios.get('/api/items/get-all-items')
      .then(response => {
        dispatch({type : 'hideLoading'})
        setItemsData(response.data); // Fixed typo 'clg' to 'console.log'
      })
      .catch(error => {
        dispatch({type : 'hideLoading'})
        console.error(error); // Fixed typo 'clg' to 'console.error'
      });
  };
  useEffect(() => {
    getallitems(); // Call the function inside useEffect
  }, []);
  return (
    <DefaultLayout>
<div className='d-flex categories'>
{Categories.map((category) => (
  <div 
  onClick={()=>setSelectedCategory(category.name)}
  className={`d-flex category ${selectedCategory === category.name ? 'selected-category' : ''}`} key={category.name}>  {/* Make sure to provide a unique key */}
    <h4>{category.name}</h4>
    <img src={category.imageURL} height={60} width={80} />
  </div>
))}

</div>
    <div>
      
      
    <Row gutter={[16, 16]}>
  {itemsData.filter((i)=>i.category===selectedCategory).map((item) => (
    <Col xs={24} lg={6} md={12} sm={6} key={item.name}> {/* Make sure to provide a unique key */}
      <ItemComponent item={item} />
    </Col>
  ))}
</Row>

    </div>
  </DefaultLayout>
  )
}

export default Homepage
