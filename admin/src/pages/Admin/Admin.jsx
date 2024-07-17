import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../../components/sidebar";
import ListProduct from "../../components/Product/ListProduct";
import AddProduct from "../../components/Product/AddProduct";
import AddCategory from "../../components/Category/AddCategory";
import ListCategory from "../../components/Category/ListCategory";

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/listproducts" element={<ListProduct/>} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/all-categories" element={<ListCategory />} />
      </Routes>
    </div>
  );
};

export default Admin;
