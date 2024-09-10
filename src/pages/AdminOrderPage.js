import AdminOrders from "../features/admin/AdminOrders";
import NavBar from "../features/navbar/Navbar";
function AdminOrderPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
     );
}

export default AdminOrderPage;