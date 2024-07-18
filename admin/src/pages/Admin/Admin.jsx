import { Route, Routes } from "react-router-dom";
import ListProduct from "../../components/Product/ListProduct";
// import AddProduct from "../../components/Product/AddProduct";

import AddCategory from "../../components/Category/AddCategory";
import ListCategory from "../../components/Category/ListCategory";
import Dashboard from "../Dashboard";
import Sidebar from "../../components/Cards/Sidebar";
import AdminNavbar from "../../components/AdminNavbar";
import HeaderStats from "../../components/HeaderStats";
import Tables from "../Tables";
import Add from "../AddProduct";
import Customers from "../Customers";

const Admin = () => {
  return (
    <>

      {/* <Sidebar /> */}
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
      <HeaderStats/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">

      <Routes>
        <Route path="/listproducts" element={<ListProduct/>} />
        {/* <Route path="/addproduct" element={<AddProduct />} /> */}
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/all-categories" element={<ListCategory />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Tables/>} />
        <Route path="/addproduct" element={<Add/>} />
        <Route path="/customers" element={<Customers/>} />




      </Routes>
      </div>
      </div>
    </>
  );
};

export default Admin;
