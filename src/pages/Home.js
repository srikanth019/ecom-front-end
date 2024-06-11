import React from 'react';
import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/product/components/ProductList';
import { Link, } from 'react-router-dom';

// #region component
const propTypes = {};

const defaultProps = {};

function Home () {

    return <div>
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
        <Link to={'/admin'}>Admin</Link>
    </div>;
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;