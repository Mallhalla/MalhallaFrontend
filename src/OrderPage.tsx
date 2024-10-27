import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: '$10.00', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: '$15.00', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: '$20.00', image: 'https://via.placeholder.com/150' },
];

const OrderPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // Check if productId is available and parse it as a number
  const product = productId ? products.find(p => p.id === parseInt(productId, 10)) : null;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Order Page for {product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
      <p>Price: {product.price}</p>
      <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderPage;
