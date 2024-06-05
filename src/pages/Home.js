import React from 'react';
import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/productList/ProductList';

// #region component
const propTypes = {};

const defaultProps = {};

const Home = () => {
    return <div>
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
    </div>;
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;