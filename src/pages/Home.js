import React from 'react';
import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/product/components/ProductList';
import Footer from '../features/common/Footer';

// #region component
const propTypes = {};

const defaultProps = {};

function Home () {

    return <div>
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
        <Footer />
    </div>;
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;