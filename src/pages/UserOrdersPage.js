import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";
function UserOrdersPage() {
    return (
    <>
      <Navbar>
        <UserOrder>
        </UserOrder>
      </Navbar>
    </>  
    );
}

export default UserOrdersPage;