import { serializeQueryParams } from '../../utils';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export function fetchAllProducts () {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${API_BASE_URL}/products`)
    const data = await response.json()
    resolve({ data })
  }
  );
}
// const response = await fetch('http://localhost:8080/products?_page=1&_per_page=10&')

export async function fetchProductsByFilters (filter = {}, sort = {}, pagination = {}) {
  const { _sort, _order } = sort;
  const { _page, _per_page } = pagination;
  const { category, brand, search } = filter

  // Construct the query parameters
  const queryParams = {
    _sort,
    _order,
    _page,
    _per_page,
    category,
    brand,
    search
  };

  // Remove undefined or empty parameters
  Object.keys(queryParams).forEach(key => {
    if (queryParams[key] === undefined || (Array.isArray(queryParams[key]) && queryParams[key].length === 0)) {
      delete queryParams[key];
    }
  });

  const queryString = serializeQueryParams(queryParams);

  try {
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    throw error;
  }
}

export function fetchProductById (id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/api/v1/products/' + id)
    const data = await response.json()
    resolve({ data })
  })
}


export function fetchCategories () {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/v1/categories')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchBrands () {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/v1/brands')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function createProduct (product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/v1/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    console.log(/apiData/, data);
    resolve({ data });
  });
}

export function updateProduct (update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/api/v1/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}