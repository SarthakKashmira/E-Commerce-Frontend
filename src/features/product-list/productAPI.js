// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/products`);
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilter(filter,sort,pagination) {
  //we will get the filter object
  let queryString='';
  for(let key in filter)
  {
    const categoryValues=filter[key];
    if(categoryValues.length > 0){
    const lastValue=categoryValues[categoryValues.length-1];
    queryString +=`${key}=${lastValue}&`;
    }
  }
  for(let key in sort)
  { queryString +=`${key}=${sort[key]}&`;}
  for(let key in pagination)
  { queryString +=`${key}=${pagination[key]}&`;}
  // console.log(queryString);
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/products?`+ queryString);
    const data=await response.json();
    // console.log(data);
    resolve({data});
  }
  );
}

export function fetchCategories() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/categories`);
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchBrands() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/brands`);
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchProductById(id) {
  return new Promise( async (resolve) =>{
    console.log(id);
    const response=await fetch(`http://localhost:3333/products/${id}`);
    const data=await response.json();
    resolve({data});
  }
  );
}

export function createProduct(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/products`,{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}

export function updateProduct(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/products/`+item.id,{
      method:'PUT',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
      ,mode: 'cors'
    });
    const data=await response.json();
    resolve({data});
  }
  );
}
