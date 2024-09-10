// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise( async (resolve,reject) =>{
    const email=userData.email;
    const result=await fetch(`http://localhost:3333/auth/userexist?email=`+email);
    const ans=await result.json();
    if(ans.length > 0){
      reject({message:"User already exists ,please login"});
    }
    else{
    const response=await fetch(`http://localhost:3333/auth/signup`,{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'Content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});}
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise( async (resolve,reject) =>{
    try{
    const response=await fetch(`http://localhost:3333/auth/login`,{
      method:'POST',
      body:JSON.stringify(loginInfo),
      headers:{'Content-type':'application/json'},
      credentials:'include'
    });
    if(response.ok){ 
      const data=await response.json();
      resolve({data});
      }
      else{
        const err=await response.text();
        reject(err);
      }
   
  }catch(err)
  {reject(err);}
  }
  );
}

export function checkAuth() {
  return new Promise( async (resolve,reject) =>{
    try{
    const response=await fetch(`http://localhost:3333/auth/checkauth`);
    if(response.ok){ 
      const data=await response.json();
      resolve({data});
      }
      else{
        const err=await response.text();
        reject(err);
      }
   
  }catch(err)
  {reject(err);}
  }
  );
}

export function signOut() {
  return new Promise( async (resolve,reject) =>{
  resolve({data:"success"});  
  }
  );
}



