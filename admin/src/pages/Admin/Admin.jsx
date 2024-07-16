import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../../components/sidebar";
import ListProduct from "../../components/ListProduct/ListProduct";
import AddProduct from "../../components/AddProducts/AddProduct";
import AddCategory from "../../components/AddCategories/AddCategory";
import ListCategory from "../../components/ListCategory/ListCategory";

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
