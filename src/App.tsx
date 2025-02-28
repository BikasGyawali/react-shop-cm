import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ display: 'flex', height: '100vh', overflow: "hidden" }}>
                {/* Left side: Product details (or placeholder) */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <Routes>
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="*" element={<div style={{ padding: '20px' }}>Please select a product from the list.</div>} />
                    </Routes>
                </div>

                {/* Right side: Product list */}
                <div style={{ width: '25vw', overflowY: 'auto', padding: '0 20px 20px 20px' }}>
                    <ProductList />
                </div>
            </div>
        </Router>
    );
};

export default App;
