export function fetchAllProducts () {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductsByFilters (filter, sort, pagination) {
  // TODO : on server we will support multi values for category
  // filter = {"category":["smartphone", "cloths"]}
  // sort = {_sort: "price", _order: "asc"}
  let queryString = '';
  for (let key in filter) {

    //Get result for last selected category values as of now
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?' + queryString)
    // const response = await fetch('http://localhost:8080/products?_page=1&_per_page=1&')

    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductById (id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products/' + id)
    const data = await response.json()
    resolve({ data })
  })
}


export function fetchCategories () {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchBrands () {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({ data })
  }
  );
}