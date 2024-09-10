import React from "react";
import ProductList from "../features/product-list/component/ProductList";
import Navbar from "../features/navbar/Navbar";
function Home() {
    return (
    <>
      <Navbar>
        <ProductList>

        </ProductList>
      </Navbar>
    
    </>  
    );
}

export default Home;