import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import OrderPage from './OrderPage';

const OCELOT_GATEWAY_PORT = process.env.REACT_APP_OCELOT_GATEWAY_PORT; // you can set this in docker compose env variables

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the C# service on component mount
    const url = `http://localhost:${OCELOT_GATEWAY_PORT}/gateway/products`
    console.log(url)
    axios.get<Product[]>(url) // Adjust URL based on your C# server configuration
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MALHALLA</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>Products</h2>
                  <div className="product-list">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.id} className="product-card">
                          <img src={product.image} alt={product.name} className="product-image" />
                          <h3>{product.name}</h3>
                          <p>{product.price}</p>
                          <Link to={`/order/${product.id}`}>
                            <button>Buy Now</button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p>Loading products...</p>
                    )}
                  </div>
                </div>
              }
            />
            <Route path="/order/:productId" element={<OrderPage />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© 2024 My Webshop. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
