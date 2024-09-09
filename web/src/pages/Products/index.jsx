import React from 'react';
import axios from 'axios';

import ProductList from '@/components/ProductList';

const ProductsPage = () => {
    let products = [
        { id: '1', name: 'Umi' },
        { id: '2', name: 'Ant Design' },
        { id: '3', name: 'Ant Design Pro' },
        { id: '4', name: 'Dva' },
    ];

    const productsDelete = (id) => {

    };

    return (
        <div>
            <h1>Page products</h1>
            <ProductList
                products={products}
                onDelete={(id) => {
                    productsDelete(id)
                }}
            />
        </div>
    );
};

export default ProductsPage;