// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise( async (resolve) =>{
    
    const response=await fetch(`http://localhost:3333/order/`);
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:3333/users/own`) 
    const data = await response.json()
    // console.log(data)
    resolve({data})
  }
  );
}


export function updateUser(userData) {
  return new Promise( async (resolve,reject) =>{
    console.log(userData);
    const response=await fetch(`http://localhost:3333/users/`+userData.id,{
      method:'PUT',
      body:JSON.stringify(userData),
      headers:{'Content-type':'application/json'},
      mode:'cors'
    });
    const data=await response.json();
    // console.log(data);  //in server it will return only relevant information
    resolve({data});}
  );
}