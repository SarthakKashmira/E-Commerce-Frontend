import AdminProductForm from "../features/admin/AdminProductForm";
import NavBar from "../features/navbar/Navbar";
function AdminProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductForm></AdminProductForm>
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;