// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/cart`,{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    // console.log(data);
    resolve({data});
  }
  );
}

export function fetchProductByUserId() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/cart/`);
    const data=await response.json();
    // console.log(data);
    resolve({data});
  }
  );
}

export function updateQuantity(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/cart/`+item.id,{
      method:'PATCH',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
      ,mode: 'cors'
    });
    const data=await response.json();
    resolve({data});
  }
  );
}

export function deleteItem(id) {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/cart/`+id,{
      method:'DELETE',
      headers:{'Content-type':'application/json'},
      mode: 'cors'
    });
    const data=await response.json();
    resolve({data:{id:id}});
  }
  );
}

export function deleteAllItem() {
  return new Promise( async (resolve) =>{
    const response=await fetch(`http://localhost:3333/cart/`);
    const items=await response.json();
    // console.log(items)
    for(let item of items){
      await deleteItem(item.id);
    }
    resolve({status:'success'});
  }
  );
}