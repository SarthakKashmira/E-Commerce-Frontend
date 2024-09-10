// A mock function to mimic making an async request for data
export function addOrder(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/order`,{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchAllOrdersByFilter(sort,pagination) {
  //we will get the filter object
  let queryString='';
  for(let key in sort)
  { queryString +=`${key}=${sort[key]}&`;}
  for(let key in pagination)
  { queryString +=`${key}=${pagination[key]}&`;}
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/order/filters?`+ queryString);
    const data=await response.json();
    resolve({data});
  }
  );
}


export function updateOrder(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/order/`+item.id,{
      method:'PUT',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
      ,mode: 'cors'
    });
    const data=await response.json();
    console.log(data);
    resolve({data});
  }
  );
}

export function fetchAllOrders() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/order/all/`);
    const data=await response.json();
    resolve({data});
  }
  );
}