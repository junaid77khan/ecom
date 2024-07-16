import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../../components/sidebar";
import ListProduct from "../../components/ListProduct/ListProduct";
import AddProduct from "../../components/AddProducts/AddProduct";
import AddCategory from "../../components/AddCategories/AddCategory";
import ListCategory from "../../components/ListCategory/ListCategory";


const products = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro',
    price: '$1150',
    stock: 5,
    status: 'Inactive',
    image: 'path_to_image_1.jpg',
  },
  {
    id: 2,
    name: 'Apple iPhone 13 Pro Max',
    price: '$1400',
    stock: 12,
    status: 'Inactive',
    image: 'path_to_image_2.jpg',
  },
  // Add more products here
];

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/listproducts" element={<ListProduct products={products} />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/all-categories" element={<ListCategory />} />
      </Routes>
    </div>
  );
};

export default Admin;
